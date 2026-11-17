import React, { useState } from 'react';
import { 
  Play, 
  Clock, 
  Award, 
  CheckSquare, 
  BookOpen, 
  Layers, 
  Sparkles,
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 p-6 rounded-3xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/70 text-emerald-300 border border-emerald-800/60 text-xs font-semibold">
            <CheckSquare className="w-3.5 h-3.5" />
            <span>Computer Based Test (CBT) Simulator</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">
            TNPSC Mock Exam Center
          </h2>
          <p className="text-xs text-slate-300">
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
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
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
            className="glass-card rounded-3xl p-6 sm:p-7 border border-slate-800 flex flex-col justify-between hover:border-emerald-500/40 transition-all duration-300"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                  {test.examType}
                </span>
                <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{test.durationMinutes} Minutes</span>
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white font-tamil leading-snug">
                  {test.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-tamil mt-1">
                  {test.description}
                </p>
              </div>

              {/* Sections list */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                  Sections Covered:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {test.sections.map((sec, i) => (
                    <span 
                      key={i}
                      className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-slate-900 text-cyan-300 border border-slate-800"
                    >
                      {sec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Specs */}
              <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                  <span className="text-slate-400 block text-[10px] font-mono">TOTAL MARKS</span>
                  <span className="font-bold text-white font-mono">{test.totalMarks} Marks</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                  <span className="text-slate-400 block text-[10px] font-mono">QUALIFYING CUTOFF</span>
                  <span className="font-bold text-emerald-400 font-mono">{test.passingMarks} Marks</span>
                </div>
              </div>
            </div>

            {/* Launch Button */}
            <div className="pt-6 border-t border-slate-800/80 mt-6 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-mono">
                Bilingual தமிழ் & Eng
              </span>

              <button
                onClick={() => onStartTest(test.id)}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-emerald-400 hover:bg-emerald-300 text-slate-950 flex items-center gap-2 shadow-md shadow-emerald-500/20 transition-all hover:scale-[1.02]"
              >
                <Play className="w-3.5 h-3.5 fill-slate-950" />
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
