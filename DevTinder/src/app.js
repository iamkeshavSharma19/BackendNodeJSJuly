import dotenv from "dotenv";
dotenv.config({ quiet: true });
import express from "express";
import { connectDB } from "./config/database.js";

import cookieParser from "cookie-parser";

import authRouter from "./routes/auth.js";
import profileRouter from "./routes/profile.js";
import requestRouter from "./routes/request.js";
import userRouter from "./routes/user.js";

const app = express();
const PORT = process.env.PORT || 7777;

app.use(express.json());

app.use(cookieParser());

//&EP14 ==> In this episode we are going to talk about the most important api which is basically the feed API.Whenever the user logs In,So he basically sees the different types of cards.He sees the data of the other users onto the application and then he can connect or reject those people.This api will basically bring up the data of the other users.This API will get me the data of the Users and then I can left or right swipe accordingly on the UI.

//~So let us just start now building the feed API.We will start building this feed api.This is again the api inside the userRouter.Let us just go to the userRouter and start creating our Feed API.


app.use("/", authRouter);

app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

connectDB()
  .then((res) => {
    console.log("Database connection established...");

    app.listen(PORT, (err) => {
      if (err) console.log(err);
      console.log(`App is listening on Port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Database cannot be connected");
  });
