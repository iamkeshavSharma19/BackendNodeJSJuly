import express from "express";
import { userAuth } from "../middlewares/auth.js";
import ConnectionRequest from "../models/connectionRequests.js";
import { User } from "../models/user.js";

const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;

      const toUserId = req.params.toUserId;

      const status = req.params.status;

      const allowedStatus = ["ignored", "interested"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({
          message: "Invalid status type: " + status,
        });
      }

      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId: fromUserId, toUserId: toUserId }, // A → B
          { fromUserId: toUserId, toUserId: fromUserId }, // B → A (reversed)
        ],
      });

      if (existingConnectionRequest) {
        return res.status(400).send({
          message: "Connection Request Already exists",
        });
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();

      res.json({
        message:
          req.user.firstName +
          " " +
          "is" +
          " " +
          status +
          " " +
          "in" +
          " " +
          toUser.firstName,
        data,
      });
    } catch (err) {
      res.status(400).send("ERROR: " + err.message);
    }
  },
);

//~Let us create here one more api === request/review/:status/:requestId
//~Do you want the auth middleware for this api ???Yes ofcourse,I want the user to be loggedIn.You are sending me a connectionRequest,I should be loggedIn to accept it.Without logging in you cannot accept any connectionRequest.I donot want my api to work without login.So I would need the userAuth over here.
//^This userAuth will check whether the token which is coming over here,is valid or not ??whether the cookie has the token and the token is valid and it will get the information about the loggedIn user and it will get the loggedIn User in the database and it will call the next() function.
requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  //*Inside :requestId,while testing on the Postman we will pass the id of that connectionRequest document which the Harry has sent to the Ron.
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      //&Now here I will write the whole logic for the review API.Now I have to write the logic to accept the connection request.But first of all let us write that logic in theory.

      //~Always whenever you are writing the logic for the api call, make sure You cover all the corner cases,Make sure before writing any code,In your head you are clear about What you are going to write.

      //*Suppose let say Harry sent a connection request [interested] to Ron,first of all what are the things that we need to check??

      //&1.) First of all we need to validate the :status.Then I will validate the :requestId also,I will check whether this requestId which the user is sending, is belonging to Ron or not.

      //^2.)We need to check is Ron logged in? This Api should only work if Ron is a logged In User.toUserId is Ron,basically Ron is the Receiver,so receiver should be loggedIn then only the receiver can accept or reject the connection Request.It should not be like that I have sent the connection request to harry and I can myself approve it,No I cannot myself accept it,or may be Virat Kohli accepted the connection request,which harry sent to Ron, It cannot happen.Only the toUserId person can accept or reject it.toUserId person is Ron right now,so only Ron is authorised to accept this connection request.Basically the toUserId person [Ron] should be the loggedIn user.

      //?3.)We also have to make sure that see what can be the different status of our connectionRequests??The status can either be "ignored", "interested", "accepted" or "rejected".There can only be 4 status in our connectionRequest Model.Now I am approving [accepting] the connection request or I am rejecting the connection request, that can only happen if the existing connection request is in the interested state.Suppose Mark ignored the profile of Harry,now if the connection request is in the ignored state,Nobody can change this now.Not even Mark,not even Harry,In Tinder also It is like that,Suppose if you left swiped[ignored] the profile,You cannot reverse your decision.In devTinder once you have rejected someone, you are not able to send them connectionRequest once again.Once you ignored you cannot send them interested once again.The status should always be "interested",then only this API would work.If there is something else apart from interested then that status is not allowed.

      //!One more thing,this :requestId can also be invalid.

      //?Validate the status
      //?Harry => Ron
      //?loggedInuser => toUserId
      //?status = interested
      //?requestId should also be valid

      //&In this api also receiever either can accept the connection request or reject the connection request.

      //&Basically whenever somebody is calling this api, they should either pass "accepted" or "rejected".If they are passing "xyz", If they are passing "ignored", "interested",These are not allowed.Only "accepted" or "rejected" is allowed in this api.
      const { status, requestId } = req.params;

      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({
          message: "Status Not Allowed",
        });
      }
      //?Once we have seen that the status is correct,now we will check that wheteher the requestId is present in our database or not ??
      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        //?toUserId should be same person who is loggedIn,Suppose if Ron is loggedIn,so the connectionRequest document should have the toUserId of the Ron.
        toUserId: loggedInUser._id,
        //?And the status of this connectionRequest document should be interested.If the status of this connectionRequest is not interested then we should not find that document.
        //?I am trying to find a request in my database which has the requestId as :requestId,whatever the user is passing in, toUser should be the loggedIn User,it should not be someone else.And the status should be "interested".
        status: "interested",
      });

      //^Suppose If I donot find any such connectionRequest.
      if (!connectionRequest) {
        return res.status(404).json({
          message: "Connection request not found",
        });
      }

      connectionRequest.status = status;

      const data = await connectionRequest.save();

      res.status(200).json({
        message: "Connection request " + status,
        data,
      });
      //*After building this api fully we will start building another set of API's, Let me meet you at the userRouter.One more important thing ==> The thought process of writing the POST API is different than the thought process of writing the GET API.

      //?Whenever I look at any API,just look it from the lens that whether it is a POST API or a GET API.What happens in the POST API is that the User is sending some data,basically think yourself as the security guard of your database.As a developer you should think that you are the security guard of your database.Think of a security guard outside a King's Palace.The Job of the security guard is not to let any random people inside.Only authorised people can go inside.And the security guard also has the job that okay if someone is going from inside to outside,Just make sure that nobody is collecting or leaking some information which is there inside to outside.We are the guard, we are the guardians of our database.

      //?And you have to think from a lens that whenever there is a POST API,POST API means that the User is trying to enter some data into the database.GET API'S means that I am trying to fetch some data from the database.

      //&How can a attacker try to exploit your POST API??They can attack your POST API by sending some random data into your api and you mistakenly put that into your database.If you put some data into the database which was not supposed to be accidently then that is the attacker's oppurtunity.That is something that you don't have to do as the Guardian of your Database.

      //~Whenever there is a POST API,think of the attacker as this attacker can put something into my database and I should have an OCD that I will verify everything which is coming in my request.I will verify each and everything,Before saving anything onto the database make sure to go through all of the checks.All the checks at each level.Before saving anything onto the database I will verify and validate each and everything, I will do data sanitizations and validations.

      //*While writing GET API's the thought process changes very siginificantly,because now the user will not pass any information into the database.The threat to POST API is that the user can malaciously enter the wrong data into the database.GET API's threat is the attacker's oppurtunity is that from the get api you are getting some information from the database.Now basically in the GET API's we will 100% make sure that we are sending only the allowed data.We are very much sure about the things that okay,whatever data I am sending back to the User,it is 100% sure that the User is authorised.We should 100% make sure that the loggedIn user is a verified user and whatever he is requesting is requesting the correct information which is allowed in his scope.Because see database is very open,you have all the data present inside the database.

      //?First of all before we start writing any other api's,inside the routes folder we have to create user.js file.And I will meet you now at the user.js file.
    } catch (error) {
      res.status(500).json({
        message: "Something Went Wrong",
        error: error.message,
      });
    }
  },
);

export default requestRouter;
