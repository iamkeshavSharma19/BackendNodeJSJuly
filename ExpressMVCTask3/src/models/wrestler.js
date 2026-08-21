import mongoose from "mongoose";
import validator from "validator";

const wrestlerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      minLength: [4, "First Name should be atleast of length 4 letters"],
      maxLength: [20, "First Name should not exceed the length 50 letters"],
      trim: true,
      required: [true, "It is mandatory to provide the first Name"],
    },

    lastName: {
      type: String,
      minLength: [4, "last name should be atleast of 4 letters"],
      maxLength: [20, "Last name should not exceed 50 letters"],
      trim: true,
    },

    emailId: {
      type: String,
      trim: true,
      lowercase: true,
      unique: [true, "EmailID Should be unique"],
      required: [true, "It is mandatory to provide an email Address"],
      maxLength: [20, "EmailId should not exceed the 20 letters"],
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email Address is not valid");
        }
      },
    },

    password: {
      type: String,
      trim: true,
      minLength: [6, "Password should only lie between 6 to 20 letters"],
      maxLength: [20, "Password should only lie between 6 to 20 letters"],
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Please provide a strong Password");
        }
      },
      required: [true, "It is mandatory to provide a password"],
    },

    gender: {
      type: String,
      trim: true,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender is not valid");
        }
      },
    },

    skills: {
      type: [String],
    },

    about: {
      type: String,
      default: "This is the default about the user",
    },
  },
  { timestamps: true },
);

export const Wrestler = mongoose.model("Wrestler", wrestlerSchema);
