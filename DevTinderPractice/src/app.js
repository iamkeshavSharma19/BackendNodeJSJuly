import dotenv from "dotenv";
dotenv.config({ quiet: true });
import express from "express";
import { connectDB } from "./config/database.js";
import { User } from "./models/user.TillMongooseModelsAndSchema.js";

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
