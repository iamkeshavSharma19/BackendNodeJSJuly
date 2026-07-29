import React from "react";
import {
  Code2,
  GitBranch,
  Zap,
  Users2,
  ShieldCheck,
  Terminal,
} from "lucide-react";

const features = [
  {
    icon: Code2,
    title: "Smart Tech-Stack Matchmaking",
    description:
      "Match with developers based on complementary skills, preferred frameworks, and overlapping side-project goals.",
  },
  {
    icon: ShieldCheck,
    title: "Verified GitHub Profiles",
    description:
      "Ensure authentic collaborator credentials with automated repository stats, commit history, and activity checks.",
  },
  {
    icon: Zap,
    title: "Instant Pair Requests",
    description:
      "Send immediate collaboration ping requests to active developers who are looking to build or review code right now.",
  },
  {
    icon: Terminal,
    title: "Live Pair Programming Hub",
    description:
      "Seamlessly launch shared IDE sessions, voice channels, and collaborative terminals in a single click.",
  },
  {
    icon: GitBranch,
    title: "Curated Open Source Teams",
    description:
      "Form or join agile project squads specifically looking for contributors with your exact skill set.",
  },
  {
    icon: Users2,
    title: "Async PR & Code Reviews",
    description:
      "Get constructive feedback on your pull requests and architecture decisions from trusted community peers.",
  },
];

export default function FeaturesGridSection() {
  return (
    <section className="bg-[#020817] text-white py-20 px-4 sm:px-6 lg:px-8 font-sans antialiased">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Main Section Header */}
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            <span className="font-jetbrains-mono">Say </span>
            <span className="bg-linear-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent font-['JetBrains_Mono']">
              goodbye
            </span>{" "}
            <span className="font-jetbrains-mono">to solo coding & </span>
            <span className="bg-linear-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent font-['JetBrains_Mono']">
              Empower
            </span>{" "}
            <span className="font-jetbrains-mono">developers smarter!</span>
          </h2>
        </div>

        {/* 2x3 Responsive Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-[#090d1f]/70 border border-slate-800/80 rounded-2xl p-6 sm:p-7 hover:border-slate-700/80 hover:bg-[#090d1f] transition-all duration-300 shadow-xl backdrop-blur-sm group flex flex-col justify-start"
              >
                {/* Header Row: Circular Icon + Title */}
                <div className="flex items-center gap-3.5 mb-3">
                  <div className="w-9 h-9 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center shrink-0 text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-600/30 transition-all duration-300">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-100 group-hover:text-white transition-colors">
                    {feature.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed pl-11.5">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
