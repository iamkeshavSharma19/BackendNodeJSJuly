import dotenv from "dotenv";
dotenv.config({ quiet: true });
import express from "express";
import { connectDB } from "./config/database.js";

const PORT = process.env.PORT || 9999;
const app = express();


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
