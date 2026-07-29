import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#020817] border-t border-slate-800/60 py-8 px-4 text-center space-y-4">
      <p className="text-xs sm:text-sm text-slate-400 font-sans tracking-wide">
        © {new Date().getFullYear()}{" "}
        <span className="font-['JetBrains_Mono'] font-bold text-slate-300">
          DevTinder
        </span>
        . All rights reserved.
      </p>
    </footer>
  );
}
