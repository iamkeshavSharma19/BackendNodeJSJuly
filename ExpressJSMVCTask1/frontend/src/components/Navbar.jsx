import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-dark bg-dark px-4">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            📚 Book Manager
          </Link>
          <Link className="btn btn-warning" to="/add">
            Add Book
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
