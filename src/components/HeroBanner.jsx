import React from 'react';
import { Sparkles, ArrowRight, Play, Trophy } from 'lucide-react';

const HeroBanner = ({ onStartTest, onStartDailyQuiz, targetExam }) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#172138] via-[#111827] to-[#0d1322] border border-[#2C3B64] p-6 sm:p-10 mb-8 shadow-2xl">
      {/* Decorative background glows with Pantone colors */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-[#F2C368]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-20 w-72 h-72 bg-[#942F67]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        
        {/* Left Information */}
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2C3B64]/60 border border-[#F2C368]/30 text-[#F2C368] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#F2C368]" />
            <span>Targeting {targetExam} 2026-2027 Recruitment</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Master TNPSC with <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F2C368] via-[#DD8F6B] to-[#942F67]">
              Exam-Standard CBT Mocks
            </span>
          </h1>

          <p className="text-sm sm:text-base text-[#A9A4C9] leading-relaxed">
            Practice bilingual Computer-Based Tests designed around authentic Samacheer Kalvi textbooks, Tamil Ilakkiyam, Unit 8 & 9 governance, and time-saving Aptitude shortcuts.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onStartTest}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#F2C368] via-[#DD8F6B] to-[#942F67] hover:opacity-95 text-[#101626] font-bold text-sm flex items-center gap-2 shadow-lg shadow-[#F2C368]/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Play className="w-4 h-4 fill-[#101626]" />
              <span>Launch Mock CBT Test</span>
            </button>

            <button
              onClick={onStartDailyQuiz}
              className="px-5 py-3 rounded-2xl bg-[#172138] hover:bg-[#2C3B64] text-white font-semibold text-sm border border-[#2C3B64] flex items-center gap-2 transition-all"
            >
              <Trophy className="w-4 h-4 text-[#F2C368]" />
              <span>Take Daily Quiz (Earn XP)</span>
              <ArrowRight className="w-4 h-4 text-[#A9A4C9]" />
            </button>
          </div>
        </div>

        {/* Right Live Statistics Cards */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full lg:w-auto shrink-0">
          <div className="glass-card p-4 rounded-2xl border-[#2C3B64] text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#F2C368]">5,400+</div>
            <div className="text-xs text-[#A9A4C9] font-medium mt-1">Verified Questions</div>
          </div>
          <div className="glass-card p-4 rounded-2xl border-[#2C3B64] text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#DD8F6B]">94.2%</div>
            <div className="text-xs text-[#A9A4C9] font-medium mt-1">Real Exam Match</div>
          </div>
          <div className="glass-card p-4 rounded-2xl border-[#2C3B64] text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#86947A]">100% Free</div>
            <div className="text-xs text-[#A9A4C9] font-medium mt-1">Aspirant Support</div>
          </div>
          <div className="glass-card p-4 rounded-2xl border-[#2C3B64] text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#942F67]">Bilingual</div>
            <div className="text-xs text-[#A9A4C9] font-medium mt-1">தமிழ் & English</div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HeroBanner;
