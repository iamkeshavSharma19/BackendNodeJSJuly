import React from "react";
import logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <nav className="w-full bg-[#020817] border-b border-gray-800">
      <div className="w-full h-20 px-3 md:px-5 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src={logo}
            alt="DevTinder Logo"
            className="h-16 w-auto object-contain"
          />
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex items-center gap-10 text-gray-300 font-medium">
          <li className="cursor-pointer hover:text-white transition-colors duration-300">
            Home
          </li>

          <li className="cursor-pointer hover:text-white transition-colors duration-300">
            About
          </li>

          <li className="cursor-pointer hover:text-white transition-colors duration-300">
            Communities
          </li>
        </ul>

        {/* Avatar */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar hover:bg-gray-800"
          >
            <div className="w-10 rounded-full ring ring-purple-500 ring-offset-2 ring-offset-[#020817]">
              <img
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                alt="User"
              />
            </div>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-4 w-52 rounded-2xl bg-[#111827] p-2 shadow-xl border border-gray-700"
          >
            <li>
              <a>Profile</a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
