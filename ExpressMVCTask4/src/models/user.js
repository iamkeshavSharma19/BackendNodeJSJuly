import mongoose from "mongoose";
import validator from "validator";

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    minLength: [4, "firstName should be minimum of the length 4 characters"],
    maxLength: [20, "firstName should not exceed 20 characters Length"],
    trim: true,
    required: [true, "It is required to Provide the firstName"],
  },

  lastName: {
    type: String,
    minLength: [4, "lastName should be minimum of Length 4 Characters"],
    maxLength: [20, "Lastname should not exceed 20 characters Length"],
    trim: true,
    required: [true, "It is mandatory to provide the LastName"],
  },

  password: {
    type: String,
    minLength: [6, "Password Should lie between 6 to 20 characters"],

    trim: true,
    required: [true, "It is mandatory to Provide a Password"],
    validate(value) {
      if (!validator.isStrongPassword(value)) {
        throw new Error("Please Enter a Strong Password");
      }
    },
  },

  emailId: {
    type: String,
    trim: true,
    unique: [true, "EmailId must be unique"],
    maxLength: [20, "EmailId should'not exceed the 20 characters Length"],
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Please Enter a valid EmailId");
      }
    },
    required: [true, "It is mandatory to Provide an EmailId"],
  },

  age: {
    type: Number,
    trim: true,
    min: [5, "User Should be greater than 5 years Old"],
    max: [
      90,
      "User above 90 years old are not allowed to regiser onto the Platform",
    ],
  },

  about: {
    type: String,
    maxLength: [100, "You have exceeded The Limit to Write Your Bio"],
    default: "This is the default about the User",
    trim: true,
    lowercase: true,
  },

  skills: {
    type: [String],
  },

  gender: {
    type: String,
    trim: true,
    validate(value) {
      if (!["male", "female", "others"].includes(value)) {
        throw new Error("Please Provide a valid Gender Type");
      }
    },
  },
});

export const User = mongoose.model("User", userSchema);
