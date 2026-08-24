import { User } from "../models/user.js";
import { validateSignUpData } from "../utils/validation.js";
import bcrypt from "bcrypt";

export const handleSignUpUser = async (req, res) => {
  try {
    validateSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.status(201).json({
      message: "User SignedUp Successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};
export const handleUserLogin = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        message: "It is compulsory to fill Up All the Input Fields",
      });
    }
    const { emailId, password } = req.body;
    if (!emailId || !password) {
      return res.status(400).json({
        message: "It is mandatory to fill up all the input fields",
      });
    }

    const existingUser = await User.findOne({ emailId });

    if (!existingUser) {
      return res.status(401).json({
        message:
          "You are not authorised to Login, Because You have Provided a Wrong EmailId",
        emailId,
      });
    }
    const { password: encryptedPassword } = existingUser;
    const isPasswordValid = await bcrypt.compare(password, encryptedPassword);

    if (!isPasswordValid) {
      return res.status(401).json({
        message:
          "You Are not authorised to Login because you have provided a wrong password",
        password,
      });
    }
    res.status(200).json({
      message: "User LoggedIn Successfully",
      loggedInUser: existingUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};
export const handleGetUser = async (req, res) => {
  try {
    const { id: userId } = req.params;
    //?find method returns us the array of all the matched documents,if there are no matched documents then it returns us an empty array,
    //?if we donot pass anything inside find({}) then it returns us the array of all the documents present inside the collection.
    const user = await User.find({ _id: userId });
    if (user.length === 0) {
      return res.status(401).json({
        message: "User Not Found",
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
};
export const handleFindOneUser = async (req, res) => {
  try {
    const { id: userId } = req.params;
    //?findOne method returns us only one matched document,if there is no matched document then it returns us null.
    //?If we donot pass anything inside findOne({}) then it returns the first document which present inside the given collection.
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(401).json({
        message: "User Not Found",
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
};
export const handleGetAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({});
    if (allUsers.length === 0) {
      return res.status(401).json({
        message: "No Users Found",
        users: allUsers,
      });
    }

    res.status(200).json({
      message: "All The Users fetched Successfully",
      users: allUsers,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};
export const handleDeleteUser = async (req, res) => {
  try {
    const { id: deleteId } = req.params;
    const deletedUser = await User.findByIdAndDelete({ _id: deleteId });
    if (!deletedUser) {
      res.status(400).json({
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
};
export const handleEditUser = async (req, res) => {
  try {
    const { id: editId } = req.params;
    const editedData = req.body;
    const ALLOWED_EDIT_FIELDS = ["about", "age", "skills", "gender"];
    const isEditAllowed = Object.keys(req.body).every((k) => {
      return ALLOWED_EDIT_FIELDS.includes(k);
    });
    if (!isEditAllowed) {
      return res.status(400).json({
        message: "Edit Not Allowed",
      });
    }

    const editedUser = await User.findByIdAndUpdate(
      { _id: editId },
      editedData,
      {
        returnDocument: "after",
        runValidators: true,
      },
    );

    if (!editedUser) {
      return res.status(404).json({
        message: "Unable To Edit The User",
        editedUser,
      });
    }

    if (editedData?.skills.length > 10) {
      throw new Error("Skills should be less than 10");
    }

    res.status(201).json({
      message: "User Edited Successfully",
      editedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};
