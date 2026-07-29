import React from "react";
import { Brain, Flame, Rocket, Search, UserPlus } from "lucide-react";
import { ImageCard } from "./ImageCard";
import { NavItem } from "./NavItem";
import { Column1Images, Column2Images } from "../utils/constants";
import MentorsSection from "./MentorsSection";
import FeaturesGridSection from "./FeaturesGridSection";
import TestimonialsSection from "./TestimonialsSection";
import Navbar from "./Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#020817] text-white font-sans antialiased selection:bg-indigo-500 selection:text-white overflow-x-hidden">
      {/* CSS Keyframes for infinite smooth scrolling */}
      <style>{`
        @keyframes scrollUp {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes scrollDown {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
        .animate-scroll-up {
          animation: scrollUp 20s linear infinite;
        }
        .animate-scroll-down {
          animation: scrollDown 20s linear infinite;
        }
        .animate-scroll-up:hover,
        .animate-scroll-down:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Navigation Header */}
      <Navbar />
      <br />

      {/* Main Content (Hero) */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20 grid grid-cols-1 md:grid-cols-12 gap-12 items-center mt-5">
        {/* Left Content Column */}
        <div className="md:col-span-6 space-y-8 order-2 md:order-1">
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-yellow-500/30 bg-yellow-950/20 text-yellow-300 text-sm font-medium tracking-wide shadow-sm">
            <span>✨</span>
            <span>The Future of Developer Pairing</span>
          </div>

          {/* Title */}
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black leading-none tracking-tighter p-3">
            <span className="font-jetbrains-mono bg-linear-to-r from-blue-500 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Dev
            </span>
            <span className="font-jetbrains-mono ">Tinder</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-slate-300 leading-relaxed max-w-2xl font-light">
            Your curated network for matching with co-founders, pair-programming
            partners, and future tech collaborators. Find your perfect dev mate
            today.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
            <button className="px-8 py-4 rounded-xl text-lg font-bold bg-linear-to-r from-blue-600 via-indigo-500 to-purple-500 hover:opacity-90 text-white flex items-center justify-center gap-2.5 shadow-lg shadow-indigo-500/25 transition-all cursor-pointer">
              Find Your Matches
              <Search className="w-5 h-5" />
            </button>

            <button className="px-8 py-4 rounded-xl text-lg font-bold bg-slate-900/60 hover:bg-slate-800/80 text-slate-100 border border-slate-700 flex items-center justify-center gap-2.5 transition-all cursor-pointer">
              🚀 View Community Projects
            </button>
          </div>
        </div>

        {/* Right Gallery Column with Up/Down Animations */}
        <div className="md:col-span-6 order-1 md:order-2 h-130 overflow-hidden relative rounded-3xl mask-[linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] md:translate-x-8">
          <div className="grid grid-cols-2 gap-4 h-full">
            {/* Column 1: Moving UP */}
            <div className="overflow-hidden">
              <div className="flex flex-col gap-4 animate-scroll-up">
                {/* Original set */}
                {Column1Images.map((img, idx) => (
                  <ImageCard key={`c1-1-${idx}`} src={img.src} alt={img.alt} />
                ))}
                {/* Duplicated set for seamless loop */}
                {Column1Images.map((img, idx) => (
                  <ImageCard key={`c1-2-${idx}`} src={img.src} alt={img.alt} />
                ))}
              </div>
            </div>

            {/* Column 2: Moving DOWN */}
            <div className="overflow-hidden">
              <div className="flex flex-col gap-4 animate-scroll-down">
                {/* Original set */}
                {Column2Images.map((img, idx) => (
                  <ImageCard key={`c2-1-${idx}`} src={img.src} alt={img.alt} />
                ))}
                {/* Duplicated set for seamless loop */}
                {Column2Images.map((img, idx) => (
                  <ImageCard key={`c2-2-${idx}`} src={img.src} alt={img.alt} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <MentorsSection />
      <FeaturesGridSection />
      <TestimonialsSection />
    </div>
  );
}
