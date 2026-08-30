import { User } from "../models/user.js";
import { validateSignUpData } from "../utils/validation.js";
import bcrypt from "bcrypt";

export const handleSignUpUser = async (req, res) => {
  try {
    validateSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.status(201).json({
      message: "User SignedUp Successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};

export const handleLoginUser = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        message: "Please enter both your emailId And Password for login",
      });
    }
    const { emailId, password } = req.body;
    if (!emailId || !password) {
      return res.status(400).json({
        message: "Please enter both your emailId And Password for login",
      });
    }

    const existingUser = await User.findOne({ emailId });

    if (!existingUser) {
      return res.status(401).json({
        message:
          "You are unauthorised to login because your emailId is incorrect",
        existingUser,
      });
    }

    const isPasswordValid = await existingUser.validatePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message:
          "You are unauthorised to login because your password is incorrect",
      });
    }

    const token = await existingUser.getJWT();

    // console.log(token);

    //?exbedding the token inside the cookie
    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });

    res.status(200).json({
      message: "User LoggedIn Successfully",
      loggedInUser: existingUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};

export const handleLoggedOutUser = async (req, res) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
    });
    res.status(200).json({
      message: "User LoggedOut Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};
