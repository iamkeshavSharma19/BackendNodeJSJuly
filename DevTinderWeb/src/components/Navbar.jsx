import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { Brain, Flame, Rocket, Search, UserPlus } from "lucide-react";
import { NavItem } from "./NavItem";
import { useSelector } from "react-redux";

const Navbar = () => {
  //?from fetching the data from our Redux Store Use the useSelector Hook.
  const user = useSelector((store) => store.user);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-800/50 bg-[#020817]/90 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center p-2 rounded-xl bg-linear-to-br from-indigo-500 to-purple-500 shadow-md">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <Flame className="w-6 h-6 text-red-500 -ml-1.5" />
          <span className="font-jetbrains-mono text-xl font-bold tracking-tight bg-linear-to-r from-white to-slate-300 bg-clip-text text-transparent">
            <Link to="/">DevTinder</Link>
          </span>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <NavItem>About</NavItem>
          <Link to="/profile">Profile</Link>

          <Link to="/feed">Feed</Link>
        </div>

        {/* Desktop Action Buttons */}
        {user ? (
          <div className="flex items-center gap-4">
            <p>Welcome, {user.firstName}</p>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img alt="user photo" src={user.photoUrl} />
                </div>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
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
        ) : (
          <div className="flex items-center gap-2 sm:gap-3">
            <button className="text-xs sm:text-sm px-2.5 sm:px-4 py-1.5 sm:py-2 text-slate-200 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer">
              <Link to="/login">Login</Link>
            </button>
            <button className="text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 bg-slate-900 border border-slate-700 hover:bg-slate-800 rounded-lg flex items-center gap-1.5 sm:gap-2 text-slate-100 transition-all shadow-sm cursor-pointer whitespace-nowrap">
              <UserPlus className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400" />
              <span>Create Profile</span>
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
