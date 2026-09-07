import { useState, useEffect } from "react";
import loginBg from "../assets/loginBg.jpg";
import { User, Mail, Lock, Sparkles, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "Mickey",
    lastName: "Mouse",
    emailId: "Micky@gmail.com",
    password: "Mickey@2468",
  });
  const [error, setError] = useState("");
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const { firstName, lastName, emailId, password } = formData;
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        {
          withCredentials: true,
        },
      );

      dispatch(addUser(res?.data?.data));
      return navigate("/profile");
    } catch (error) {
      console.log(error);
      setError(error?.response?.data || "Something Went Wrong");
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/profile");
    }
  }, [user]);

  return (
    !user && (
      <div
        className="min-h-screen w-full flex items-center justify-center p-6 bg-cover bg-center bg-no-repeat relative font-sans antialiased text-white mt-9"
        style={{ backgroundImage: `url(${loginBg})` }}
      >
        {/* Light overlay so the background image stays bright and clear */}
        <div className="absolute inset-0 bg-[#050714]/40" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-125 h-75 bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />

        {/* Sign Up Card Container */}
        <div className="relative z-10 w-full max-w-md bg-[#090d1f]/90 border border-slate-800/80 rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-xl">
          {/* Header */}
          <div className="flex flex-col items-center mb-8 space-y-2 text-center">
            <h2 className="text-3xl font-bold font-['JetBrains_Mono'] tracking-tight text-white">
              Register Here
            </h2>
          </div>

          {/* Form */}
          <form className="space-y-5 text-sm font-sans" onSubmit={handleSignUp}>
            {/* First & Last Name Row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-slate-400 text-xs font-semibold mb-1.5 flex items-center gap-1.5 font-['JetBrains_Mono']">
                  <User className="w-3.5 h-3.5 text-indigo-400" /> First Name
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  name="firstName"
                  onChange={handleFormData}
                  required
                  placeholder="Elon"
                  className="w-full px-4 py-3 bg-[#11162b]/90 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              <div>
                <label className="text-slate-400 text-xs font-semibold mb-1.5 flex items-center gap-1.5 font-['JetBrains_Mono']">
                  <User className="w-3.5 h-3.5 text-indigo-400" /> Last Name
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  name="lastName"
                  onChange={handleFormData}
                  required
                  placeholder="Musk"
                  className="w-full px-4 py-3 bg-[#11162b]/90 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>

            {/* Email ID Field */}
            <div>
              <label className="text-slate-400 text-xs font-semibold mb-1.5 flex items-center gap-1.5 font-['JetBrains_Mono']">
                <Mail className="w-3.5 h-3.5 text-indigo-400" /> Email ID
              </label>
              <input
                type="email"
                value={formData.emailId}
                name="emailId"
                onChange={handleFormData}
                required
                placeholder="elon@x.com"
                className="w-full px-4 py-3 bg-[#11162b]/90 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="text-slate-400 text-xs font-semibold mb-1.5 flex items-center gap-1.5 font-['JetBrains_Mono']">
                <Lock className="w-3.5 h-3.5 text-indigo-400" /> Password
              </label>
              <input
                type="password"
                value={formData.password}
                name="password"
                onChange={handleFormData}
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-[#11162b]/90 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            {/* Error Display */}
            {error && (
              <div className="p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 text-xs font-['JetBrains_Mono'] flex items-center gap-2">
                <span className="font-semibold">Error:</span>
                <p>{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 mt-2 rounded-xl bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 hover:opacity-95 cursor-pointer active:scale-95 transition-all flex items-center justify-center gap-2 font-['JetBrains_Mono']"
            >
              <span>Sign Up</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Login Link Switcher */}
          <div className="mt-6 text-center text-xs text-slate-400 font-sans">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-400 hover:text-indigo-300 font-semibold font-['JetBrains_Mono'] hover:underline"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
    )
  );
};

export default Signup;
