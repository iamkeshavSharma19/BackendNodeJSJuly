import { Book } from "../models/book-model.js";

export const handleCreateBook = async (req, res) => {
  try {
    console.log("create api hit");
    let { name, author, year } = req.body;
    console.log(name, author, year);
    if (!name || !year || !author) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    const book = new Book(req.body);
    await book.save();
    res.status(201).json({
      message: "Book created successfully",
      bookCreated: book,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};

export const handleGetSingleBook = async (req, res) => {};

export const handleGetAllBooks = async (req, res) => {};

export const handleDeleteBook = async (req, res) => {};

export const handleEditBook = async (req, res) => {};

export const handleDeleteAllBooks = async (req, res) => {};
