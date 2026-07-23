import express from "express";
import { userAuth } from "../middlewares/auth.js";
import { validateEditProfileData } from "../utils/validation.js";

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(404).json({
        message: "Not able to fetch the User's Profile",
        user,
      });
    }
    res.status(200).json({
      message: `${user.firstName + " " + user.lastName + " "}'s Profile fetched Successfully`,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something Went Wrong",
      error: error.message,
    });
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      return res.status(401).json({
        message: "Invalid Edit request",
      });
    }

    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();

    res.status(200).json({
      message: `${loggedInUser.firstName}, your profile is updated successfully`,
      data: loggedInUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
});

export default profileRouter;
