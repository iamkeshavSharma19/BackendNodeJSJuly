import React from "react";
import { X, Heart, Code2, MapPin } from "lucide-react";

export default function UserCard({ user, isEdit = false }) {
  console.log(user);
  if (!user) return null;

  const { firstName, lastName, photoUrl, about, age, gender } = user;

  return (
    <div
      className={
        isEdit
          ? "relative z-10 w-full max-w-sm sm:max-w-md bg-[#090d1f]/90 border border-slate-800/80 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl flex flex-col justify-between my-auto h-[95vh]"
          : "relative z-10 w-full max-w-sm sm:max-w-md bg-[#090d1f]/90 border border-slate-800/80 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl flex flex-col justify-between my-auto mt-20"
      }
    >
      {/* Top Image Container */}
      <div
        className={
          isEdit
            ? "relative h-96 sm:h-105 w-full overflow-hidden bg-slate-950"
            : "relative h-72 sm:h-80 w-full overflow-hidden bg-slate-950"
        }
      >
        <img
          src={photoUrl}
          alt={`${firstName} ${lastName}`}
          className="w-full h-full"
        />
        {/* Subtle overlay gradient at image bottom for smooth text contrast */}
        <div className="absolute inset-0 bg-linear-to-t from-[#090d1f] via-transparent to-transparent opacity-90" />

        {/* Floating Badges */}
      </div>

      {/* Content Section */}
      <div className="p-6 sm:p-7 space-y-4 -mt-6 relative z-10">
        {/* Name & Age */}
        <div>
          <h2 className="text-2xl font-bold text-white tracking-wide font-['JetBrains_Mono'] items-center gap-2 mt-4">
            {firstName} {lastName}
            {age && (
              <p className="text-slate-400 text-lg font-normal mt-1">{age}</p>
            )}
            {gender && (
              <p className="text-slate-400 text-lg font-normal mt-1">
                {gender}
              </p>
            )}
          </h2>
        </div>

        {/* About Bio */}
        <p className="text-slate-300 text-sm leading-relaxed line-clamp-3 font-['JetBrains_Mono']">
          {about ||
            "No bio provided. Passionate developer looking to collaborate and build awesome projects!"}
        </p>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4 pt-4">
          <button
            type="button"
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900/80 hover:bg-rose-950/40 border border-slate-700/60 hover:border-rose-500/50 text-slate-300 hover:text-rose-400 font-semibold text-sm transition-all duration-200 cursor-pointer shadow-lg active:scale-95"
          >
            <X className="w-4 h-4" />
            Ignore
          </button>

          <button
            type="button"
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 hover:opacity-95 text-white font-semibold text-sm transition-all duration-200 cursor-pointer shadow-lg shadow-indigo-500/25 active:scale-95"
          >
            <Heart className="w-4 h-4 fill-white" />
            Interested
          </button>
        </div>
      </div>
    </div>
  );
}
