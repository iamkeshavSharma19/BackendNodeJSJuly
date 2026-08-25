import { User } from "../models/user.js";
import { validateSignUpData } from "../utils/validation.js";
import bcrypt from "bcrypt";

export const handleUserSignUp = async (req, res) => {
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

export const handleUserLogin = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        message:
          "It is mandatory to provide emailId And Password for logging In",
      });
    }

    const { emailId, password } = req.body;

    if (!emailId || !password) {
      return res.status(400).json({
        message: "Either EmailId is missing or Password is missing",
      });
    }

    const existingUser = await User.findOne({ emailId });

    if (!existingUser) {
      return res.status(401).json({
        message:
          "You Are not authorised to login because your emailId is incorrect",
      });
    }

    const isPasswordValid = await existingUser.validatePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message:
          "You Are not authorised to login because you have provided a wrong Password",
      });
    }

    //?Step 1 ==> Creating a JWT Token
    const token = existingUser.getJWT();

    //?Step 2 ==> Embedding this token inside a cookie
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

export const handleSendConnectionRequest = async (req, res) => {
  try {
    const user = req.user;
    const { firstName, lastName } = user;
    res.status(200).json({
      message: `${firstName + " " + lastName} sent the connection request`,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};

export const handleGetUserProfile = async (req, res) => {
  try {
    const user = req.user;
    const { firstName, lastName } = user;
    res.status(200).json({
      message: `${firstName + lastName}'s profile is fetched Successfully`,
      userProfile: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};


