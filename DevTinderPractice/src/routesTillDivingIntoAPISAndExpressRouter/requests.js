import express, { Router } from "express";
import { userAuth } from "../middlewares/auth.js";

const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(404).json({
        message: "Unable to find the User",
        user,
      });
    }
    const { firstName, lastName } = user;
    res.status(200).json({
      message: `${firstName + " " + lastName + " "}sent the coonnection Request`,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something Went Wrong",
      error: error.message,
    });
  }
});

export default requestRouter;
