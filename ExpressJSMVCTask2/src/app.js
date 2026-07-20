import dotenv from "dotenv";
dotenv.config({ quiet: true });
import express from "express";
import { connectDB } from "./config/database.js";

const PORT = process.env.PORT || 6666;
const app = express();

connectDB()
  .then(() => {
    console.log("Database Connection Established Successfully");
    app.listen(PORT, (err) => {
      if (err) console.log(err);
      console.log(`Server is listening successfully on port ${PORT}`);
    });
  })
  .catch(() => {
    console.log("Database connection cannot be established");
  });
