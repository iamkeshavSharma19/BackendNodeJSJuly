import dotenv from "dotenv";
dotenv.config({ quiet: true });
import express from "express";
import { connectDB } from "./config/database.js";
import { User } from "./models/user.js";

const PORT = process.env.PORT || 9999;
const app = express();

//?Our middleware will now be activated for all the routes.
app.use(express.json());

//?Diving Deep Into The API's
app.post("/signup", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({
      message: "User SignedUp Sucessfully onto our Database",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something Went Wrong",
      error: error.message,
    });
  }
});

//?Designing an API to get only one user from the database.GET user by email
app.get("/user/:emailId", async (req, res) => {
  try {
    const { emailId: userEmail } = req.params;
    //?find method basically returns you all the matched documents.If there is no matched document then It returns an empty array
    const users = await User.find({
      emailId: userEmail,
    });
    if (users.length === 0) {
      return res.status(404).json({
        message: "No Users Found",
      });
    }
    res.status(200).json({
      message: "User Found Successfully",
      users,
    });
  } catch (error) {
    res.status(500).json({
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
