import express from "express";
import { userAuth } from "../middlewares/auth.js";
import ConnectionRequest from "../models/connectionRequests.js";
import { User } from "../models/user.js";

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

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,

      status: "interested",
    }).populate("fromUserId", [
      "firstName",
      "lastName",
      "photoUrl",
      "age",
      "gender",
      "about",
      "skills",
    ]);

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

    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)

      .populate("toUserId", USER_SAFE_DATA);

    if (connectionRequests.length === 0) {
      return res.status(404).json({
        message: "No Connection Requests found",
      });
    }

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

//?feed API
//?Thought Process Of Writing the feed API ==> Which Users should be visible to the loggedIn User ??Let say loggedIn User is Virat.

//? Virat should see the card of the users, Virat should see the card of everybody whom Virat has not sent connectionRequest to.Suppose If Virat has already sent a request to Elon,then Virat should not see again the card Of Elon.There is basically no point in showing the card of People whom Virat has already marked Interested.

//*Now Suppose Virat has ignored somebody's profile.If Virat has ignored Donald Trump's profile.Should Virat see Donald Trump again on the feed??No.The people who has been went into the "interested",may be If you have sent the connection request to them or you have ignored their profile,You should not see them again in your feed.

//* Virat should not see the Users who are his connections already,suppose Virat is already connected to Elon,so if they both are already friends,Why would you show the card of the connections again in the feed.There is no point in seeing it.

//^There is one more condition that Virat should not see his Card himself,Suppose If You are fetching all the users,let say there are 6 users on the platform,Virat should not see his card himself.So you have to write a MongoDB query in such a way that you have to exclude all such people,whom we donot want in the feed.Now this logic is a little Complex to write.Let me meet you inside the try Block.

//todo ==> donot first of all focus on the pagination, skip and limit, focus on making the feed api without Pagination at first.below is the feed api without pagination

//?These page=1 and limit=10 are optional,user might call just this "/feed".If the user is just calling "/feed".If the user is just calling "/feed",I will basically give him the first 10 users.If the user wants the second page.Either he should pass like this => "/feed?page=2".So I should give the page no.2 content.If the user is not passing the limit then also I will give him 10 users only.
userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    //?What are the cards that the user should not see??
    //?1.)User's own card.
    //?2.)His connections.
    //?3.)Ignored People.
    //?4.)People to whom I have already sent a connection Request.
    //^ex => Virat, Elon, Mark, Harry, Ron.
    //^Let say a new user Rahul comes onto our Platform.So what feed Rahul should see?Rahul should see = [Virat, Elon, Mark, Harry, Ron] except himself.
    //~Now Suppose Rahul has sent the connection Request to Virat.So Rahul should see everyone except the person to whome he has sent the connection request.Rahul should see = [Elon, Mark, Harry, Ron].
    //*Now let say Rahul has sent a connection request to Elon also.Now Rahul should see on his feed = [Mark, Harry, Ron].
    //? Now let say Virat has rejected the connection request of the Rahul.Should Virat should again be shown to the Rahul?No Virat should not be shown again on the Rahul's Profile.
    //&Now let say Elon has accepted the connectionReq of the Rahul.Should Rahul see Elon back into the feed.No
    //?Basically If the entry has already been created inside the connectionRequest Collection,then those persons should not be able to see each other's Profile once again.
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;
    const loggedInUser = req.user;
    //*Now I will find all the connectionRequests that either I[loggedInuser] have sent or I have received because If I have sent a request to somebody,so I should not see that on the feed,and If I have received somebody's request,then I should'not see them also on the feed.
    //?firstOf all I donot need all that random data,I dont care about createdAt, status, updatedAt, _id.so basically there is a select function and you can select that what all data do you need from this data.I just need my fromUserId and toUserId.
    //?Test in the postMan by making Harry LoggedIn.
    const connectionRequests = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
      //?But here in the select these fromUserId and toUserId also looks ugly, let me now make the use of the populate.[just to show case, I am going to remove populate just uncomment it]
    }).select("fromUserId toUserId status");

    // .populate("fromUserId", ["firstName", "lastName"])
    // .populate("toUserId", ["firstName", "lastName"]);
    //!Now just think about that I have to generate the feed of Harry Potter.Harry should not see Ron, Virat and Brock Lesnar.All the people whome you have sent or all the people whom you have received,you should'not see them in the feed.
    //!Now these {fromUserId, toUserId} are the people whom I donot want to see in the feed.
    //!So How will I segregate these people, so I will basically hide these users.For that I will create a data structure known as set.This Set data structure is like an array.Suppose If you are adding "A" in the set, it will add "A",Suppose If you are adding "B" in the data structure,it will add "B",Suppose If you tried to add a repeated value "A" inside it once again,so "A" will not be added in it because "A" is already present inside the Set.Set data structure will always contain the unique elements.
    //!If you are sending the repeated values, it will just ignore it.
    //?Once i have created the set,now I will loop through all these connection requests.
    const hideUsersFromFeed = new Set();
    connectionRequests.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString());
    });

    // console.log(hideUsersFromFeed); //?In my set I have 4 unique people now from whom I have to hide the loggedIn User's feed.

    //?Now for finding out the remaining users, I will basically write a reverse query kind of a thing.
    const users = await User.find({
      //?I will say find all the users with the id and that id should not be present in the ($nin) Array.from(hideUsersFeed).
      $and: [
        {
          _id: {
            //*Array.from() will convert the set into an array.

            $nin: Array.from(hideUsersFromFeed),
          },
        },
        {
          //*second condition ==> I donot want all the people who are there in the hideUsersFromFeed, I also donot want my own card to be there, for this I also have to write a $and query over here.See I have written this $and to handle an important edge case that What if the loggedIn User is a brand new User.So If loggedIn User is a brand new User then he will not have any connection request received or pending then In that He must see all the profiles in his feed accept his own profile.
          _id: {
            $ne: loggedInUser._id,
          },
        },
      ],
    })
      .select(USER_SAFE_DATA)
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      message: "All the feed of the user fetched successfully",
      users,
    });
    //?My feed API has been built successfully,Now let us move on to the another portion of the feed API.Suppose My database has 1000's of users.Suppose I have 1000 users registered,So I donot want my feed api to send me the 999 records in the feed API.I basically donot want to get the 999 records for a new user.
    //*We should basically add Pagination to our feed API.The API should only return me 10 Users at a Time.My API Should return me only 10 Users at a Time.We basically want to build a feature of Pagination over here.First of all let us discuss some theory about the Pagination.In the src create a new file pagination.js,Meet you there!.Meet you again at the top of feed API.
  } catch (error) {
    res.status(500).json({
      message: "Something Went Wrong",
      error: error.message,
    });
  }
});

export default userRouter;
