import React from 'react';
import { Sparkles, ArrowRight, Play, BookOpen, Trophy, ShieldAlert, Award } from 'lucide-react';

const HeroBanner = ({ onStartTest, onStartDailyQuiz, targetExam }) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-[#0d1627] to-slate-950 border border-slate-800 p-6 sm:p-10 mb-8 shadow-2xl">
      {/* Decorative background glows */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        
        {/* Left Information */}
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Targeting {targetExam} 2026-2027 Recruitment</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Master TNPSC with <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
              Exam-Standard CBT Mocks
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Practice bilingual Computer-Based Tests designed around authentic Samacheer Kalvi textbooks, Tamil Ilakkiyam, Unit 8 & 9 governance, and time-saving Aptitude shortcuts.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onStartTest}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>Launch Mock CBT Test</span>
            </button>

            <button
              onClick={onStartDailyQuiz}
              className="px-5 py-3 rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 text-white font-semibold text-sm border border-slate-700 flex items-center gap-2 transition-all"
            >
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Take Daily Quiz (Earn XP)</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Right Live Statistics Cards */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full lg:w-auto shrink-0">
          <div className="glass-card p-4 rounded-2xl border-slate-800 text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">5,400+</div>
            <div className="text-xs text-slate-400 font-medium mt-1">Verified Questions</div>
          </div>
          <div className="glass-card p-4 rounded-2xl border-slate-800 text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400">94.2%</div>
            <div className="text-xs text-slate-400 font-medium mt-1">Real Exam Match</div>
          </div>
          <div className="glass-card p-4 rounded-2xl border-slate-800 text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">100% Free</div>
            <div className="text-xs text-slate-400 font-medium mt-1">Aspirant Support</div>
          </div>
          <div className="glass-card p-4 rounded-2xl border-slate-800 text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-purple-400">Bilingual</div>
            <div className="text-xs text-slate-400 font-medium mt-1">தமிழ் & English</div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HeroBanner;
