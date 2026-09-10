import mongoose from "mongoose";

const connectionRequestSchema = mongoose.Schema({
  fromUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  toUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  status: {
    type: String,
    enum: {
      values: ["interested", "ignored", "accepted", "rejected"],
      message: `{VALUE} is not a valid status type`,
    },
  },
});

//?Defining pre in mongoose
connectionRequestSchema.pre("save", function () {
  const connectionReq = this;
  if (connectionReq.fromUserId.equals(connectionReq.toUserId)) {
    throw new Error("You cannot send connection request to yourself");
  }
});

export const ConnectionRequest = mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema,
);
