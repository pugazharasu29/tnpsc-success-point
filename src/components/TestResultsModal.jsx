import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Clock, 
  RotateCcw, 
  Award, 
  BookOpen, 
  ArrowLeft,
  Share2,
  Check,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import confetti from 'canvas-confetti';

const TestResultsModal = ({ resultData, onRetakeTest, onClose }) => {
  const [filter, setFilter] = useState('all'); // 'all', 'correct', 'incorrect', 'unattempted'
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    // Fire celebratory confetti if high accuracy or pass
    if (resultData?.accuracy >= 60) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Fallback gracefully if canvas context is unavailable
      }
    }
  }, [resultData]);

  if (!resultData) return null;

  const {
    test,
    totalQuestions,
    correctCount,
    incorrectCount,
    unattemptedCount,
    score,
    maxMarks,
    accuracy,
    timeSpentSeconds,
    detailedReview
  } = resultData;

  const filteredQuestions = detailedReview.filter(item => {
    if (filter === 'correct') return item.isCorrect;
    if (filter === 'incorrect') return item.isAttempted && !item.isCorrect;
    if (filter === 'unattempted') return !item.isAttempted;
    return true;
  });

  const minutes = Math.floor(timeSpentSeconds / 60);
  const seconds = timeSpentSeconds % 60;

  return (
    <div className="bg-[#0b1120] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8 shadow-2xl">
      
      {/* Top Header & Trophy */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 to-cyan-500 p-0.5 shadow-lg shadow-emerald-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Trophy className="w-8 h-8 text-emerald-400" />
            </div>
          </div>
          <div>
            <span className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-widest">
              Performance Scorecard
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              {test.title}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onRetakeTest}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retake Test</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 flex items-center gap-1.5 shadow-md"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Dashboard</span>
          </button>
        </div>
      </div>

      {/* Primary KPI Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        
        <div className="glass-card p-4 rounded-2xl text-center border-slate-800">
          <span className="text-xs text-slate-400 font-medium">Marks Obtained</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 mt-1">
            {score} <span className="text-xs text-slate-500 font-normal">/ {maxMarks}</span>
          </div>
        </div>

        <div className="glass-card p-4 rounded-2xl text-center border-slate-800">
          <span className="text-xs text-slate-400 font-medium">Accuracy Rate</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 mt-1">
            {accuracy}%
          </div>
        </div>

        <div className="glass-card p-4 rounded-2xl text-center border-slate-800">
          <span className="text-xs text-slate-400 font-medium">Correct</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 mt-1 flex items-center justify-center gap-1">
            <CheckCircle2 className="w-5 h-5" />
            <span>{correctCount}</span>
          </div>
        </div>

        <div className="glass-card p-4 rounded-2xl text-center border-slate-800">
          <span className="text-xs text-slate-400 font-medium">Incorrect</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-red-400 mt-1 flex items-center justify-center gap-1">
            <XCircle className="w-5 h-5" />
            <span>{incorrectCount}</span>
          </div>
        </div>

        <div className="col-span-2 lg:col-span-1 glass-card p-4 rounded-2xl text-center border-slate-800">
          <span className="text-xs text-slate-400 font-medium">Time Taken</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 mt-1 flex items-center justify-center gap-1 font-mono">
            <Clock className="w-5 h-5" />
            <span>{minutes}m {seconds}s</span>
          </div>
        </div>

      </div>

      {/* Review Section */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <span>Detailed Question Review & Explanations</span>
          </h3>

          {/* Filter Pills */}
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                filter === 'all' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              All ({detailedReview.length})
            </button>
            <button
              onClick={() => setFilter('correct')}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                filter === 'correct' ? 'bg-emerald-950 text-emerald-300 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Correct ({correctCount})
            </button>
            <button
              onClick={() => setFilter('incorrect')}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                filter === 'incorrect' ? 'bg-red-950 text-red-300 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Incorrect ({incorrectCount})
            </button>
            <button
              onClick={() => setFilter('unattempted')}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                filter === 'unattempted' ? 'bg-slate-800 text-slate-300 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Skipped ({unattemptedCount})
            </button>
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
          {filteredQuestions.map((q, idx) => {
            const isExpanded = expandedId === q.id || filter !== 'all';

            return (
              <div 
                key={q.id} 
                className={`p-5 rounded-2xl border transition-all ${
                  q.isCorrect
                    ? 'bg-slate-900/60 border-emerald-900/50'
                    : q.isAttempted
                    ? 'bg-slate-900/60 border-red-900/50'
                    : 'bg-slate-900/40 border-slate-800'
                }`}
              >
                <div 
                  className="flex items-start justify-between gap-4 cursor-pointer"
                  onClick={() => setExpandedId(expandedId === q.id ? null : q.id)}
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-slate-400">
                        Q{idx + 1}.
                      </span>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-cyan-300">
                        {q.section}
                      </span>
                      {q.isCorrect ? (
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center gap-1">
                          <Check className="w-3 h-3" /> Correct (+1.5)
                        </span>
                      ) : q.isAttempted ? (
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-red-950 text-red-400 border border-red-800 flex items-center gap-1">
                          <XCircle className="w-3 h-3" /> Incorrect (0.0)
                        </span>
                      ) : (
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                          Skipped
                        </span>
                      )}
                    </div>

                    <h4 className="text-sm font-bold text-white font-tamil leading-relaxed">
                      {q.question}
                    </h4>
                  </div>

                  <button className="text-slate-400 p-1 hover:text-white shrink-0">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {/* Expanded Details: Options + Explanation */}
                {isExpanded && (
                  <div className="pt-4 mt-4 border-t border-slate-800/80 space-y-4">
                    
                    {/* Options Breakdown */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {q.options.map((opt, oIdx) => {
                        const isChosen = q.userSelected === oIdx;
                        const isAnswerKey = q.correctAnswer === oIdx;

                        let optClass = "bg-slate-950/60 border-slate-800 text-slate-300";
                        if (isAnswerKey) {
                          optClass = "bg-emerald-950/50 border-emerald-500 text-emerald-200 font-semibold";
                        } else if (isChosen && !isAnswerKey) {
                          optClass = "bg-red-950/50 border-red-500 text-red-200 font-semibold";
                        }

                        return (
                          <div 
                            key={oIdx} 
                            className={`p-3 rounded-xl border flex items-center justify-between gap-2 ${optClass}`}
                          >
                            <span className="font-tamil">{opt}</span>
                            {isAnswerKey && (
                              <span className="text-[10px] bg-emerald-500 text-slate-950 font-bold px-1.5 py-0.5 rounded">
                                Correct Answer
                              </span>
                            )}
                            {isChosen && !isAnswerKey && (
                              <span className="text-[10px] bg-red-500 text-white font-bold px-1.5 py-0.5 rounded">
                                Your Choice
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Detailed Explanation */}
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                      <div className="text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1">
                        <span>Solution & Explanation:</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed font-tamil">
                        {q.explanation}
                      </p>
                      {q.reference && (
                        <div className="text-[11px] text-slate-400 italic flex items-center gap-1.5 pt-1 border-t border-slate-800/60">
                          <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Reference: {q.reference}</span>
                        </div>
                      )}
                    </div>

                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default TestResultsModal;
