import mongoose from "mongoose";

//*ref, populate and thought process of writing api's ==> What I will do now is that I will built a relation from this connectionRequests collection to the user collection.I will basically create a reference

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      //*How do you create a reference,you basically write ref over here,you basically write a field ref over here and you say that this fromUserId is basically a reference to the user table/collection.when I write ref: "User",that means this fromUserId is the id of user from the users collection.This is like creating a link between these 2 collections and MongoDB does it very well.

      //^Basically whenever Mongodb is creating a connection request or something so it will manage a link between fromUserId and the user which is there in the userSchema.You just have to write one thing i.e ==> ref: "User" that means now I am creating a reference to the Users collection.
      //*let us now meet again at the userRouter.
      ref: "User", //^reference to the Users collection
      required: true,
    },

    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      required: true,

      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],

        message: `{VALUE} is incorrect status type.`,
      },
    },
  },
  {
    timestamps: true,
  },
);

connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

connectionRequestSchema.pre("save", function () {
  const connectionRequest = this;

  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("You cannot send connection request to yourself");
  }

  // next();
});

const ConnectionRequest = new mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema,
);

export default ConnectionRequest;
