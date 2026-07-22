import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const userAuth = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    const { token } = cookies;
    if (!token) {
      return res.status(401).json({
        message: "Invalid JWT Token. Please Login first",
      });
    }
    //~Validating the token
    const decodedObj = await jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decodedObj);
    const { _id } = decodedObj;
    const user = await User.findById(_id);

    if (!user) {
      throw new Error("User does'not exist");
    }
    req.user = user;

    next();
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
};
