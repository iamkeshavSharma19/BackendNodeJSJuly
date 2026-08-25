import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      minLength: [4, "First name should be atleast of 4 letters"],
      maxLength: [50, "first name cannot be more than the 50 letters"],
      required: [true, "Entering the first name is mandatory"],
      trim: true,
    },
    lastName: {
      type: String,
      minLength: [4, "Last name should be atleast of 4 letters"],
      maxLength: [50, "last name cannot exceed the 50 letters"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "It is mandatory to enter the password"],
      trim: true,
      minLength: [6, "Password Should be atleast of 6 words"],
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter a strong Password: " + value);
        }
      },
    },
    age: {
      type: Number,
      min: [18, "User Must be atleast of 18 years"],
      max: [100, "User cannot be more than 100 years old"],
      trim: true,
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
      required: [true, "It is mandatory to provide an EmailId"],
      unique: [true, "EmailId should be unique"],
      trim: true,
      maxLength: [20, "EmailId should not exceed 20 letters"],
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email Address");
        }
      },
    },

    photoUrl: {
      type: String,
      default: "https://geographyandyou.com/images/user-profile.png",
      validate(value) {
        if (!validator.isURL) {
          throw new Error("Invalid Photo Url: " + value);
        }
      },
    },

    about: {
      type: String,
      default: "This is a default description about the User",
    },

    skills: {
      type: [String],
    },
  },
  { timestamps: true },
);

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;
  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash,
  );
  return isPasswordValid;
};

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
};

export const User = mongoose.model("User", userSchema);
