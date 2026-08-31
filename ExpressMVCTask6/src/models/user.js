import mongoose from "mongoose";
import validator from "validator";

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      maxLength: [20, "firstName should not exceed the 20 characters length"],
      minLength: [4, "firstName should be atleast of the 4 characters length"],
      trim: true,
      match: [/^[A-Za-z]+$/, "firstName should contain only alphabets"],
      required: [true, "It is mandatory to provide the firstName"],
    },

    lastName: {
      type: String,
      maxLength: [20, "lastName should not exceed the 20 characters length"],
      minLength: [4, "lastName should be atleast of the 4 characters length"],
      trim: true,
      match: [/^[A-Za-z]+$/, "lastName should only contain alphabets"],
      required: [true, "It is mandatory to provide the lastName"],
    },

    password: {
      type: String,
      minLength: [6, "Password should be minimum of 6 characters Length"],

      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Please Enter a Strong Password");
        }
      },
      required: [true, "It is mandatory to provide a password"],
    },

    emailId: {
      type: String,
      maxLength: [254, "emailId should not exceed 20 characters length"],
      validate(value) {
        if (validator.isEmail(value)) {
          throw new Error("Please enter a valid EmailId");
        }
      },
      required: [true, "It is mandatory to provide an emailId"],
      lowercase: true,
      unique: [true, "EmailId should always be unique"],
      trim: true,
      minLength: [3, "EmailId is too short"],
    },

    age: {
      type: Number,
      min: [
        18,
        "User should be minimum of 18 years of age to register onto our platform",
      ],

      max: [100, "User should be less than 100 years"],
      trim: true,
    },

    gender: {
      type: String,
      trim: true,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender data is invalid");
        }
      },
      enum: {
        values: ["male", "female", "others"],
        message: `{VALUE} is not a valid gender`,
      },
      lowercase: true,
    },

    about: {
      type: String,
      minLength: [10, "About should be at least 10 characters long"],
      maxLength: [200, "About should not exceed 100 characters"],
      trim: true,
      set: (value) => value.replace(/\s+/g, " "),
      default: "Hello World",
    },

    skills: {
      type: [String],
    },
  },
  {
    timeStamps: true,
  },
);

export const User = mongoose.model("User", userSchema);
