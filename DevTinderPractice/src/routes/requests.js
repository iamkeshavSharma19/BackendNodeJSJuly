import express from "express";
import { userAuth } from "../middlewares/auth.js";
import { User } from "../models/user.js";
import { ConnectionRequest } from "../models/connectionRequests.js";

const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      //?for sending the connectionRequest to anybody, first of all the fromUser person should be the loggedIn User.
      const loggedInUser = req.user;
      const { _id: fromUserId } = loggedInUser;

      const { status, toUserId } = req.params;
      const allowedStatus = ["interested", "ignored"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({
          message: `Invalid connection request status type ${status}`,
          status,
        });
      }
      const toUser = await User.findById(toUserId);

      if (!toUser) {
        return res.status(404).json({
          message: "User Not Found.Sending Connection Request Failed",
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
          message: "Connection Request already exists",
          existingConnectionRequest,
        });
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId: fromUserId,
        toUserId: toUserId,
        status: status,
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
        message: "Something went wrong",
        error: error.message,
      });
    }
  },
);

export default requestRouter;
