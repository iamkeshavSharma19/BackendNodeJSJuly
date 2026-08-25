import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({
        message:
          "You Are Not Authorised to send the connection request, for viewing this service You have to login first",
      });
    }
    const decodedObj = jwt.verify(token, process.env.JWT_SECRET);
    const { _id } = decodedObj;
    const loggedInUser = await User.findOne({ _id });
    if (!loggedInUser) {
      return res.status(401).json({
        message:
          "You are not authorised to send the connection request, for viewing this service You have to Login first",
      });
    }
    req.user = loggedInUser;
    next();
  } catch (error) {
    res.status(500).json({
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};
