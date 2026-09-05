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
      connections: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something Went Wrong",
      error: error.message,
    });
  }
});

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId toUserId status");

    // .populate("fromUserId", ["firstName", "lastName"])
    // .populate("toUserId", ["firstName", "lastName"]);

    const hideUsersFromFeed = new Set();
    connectionRequests.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString());
    });

    const users = await User.find({
      $and: [
        {
          _id: {
            $nin: Array.from(hideUsersFromFeed),
          },
        },
        {
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
  } catch (error) {
    res.status(500).json({
      message: "Something Went Wrong",
      error: error.message,
    });
  }
});

export default userRouter;
