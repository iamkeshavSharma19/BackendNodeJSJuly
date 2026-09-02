import { ConnectionRequest } from "../models/connectionRequests.model.js";
import { User } from "../models/user.model.js";

export const handleSendConnectionRequest = async (req, res) => {
  try {
    const loggedInUser = req.user;
    const fromUserId = loggedInUser._id;
    const toUserId = req.params?.toUserId;

    const toUser = await User.findById(toUserId);

    if (!toUser) {
      return res.status(400).json({
        message: "Invalid Connection Request",
      });
    }

    const status = req.params?.status;

    if (!["interested", "ignored"].includes(status)) {
      return res.status(400).json({
        message: "Invalid Connection Request",
      });
    }

    const existingConnectionRequest = await ConnectionRequest.findOne({
      $or: [
        { fromUserId: fromUserId, toUserId: toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });

    if (existingConnectionRequest) {
      return res.status(400).json({
        message: "Duplicate Connection Request",
      });
    }

    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });

    const request = await connectionRequest.save();

    res.status(200).json({
      message:
        status === "interested"
          ? `${req.user.firstName} ${req.user.lastName} is interested in ${toUser.firstName} ${toUser.lastName}`
          : `${req.user.firstName} ${req.user.lastName} has ignored ${toUser.firstName} ${toUser.lastName}'s profile`,
      request,
    });
  } catch (error) {
    res.status(400).json({
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};

export const handleReviewConnectionRequest = async (req, res) => {
  try {
    const loggedInUser = req.user;
    const status = req.params.status;
    const requestId = req.params.requestId;
    const allowedStatus = ["accepted", "rejected"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        message: "Invalid Status. Not Allowed",
      });
    }
    const connectionRequest = await ConnectionRequest.findOne({
      _id: requestId,
      toUserId: loggedInUser._id,
      status: "interested",
    });

    if (!connectionRequest) {
      return res.status(404).json({
        message: "Connection Request Not Found",
      });
    }

    connectionRequest.status = status;
    const data = await connectionRequest.save();

    res.status(200).json({
      message: "Connection request " + status,
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};
