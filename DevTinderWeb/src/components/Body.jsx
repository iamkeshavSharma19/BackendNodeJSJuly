import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const Body = () => {
  return (
    <div>
      {/* <Navbar /> */}
      {/* for rendering Children Routes, Use Outlet, All the children routes will be rendered inside the <Outlet/> component */}
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
