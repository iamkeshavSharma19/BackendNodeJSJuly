import dotenv from "dotenv";
dotenv.config({ quiet: true });
import express from "express";
import { connectDB } from "./config/database.js";
import userRouter from "./routes/user-routes.js";
import cookieParser from "cookie-parser";

const PORT = process.env.PORT || 19;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api/v1", userRouter);

connectDB()
  .then(() => {
    console.log("Database Connection Established Successfully");
    app.listen(PORT, (err) => {
      if (err) console.log(err);
      console.log(`App is successfully Listening on the Port ${PORT}`);
    });
  })
  .catch(() => {
    console.log("Database Connection Failed");
  });
