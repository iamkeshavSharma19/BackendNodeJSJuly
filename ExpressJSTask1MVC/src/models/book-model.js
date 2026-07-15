import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide title"],
      trim: true,
      maxLength: [100, "Title cannot exceed 100 characters"],
    },

    author: {
      type: String,
      required: [true, "Please provide author name"],
      trim: true,
    },

    year: {
      type: Number,
      required: [true, "Please provide publication year"],
      min: [1000, "Publication year cannot be less than 1000"],
      max: [
        new Date().getFullYear(),
        "Publication year cannot be more than current Year",
      ],
    },
  },
  { timestamps: true },
);

export const Book = mongoose.model("Book", bookSchema);
