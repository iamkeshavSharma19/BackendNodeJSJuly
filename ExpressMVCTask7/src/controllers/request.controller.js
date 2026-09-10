import { User } from "../models/user.model.js";
import { ConnectionRequest } from "../models/connectionRequest.model.js";

export const handleSendConnectionRequest = async (req, res) => {
  try {
    const loggedInUser = req.user;
    const fromUserId = loggedInUser._id;
    const status = req.params.status;
    const toUserId = req.params.toUserId;
    if (!status) {
      return res.status(401).json({
        success: false,
        message: "Invalid Request.Status Required",
      });
    }
    const AllOWED_STATUS = ["interested", "ignored"];

    if (!AllOWED_STATUS.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Status Type",
      });
    }

    const toUser = await User.findById(toUserId);

    if (!toUser) {
      return res.status(404).json({
        success: false,
        message: "Request Not Sent.User Not Found.",
      });
    }

    const existingConnectionRequest = await ConnectionRequest.findOne({
      $or: [
        { fromUserId: toUserId, toUserId: fromUserId },
        { fromUserId: fromUserId, toUserId: toUserId },
      ],
    });

    if (existingConnectionRequest) {
      return res.status(400).json({
        success: false,
        message: "Connection Request Already Exists",
      });
    }

    const connectionRequest = new ConnectionRequest({
      fromUserId: loggedInUser._id,
      toUserId: toUser._id,
      status: status,
    });

    await connectionRequest.save();

    res.status(201).json({
      success: true,
      message:
        status === "ignored"
          ? `${loggedInUser.firstName} ignored the ${toUser.firstName}'s profile`
          : `${loggedInUser.firstName} is interested in ${toUser.firstName}'s profile`,
      connectionRequest,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};

export const handleReceiveConnectionRequest = async (req, res) => {
  try {
    const loggedInUser = req.user;
    const status = req.params.status;
    const requestId = req.params.requestId;
    

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Request Not Sent. Status Required",
      });
    }

    const ALLOWED_STATUS = ["accepted", "rejected"];

    if (!ALLOWED_STATUS.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Status Type",
      });
    }

    const connectionRequest = await ConnectionRequest.findOne({
      _id: requestId,
      toUserId: loggedInUser._id,
      status: "interested",
    });

   

    if (!connectionRequest) {
      return res.status(404).json({
        success: false,
        message: "Connection Request Not Found",
      });
    }

    connectionRequest.status = status;

    await connectionRequest.save();

    res.status(200).json({
      message:
        status === "accepted"
          ? `${loggedInUser.firstName} accepted the connection request`
          : `${loggedInUser.firstName} rejected the connection request`,
      connectionRequest,
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};


