import React, { useState } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  CheckSquare, 
  MessageSquare, 
  Flame, 
  ShieldCheck, 
  User, 
  DownloadCloud, 
  Menu, 
  X, 
  Sparkles,
  ChevronDown
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
    <nav className="sticky top-0 z-40 bg-[#090d16]/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-emerald-500 to-cyan-500 p-0.5 shadow-lg shadow-emerald-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl text-white tracking-tight">
                  TNPSC <span className="text-emerald-400">SuccessPoint</span>
                </span>
                <span className="hidden sm:inline-block text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                  v2.0 PRO
                </span>
              </div>
              <p className="text-[11px] text-slate-400 flex items-center gap-1.5 font-tamil">
                <span>வெற்றி நமதே</span>
                <span className="text-slate-600">•</span>
                <span>Government Service Excellence</span>
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
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
                      ? 'text-emerald-300 bg-emerald-950/50 border border-emerald-500/30 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono ${
                      item.badge === 'Live CBT' 
                        ? 'bg-cyan-950 text-cyan-300 border border-cyan-800' 
                        : item.badge === 'Staff'
                        ? 'bg-amber-950 text-amber-300 border border-amber-800'
                        : 'bg-emerald-950 text-emerald-300'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Action Widgets & Role Switcher */}
          <div className="hidden md:flex items-center gap-3">
            
            {/* Target Exam Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowExamDropdown(!showExamDropdown)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-900 border border-slate-700/80 text-slate-200 hover:border-slate-500 transition-all"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>{targetExam}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {showExamDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="text-[10px] font-mono uppercase text-slate-400 px-3 py-1.5 font-semibold">
                    Target Exam
                  </div>
                  {exams.map((exam) => (
                    <button
                      key={exam}
                      onClick={() => {
                        setTargetExam(exam);
                        setShowExamDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between ${
                        targetExam === exam 
                          ? 'bg-emerald-950/80 text-emerald-300 font-semibold' 
                          : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <span>{exam}</span>
                      {targetExam === exam && <span className="text-emerald-400 font-bold">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Streak & XP Pill */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
              <div className="flex items-center gap-1 text-amber-400 font-bold" title="Daily Practice Streak">
                <Flame className="w-4 h-4 fill-amber-400 text-amber-500 animate-bounce" />
                <span>{streak}d</span>
              </div>
              <div className="w-px h-3 bg-slate-700" />
              <div className="flex items-center gap-1 text-cyan-400 font-semibold font-mono">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{xpPoints} XP</span>
              </div>
            </div>

            {/* Role Switcher Pill */}
            <button
              onClick={() => {
                const nextRole = userRole === 'aspirant' ? 'admin' : 'aspirant';
                setUserRole(nextRole);
                if (nextRole === 'admin') setActiveTab('admin');
                else if (activeTab === 'admin') setActiveTab('dashboard');
              }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                userRole === 'admin'
                  ? 'bg-amber-950/80 text-amber-300 border-amber-600/50 shadow-md shadow-amber-900/20'
                  : 'bg-slate-800/70 text-slate-300 border-slate-700 hover:bg-slate-700/60'
              }`}
              title="Click to toggle between Student and Admin portals"
            >
              {userRole === 'admin' ? (
                <>
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>Admin Mode</span>
                </>
              ) : (
                <>
                  <User className="w-4 h-4 text-emerald-400" />
                  <span>Aspirant Mode</span>
                </>
              )}
            </button>

          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setUserRole(userRole === 'aspirant' ? 'admin' : 'aspirant')}
              className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700"
            >
              {userRole === 'admin' ? '🛡️ Admin' : '🎓 Aspirant'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/95 border-b border-slate-800 px-4 pt-3 pb-6 space-y-2">
          <div className="flex items-center justify-between py-2 px-3 bg-slate-900 rounded-xl mb-3 text-xs">
            <span className="text-slate-400">Target Exam:</span>
            <span className="font-semibold text-emerald-400">{targetExam}</span>
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium ${
                  isActive
                    ? 'bg-emerald-950/80 text-emerald-300 font-semibold border border-emerald-500/40'
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
