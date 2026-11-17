import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Flag, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  RotateCcw, 
  Send,
  Languages,
  X
} from 'lucide-react';
import { tnpscExamTests, sampleQuestions } from '../data/mockQuestions';

const MockTestEngine = ({ testId = "test-gr4-full-01", onCompleteTest, onExitTest }) => {
  const currentTest = tnpscExamTests.find(t => t.id === testId) || tnpscExamTests[0];
  
  const questions = sampleQuestions.filter(q => q.testId === currentTest.id).length > 0
    ? sampleQuestions.filter(q => q.testId === currentTest.id)
    : sampleQuestions;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [flaggedQuestions, setFlaggedQuestions] = useState(new Set());
  const [visitedQuestions, setVisitedQuestions] = useState(new Set([questions[0]?.id]));
  const [secondsRemaining, setSecondsRemaining] = useState(currentTest.durationMinutes * 60);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [showBilingual, setShowBilingual] = useState(true);

  // Timer Effect
  useEffect(() => {
    if (secondsRemaining <= 0) {
      handleFinalSubmit();
      return;
    }
    const timer = setInterval(() => {
      setSecondsRemaining(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsRemaining]);

  useEffect(() => {
    if (questions[currentIndex]) {
      setVisitedQuestions(prev => new Set(prev).add(questions[currentIndex].id));
    }
  }, [currentIndex, questions]);

  const currentQ = questions[currentIndex];

  const handleSelectOption = (optIdx) => {
    setUserAnswers(prev => ({
      ...prev,
      [currentQ.id]: optIdx
    }));
  };

  const handleClearAnswer = () => {
    setUserAnswers(prev => {
      const copy = { ...prev };
      delete copy[currentQ.id];
      return copy;
    });
  };

  const toggleFlagQuestion = () => {
    setFlaggedQuestions(prev => {
      const copy = new Set(prev);
      if (copy.has(currentQ.id)) {
        copy.delete(currentQ.id);
      } else {
        copy.add(currentQ.id);
      }
      return copy;
    });
  };

  const handleFinalSubmit = () => {
    let score = 0;
    let correctCount = 0;
    let incorrectCount = 0;
    let unattemptedCount = 0;

    const detailedReview = questions.map(q => {
      const selected = userAnswers[q.id];
      const isCorrect = selected !== undefined && selected === q.correctAnswer;
      const isAttempted = selected !== undefined;

      if (isAttempted) {
        if (isCorrect) {
          score += 1.5;
          correctCount++;
        } else {
          incorrectCount++;
        }
      } else {
        unattemptedCount++;
      }

      return {
        ...q,
        userSelected: selected,
        isCorrect,
        isAttempted
      };
    });

    const timeSpentSeconds = (currentTest.durationMinutes * 60) - secondsRemaining;

    onCompleteTest({
      test: currentTest,
      totalQuestions: questions.length,
      correctCount,
      incorrectCount,
      unattemptedCount,
      score: (correctCount * (currentTest.totalMarks / questions.length)).toFixed(1),
      maxMarks: currentTest.totalMarks,
      accuracy: correctCount + incorrectCount > 0 
        ? Math.round((correctCount / (correctCount + incorrectCount)) * 100) 
        : 0,
      timeSpentSeconds,
      detailedReview
    });
  };

  const formatTime = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const answeredCount = Object.keys(userAnswers).length;
  const flaggedCount = flaggedQuestions.size;

  return (
    <div className="bg-[#0f1422] border border-[#2C3B64] rounded-3xl overflow-hidden shadow-2xl flex flex-col min-h-[750px]">
      
      {/* Test Engine Top Bar */}
      <div className="bg-[#172138] border-b border-[#2C3B64] px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-white text-base sm:text-lg">
              {currentTest.title}
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#86947A]/25 text-[#b7c7ab] border border-[#86947A]/50 font-mono">
              TNPSC Standard
            </span>
          </div>
          <p className="text-xs text-[#A9A4C9] mt-0.5">
            Section: <span className="text-[#F2C368] font-semibold">{currentQ?.section}</span> • Subject: <span className="text-white">{currentQ?.subject}</span>
          </p>
        </div>

        {/* Timer & Controls */}
        <div className="flex items-center gap-3">
          
          <button
            onClick={() => setShowBilingual(!showBilingual)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
              showBilingual 
                ? 'bg-[#2C3B64] text-[#F2C368] border-[#F2C368]/50' 
                : 'bg-[#101626] text-[#A9A4C9] border-[#2C3B64]'
            }`}
            title="Toggle English Translation"
          >
            <Languages className="w-3.5 h-3.5" />
            <span>{showBilingual ? 'Bilingual ON' : 'Tamil Only'}</span>
          </button>

          <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border font-mono font-bold text-sm ${
            secondsRemaining < 300 
              ? 'bg-[#942F67]/30 text-[#f38ac3] border-[#942F67] animate-pulse' 
              : 'bg-[#101626] text-[#F2C368] border-[#2C3B64]'
          }`}>
            <Clock className="w-4 h-4" />
            <span>{formatTime(secondsRemaining)}</span>
          </div>

          <button
            onClick={() => setShowSubmitConfirm(true)}
            className="px-4 py-2 rounded-xl text-xs font-bold text-[#101626] bg-gradient-to-r from-[#F2C368] via-[#DD8F6B] to-[#942F67] hover:opacity-95 shadow-md transition-all flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Submit Test</span>
          </button>

          <button
            onClick={onExitTest}
            className="p-2 rounded-xl text-[#A9A4C9] hover:text-white bg-[#101626] border border-[#2C3B64]"
            title="Exit Test"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Test Workspace: Question Area (Left) + Palette (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 flex-1">
        
        {/* Left 3 Columns: Active Question Card */}
        <div className="lg:col-span-3 p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#2C3B64]">
          
          <div className="space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-[#2C3B64]">
              <span className="text-xs font-mono font-bold text-[#A9A4C9] uppercase tracking-wider">
                Question <span className="text-[#F2C368] text-sm font-extrabold">{currentIndex + 1}</span> of {questions.length}
              </span>

              <button
                onClick={toggleFlagQuestion}
                className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all ${
                  flaggedQuestions.has(currentQ?.id)
                    ? 'bg-[#942F67] text-white border-[#f38ac3]'
                    : 'bg-[#101626] text-[#A9A4C9] border-[#2C3B64] hover:text-white'
                }`}
              >
                <Flag className="w-3.5 h-3.5" />
                <span>{flaggedQuestions.has(currentQ?.id) ? 'Marked for Review' : 'Mark for Review'}</span>
              </button>
            </div>

            <div className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-white leading-relaxed font-tamil">
                {currentQ?.question}
              </h2>

              {showBilingual && currentQ?.questionEn && (
                <p className="text-sm text-[#A9A4C9] italic bg-[#101626] p-3.5 rounded-2xl border border-[#2C3B64] leading-relaxed">
                  {currentQ.questionEn}
                </p>
              )}
            </div>

            <div className="space-y-3 pt-2">
              {currentQ?.options.map((opt, oIdx) => {
                const isSelected = userAnswers[currentQ.id] === oIdx;
                const optLetter = String.fromCharCode(65 + oIdx);

                return (
                  <button
                    key={oIdx}
                    onClick={() => handleSelectOption(oIdx)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-4 ${
                      isSelected
                        ? 'bg-[#2C3B64]/70 border-[#F2C368] text-[#F2C368] shadow-md'
                        : 'bg-[#101626]/70 border-[#2C3B64] text-slate-200 hover:bg-[#172138] hover:border-[#A9A4C9]/40'
                    }`}
                  >
                    <div className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 border ${
                      isSelected
                        ? 'bg-[#F2C368] text-[#101626] border-[#F2C368]'
                        : 'bg-[#172138] text-[#A9A4C9] border-[#2C3B64]'
                    }`}>
                      {optLetter}
                    </div>
                    <span className="text-sm font-medium leading-relaxed font-tamil">
                      {opt}
                    </span>
                  </button>
                );
              })}
            </div>

          </div>

          {/* Bottom Navigation Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-6 border-t border-[#2C3B64] mt-8">
            <button
              onClick={handleClearAnswer}
              disabled={userAnswers[currentQ?.id] === undefined}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#A9A4C9] hover:text-white disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear Response</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                disabled={currentIndex === 0}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#172138] text-white hover:bg-[#2C3B64] border border-[#2C3B64] disabled:opacity-40 disabled:pointer-events-none flex items-center gap-1.5"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              {currentIndex < questions.length - 1 ? (
                <button
                  onClick={() => setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1))}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#F2C368] hover:bg-[#e4b557] text-[#101626] flex items-center gap-1.5 shadow-md shadow-[#F2C368]/20"
                >
                  <span>Save & Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => setShowSubmitConfirm(true)}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#F2C368] via-[#DD8F6B] to-[#942F67] text-[#101626] flex items-center gap-1.5 shadow-lg shadow-[#F2C368]/30"
                >
                  <span>Complete & Submit</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

        </div>

        {/* Right 1 Column: Question Palette & Overview */}
        <div className="p-6 bg-[#0c121e] flex flex-col justify-between">
          
          <div className="space-y-5">
            <h3 className="text-xs font-bold uppercase text-[#A9A4C9] tracking-wider">
              Question Palette
            </h3>

            {/* Legend using Pantone Swatches */}
            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300 font-medium">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-md bg-[#86947A]"></span>
                <span>Answered ({answeredCount})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-md bg-[#942F67]"></span>
                <span>Flagged ({flaggedCount})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-md bg-[#2C3B64]"></span>
                <span>Not Visited</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-md bg-[#DD8F6B]"></span>
                <span>Skipped</span>
              </div>
            </div>

            {/* Palette Grid */}
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 pt-2 max-h-[360px] overflow-y-auto pr-1">
              {questions.map((q, idx) => {
                const isCurrent = currentIndex === idx;
                const isAnswered = userAnswers[q.id] !== undefined;
                const isFlagged = flaggedQuestions.has(q.id);
                const isVisited = visitedQuestions.has(q.id);

                let colorClasses = "bg-[#172138] text-[#A9A4C9] border-[#2C3B64]";
                if (isAnswered) {
                  colorClasses = "bg-[#86947A] text-[#101626] font-bold border-[#b7c7ab]";
                } else if (isFlagged) {
                  colorClasses = "bg-[#942F67] text-white font-bold border-[#f38ac3]";
                } else if (isVisited && !isAnswered) {
                  colorClasses = "bg-[#DD8F6B]/30 text-[#f5a982] border-[#DD8F6B]";
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-9 rounded-xl text-xs font-mono font-semibold transition-all border ${colorClasses} ${
                      isCurrent ? 'ring-2 ring-[#F2C368] ring-offset-2 ring-offset-[#0f1422] scale-105' : 'hover:opacity-90'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Stats Footer */}
          <div className="pt-6 border-t border-[#2C3B64] space-y-3">
            <div className="flex justify-between text-xs text-[#A9A4C9]">
              <span>Completion Rate:</span>
              <span className="font-bold text-[#F2C368]">
                {Math.round((answeredCount / questions.length) * 100)}%
              </span>
            </div>
            <div className="w-full bg-[#172138] h-2 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-[#86947A] to-[#F2C368] h-full rounded-full transition-all duration-300"
                style={{ width: `${(answeredCount / questions.length) * 100}%` }}
              />
            </div>
          </div>

        </div>

      </div>

      {/* Confirmation Modal */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="glass-card max-w-md w-full rounded-3xl p-6 border border-[#F2C368]/40 space-y-5 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-[#F2C368]/20 text-[#F2C368] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div className="text-center space-y-2">
              <h3 className="text-xl font-bold text-white">Submit CBT Exam?</h3>
              <p className="text-xs text-[#A9A4C9] leading-relaxed">
                Are you sure you want to conclude the test and view your detailed scorecard and answers analysis?
              </p>
            </div>

            <div className="bg-[#101626] p-4 rounded-2xl border border-[#2C3B64] text-xs space-y-2">
              <div className="flex justify-between text-slate-300">
                <span>Total Questions:</span>
                <span className="font-bold text-white">{questions.length}</span>
              </div>
              <div className="flex justify-between text-[#86947A]">
                <span>Questions Answered:</span>
                <span className="font-bold">{answeredCount}</span>
              </div>
              <div className="flex justify-between text-[#942F67]">
                <span>Marked for Review:</span>
                <span className="font-bold">{flaggedCount}</span>
              </div>
              <div className="flex justify-between text-[#DD8F6B]">
                <span>Unanswered / Skipped:</span>
                <span className="font-bold">{questions.length - answeredCount}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowSubmitConfirm(false)}
                className="flex-1 py-2.5 rounded-xl text-xs font-semibold text-[#A9A4C9] bg-[#172138] hover:bg-[#2C3B64] border border-[#2C3B64]"
              >
                Return to Test
              </button>
              <button
                onClick={handleFinalSubmit}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold text-[#101626] bg-[#F2C368] hover:bg-[#e4b557] shadow-md shadow-[#F2C368]/30"
              >
                Yes, Submit Now
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default MockTestEngine;
