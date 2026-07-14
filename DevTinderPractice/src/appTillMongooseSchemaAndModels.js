import dotenv from "dotenv";
dotenv.config({ quiet: true });
import express from "express";
import { connectDB } from "./config/database.js";
import { User } from "./models/user.TillMongooseModelsAndSchema.js";

const app = express();
const PORT = process.env.PORT || 8888;

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Ganesh",
    lastName: "Sharma",
    emailId: "Ganesh123@gmail.com",
    password: "Ganesh@123",
    designation: "Software Engineer",
  });

  try {
    await user.save();
    res.status(201).json({
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error saving the user",
      error,
    });
  }
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
