import React, { useState } from "react";
import loginBg from "../assets/loginBg.jpg";
import axios from "axios";

export default function Login() {
  const [emailId, setEmailId] = useState("Brock@gmail.com");

  const [password, setPassword] = useState("Brock@2468");

  const handleLogin = async () => {
    //?here we will make an api call to our login backend api.We will be using axios for making an api call.
    try {
      const res = await axios.post(
        "http://localhost:7777/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        },
      );
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-6 bg-cover bg-center bg-no-repeat relative font-sans antialiased text-white mt-9"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      {/* Light overlay so the background image stays bright and clear */}
      <div className="absolute inset-0 bg-[#050714]/40" />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md bg-[#090d1f]/90 border border-slate-800/80 rounded-2xl p-10 shadow-2xl space-y-2 h-125 mt-9">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center tracking-wider text-white mb-8 font-jetbrains-mono">
          Welcome Back
        </h2>

        {/* Form Fields */}
        <form className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              className="w-full px-5 py-3.5 bg-[#11162b]/90 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 text-sm focus:outline-none"
            />
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-3.5 pr-12 bg-[#11162b]/90 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 text-sm focus:outline-none"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 cursor-pointer"></div>
          </div>

          <button
            type="button"
            className="w-full py-3.5 mt-2 rounded-lg bg-linear-to-r from-blue-500 via-indigo-500 to-purple-500 text-white font-medium text-sm shadow-md"
            onClick={handleLogin}
          >
            Login
          </button>
        </form>

        <div className="pt-2 text-center text-sm text-slate-400">
          Not Having an Account?{" "}
          <a href="#" className="text-purple-400 hover:underline">
            Register here
          </a>
        </div>
      </div>
    </div>
  );
}
