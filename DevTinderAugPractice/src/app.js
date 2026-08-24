import dotenv from "dotenv";
dotenv.config({ quiet: true });
import express from "express";
import { connectDB } from "./config/database.js";
import { User } from "./models/user.js";
import { validateSignUpData } from "./utils/validation.js";

const PORT = process.env.PORT || 9999;
const app = express();

//?Our middleware will now be activated for all the routes.
app.use(express.json());

//?Diving Deep Into The API's
//?SignUp API
app.post("/signup", async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        message: "Unable to signUp The User",
      });
    }
    const userData = Object.keys(req.body);
    if (userData.length === 0) {
      return res.status(400).json({
        message: "Unable To SignUp The User",
      });
    }
    validateSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    if (user?.skills.length > 10) {
      throw new Error("Skills Cannot Be More Than 10");
    }

    await user.save();
    res.status(201).json({
      message: "User Signedup Successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something Went Wrong",
      error: error.message,
    });
  }
});

//^Login API
app.post("/login", async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        message:
          "It is mandatory to provide both EmailId And Password.Both Of These Things are missing",
      });
    }
    const { emailId, password } = req.body;

    if (!emailId || !password) {
      return res.status(400).json({
        message: "Either EmailId is missing or Password is Missing",
      });
    }

    const user = await User.findOne({ emailId });

    if (!user) {
      return res.status(401).json({
        message:
          "You Are Not Authorised To Login Because Your EmailId is incorrect",
        user,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message:
          "You are not authorised to Login because your Password is not correct",
      });
    }
    res.status(200).json({
      message: "You Are Successfully LoggedIn",
      user,
    });
  } catch (error) {
    res.status(400).json({
      message: "Something Went Wrong",
      error: error.message,
    });
  }
});

//?Designing an API to get only one user from the database.GET user by email.By Using find() Method.
app.get("/user/:emailId", async (req, res) => {
  try {
    const { emailId: userEmail } = req.params;
    //?find method returns the array of all the matched documents,if there are no matched documents then It basically returns the empty array
    const users = await User.find({ emailId: userEmail });
    if (users.length === 0) {
      return res.status(404).json({
        message: "User Not Found",
        users,
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
    const { emailId: userEmail } = req.params;

    const user = await User.findOne({ emailId: userEmail });

    if (!user) {
      return res.status(404).json({
        message: "Unable To Find The User",
        user,
      });
    }
    res.status(200).json({
      message: "User Found Successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something Went Wrong",
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
        message: "Unable to fetch All The Users",
        allUsers,
      });
    }
    res.status(200).json({
      message: "All The Users Are Fetched Successfully",
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
    const deletedUser = await User.findByIdAndDelete({ _id: deleteId });
    if (!deletedUser) {
      return res.status(404).json({
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
    const updatedData = req.body;
    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
    const isUpdateAllowed = Object.keys(updatedData).every((k) => {
      return ALLOWED_UPDATES.includes(k);
    });
    if (!isUpdateAllowed) {
      throw new Error("Update Not Allowed");
    }

    if (!updatedData.skills && updatedData.skills.length > 10) {
      throw new Error("Skills Cannot be more than 10");
    }

    const updatedUser = await User.findByIdAndUpdate(
      { _id: editId },
      updatedData,
      {
        returnDocument: "after",
        runValidators: true,
      },
    );
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
