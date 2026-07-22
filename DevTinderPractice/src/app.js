import dotenv from "dotenv";
dotenv.config({ quiet: true });
import express from "express";
import { connectDB } from "./config/database.js";
import { User } from "./models/user.js";
import { validateSignUpData } from "./utils/validation.js";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import { userAuth } from "./middlewares/auth.js";
const app = express();
const PORT = process.env.PORT || 8888;

//&This middleware is used for parsing the JSON data into the simple JS object
app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  //   const user = new User(req.body);
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
app.post("/login", async (req, res) => {
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
    //?Comparing the password
    // const isPasswordValid = await bcrypt.compare(
    //   password,
    //   existingUser.password,
    // );
    const isPasswordValid = await existingUser.validatePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Incorrect Password",
      });
    }
    //?If my both email as well as the password is validdated then here I will write the whole logic about the cookie and the JWT Token.

    //?Instead of signing the token over here, I can also get the token from my userSchema Method.

    //*I can just offload this jwt creation token logic to my handler method into my schema method and these are like helper methods only.
    // const token = jwt.sign(
    //   {
    //     _id: user._id,
    //   },
    //   process.env.JWT_SECRET,
    //   {
    //     expiresIn: "1d",
    //   },
    // );
    const token = await existingUser.getJWT();
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

//?Profile API
app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({
      message: `${user.firstName + user.lastName} profile fetched successfully`,
      userProfile: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
});

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;

  res.status(200).json({
    message: `${user.firstName} sent the connection request`,
    user,
  });
});
connectDB()
  .then((res) => {
    console.log("Database connection established");

    app.listen(PORT, (err) => {
      if (err) {
        console.log(err);
      }
      console.log(`App is listening on PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Database cannot be connected");
  });

// res.status(201).json({
//   message: "User signedUp successfully",
//   data: user,
// });
