import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const userAuth = async (req, res, next) => {
  const cookie = req.cookies;

  const { token } = cookie;
  console.log(token);

  if (!token) {
    return res.status(401).json({
      message: "User not loggedIn. Please Login first",
    });
  }
  const decodedObj = jwt.verify(token, process.env.JWT_SECRET);

  const { _id: userId } = decodedObj;
  

  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({
      message: "User Not Found. Please sign Up",
      user,
    });
  }

  req.user = user;

  next();
};
