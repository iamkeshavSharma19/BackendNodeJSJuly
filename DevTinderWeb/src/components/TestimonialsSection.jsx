import React from "react";
import { User } from "lucide-react";

const testimonials = [
  {
    quote:
      "DevTinder made finding a technical co-founder effortless. Within two weeks of matching based on tech stacks, we built our MVP and landed our first 100 beta users.",
    name: "Alex Rivera",
    role: "Full-Stack Engineer & Founder",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
  },
  {
    quote:
      "Matching with developers who share my passion for Rust and distributed systems was a game-changer. The pair-programming workflow feels totally natural.",
    name: "Rohan Mehta",
    role: "Backend Architect @ CloudScale",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
  },
  {
    quote:
      "I was stuck on complex GraphQL subscriptions for days. I sent a pair request on DevTinder and connected with a senior mentor who resolved it in 30 minutes.",
    name: "Anita Kapoor",
    role: "Frontend Developer",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
  },
  {
    quote:
      "As an open-source maintainer, getting quality contributors is hard. DevTinder connects me directly with developers eager to work on real-world production code.",
    name: "Dr. Arjun Rao",
    role: "Open Source Maintainer",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
  },
  {
    quote:
      "Thanks to DevTinder, I built a reliable network of dev buddies. We do weekly async PR reviews and mock system design interviews together.",
    name: "Sofia Desai",
    role: "Software Engineer",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
  },
  {
    quote:
      "The GitHub-verified profile matching ensures you connect with genuine coders. It completely eliminated the noise of typical networking platforms.",
    name: "Kunal Verma",
    role: "DevOps Lead",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="bg-[#020817] text-white py-20 px-4 sm:px-6 lg:px-8 font-sans antialiased">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            <span className="font-jetbrains-mono">What </span>
            <span className="bg-linear-to-r from-purple-400 via-indigo-400 to-pink-400 bg-clip-text text-transparent  font-jetbrains-mono">
              Developers
            </span>{" "}
            <span className="font-jetbrains-mono">are saying</span>
          </h2>
        </div>

        {/* 3x2 Grid layout matching the reference */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-[#090d1f]/70 border border-slate-800/80 rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-slate-700/80 hover:bg-[#090d1f] transition-all duration-300 shadow-xl backdrop-blur-sm group"
            >
              {/* Quote Body */}
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                "{item.quote}"
              </p>

              {/* User Profile Footer */}
              <div className="flex items-center gap-3.5 pt-4 border-t border-slate-800/60">
                {item.avatar ? (
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-700/80 shrink-0"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 text-slate-400">
                    <User className="w-5 h-5" />
                  </div>
                )}
                <div>
                  <h3 className="text-sm font-bold text-white tracking-tight group-hover:text-indigo-300 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-400 font-mono italic">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
