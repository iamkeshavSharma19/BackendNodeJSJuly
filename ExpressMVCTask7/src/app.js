import dotenv from "dotenv";
dotenv.config({ quiet: true });
import express from "express";
import { connectDB } from "./config/database.js";
import authRouter from "./routes/auth.routes.js";
import profileRouter from "./routes/profile.routes.js";
import cookieParser from "cookie-parser";

const PORT = process.env.PORT || 19;

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);

connectDB()
  .then(() => {
    console.log("Database Connection Established Successfully");
    app.listen(PORT, (err) => {
      if (err) console.log(err);
      console.log(`App is successfully listening on port ${PORT}`);
    });
  })
  .catch(() => {
    console.log("Database connection cannot be established");
  });
