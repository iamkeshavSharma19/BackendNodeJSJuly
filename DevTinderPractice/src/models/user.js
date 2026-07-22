import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      minLength: [4, "Username should be atleast of the 4 characters"],
      maxLength: [50, "Username cannot exceed the 50 Characters"],
      required: [true, "Please provide the username"],
    },
    lastName: {
      type: String,
      minLength: [4, "Last Name should be minimum of the 4 characters"],
      maxLength: [30, "Last Name cannot exceed the 30 characters"],
    },
    password: {
      type: String,
      required: [true, "Please Enter the password"],
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter a Strong Password: " + value);
        }
      },
    },
    age: {
      type: Number,
      min: [18, "User Age should be minimum of the 18 years"],
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender data is not valid");
        }
      },
    },
    emailId: {
      type: String,
      lowercase: true,
      required: [true, "Please Provide the email Address"],
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address" + value);
        }
      },
    },

    photoUrl: {
      type: String,
      default: "https://geographyandyou.com/images/user-profile.png",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid Photo URL: ", +value);
        }
      },
    },

    about: {
      type: String,
      default: "This is a default description about the user",
    },
    skills: {
      type: [String],
    },
  },
  { timestamps: true },
);

userSchema.methods.getJWT = async function () {
  
  const user = this;
  const token = await jwt.sign(
    {
      _id: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );

  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  
  const user = this;
  const passwordHash = user.password;

  const isPassWordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash,
  );

  return isPassWordValid;
};

export const User = mongoose.model("User", userSchema);
