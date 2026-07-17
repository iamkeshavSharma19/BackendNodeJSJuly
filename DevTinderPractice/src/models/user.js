import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    minLength: 4,
    maxLength: 50,
    required: true,
  },
  lastName: {
    type: String,
    minLength: 4,
    maxLength: 30,
  },
  password: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isStrongPassword(value)) {
        throw new Error("Enter a Strong Password: " + value);
      }
    },
  },
  age: {
    type: Number,
    min: 18,
  },
  gender: {
    type: String,
    validate(value) {
      console.log("Validator Called:", value);
      if (!["male", "female", "others"].includes(value)) {
        throw new Error("Gender data is not valid");
      }
    },
  },
  emailId: {
    type: String,
  },
});

export const User = mongoose.model("User", userSchema);
