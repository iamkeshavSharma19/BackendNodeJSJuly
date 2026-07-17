import React, { useState } from "react";
import { createBook } from "../services/bookService";

const AddBook = () => {
  const [book, setBook] = useState({
    name: "",
    author: "",
    year: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({
      ...book,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await createBook(book);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="container mt-5">
        <h2>Add Book</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Book Name</label>

            <input
              className="form-control"
              name="name"
              value={book.name}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Author</label>

            <input
              className="form-control"
              name="author"
              value={book.author}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Year</label>

            <input
              className="form-control"
              name="year"
              value={book.year}
              onChange={handleChange}
            />
          </div>

          <button className="btn btn-primary">Add Book</button>
        </form>
      </div>
    </>
  );
};

export default AddBook;
