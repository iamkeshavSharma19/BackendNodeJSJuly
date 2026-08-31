import { ConnectionRequest } from "../models/connectionRequests";
import { User } from "../models/user";

export const handleSendConnectionRequest = async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;
    const allowedStatus = ["ignored", "interested"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        message: "Invalid Status Type",
        status,
      });
    }
    const toUser = await User.findById(toUserId);

    if (!toUser) {
      return res.status(401).json({
        message: "User Not Found",
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
        message: "Connection Request Already exists",
      });
    }

    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });

    const data = await connectionRequest.save();

    res.json(200).json({
      message:
        status === "interested"
          ? `${req.user.firstName} + " " + ${req.user.lastName} + " " is interested in ${toUser.firstName} + " " + ${toUser.lastName}`
          : `${req.user.firstName} + " " + ${req.user.lastName} + " " has ignored ${toUser.firstName} + " " + ${toUser.lastName}'s profile`,
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};
