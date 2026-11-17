import React from 'react';
import { 
  Menu, 
  Flame, 
  Sparkles, 
  User, 
  LogIn, 
  GraduationCap, 
  Bell,
  Search
} from 'lucide-react';

const TAB_TITLES = {
  'dashboard': 'Aspirant Dashboard',
  'cbt-tests': 'Computer-Based Mock Exam Center',
  'test-session': 'Active CBT Examination Hall',
  'test-results': 'Exam Scorecard & Review',
  'daily-quiz': 'Daily Practice Booster (5 Questions)',
  'materials': 'Study Materials & Solved PYQs',
  'syllabus': 'Official Syllabus Mastery Tracker',
  'community': 'Peer Learning & Doubts Forum',
  'admin': 'Faculty & Admin Management Portal'
};

const TopHeader = ({ 
  onToggleSidebar, 
  activeTab, 
  streak, 
  xpPoints, 
  targetExam, 
  currentUser, 
  onOpenAuth,
  userRole
}) => {
  return (
    <header className="sticky top-0 z-30 bg-[#090d16]/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
      
      {/* Left: Hamburger (Mobile) & Breadcrumb Title */}
      <div className="flex items-center gap-3.5">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white lg:hidden"
          title="Open Navigation Menustrip"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-emerald-400 font-semibold uppercase tracking-wider hidden sm:inline">
              TNPSC Portal
            </span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span className="text-xs font-mono text-slate-400">
              {targetExam}
            </span>
          </div>
          <h1 className="text-base sm:text-lg font-extrabold text-white leading-tight">
            {TAB_TITLES[activeTab] || 'TNPSC SuccessPoint'}
          </h1>
        </div>
      </div>

      {/* Right: Quick Indicators & User Login / Profile Button */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        
        {/* Streak Pill */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-amber-400 font-bold font-mono">
          <Flame className="w-4 h-4 fill-amber-400 text-amber-500" />
          <span>{streak}d</span>
        </div>

        {/* XP Pill */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-cyan-400 font-semibold font-mono">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{xpPoints} XP</span>
        </div>

        {/* User Account / Sign In Button */}
        {currentUser ? (
          <div 
            onClick={onOpenAuth}
            className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-emerald-500/30 cursor-pointer transition-all"
            title="Click to view aspirant account details"
          >
            <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 text-slate-950 font-bold text-xs flex items-center justify-center shrink-0">
              {currentUser.name.charAt(0)}
            </div>
            <div className="hidden sm:block text-left">
              <span className="block text-xs font-bold text-white leading-none">
                {currentUser.name}
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">
                {currentUser.role === 'admin' ? 'Faculty Admin' : 'Aspirant Member'}
              </span>
            </div>
          </div>
        ) : (
          <button
            onClick={onOpenAuth}
            className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20 transition-all hover:scale-[1.02]"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Sign In / Register</span>
          </button>
        )}

      </div>

    </header>
  );
};

export default TopHeader;
