import express, { Router } from "express";
import { userAuth } from "../middlewares/auth.js";
import { ConnectionRequest } from "../models/connectionRequests.js";
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
      //?Interested ==> right swipe
      //?rejected ==> left swipe
      const allowedStatus = ["ignored", "interested"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({
          message: "invalid status type",
          status,
        });
      }

      const toUser = await User.findById(toUserId);

      if (!toUser) {
        return res.status(404).json({
          message:
            "The User to whom you sent the connection request was not found",
          toUser,
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
          existingConnectionRequest,
        });
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();

      res.status(200).json({
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
    } catch (error) {
      res.status(500).json({
        message: "Something Went Wrong",
        error: error.message,
      });
    }
  },
);

export default requestRouter;
