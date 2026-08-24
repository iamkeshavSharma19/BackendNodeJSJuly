import dotenv from "dotenv";
dotenv.config({ quiet: true });
import express from "express";
import { connectDB } from "./config/database.js";
import userRouter from "./routes/user-routes.js";

const PORT = process.env.PORT || 19;

const app = express();

app.use(express.json());
app.use("/api/v1", userRouter);

connectDB()
  .then(() => {
    console.log("Database Connection Established Successfully");
    app.listen(PORT, (err) => {
      if (err) console.log(err);
      console.log(`App is successfully Listening on The Port ${PORT}`);
    });
  })
  .catch(() => {
    console.log("Database Connection Failed To Established");
  });
