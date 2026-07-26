import express from "express";
import { validateSignUpData } from "../utils/validation.js";
import { User } from "../models/user.js";
import bcrypt from "bcrypt";

const authRouter = express.Router();

//&SignUp API
authRouter.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;
    //?I want to store the password in the database using the bcrypt.hash() method
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).json({
      message: "User loggedIn Successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
});

//?Login API
authRouter.post("/login", async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        message:
          "It is mandatory to provide both emailId and passwordId for the login",
      });
    }

    const { emailId, password } = req.body;
    if (!emailId || !password) {
      return res.status(400).json({
        message: "Either emailId is missing or your Password is missing",
      });
    }

    const existingUser = await User.findOne({ emailId: emailId });

    if (!existingUser) {
      return res.status(401).json({
        message:
          "Your emailId is incorrect.Please provide the correct email Credentials",
        existingUser,
      });
    }

    //?Validate the password through the bcrypt.compare method.It is written in the schema methods.
    const isPasswordValid = await existingUser.validatePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message:
          "Incorrect Password. Please provide correct Password Credentials",
      });
    }

    //?Generating the jwt token, this method I have also added in the Schema methods.
    const token = await existingUser.getJWT();

    //?After the jwt token has generated we have to embed this token inside a cookie.

    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });

    res.status(200).json({
      message: "User LoggedIn Successfully",
      user: existingUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
});

//?LogOut API
authRouter.post("/logout", async (req, res) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
    });

    res.status(200).json({
      message: "User Logged Out Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
});
export default authRouter;
