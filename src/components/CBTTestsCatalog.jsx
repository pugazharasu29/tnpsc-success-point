import React, { useState } from 'react';
import { 
  Play, 
  Clock, 
  CheckSquare, 
  ChevronRight
} from 'lucide-react';
import { tnpscExamTests } from '../data/mockQuestions';

const CBTTestsCatalog = ({ onStartTest }) => {
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filters = ['All', 'Group 4 & VAO', 'Subject Special', 'Aptitude Special', 'General Studies'];

  const filteredTests = selectedFilter === 'All'
    ? tnpscExamTests
    : tnpscExamTests.filter(t => t.examType === selectedFilter);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#172138] border border-[#2C3B64] p-6 rounded-3xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2C3B64] text-[#F2C368] border border-[#F2C368]/30 text-xs font-semibold">
            <CheckSquare className="w-3.5 h-3.5" />
            <span>Computer Based Test (CBT) Simulator</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">
            TNPSC Mock Exam Center
          </h2>
          <p className="text-xs text-[#A9A4C9]">
            Select a targeted exam module. Practice under authentic time pressure with bilingual support.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setSelectedFilter(f)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                selectedFilter === f
                  ? 'bg-[#F2C368] text-[#101626] border-[#F2C368] font-bold shadow-md shadow-[#F2C368]/20'
                  : 'bg-[#101626] text-[#A9A4C9] border-[#2C3B64] hover:text-white hover:bg-[#2C3B64]/50'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Tests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTests.map((test) => (
          <div 
            key={test.id}
            className="glass-card rounded-3xl p-6 sm:p-7 border-[#2C3B64] flex flex-col justify-between hover:border-[#F2C368]/40 transition-all duration-300"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-[#942F67]/20 text-[#f38ac3] border border-[#942F67]/40">
                  {test.examType}
                </span>
                <span className="text-xs font-mono text-[#A9A4C9] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#F2C368]" />
                  <span>{test.durationMinutes} Minutes</span>
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white font-tamil leading-snug">
                  {test.title}
                </h3>
                <p className="text-xs text-[#A9A4C9] leading-relaxed font-tamil mt-1">
                  {test.description}
                </p>
              </div>

              {/* Sections list */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-mono text-[#A9A4C9] uppercase tracking-wider block">
                  Sections Covered:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {test.sections.map((sec, i) => (
                    <span 
                      key={i}
                      className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-[#101626] text-[#A9A4C9] border border-[#2C3B64]"
                    >
                      {sec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Specs */}
              <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                <div className="p-2.5 rounded-xl bg-[#101626]/80 border border-[#2C3B64]">
                  <span className="text-[#A9A4C9] block text-[10px] font-mono">TOTAL MARKS</span>
                  <span className="font-bold text-white font-mono">{test.totalMarks} Marks</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#101626]/80 border border-[#2C3B64]">
                  <span className="text-[#A9A4C9] block text-[10px] font-mono">QUALIFYING CUTOFF</span>
                  <span className="font-bold text-[#86947A] font-mono">{test.passingMarks} Marks</span>
                </div>
              </div>
            </div>

            {/* Launch Button */}
            <div className="pt-6 border-t border-[#2C3B64] mt-6 flex items-center justify-between">
              <span className="text-[11px] text-[#A9A4C9] font-mono">
                Bilingual தமிழ் & Eng
              </span>

              <button
                onClick={() => onStartTest(test.id)}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#F2C368] via-[#DD8F6B] to-[#942F67] hover:opacity-95 text-[#101626] flex items-center gap-2 shadow-md shadow-[#F2C368]/20 transition-all hover:scale-[1.02]"
              >
                <Play className="w-3.5 h-3.5 fill-[#101626]" />
                <span>Start Test Now</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default CBTTestsCatalog;
