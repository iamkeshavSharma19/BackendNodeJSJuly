import express from "express";
import { userAuth } from "../middlewares/auth.js";
import { ConnectionRequest } from "../models/connectionRequests.js";

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

//?/user/requests/received ==> These api is to get all the pending requests of the LoggedIn User.Try to build this API on your Own.
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const { _id: toUserId, firstName, lastName } = loggedInUser;

    //?find method returns you an array of all the matched documents
    const connectionRequests = await ConnectionRequest.find({
      toUserId: toUserId,
      status: "interested",
    }).populate("fromUserId", USER_SAFE_DATA);

    if (connectionRequests.length === 0) {
      return res.status(404).json({
        message: "No Connection Requests Found",
        connectionRequests,
      });
    }

    res.status(200).json({
      message: `All The Pending connection requests of the ${firstName + " " + lastName} are fetched successfully`,
      allPendingConnectionRequests: connectionRequests,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something Went Wrong",
      error: error.message,
    });
  }
});

//?/user/connections ==> This api is to get all the connections of the LoggedIn User.
userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const { _id: loggedInUserId } = loggedInUser;
    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { fromUserId: loggedInUserId, status: "accepted" },
        { toUserId: loggedInUserId, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    if (connectionRequests.length === 0) {
      return res.status(404).json({
        message: "No Connections Found",
        connectionRequests,
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
      message: "All The Connections are fetched successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something Went Wrong",
      error: error.message,
    });
  }
});

export default userRouter;
