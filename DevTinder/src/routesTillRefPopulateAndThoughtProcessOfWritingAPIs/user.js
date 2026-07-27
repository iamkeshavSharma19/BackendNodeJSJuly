import express from "express";
import { userAuth } from "../middlewares/auth.js";
import ConnectionRequest from "../models/connectionRequests.js";

const userRouter = express.Router();

const USER_SAFE_DATA = [
  "firstName",
  "lastName",
  "photoUrl",
  "age",
  "gender",
  "about",
  "skills",
];

//?First of all let us find all the connectionRequests that the loggedIn User has.Whatever connection requests user has received.

//?The job of this api is to get all the pending connectionRequests for the loggedIn user.
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    //?find returns you an array whereas findOne returns you an object.
    const loggedInUser = req.user;
    //&Now I have got my loggedIn user,now I have to make a GET call from the database,and get all the connection requests of this loggedIn User.
    //*How will I find the pending connection requests of a particular id ??Suppose I have to find whatever connection requests I have got,so basically I have to write in the below query that my toUserId should be the loggedIn User.
    const connectionRequests = await ConnectionRequest.find({
      //*toUserId should be the loggedIn User's id.
      toUserId: loggedInUser._id,
      //?Here Along with the toUserId I basically also need to pass here the status,otherwise it will get me all the "ignored", "interested".I will also get the connectionRequest documents marked with ignored ones.It will also give me the connection requests which have been ignored,but over there toUserId is the loggedIn user's id.

      //todo==> Important Note: Whenever you are calling something from the database right,this is basically the database call,you can get a lot of Random things from the database,so always make sure what data are you getting in.I have to find the pending connection requests,not all the connection requests which the loggedIn User has got.Otherwise it will also give you the People who have rejected you.Check it out by sending a request on the POSTMAN.Let us Login Brock Lesnar now.let us send 2 connection requests to Brock Lesnar, one will be "interested" and the other one will be "ignored".Randy sent the "interested" whereas Ron sent the "ignored" to the Brock Lesnar.Let us now also add status:"interested" to this query.let us say harry is also "interested" in Brock.
      status: "interested",
      //?[Not For Now] ==> I will basically populate my fromUserId from the reference,now the refernce you already know It is basically the User collection.I will get the data,over here I will pass the list of data that I need from that.Suppose If I need firstName and lastName.Test now on the postman
    }).populate("fromUserId", [
      "firstName",
      "lastName",
      "photoUrl",
      "age",
      "gender",
      "about",
      "skills",
    ]);
    //*[not for now]Now see my fromUserId is also getting populated and the firstName and the lastName is coming from my users collection.I dont have to write any logic,just because I created a link between these 2 collections, I can just fetch and populate my fromUserId.If I donot write the second parameter i.e ==> ["firstName", "lastName"].It will sent me the whole user's document i.e fromUser present in the users collection.But this is a very very bad as well as the pathetic way.Think about it Brock is logged In,now he wants to see all of his connection requests.see I will get the whole user Object of harry and even I am sending the emailId and Password of Harry,such a bad thing it is.We need to be very conscious about what I am sending back.This is basically the main thing about the GET API, you have to explicitly make sure that you are not over fetching data, you should be very specific about what you are sending back.Let us now move to the next API which is /user/connections api.
    //?But do you see an important issue over here ??We are basically sending back to id's of the users in the response as fromUserId and toUserId.But in the real world scenario,you would need the information about those people also.Suppose if Brock Lesnar is checking it's connection requests,Brock should also know that who is sending him the connectionRequests??Who is the person who is sending the connection request ??Brock should know that information also.How will I get that information??There are basically 2 ways of doing it.

    //?One way is ==> I can loop over all of these connection requests and one by one I can find out the information about all these id's.I will basically focus on the fromUserId.But this is a poor way of handling it,let me tell you a very good and better way of handling this.That is known as building Relationship between two tables or collections.Go back to the connectionRequestSchema.Let me meet you at the connectionRequestSchema.

    //*After writing ref: "User",whenever I am making a call to the connectionRequest.I will just populate my reference now.let us meet at top after status: "interested".

    if (connectionRequests.length === 0) {
      return res.status(404).json({
        message: "No Pending Connection Requests are there",
      });
    }

    res.status(200).json({
      message: `All the pending connection requests of the ${loggedInUser.firstName + " " + loggedInUser.lastName} are fetched successfully`,
      pendingConnectionRequest: connectionRequests,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    //?Suppose Harry sent a connection request to the Brock.That connectionRequest is in the accepted state.
    //?Harry => Brock => accepted.

    //~Now Brock sent a connection request to Mark which is also in the accepted state.
    //~Brock => Mark => accepted

    //*Now suppose If I am finding all the connection requests of Brock,I basically have to check all the connection requests where Brock is the toUser or Brock is the fromUser.Brock is fromUser or toUser.Brock can be toUser also or fromUser as well.But the status should always be accepted.

    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
      //![not for now] ==> The bug in my api is I am always populating my fromUserId.But what if the User does'not come from toUserId,user can also be from fromUserId because I have written a or condition in this query.So basically I have to populate both the data.add the ref field in the toUserId as well
    })
      .populate("fromUserId", USER_SAFE_DATA)
      //!Read this query when you read about the bug, dont focus on this second populate right now.
      .populate("toUserId", USER_SAFE_DATA);

    if (connectionRequests.length === 0) {
      return res.status(404).json({
        message: "No Connection Requests found",
      });
    }
    //?But here I am not expecting the connection request's information,I just want to get the data of fromUserId,See a User is requesting connections,basically I want the data of the array of the Users.I donot want the data about the connectionRequest.

    //*So basically once I have got this array of users,here I can just modify the data.how just see below.What it will do,it will just give me information about fromUserId.

    //!We have a got a bug over here.Meet you at the populate in the above query

    //! const data = connectionRequests.map((row) => row.fromUserId);

    const data = connectionRequests.map((row) => {
      //?you cannot compare 2 mongoose id's directly,that's why I have used .toSring() over here.
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      } else {
        return row.fromUserId;
      }
    });

    res.status(200).json({
      message: "Connection requests found successfully",
      connectionRequests: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something Went Wrong",
      error: error.message,
    });
  }
});

export default userRouter;
