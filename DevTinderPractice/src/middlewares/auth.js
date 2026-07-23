import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const userAuth = async (req, res, next) => {
  try {
    const cookie = req.cookies;
    const { token } = cookie;
    if (!token) {
      res.status(401).json({
        message: "User does'not exist. Please Login First",
      });
    }
    const decodedObj = await jwt.verify(token, process.env.JWT_SECRET);
    const { _id } = decodedObj;
    const user = await User.findById(_id);
    if (!user) {
      res.status(401).json({
        message: "User does'not exist. Please Login First",
      });
    } else {
      req.user = user;
      next();
    }
  } catch (error) {
    res.status(400).send("ERROR :" + error.message);
  }
};
