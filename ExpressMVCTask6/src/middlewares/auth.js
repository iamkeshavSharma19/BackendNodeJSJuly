import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({
        message: "Authentication required. Please Login",
      });
    }

    const decodedObj = jwt.verify(token, process.env.JWT_SECRET);

    const { _id: loggedInUserId } = decodedObj;

    const loggedInUser = await User.findById(loggedInUserId);

    if (!loggedInUser) {
      return res.status(401).json({
        message: "Invalid Authentication.User Not Found",
      });
    }

    req.user = loggedInUser;

    next();
  } catch (error) {
    console.log(error);
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Session expired. Please log in again.",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        message: "Invalid authentication.Please Login",
      });
    }

    res.status(400).json({
      message: "Something went wrong",
    });
  }
};
