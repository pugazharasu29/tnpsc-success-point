import React from 'react';
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
  LogIn, 
  LogOut, 
  ChevronDown, 
  X,
  Award,
  Layers
} from 'lucide-react';

const Sidebar = ({
  isOpen,
  onClose,
  activeTab,
  setActiveTab,
  userRole,
  setUserRole,
  streak,
  xpPoints,
  targetExam,
  setTargetExam,
  currentUser,
  onOpenAuth,
  onLogout
}) => {
  const [showExamDropdown, setShowExamDropdown] = React.useState(false);

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

  const handleNavClick = (id) => {
    setActiveTab(id);
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Menustrip Container */}
      <aside className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#070b14] border-r border-slate-800 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        
        {/* Top Branding Section */}
        <div className="p-5 border-b border-slate-800/80">
          <div className="flex items-center justify-between">
            <div 
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => handleNavClick('dashboard')}
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-cyan-500 p-0.5 shadow-lg shadow-emerald-500/20 shrink-0">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-emerald-400" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-base text-white tracking-tight">
                    TNPSC <span className="text-emerald-400">SuccessPoint</span>
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 font-tamil flex items-center gap-1">
                  <span>வெற்றி நமதே</span>
                  <span className="text-slate-600">•</span>
                  <span>v2.0 Portal</span>
                </p>
              </div>
            </div>

            {/* Close Button on Mobile */}
            <button 
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-slate-800 lg:hidden"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Target Exam Dropdown */}
          <div className="relative mt-4">
            <button
              onClick={() => setShowExamDropdown(!showExamDropdown)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold bg-slate-900/90 border border-slate-700/80 text-slate-200 hover:border-emerald-500/50 transition-all"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="truncate">{targetExam}</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            </button>

            {showExamDropdown && (
              <div className="absolute left-0 right-0 mt-1.5 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="text-[9px] font-mono uppercase text-slate-400 px-3 py-1 font-semibold">
                  Change Target Exam
                </div>
                {exams.map((exam) => (
                  <button
                    key={exam}
                    onClick={() => {
                      setTargetExam(exam);
                      setShowExamDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 rounded-xl text-xs flex items-center justify-between ${
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
        </div>

        {/* Middle Navigation Menustrip */}
        <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-1.5">
          <div className="px-3 pb-1.5 text-[10px] font-mono uppercase text-slate-500 font-bold tracking-wider">
            Navigation Menustrip
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all group ${
                  isActive
                    ? 'text-emerald-300 bg-emerald-950/60 border border-emerald-500/40 shadow-sm shadow-emerald-950/30 font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900/80 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-1.5 rounded-xl transition-colors ${
                    isActive 
                      ? 'bg-emerald-500/20 text-emerald-400' 
                      : 'bg-slate-900 text-slate-400 group-hover:text-emerald-400 group-hover:bg-slate-800'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span className={`text-[9px] px-2 py-0.5 rounded-full font-mono ${
                    item.badge === 'Live CBT' 
                      ? 'bg-cyan-950 text-cyan-300 border border-cyan-800' 
                      : item.badge === 'Staff'
                      ? 'bg-amber-950 text-amber-300 border border-amber-800'
                      : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          {/* Gamified Streak & XP Widget inside Menustrip */}
          <div className="pt-4 px-1">
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[11px] font-semibold text-slate-400">Daily Study Streak</span>
                <span className="flex items-center gap-1 text-amber-400 font-bold font-mono">
                  <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                  <span>{streak} Days</span>
                </span>
              </div>
              <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-800">
                <span className="text-[11px] font-semibold text-slate-400">Aspirant XP Rank</span>
                <span className="flex items-center gap-1 text-cyan-400 font-bold font-mono">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{xpPoints} XP</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: User Auth Profile & Role Switcher */}
        <div className="p-3.5 border-t border-slate-800 bg-slate-950/60 space-y-3">
          
          {/* Aspirant User Profile Card or Login CTA */}
          {currentUser ? (
            <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 text-slate-950 font-extrabold text-xs flex items-center justify-center shrink-0">
                  {currentUser.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-white truncate">
                    {currentUser.name}
                  </h4>
                  <p className="text-[10px] text-slate-400 truncate font-mono">
                    {currentUser.district} • {currentUser.targetExam.split(' ')[0]}
                  </p>
                </div>
              </div>

              <button
                onClick={onLogout}
                title="Sign Out"
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors shrink-0"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="w-full py-2.5 px-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.01]"
            >
              <LogIn className="w-4 h-4" />
              <span>Aspirant Sign In / Join</span>
            </button>
          )}

          {/* Role Switcher Pill */}
          <button
            onClick={() => {
              const nextRole = userRole === 'aspirant' ? 'admin' : 'aspirant';
              setUserRole(nextRole);
              if (nextRole === 'admin') setActiveTab('admin');
              else if (activeTab === 'admin') setActiveTab('dashboard');
            }}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
              userRole === 'admin'
                ? 'bg-amber-950/80 text-amber-300 border-amber-600/50'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2">
              {userRole === 'admin' ? (
                <>
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>Admin Mode</span>
                </>
              ) : (
                <>
                  <User className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Aspirant View</span>
                </>
              )}
            </div>
            <span className="text-[10px] font-mono text-slate-500">Toggle</span>
          </button>

        </div>

      </aside>
    </>
  );
};

export default Sidebar;
