import { ConnectionRequest } from "../models/connectionRequest.model.js";

const USER_SAFE_DATA = [
  "firstName",
  "lastName",
  "age",
  "gender",
  "about",
  "photoUrl",
];

export const handleViewPendingRequests = async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", USER_SAFE_DATA);

    if (connectionRequests.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Connection Requests Found",
      });
    }

    res.status(200).json({
      success: true,
      message: `Pending Connection Requests of the ${loggedInUser.firstName} are fetched Successfully`,
      connectionRequests,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};

export const handleViewUserConnections = async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { fromUserId: loggedInUser._id, status: "accepted" },
        { toUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    if (connectionRequests.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Connections Found",
      });
    }

    const connections = connectionRequests.map((request) => {
      if (request.fromUserId.equals(loggedInUser._id)) {
        return request.toUserId;
      } else {
        return request.fromUserId;
      }
    });

    res.status(200).json({
      success: true,
      message: "All the connections are fetched Successfully",
      connections,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};

export const handleUserFeed = async (req, res) => {
  try {
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};
