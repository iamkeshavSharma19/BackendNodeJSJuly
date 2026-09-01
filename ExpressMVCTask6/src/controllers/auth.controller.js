import { User } from "../models/user.model.js";
import { validateSignUpData } from "../utils/validations.js";
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
    await user.save();
    res.status(201).json({
      message: "User SignedUp Successfully",
    });
  } catch (error) {
    console.error(error);

    if (error.code === 11000) {
      return res.status(409).json({ message: "Email already registered" });
    }
    if (error.name === "ValidationError" || error.name === "CastError") {
      return res.status(400).json({ message: error.message });
    }

    res.status(500).json({
      message: "Something Went Wrong",
    });
  }
};

export const handleUserLogin = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        message: "Please provide emailId and password",
      });
    }

    const { emailId, password } = req.body;
    if (!emailId || !password) {
      return res.status(400).json({
        message: "Either emailId or password is missing",
      });
    }

    const existingUser = await User.findOne({ emailId });
    if (!existingUser) {
      return res.status(400).json({
        message: "Invalid Email or password",
      });
    }

    const isPasswordValid = await existingUser.validatePassword(password);

    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid Email or password",
      });
    }

    const token = existingUser.getJWT();

    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });

    res.status(200).json({
      message: "LoggedIn Successfully",
      loggedInUser: {
        firstName: existingUser.firstName,
        lastName: existingUser.lastName,
        emailId: existingUser.emailId,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Something Went Wrong",
    });
  }
};
