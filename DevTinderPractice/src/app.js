import dotenv from "dotenv";
dotenv.config({ quiet: true });
import express from "express";
import { connectDB } from "./config/database.js";
import { User } from "./models/user.js";

const app = express();
const PORT = process.env.PORT || 8888;

//&This middleware is used for parsing the JSON data into the simple JS object
app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).json({
      message: "User signed up successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
});

//?Reading the data from the database
//*Creating an api to find only one user from the database
//*GET user by email
app.get("/user", async (req, res) => {
  console.log(req.body);
  const userEmail = req.body.emailId;

  console.log(userEmail);

  try {
    //?find() method basically returns the array of objects that will be matched whereas findOne method will only return you the one object which would be matched.
    const users = await User.find({
      emailId: userEmail,
    });

    if (users.length === 0) {
      res.status(400).json({
        message: "User not found",
        users,
      });
    } else {
      res.status(200).json({
        message: "user found successfully",
        data: users,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
});

//~findOne ===> It basically returns you the one matched document object.
app.get("/findOneUser", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    //?If you donot pass emailId: userEmail inside User.findOne({}),then mongoDB will return the first document present in the collection.

    //^If the 2 users are having the same emailId then It will return the first matched document.

    //~But if the emailId is not matched then inside the user null will be stored.
    const user = await User.findOne({ emailId: userEmail });
    if (!user) {
      res.status(404).json({
        message: "User not found",
        user,
      });
    } else {
      res.status(200).json({
        message: "User found",
        data: user,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
});

//&Feed API === GET/feed === getting all the users from the database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      message: "All the users found",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something Went Wrong",
      error,
    });
  }
});

//!Deleting one document === findByIdAndDelete
//!I also need a userId of the user document to be deleted
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    //?If it is unable to delete the user then it would also return null.
    const user = await User.findByIdAndDelete({
      _id: userId,
    });
    if (!user) {
      return res.status(404).json({
        message: "Unable to delete the user",
        user,
      });
    }
    res.status(200).json({
      message: "User deleted Successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
});

//&Updating the document === findById and update query
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  console.log(userId);
  const data = req.body;
  console.log(data);
  //?These below are the only things I want that the user should be able to change.
  const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
  console.log(ALLOWED_UPDATES);
  try {
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k),
    );
    console.log(isUpdateAllowed);
    if (!isUpdateAllowed) {
      return res.status(400).json({
        message: "Update Not Allowed",
      });
    }

    if (data?.skills.length > 10) {
      throw new Error("Skills cannot be more than 10");
    }
    const updatedUser = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      //&this will now run the validator function whenever the update method will be called.I have to explicitly allow the runValidators.if i know pass gender as "hello",it will basically say === "Something Went Wrong".Because it failed inside the try block and it went to the catch block.
      runValidators: true,
    });
    if (!updatedUser) {
      return res.status(404).json({
        message: "Unable to update the user",
        data: updatedUser,
      });
    }
    res.status(200).json({
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
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
