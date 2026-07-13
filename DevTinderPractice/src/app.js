import dotenv from "dotenv";
dotenv.config({ quiet: true });
import express from "express";
import { connectDB } from "./config/database.js";
import { User } from "./models/user.js";

const app = express();
const PORT = process.env.PORT || 8888;

app.post("/signup", async (req, res) => {
  const userObj = {};
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
