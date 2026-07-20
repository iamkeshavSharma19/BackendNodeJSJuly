import mongoose from "mongoose";
import validator from "validator";

const wrestlerSchema = mongoose.Schema(
  {
    wrestlername: {
      type: String,
      minLength: [4, "Wrestler name must be atleast of the 4 characters"],
      maxLength: [50, "Wrestler name cannot exceed 50 characters"],
      required: [true, "Please Provide a valid wrestler name"],
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Please enter the password"],
      trim: true,
      minLength: [7, "Password must be atleast of 7 words"],
      maxLength: [20, "Password cannot exceed the 50 words"],
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Please enter a strong password" + value);
        }
      },
    },
    email: {
      type: String,
      required: [true, "Please enter the email Address"],
      trim: true,
      lowercase: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Please Provide a valid Email Address");
        }
      },
    },

    age: {
      type: Number,
      min: [18, "Wrestler must be 18 years old"],
      max: [70, "Above 70 years of age wrestlers are not allowed"],
      required: [true, "Please enter the age"],
    },

    gender: {
      type: String,
      required: [true, "Please Provide the gender"],
      trim: true,
      lowercase: true,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Please enter the valid Gender");
        }
      },
    },

    skills: {
      type: [String],
    },

    about: {
      type: String,
      default: "This is the default about the wrestler",
    },

    photoUrl: {
      type: String,
      default: "https://geographyandyou.com/images/user-profile.png",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid Photo URL: " + value);
        }
      },
    },
  },
  { timestamps: true },
);

export const Wrestler = mongoose.model("Wrestler", wrestlerSchema);
