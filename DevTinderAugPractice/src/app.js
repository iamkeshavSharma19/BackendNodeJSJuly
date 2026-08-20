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
    //?find method basically returns you the array of all the matched documents.If there is no matched document then It returns an empty array
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

//~findOne User.
app.get("/findOneUser/:emailId", async (req, res) => {
  try {
    //~findOne method returns you the single matched document only not the whole Array.If there is no matched document then It returns the null.
    //~If you donot pass anything inside the findOne({}) then it returns the first document present inside the database.
    const { emailId: userEmail } = req.params;
    const user = await User.findOne({ emailId: userEmail });
    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
        user,
      });
    }
    res.status(200).json({
      message: "User Found",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
});

//?feed API
app.get("/feed", async (req, res) => {
  try {
    const allUsers = await User.find({});
    if (allUsers.length === 0) {
      return res.status(404).json({
        message: "Users Not Found",
        allUsers,
      });
    }
    res.status(200).json({
      message: "Users Found",
      allUsers,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something Went Wrong",
      error: error.message,
    });
  }
});

//?Delete API
app.delete("/user/delete/:id", async (req, res) => {
  try {
    const { id: deleteId } = req.params;
    console.log(deleteId);
    const deletedUser = await User.findByIdAndDelete({ _id: deleteId });
    console.log(deletedUser);
    if (!deletedUser) {
      return res.status(400).json({
        message: "Unable To Delete The User",
        deletedUser,
      });
    }
    res.status(200).json({
      message: "User Deleted Successfully",
      deletedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something Went Wrong",
      error: error.message,
    });
  }
});

//?Update API
app.patch("/user/edit/:id", async (req, res) => {
  try {
    const { id: editId } = req.params;
    const data = req.body;
    const updatedUser = await User.findByIdAndUpdate({ _id: editId }, data, {
      returnDocument: "after",
    });
    if (!updatedUser) {
      return res.status(400).json({
        message: "Unable To Edit The User",
        updatedUser,
      });
    }
    res.status(201).json({
      message: "User Updated Successfully",
      updatedUser,
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
