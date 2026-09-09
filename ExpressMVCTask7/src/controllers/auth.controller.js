import { validateSignUpData } from "../utils/validations.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";


export const handleUserSignUp = async (req, res) => {
  try {
    validateSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 12);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    // console.log(user);

    await user.save();

    res.status(201).json({
      message: "User signed up successfully",
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      success: false,
      error: error.message,
    });
  }
};

export const handleUserLogin = async (req, res) => {
  try {
    const { emailId, password } = req.body;
    if (!emailId || !password) {
      return res.status(400).json({
        success: false,
        message: "EmailId or Password is missing",
      });
    }

    const loggedInUser = await User.findOne({ emailId: emailId });

    if (!loggedInUser) {
      return res.status(401).json({
        message: "Email or password is incorrect",
        success: false,
      });
    }

    const isPasswordValid = await loggedInUser.isPasswordValid(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Email or password is incorrect",
      });
    }

    //?Setting up the user's JWT Token
    const token = loggedInUser.getJWT();

    //?embedding the token inside a cookie
    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });

    res.status(200).json({
      success: true,
      message: "User LoggedIn Successfully",
      loggedInUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something Went Wrong",
      success: false,
    });
  }
};

export const handleUserLogout = async (req, res) => {
  try {
    // res.cookie("token", null, {
    //   expires: new Date(Date.now()),
    // });

    res.clearCookie("token");

    res.status(200).json({
      success: true,
      message: "User Logged Out Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};
