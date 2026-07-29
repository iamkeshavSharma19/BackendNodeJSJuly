import React from "react";
import {
  Users,
  Code2,
  MessageSquare,
  Star,
  Award,
  Sparkles,
} from "lucide-react";

export default function MentorsSection() {
  return (
    <section className="bg-[#020817] text-white py-20 px-4 sm:px-6 lg:px-8 font-sans antialiased">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
            <span className="bg-linear-to-r from-purple-400 via-indigo-400 to-blue-500 bg-clip-text text-transparent font-['JetBrains_Mono']">
              Mentors
            </span>{" "}
            <span className="text-white font-mono font-bold">
              at Your Service
            </span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed font-light">
            Get personalized career and technical guidance from senior
            engineers, open-source maintainers, and tech leaders available 24/7.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Two Feature Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
            {/* Card 1: Senior Dev Mentors */}
            <div className="bg-[#090d1f]/80 border border-slate-800/80 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-slate-700/80 transition-all duration-300 shadow-xl backdrop-blur-sm">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-purple-950/50 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Senior Dev Mentors
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Connect with specialized staff engineers and tech leads for
                  system design, code architecture, and career growth
                  strategies.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center gap-3">
                {/* Overlapping Avatar Stack */}
                <div className="flex -space-x-2 overflow-hidden">
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-[#020817] object-cover"
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                    alt="Mentor Avatar"
                  />
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-[#020817] object-cover"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
                    alt="Mentor Avatar"
                  />
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-[#020817] object-cover"
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80"
                    alt="Mentor Avatar"
                  />
                </div>
                <span className="text-xs font-medium text-slate-300">
                  500+ Verified Tech Mentors
                </span>
              </div>
            </div>

            {/* Card 2: Live Pair Review & Guidance */}
            <div className="bg-[#090d1f]/80 border border-slate-800/80 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-slate-700/80 transition-all duration-300 shadow-xl backdrop-blur-sm">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-blue-950/50 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Real-time Code & Career Advice
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Get instant PR feedback, interview prep tips, and
                  architectural recommendations as you build, ensuring your code
                  is production-ready.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800/80 space-y-2">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>4.9/5 average mentor rating</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <Award className="w-3.5 h-3.5 text-emerald-400" />
                  <span>98% match satisfaction rate</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Container */}
          <div className="lg:col-span-7 bg-[#090d1f]/60 border border-slate-800/80 rounded-3xl p-4 sm:p-6 lg:p-8 flex items-center justify-center shadow-2xl relative overflow-hidden group">
            {/* Background Glow Effect */}
            <div className="absolute -inset-1 bg-linear-to-r from-purple-600/10 via-indigo-600/10 to-blue-600/10 rounded-3xl blur-2xl group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="relative w-full h-full min-h-95 sm:min-h-110 rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 flex items-center justify-center">
              {/* Dev Mentor Image */}
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
                alt="AI & Human Dev Mentorship"
                className="w-full h-full object-cover object-center opacity-70 group-hover:scale-105 transition-transform duration-700"
              />

              {/* Overlay Vignette */}
              <div className="absolute inset-0 bg-linear-to-t from-[#020817] via-slate-950/40 to-transparent" />

              {/* Floating Chat Tooltip */}
              <div className="absolute top-6 right-6 left-6 sm:left-auto sm:max-w-md bg-[#020817]/90 backdrop-blur-md border border-slate-700/80 p-4 rounded-2xl shadow-2xl space-y-2 animate-fade-in">
                <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed">
                  "I see you're optimizing this API route.{" "}
                  <span className="text-indigo-400 font-semibold">
                    Let me break down Redis caching step by step...
                  </span>
                  "
                </p>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-[11px] font-mono text-emerald-400">
                    Mentor typing...
                  </span>
                </div>
              </div>

              {/* Bottom Badge Tag */}
              <div className="absolute bottom-6 left-6 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700/60 text-slate-300 text-xs font-mono backdrop-blur-sm">
                <Code2 className="w-3.5 h-3.5 text-indigo-400" />
                <span>Pair Programming Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
