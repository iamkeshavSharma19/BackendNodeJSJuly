import dotenv from "dotenv";
dotenv.config({ quiet: true });
import express from "express";
import { connectDB } from "./config/database.js";
import { User } from "./models/user.js";
import { validateSignUpData } from "./utils/validation.js";
import cookieParser from "cookie-parser";
import { userAuth } from "./middlewares/auth.js";
import authRouter from "./routes/auth.js";
import profileRouter from "./routes/profile.js";
import requestRouter from "./routes/request.js";
import userRouter from "./routes/user.js";

const PORT = process.env.PORT || 9999;
const app = express();

//?Our middleware will now be activated for all the routes.
app.use(express.json());
app.use(cookieParser());
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

//?Diving Deep Into The API's
//?SignUp API
app.post("/signup", async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        message: "Unable to signUp The User",
      });
    }
    const userData = Object.keys(req.body);
    if (userData.length === 0) {
      return res.status(400).json({
        message: "Unable To SignUp The User",
      });
    }
    validateSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    if (user?.skills.length > 10) {
      throw new Error("Skills Cannot Be More Than 10");
    }

    await user.save();
    res.status(201).json({
      message: "User Signedup Successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something Went Wrong",
      error: error.message,
    });
  }
});

//^Login API
app.post("/login", async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        message:
          "It is mandatory to provide both EmailId And Password.Both Of These Things are missing",
      });
    }
    const { emailId, password } = req.body;

    if (!emailId || !password) {
      return res.status(400).json({
        message: "Either EmailId is missing or Password is Missing",
      });
    }

    const user = await User.findOne({ emailId });

    if (!user) {
      return res.status(401).json({
        message:
          "You Are Not Authorised To Login Because Your EmailId is incorrect",
        user,
      });
    }

    const isPasswordValid = await user.validatePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message:
          "You are not authorised to Login because your Password is not correct",
      });
    }
    //?Step 1 ==> Creating The json Web Token.
    const token = await user.getJWT();

    //?Step 2 ==> Add The token to the cookie and the send the response back to the user
    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });

    res.status(200).json({
      message: "You Are Successfully LoggedIn",
      user,
    });
  } catch (error) {
    res.status(400).json({
      message: "Something Went Wrong",
      error: error.message,
    });
  }
});

connectDB()
  .then(() => {
    console.log("Database Connection Successfully Established");

    app.listen(PORT, (err) => {
      if (err) console.log(err);
      console.log(`Server is Successfully Listening On the port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error in Connecting To The Database");
  });
