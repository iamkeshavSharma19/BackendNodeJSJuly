import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    console.log(token);
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Session Expired Please Login",
      });
    }

    const decodedObj = jwt.verify(token, process.env.JWT_SECRET);

    const { _id: userId } = decodedObj;

    console.log(userId);

    const loggedInUser = await User.findById(userId);

    if (!loggedInUser) {
      return res.status(401).json({
        success: false,
        message: "Please make account",
      });
    }

    req.user = loggedInUser;

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};
