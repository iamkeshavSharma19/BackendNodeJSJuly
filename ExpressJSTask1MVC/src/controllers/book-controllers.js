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

export const handleGetSingleBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    console.log(bookId);
    const bookToBeFound = await Book.findOne({ _id: bookId });
    console.log(bookToBeFound);
    if (!bookToBeFound) {
      res.status(404).json({
        message: "Unable to find the book",
        book: bookToBeFound,
      });
    } else {
      res.status(200).json({
        message: "Book Found",
        data: bookToBeFound,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};

export const handleGetAllBooks = async (req, res) => {
  try {
    const allBooks = await Book.find({});
    if (allBooks.length === 0) {
      return res.status(404).json({
        message: "Unable To Find All The Books",
        books: allBooks,
      });
    }
    res.status(200).json({
      message: "Fetched All The Books Successfully",
      books: allBooks,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};

export const handleDeleteBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const bookToBeDeleted = Book.findByIdAndDelete({ _id: bookId });
    if (!bookToBeDeleted) {
      return res.status
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};

export const handleEditBook = async (req, res) => {};

export const handleDeleteAllBooks = async (req, res) => {};
