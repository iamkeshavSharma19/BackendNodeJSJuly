import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      minLength: [4, "First Name should be minimum of the length 4 words"],
      maxLength: [20, "Lastname should not exceed 20 characters length"],
      trim: true,
      required: [true, "It is mandatory to provide the firstName"],
    },

    lastName: {
      type: String,
      minLength: [4, "lastName should be minimum of the length 4 words"],
      maxLength: [20, "lastName should not exceed 20 characters length"],
      trim: true,
      required: [true, "It is mandatory to provide the lastName"],
    },

    emailId: {
      type: String,
      trim: true,
      maxLength: [20, "EmailId should not exceed the 20 characters length"],
      lowercase: true,
      unique: [true, "EmailId should be unique"],
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("EmailId is not valid");
        }
      },
      required: [true, "It is mandatory to provide an emailId"],
    },

    password: {
      type: String,
      minLength: [6, "Password should be atleast of 6 characters length"],
      trim: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Please enter a Strong Password");
        }
      },
      required: [true, "It is mandatory to provide a password"],
    },

    age: {
      type: Number,
      min: [
        5,
        "User must be atleast 5 years old for registering onto our platform",
      ],
      max: [
        90,
        "Users above 90 years old are not allowed to register onto our platform",
      ],
      trim: true,
    },

    gender: {
      type: String,
      trim: true,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender Data is not valid");
        }
      },
    },

    about: {
      type: String,
      default: "This is the default about the User",
      trim: true,
    },

    skills: {
      type: [String],
    },
  },
  { timeStamps: true },
);

//? Schema Methods
userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const { password: encryptedPassword } = user;
  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    encryptedPassword,
  );
  return isPasswordValid;
};

//?Creating a JWT Token
userSchema.methods.getJWT = function () {
  const user = this;
  const { _id } = user;
  const token = jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
};

export const User = mongoose.model("User", userSchema);
