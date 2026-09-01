import dotenv from "dotenv";
dotenv.config({ quiet: true });
import express from "express";
import { connectDB } from "./config/database.js";

import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import profileRouter from "./routes/profile.routes.js";
import requestRouter from "./routes/requests.routes.js";

const PORT = process.env.PORT || 19;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

connectDB()
  .then(() => {
    console.log("Database Connection Established Successfully");
    app.listen(PORT, (err) => {
      if (err) console.log(err);
      console.log(`Server is successfully listening on the port ${PORT}`);
    });
  })
  .catch(() => {
    console.log("Database connection cannot be established");
  });
