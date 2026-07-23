//^Creating a express router
import express from "express";
import { validateSignUpData } from "../utils/validation.js";
import bcrypt from "bcrypt";
import { User } from "../models/user.js";

const authRouter = express.Router();

//&SignUp API
authRouter.post("/signup", async (req, res) => {
  try {
    //?Our Utility function for validating the Data
    validateSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;
    //?Hashing our Passwords
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).json({
      message: "User signed up successfully",
      data: user,
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
      throw new Error("Please enter all your details");
    }

    const { emailId, password } = req.body;

    if (!emailId || !password) {
      throw new Error("Either emailId is missing or password is missing");
    }
    //?see whether the user exists in the database or not through his emailId.
    const existingUser = await User.findOne({ emailId: emailId });
    if (!existingUser) {
      return res.status(401).json({
        message: "Incorrect Email",
      });
    }
    //?Comparing the password ==> We will now basically offload this task to the mongoose Schema methods

    const isPasswordValid = await existingUser.validatePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Incorrect Password",
      });
    }
    //?If my both email as well as the password is validdated then here I will write the whole logic about the cookie and the JWT Token.

    //?Instead of signing the token over here, I can also get the token from my userSchema Method.
    const token = await existingUser.getJWT();
    console.log(token);

    //*I can just offload this jwt creation token logic to my handler method into my schema method and these are like helper methods only.

    //?Step 2 ==> Adding this jwt token inside a cookie
    //?We will basically expire this cookie in the 8 hours
    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });
    res.status(200).json({
      message: "User Logged In Successfully",
      user: existingUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something Went Wrong",
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
