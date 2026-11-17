import React, { useState } from 'react';
import { 
  GraduationCap, 
  CheckSquare, 
  Flame, 
  DownloadCloud, 
  BookOpen, 
  MessageSquare, 
  ShieldCheck, 
  Sparkles, 
  User, 
  ChevronDown, 
  Menu, 
  X 
} from 'lucide-react';

const Navbar = ({ 
  activeTab, 
  setActiveTab, 
  userRole, 
  setUserRole, 
  streak, 
  xpPoints, 
  targetExam, 
  setTargetExam 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showExamDropdown, setShowExamDropdown] = useState(false);

  const exams = ["Group 4 & VAO", "Group 2 & 2A", "Group 1"];

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: GraduationCap },
    { id: 'cbt-tests', label: 'Mock CBT Tests', icon: CheckSquare, badge: 'Live CBT' },
    { id: 'daily-quiz', label: 'Daily Quiz', icon: Flame, badge: 'Streak' },
    { id: 'materials', label: 'Study Hub', icon: DownloadCloud },
    { id: 'syllabus', label: 'Syllabus Tracker', icon: BookOpen },
    { id: 'community', label: 'Doubt Forum', icon: MessageSquare },
  ];

  if (userRole === 'admin') {
    navItems.push({ id: 'admin', label: 'Admin Portal', icon: ShieldCheck, badge: 'Staff' });
  }

  return (
    <nav className="sticky top-0 z-40 bg-[#0f1422]/90 backdrop-blur-md border-b border-[#2C3B64]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-[#F2C368] via-[#DD8F6B] to-[#942F67] p-0.5 shadow-lg shadow-[#F2C368]/20">
              <div className="w-full h-full bg-[#101626] rounded-[14px] flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-[#F2C368]" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl text-white tracking-tight">
                  TNPSC <span className="text-[#F2C368]">SuccessPoint</span>
                </span>
                <span className="hidden sm:inline-block text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#942F67]/25 text-[#f38ac3] border border-[#942F67]/50">
                  v2.0 PRO
                </span>
              </div>
              <p className="text-[11px] text-[#A9A4C9] flex items-center gap-1.5 font-tamil">
                <span>வெற்றி நமதே</span>
                <span className="text-[#2C3B64]">•</span>
                <span>Government Service Excellence</span>
              </p>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'text-[#F2C368] bg-[#2C3B64]/60 border border-[#F2C368]/40 shadow-sm'
                      : 'text-[#A9A4C9] hover:text-white hover:bg-[#172138]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#F2C368]' : 'text-[#A9A4C9]'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-1 text-[#F2C368] font-bold text-xs" title="Daily Practice Streak">
              <Flame className="w-4 h-4 fill-[#F2C368] text-[#F2C368]" />
              <span>{streak}d</span>
            </div>
            <div className="w-px h-3 bg-[#2C3B64]" />
            <div className="flex items-center gap-1 text-[#A9A4C9] font-semibold text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5 text-[#F2C368]" />
              <span>{xpPoints} XP</span>
            </div>
          </div>

          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-[#172138] border border-[#2C3B64] text-[#A9A4C9] hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
