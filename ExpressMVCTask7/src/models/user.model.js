import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      minLength: [3, "FirstName should lie between 3 to 20 characters"],
      maxLength: [20, "FirstName should lie between 3 to 20 characters"],
      trim: true,
      required: [true, "It is mandatory to provide First Name"],
      match: [/^[A-Za-z]+$/, "firstName should contain only alphabets"],
    },

    lastName: {
      type: String,
      minLength: [3, "FirstName should lie between 3 to 20 characters"],
      maxLength: [20, "FirstName should lie between 3 to 20 characters"],
      trim: true,
      required: [true, "It is mandatory to provide First Name"],
      match: [/^[A-Za-z]+$/, "lastName should only contain alphabets"],
    },

    emailId: {
      type: String,
      minLength: [3, "Email should be greater than 3 characters"],
      maxLength: [20, "Email should not exceed 20 characters length"],
      trim: true,
      lowercase: true,
      unique: [true, "EmailId should be unique.This EmailId is already in use"],
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("EmailId is not valid");
        }
      },
      required: [true, "Please Provide EmailId"],
    },

    password: {
      type: String,
      required: [true, "Please Provide a strong password"],
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Please Provide a strong password");
        }
      },
    },

    gender: {
      type: String,
      trim: true,
      enum: {
        values: ["male", "female", "others"],
        message: `{VALUE} is not a valid gender`,
      },
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Please enter a valid gender");
        }
      },
    },

    age: {
      type: Number,
      trim: true,
      min: [18, "User's age is less than 18 years"],
      max: [90, "User's age is greater than 90"],
    },

    about: {
      type: String,
      trim: true,
      maxLength: [50, "Bio is exceeding the minimum allowed length"],
      default: "This is the default about the user",
    },

    photoUrl: {
      type: String,
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("photo url is not valid");
        }
      },
    },
  },
  { timeStamps: true },
);

//?Schema Methods
userSchema.methods.isPasswordValid = async function (password) {
  const user = this;
  const isPasswordValid = await bcrypt.compare(password, user.password);
  return isPasswordValid;
};

//?generating the jwt token
userSchema.methods.getJWT = function () {
  const user = this;
  const token = jwt.sign(
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

export const User = mongoose.model("User", userSchema);
