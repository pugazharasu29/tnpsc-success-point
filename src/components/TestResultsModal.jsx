import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  RotateCcw, 
  BookOpen, 
  ArrowLeft,
  Check,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import confetti from 'canvas-confetti';

const TestResultsModal = ({ resultData, onRetakeTest, onClose }) => {
  const [filter, setFilter] = useState('all');
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    if (resultData?.accuracy >= 60) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          colors: ['#F2C368', '#942F67', '#86947A', '#DD8F6B', '#2C3B64'],
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Fallback gracefully
      }
    }
  }, [resultData]);

  if (!resultData) return null;

  const {
    test,
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
    <div className="bg-[#0f1422] border border-[#2C3B64] rounded-3xl p-6 sm:p-8 space-y-8 shadow-2xl">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#2C3B64]">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#F2C368] via-[#DD8F6B] to-[#942F67] p-0.5 shadow-lg shadow-[#F2C368]/20">
            <div className="w-full h-full bg-[#101626] rounded-[14px] flex items-center justify-center">
              <Trophy className="w-8 h-8 text-[#F2C368]" />
            </div>
          </div>
          <div>
            <span className="text-xs font-mono font-semibold text-[#F2C368] uppercase tracking-widest">
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
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#172138] hover:bg-[#2C3B64] border border-[#2C3B64] text-slate-200 flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retake Test</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-[#101626] bg-[#F2C368] hover:bg-[#e4b557] flex items-center gap-1.5 shadow-md shadow-[#F2C368]/20"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Dashboard</span>
          </button>
        </div>
      </div>

      {/* Primary KPI Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        
        <div className="glass-card p-4 rounded-2xl text-center border-[#2C3B64]">
          <span className="text-xs text-[#A9A4C9] font-medium">Marks Obtained</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#F2C368] mt-1">
            {score} <span className="text-xs text-[#A9A4C9] font-normal">/ {maxMarks}</span>
          </div>
        </div>

        <div className="glass-card p-4 rounded-2xl text-center border-[#2C3B64]">
          <span className="text-xs text-[#A9A4C9] font-medium">Accuracy Rate</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#DD8F6B] mt-1">
            {accuracy}%
          </div>
        </div>

        <div className="glass-card p-4 rounded-2xl text-center border-[#2C3B64]">
          <span className="text-xs text-[#A9A4C9] font-medium">Correct</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#86947A] mt-1 flex items-center justify-center gap-1">
            <CheckCircle2 className="w-5 h-5 text-[#86947A]" />
            <span>{correctCount}</span>
          </div>
        </div>

        <div className="glass-card p-4 rounded-2xl text-center border-[#2C3B64]">
          <span className="text-xs text-[#A9A4C9] font-medium">Incorrect</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#942F67] mt-1 flex items-center justify-center gap-1">
            <XCircle className="w-5 h-5 text-[#942F67]" />
            <span>{incorrectCount}</span>
          </div>
        </div>

        <div className="col-span-2 lg:col-span-1 glass-card p-4 rounded-2xl text-center border-[#2C3B64]">
          <span className="text-xs text-[#A9A4C9] font-medium">Time Taken</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#A9A4C9] mt-1 flex items-center justify-center gap-1 font-mono">
            <Clock className="w-5 h-5 text-[#F2C368]" />
            <span>{minutes}m {seconds}s</span>
          </div>
        </div>

      </div>

      {/* Review Section */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#F2C368]" />
            <span>Detailed Question Review & Explanations</span>
          </h3>

          {/* Filter Pills */}
          <div className="flex items-center gap-1 bg-[#172138] p-1 rounded-xl border border-[#2C3B64] text-xs">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                filter === 'all' ? 'bg-[#F2C368] text-[#101626] font-bold' : 'text-[#A9A4C9] hover:text-white'
              }`}
            >
              All ({detailedReview.length})
            </button>
            <button
              onClick={() => setFilter('correct')}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                filter === 'correct' ? 'bg-[#86947A] text-[#101626] font-bold' : 'text-[#A9A4C9] hover:text-white'
              }`}
            >
              Correct ({correctCount})
            </button>
            <button
              onClick={() => setFilter('incorrect')}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                filter === 'incorrect' ? 'bg-[#942F67] text-white font-bold' : 'text-[#A9A4C9] hover:text-white'
              }`}
            >
              Incorrect ({incorrectCount})
            </button>
            <button
              onClick={() => setFilter('unattempted')}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                filter === 'unattempted' ? 'bg-[#2C3B64] text-[#A9A4C9] font-bold' : 'text-[#A9A4C9] hover:text-white'
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
                    ? 'bg-[#172138]/70 border-[#86947A]/60'
                    : q.isAttempted
                    ? 'bg-[#172138]/70 border-[#942F67]/60'
                    : 'bg-[#101626] border-[#2C3B64]'
                }`}
              >
                <div 
                  className="flex items-start justify-between gap-4 cursor-pointer"
                  onClick={() => setExpandedId(expandedId === q.id ? null : q.id)}
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-[#A9A4C9]">
                        Q{idx + 1}.
                      </span>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#101626] text-[#A9A4C9] border border-[#2C3B64]">
                        {q.section}
                      </span>
                      {q.isCorrect ? (
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#86947A]/25 text-[#b7c7ab] border border-[#86947A]/50 flex items-center gap-1">
                          <Check className="w-3 h-3" /> Correct (+1.5)
                        </span>
                      ) : q.isAttempted ? (
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#942F67]/25 text-[#f38ac3] border border-[#942F67]/50 flex items-center gap-1">
                          <XCircle className="w-3 h-3" /> Incorrect (0.0)
                        </span>
                      ) : (
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#101626] text-[#A9A4C9] border border-[#2C3B64]">
                          Skipped
                        </span>
                      )}
                    </div>

                    <h4 className="text-sm font-bold text-white font-tamil leading-relaxed">
                      {q.question}
                    </h4>
                  </div>

                  <button className="text-[#A9A4C9] p-1 hover:text-white shrink-0">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {isExpanded && (
                  <div className="pt-4 mt-4 border-t border-[#2C3B64] space-y-4">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {q.options.map((opt, oIdx) => {
                        const isChosen = q.userSelected === oIdx;
                        const isAnswerKey = q.correctAnswer === oIdx;

                        let optClass = "bg-[#101626] border-[#2C3B64] text-slate-300";
                        if (isAnswerKey) {
                          optClass = "bg-[#86947A]/20 border-[#86947A] text-[#b7c7ab] font-semibold";
                        } else if (isChosen && !isAnswerKey) {
                          optClass = "bg-[#942F67]/20 border-[#942F67] text-[#f38ac3] font-semibold";
                        }

                        return (
                          <div 
                            key={oIdx} 
                            className={`p-3 rounded-xl border flex items-center justify-between gap-2 ${optClass}`}
                          >
                            <span className="font-tamil">{opt}</span>
                            {isAnswerKey && (
                              <span className="text-[10px] bg-[#86947A] text-[#101626] font-bold px-1.5 py-0.5 rounded">
                                Correct Answer
                              </span>
                            )}
                            {isChosen && !isAnswerKey && (
                              <span className="text-[10px] bg-[#942F67] text-white font-bold px-1.5 py-0.5 rounded">
                                Your Choice
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <div className="p-4 rounded-xl bg-[#101626] border border-[#2C3B64] space-y-2">
                      <div className="text-[11px] font-mono text-[#F2C368] font-bold uppercase tracking-wider">
                        Solution & Explanation:
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed font-tamil">
                        {q.explanation}
                      </p>
                      {q.reference && (
                        <div className="text-[11px] text-[#A9A4C9] italic flex items-center gap-1.5 pt-1 border-t border-[#2C3B64]">
                          <BookOpen className="w-3.5 h-3.5 text-[#F2C368]" />
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
