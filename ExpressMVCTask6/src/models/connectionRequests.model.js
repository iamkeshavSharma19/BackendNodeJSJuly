import mongoose from "mongoose";

const connectionRequestSchema = mongoose.Schema({
  fromUserId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },

  toUserId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },

  status: {
    type: String,
    enum: {
      values: ["interested", "ignored", "accepted", "rejected"],
      message: `{VALUE is incorrect status type}`,
    },
    required: true,
  },
});

connectionRequestSchema.pre("save", function () {
  const connectionRequest = this;
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("You cannot send connection request to yourself");
  }
});

export const ConnectionRequest = mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema,
);
