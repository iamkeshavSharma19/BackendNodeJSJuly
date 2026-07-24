import express from "express";
import { userAuth } from "../middlewares/auth.js";

const userRouter = express.Router();

//?First of all let us find all the connectionRequests that the loggedIn User has.Whatever connection requests user has received.

//?The job of this api is to get all the pending connectionRequests for the loggedIn user.
userRouter.get("/user/requests", userAuth, async (req, res) => {
  try {
    //?find returns you an array whereas findOne returns you an object.
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
});

export default userRouter;
