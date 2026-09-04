import { User, Image, Calendar, UserCheck, FileText } from "lucide-react";
import { toast } from "react-toastify";
import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    photoUrl: user?.photoUrl || "",
    gender: user?.gender || "male",
    age: user?.age || "",
    about: user?.about || "",
  });
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(BASE_URL + "/profile/edit", formData, {
        withCredentials: true,
      });
      console.log(res);
      dispatch(addUser(res?.data?.data));
      toast.success("Profile Updated Successfully");
    } catch (error) {
      setError(error?.response?.data);
      toast.error("Error in Editing The Profile");
    }
  };

  return (
    <div className="min-h-screen w-full relative bg-[#020817] flex items-center justify-center p-4 sm:p-8 overflow-hidden pt-24">
      {/* Background Mesh */}
      <div className="absolute top-1/3 left-1/3 w-125 h-125 bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-112.5 h-112.5 bg-purple-600/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Grid Container (Increased width from max-w-5xl to max-w-6xl) */}
      <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-start mt-16">
        {/* Left Column: Form Controls (Increased padding, input heights, and vertical spacing) */}
        <div className="bg-[#090d1f]/90 border border-slate-800/80 rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-xl space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-wide font-['JetBrains_Mono'] border-b border-slate-800/80 pb-4">
            Edit Profile
          </h2>

          <div className="space-y-5 text-sm font-sans">
            {/* First & Last Name Grid */}
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="text-slate-400 text-xs font-semibold mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-indigo-400" /> First Name
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={handleFormData}
                  name="firstName"
                  className="w-full px-4 py-3 bg-[#11162b]/90 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              <div>
                <label className="text-slate-400 text-xs font-semibold mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-indigo-400" /> Last Name
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={handleFormData}
                  name="lastName"
                  className="w-full px-4 py-3 bg-[#11162b]/90 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>

            {/* Photo URL */}
            <div>
              <label className="text-slate-400 text-xs font-semibold mb-1.5 flex items-center gap-1.5">
                <Image className="w-3.5 h-3.5 text-indigo-400" /> Photo URL
              </label>
              <input
                type="text"
                value={formData.photoUrl}
                name="photoUrl"
                onChange={handleFormData}
                className="w-full px-4 py-3 bg-[#11162b]/90 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            {/* Age & Gender */}
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="text-slate-400 text-xs font-semibold mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-indigo-400" /> Age
                </label>
                <input
                  type="number"
                  value={formData.age}
                  name="age"
                  onChange={handleFormData}
                  className="w-full px-4 py-3 bg-[#11162b]/90 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              <div>
                <label className="text-slate-400 text-xs font-semibold mb-1.5 flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-indigo-400" /> Gender
                </label>
                <select
                  className="w-full px-4 py-3 bg-[#11162b]/90 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-indigo-500 cursor-pointer transition-colors"
                  name="gender"
                  value={formData.gender}
                  onChange={handleFormData}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="others">Others</option>
                </select>
              </div>
            </div>

            {/* About (Increased textarea rows to 4) */}
            <div>
              <label className="text-slate-400 text-xs font-semibold mb-1.5 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-indigo-400" /> About
              </label>
              <textarea
                rows={6}
                value={formData.about}
                onChange={handleFormData}
                name="about"
                className="w-full px-4 py-3 bg-[#11162b]/90 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-indigo-500 resize-none transition-colors"
              />
            </div>
            {error && (
              <div className="p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 text-xs sm:text-sm font-['JetBrains_Mono'] flex items-center gap-2 shadow-lg animate-fade-in">
                <span className="font-semibold">Error:</span>
                <p>{error}</p>
              </div>
            )}

            {/* Save Button */}
            <button
              type="button"
              className="w-full py-3.5 mt-2 rounded-xl bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 hover:opacity-95 cursor-pointer active:scale-95 transition-all"
              onClick={saveProfile}
            >
              Save Profile
            </button>
          </div>
        </div>

        {/* Right Column: Live Interactive Card Preview */}
        <div className="flex flex-col items-center justify-center">
          <UserCard user={{ ...user, ...formData }} isEdit={true} />
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
