import React, { useEffect, useState } from "react";
import { deleteBook, getAllBooks } from "../services/bookService";

const Home = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    loadBooks();
  }, []);

  async function loadBooks() {
    try {
      const data = await getAllBooks();
      setBooks(data.books);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteBook(id);
      loadBooks();
    } catch (error) {
      console.log(error);
    }
  }
  if (books.length === 0) {
    return <h2>No Books Available</h2>;
  }
  return (
    <div className="container mt-4">
      <h2>All Books</h2>

      <div className="row">
        {books.map((book) => {
          return (
            <div className="col-md-4 mb-4" key={book._id}>
              <div className="card p-3">
                <h4>{book.name}</h4>

                <p>Author : {book.author}</p>

                <p>Year : {book.year}</p>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(book._id)}
                >
                  Delete Book
                </button>
                
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
