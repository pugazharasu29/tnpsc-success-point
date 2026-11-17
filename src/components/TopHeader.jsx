import React from 'react';
import { 
  Menu, 
  Flame, 
  Sparkles, 
  LogIn 
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
    <header className="sticky top-0 z-30 bg-[#0f1422]/90 backdrop-blur-md border-b border-[#2C3B64] px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
      
      {/* Left: Hamburger (Mobile) & Breadcrumb Title */}
      <div className="flex items-center gap-3.5">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-xl bg-[#172138] border border-[#2C3B64] text-[#A9A4C9] hover:text-white lg:hidden"
          title="Open Navigation Menustrip"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-[#F2C368] font-semibold uppercase tracking-wider hidden sm:inline">
              TNPSC Portal
            </span>
            <span className="text-[#2C3B64] hidden sm:inline">•</span>
            <span className="text-xs font-mono text-[#A9A4C9]">
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
        
        {/* Pantone Color Swatch Showcase Pill */}
        <div 
          className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#172138] border border-[#2C3B64] text-[11px] font-mono text-[#A9A4C9]"
          title="Active Pantone Palette: Jade • Orchid Rose • Lazuli Blue • Digital Violet • Honeycomb • Fade Citrus • Dark Oak"
        >
          <span className="text-[10px] uppercase font-bold text-[#F2C368] mr-1">Palette</span>
          <span className="w-2.5 h-2.5 rounded-full bg-[#86947A]" title="Jade (#86947A)"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-[#942F67]" title="Orchid Rose (#942F67)"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-[#2C3B64]" title="Lazuli Blue (#2C3B64)"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-[#A9A4C9]" title="Digital Violet (#A9A4C9)"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-[#F2C368]" title="Honeycomb (#F2C368)"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-[#DD8F6B]" title="Fade Citrus (#DD8F6B)"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-[#423834]" title="Dark Oak (#423834)"></span>
        </div>

        {/* Streak Pill */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#172138] border border-[#2C3B64] text-xs text-[#F2C368] font-bold font-mono">
          <Flame className="w-4 h-4 fill-[#F2C368] text-[#F2C368]" />
          <span>{streak}d</span>
        </div>

        {/* XP Pill */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#172138] border border-[#2C3B64] text-xs text-[#A9A4C9] font-semibold font-mono">
          <Sparkles className="w-3.5 h-3.5 text-[#F2C368]" />
          <span>{xpPoints} XP</span>
        </div>

        {/* User Account / Sign In Button */}
        {currentUser ? (
          <div 
            onClick={onOpenAuth}
            className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-[#172138] hover:bg-[#2C3B64] border border-[#F2C368]/30 cursor-pointer transition-all"
            title="Click to view aspirant account details"
          >
            <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-[#F2C368] via-[#DD8F6B] to-[#942F67] text-[#101626] font-extrabold text-xs flex items-center justify-center shrink-0">
              {currentUser.name.charAt(0)}
            </div>
            <div className="hidden sm:block text-left">
              <span className="block text-xs font-bold text-white leading-none">
                {currentUser.name}
              </span>
              <span className="text-[10px] text-[#F2C368] font-mono">
                {currentUser.role === 'admin' ? 'Faculty Admin' : 'Aspirant Member'}
              </span>
            </div>
          </div>
        ) : (
          <button
            onClick={onOpenAuth}
            className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-[#F2C368] via-[#DD8F6B] to-[#942F67] hover:opacity-95 text-[#101626] font-bold text-xs shadow-md shadow-[#F2C368]/20 transition-all hover:scale-[1.02]"
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
