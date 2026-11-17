import React, { useState } from 'react';
import { 
  BookOpen, 
  CheckCircle2, 
  Circle, 
  Search, 
  RotateCcw, 
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { tnpscSyllabusGroups } from '../data/syllabusData';

const SyllabusTracker = ({ completedTopics, onToggleTopic, onResetProgress }) => {
  const [selectedGroup, setSelectedGroup] = useState('group-4');
  const [searchQuery, setSearchQuery] = useState('');
  const [collapsedUnits, setCollapsedUnits] = useState({});

  const currentGroup = tnpscSyllabusGroups.find(g => g.id === selectedGroup) || tnpscSyllabusGroups[0];

  const toggleCollapse = (uId) => {
    setCollapsedUnits(prev => ({
      ...prev,
      [uId]: !prev[uId]
    }));
  };

  let allTopicsCount = 0;
  let completedCount = 0;

  currentGroup.units.forEach(u => {
    u.topics.forEach(t => {
      allTopicsCount++;
      if (completedTopics[t]) completedCount++;
    });
  });

  const completionPercent = allTopicsCount > 0 
    ? Math.round((completedCount / allTopicsCount) * 100) 
    : 0;

  return (
    <div className="space-y-6">
      
      {/* Top Banner & Group Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#172138] border border-[#2C3B64] p-6 rounded-3xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2C3B64] text-[#F2C368] border border-[#F2C368]/30 text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>TNPSC Official Syllabus Blueprint</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">
            Unit-Wise Syllabus Tracker
          </h2>
          <p className="text-xs text-[#A9A4C9]">
            Check off units as you complete your daily Samacheer book reading and revision.
          </p>
        </div>

        {/* Group Selector Pills */}
        <div className="flex items-center gap-2 bg-[#101626] p-1.5 rounded-2xl border border-[#2C3B64]">
          {tnpscSyllabusGroups.map((grp) => (
            <button
              key={grp.id}
              onClick={() => setSelectedGroup(grp.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedGroup === grp.id
                  ? 'bg-[#F2C368] text-[#101626] font-bold shadow-md shadow-[#F2C368]/20'
                  : 'text-[#A9A4C9] hover:text-white'
              }`}
            >
              {grp.name.split(' ')[0]} {grp.name.split(' ')[1]}
            </button>
          ))}
        </div>
      </div>

      {/* Progress Metric Card */}
      <div className="glass-card rounded-3xl p-6 border-[#2C3B64] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-2 flex-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#A9A4C9] font-medium">Syllabus Mastery Progress</span>
            <span className="font-mono font-bold text-[#F2C368] text-sm">{completionPercent}% Complete</span>
          </div>
          <div className="w-full bg-[#101626] h-3 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-[#86947A] via-[#DD8F6B] to-[#F2C368] h-full rounded-full transition-all duration-500 shadow-sm"
              style={{ width: `${completionPercent}%` }}
            />
          </div>
          <div className="text-[11px] text-[#A9A4C9] flex items-center justify-between">
            <span>{completedCount} of {allTopicsCount} topics marked as completed</span>
            <span>Standard: {currentGroup.badge}</span>
          </div>
        </div>

        <button
          onClick={onResetProgress}
          className="self-start sm:self-center px-3.5 py-2 rounded-xl text-xs font-semibold text-[#A9A4C9] hover:text-white bg-[#101626] border border-[#2C3B64] flex items-center gap-1.5 shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Tracker</span>
        </button>
      </div>

      {/* Search Filter Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A9A4C9]" />
        <input
          type="text"
          placeholder="Search syllabus topics (e.g. திருக்குறள், Indian Constitution, HCF & LCM)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#172138] border border-[#2C3B64] text-sm text-slate-200 placeholder:text-[#A9A4C9]/60 focus:outline-none focus:border-[#F2C368] transition-all font-tamil"
        />
      </div>

      {/* Units & Checklist Breakdown */}
      <div className="space-y-4">
        {currentGroup.units.map((unit) => {
          const isCollapsed = collapsedUnits[unit.id];
          const filteredTopics = unit.topics.filter(t => 
            t.toLowerCase().includes(searchQuery.toLowerCase())
          );

          if (searchQuery && filteredTopics.length === 0) return null;

          const unitCompletedCount = unit.topics.filter(t => completedTopics[t]).length;
          const unitAllDone = unitCompletedCount === unit.topics.length;

          return (
            <div 
              key={unit.id}
              className="glass-card rounded-3xl border-[#2C3B64] overflow-hidden transition-all"
            >
              {/* Unit Header Accordion */}
              <div 
                className="p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-[#2C3B64]/40"
                onClick={() => toggleCollapse(unit.id)}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold ${
                    unitAllDone ? 'bg-[#86947A]/30 text-[#b7c7ab]' : 'bg-[#101626] text-[#A9A4C9] border border-[#2C3B64]'
                  }`}>
                    {unitAllDone ? <CheckCircle2 className="w-5 h-5 text-[#86947A]" /> : unitCompletedCount}
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white font-tamil">
                      {unit.title}
                    </h3>
                    <p className="text-[11px] text-[#A9A4C9]">
                      {unitCompletedCount} / {unit.topics.length} topics mastered
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-[#F2C368] hidden sm:inline-block">
                    {Math.round((unitCompletedCount / unit.topics.length) * 100)}%
                  </span>
                  <div className="text-[#A9A4C9]">
                    {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </div>

              {/* Topics Checklist */}
              {!isCollapsed && (
                <div className="px-5 pb-5 pt-2 border-t border-[#2C3B64]/70 space-y-2">
                  {filteredTopics.map((topic, tIdx) => {
                    const isChecked = !!completedTopics[topic];

                    return (
                      <div
                        key={tIdx}
                        onClick={() => onToggleTopic(topic)}
                        className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                          isChecked
                            ? 'bg-[#86947A]/20 border-[#86947A]/60 text-[#b7c7ab]'
                            : 'bg-[#101626]/70 border-[#2C3B64] text-slate-300 hover:bg-[#172138]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <button className="text-[#86947A] shrink-0">
                            {isChecked ? (
                              <CheckCircle2 className="w-5 h-5 fill-[#86947A] text-[#101626]" />
                            ) : (
                              <Circle className="w-5 h-5 text-[#A9A4C9]/60" />
                            )}
                          </button>
                          <span className={`text-xs font-medium font-tamil ${isChecked ? 'line-through opacity-80' : ''}`}>
                            {topic}
                          </span>
                        </div>

                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                          isChecked ? 'bg-[#86947A]/40 text-[#b7c7ab]' : 'bg-[#172138] text-[#A9A4C9]'
                        }`}>
                          {isChecked ? 'Done' : 'Pending'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default SyllabusTracker;
