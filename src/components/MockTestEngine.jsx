import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Flag, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  RotateCcw, 
  AlertCircle, 
  Send,
  Eye,
  Languages,
  X
} from 'lucide-react';
import { tnpscExamTests, sampleQuestions } from '../data/mockQuestions';

const MockTestEngine = ({ testId = "test-gr4-full-01", onCompleteTest, onExitTest }) => {
  const currentTest = tnpscExamTests.find(t => t.id === testId) || tnpscExamTests[0];
  
  // Filter questions for this test or fallback to all questions
  const questions = sampleQuestions.filter(q => q.testId === currentTest.id).length > 0
    ? sampleQuestions.filter(q => q.testId === currentTest.id)
    : sampleQuestions;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // { [qId]: optionIndex }
  const [flaggedQuestions, setFlaggedQuestions] = useState(new Set()); // Set of qIds
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

  // Mark visited
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
    // Calculate Score
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
          score += 1.5; // TNPSC Group 4 standard mark per question
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

  // Format time (mm:ss)
  const formatTime = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const answeredCount = Object.keys(userAnswers).length;
  const flaggedCount = flaggedQuestions.size;

  return (
    <div className="bg-[#0b1120] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col min-h-[750px]">
      
      {/* Test Engine Top Bar */}
      <div className="bg-slate-900/90 border-b border-slate-800 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-white text-base sm:text-lg">
              {currentTest.title}
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700/60 font-mono">
              TNPSC Standard
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Section: <span className="text-emerald-400 font-semibold">{currentQ?.section}</span> • Subject: <span className="text-slate-300">{currentQ?.subject}</span>
          </p>
        </div>

        {/* Timer & Controls */}
        <div className="flex items-center gap-3">
          
          {/* Bilingual Toggle */}
          <button
            onClick={() => setShowBilingual(!showBilingual)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
              showBilingual 
                ? 'bg-cyan-950 text-cyan-300 border-cyan-700' 
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
            title="Toggle English Translation"
          >
            <Languages className="w-3.5 h-3.5" />
            <span>{showBilingual ? 'Bilingual ON' : 'Tamil Only'}</span>
          </button>

          {/* Real-time countdown timer */}
          <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border font-mono font-bold text-sm ${
            secondsRemaining < 300 
              ? 'bg-red-950/80 text-red-400 border-red-800 animate-pulse' 
              : 'bg-slate-800 text-emerald-400 border-slate-700'
          }`}>
            <Clock className="w-4 h-4" />
            <span>{formatTime(secondsRemaining)}</span>
          </div>

          {/* Finish / Submit Button */}
          <button
            onClick={() => setShowSubmitConfirm(true)}
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-md transition-all flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Submit Test</span>
          </button>

          {/* Exit without submission */}
          <button
            onClick={onExitTest}
            className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700"
            title="Exit Test"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Test Workspace: Question Area (Left) + Palette (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 flex-1">
        
        {/* Left 3 Columns: Active Question Card */}
        <div className="lg:col-span-3 p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800">
          
          <div className="space-y-6">
            
            {/* Question Header & Action Flags */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                Question <span className="text-emerald-400 text-sm font-extrabold">{currentIndex + 1}</span> of {questions.length}
              </span>

              <button
                onClick={toggleFlagQuestion}
                className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all ${
                  flaggedQuestions.has(currentQ?.id)
                    ? 'bg-purple-950 text-purple-300 border-purple-600'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                <Flag className="w-3.5 h-3.5" />
                <span>{flaggedQuestions.has(currentQ?.id) ? 'Marked for Review' : 'Mark for Review'}</span>
              </button>
            </div>

            {/* Question Text */}
            <div className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-white leading-relaxed font-tamil">
                {currentQ?.question}
              </h2>

              {showBilingual && currentQ?.questionEn && (
                <p className="text-sm text-slate-300 italic bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800 leading-relaxed">
                  {currentQ.questionEn}
                </p>
              )}
            </div>

            {/* 4 Multi-Choice Options */}
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
                        ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200 shadow-md shadow-emerald-950/40'
                        : 'bg-slate-900/70 border-slate-800 text-slate-200 hover:bg-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <div className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 border ${
                      isSelected
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
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
          <div className="flex flex-wrap items-center justify-between gap-3 pt-6 border-t border-slate-800 mt-8">
            <button
              onClick={handleClearAnswer}
              disabled={userAnswers[currentQ?.id] === undefined}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200 disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear Response</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                disabled={currentIndex === 0}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 text-white hover:bg-slate-700 disabled:opacity-40 disabled:pointer-events-none flex items-center gap-1.5"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              {currentIndex < questions.length - 1 ? (
                <button
                  onClick={() => setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1))}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center gap-1.5 shadow-md shadow-emerald-500/20"
                >
                  <span>Save & Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => setShowSubmitConfirm(true)}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 flex items-center gap-1.5 shadow-lg shadow-emerald-500/30"
                >
                  <span>Complete & Submit</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

        </div>

        {/* Right 1 Column: Question Palette & Overview */}
        <div className="p-6 bg-slate-900/40 flex flex-col justify-between">
          
          <div className="space-y-5">
            <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider">
              Question Palette
            </h3>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300 font-medium">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-md bg-emerald-500"></span>
                <span>Answered ({answeredCount})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-md bg-purple-600"></span>
                <span>Flagged ({flaggedCount})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-md bg-slate-700"></span>
                <span>Not Visited</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-md bg-red-600/60"></span>
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

                let colorClasses = "bg-slate-800 text-slate-400 border-slate-700"; // not visited
                if (isAnswered) {
                  colorClasses = "bg-emerald-500 text-slate-950 font-bold border-emerald-400";
                } else if (isFlagged) {
                  colorClasses = "bg-purple-600 text-white font-bold border-purple-400";
                } else if (isVisited && !isAnswered) {
                  colorClasses = "bg-red-950/70 text-red-300 border-red-800/80";
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-9 rounded-xl text-xs font-mono font-semibold transition-all border ${colorClasses} ${
                      isCurrent ? 'ring-2 ring-emerald-400 ring-offset-2 ring-offset-slate-950 scale-105' : 'hover:opacity-90'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Stats Footer */}
          <div className="pt-6 border-t border-slate-800 space-y-3">
            <div className="flex justify-between text-xs text-slate-400">
              <span>Completion Rate:</span>
              <span className="font-bold text-white">
                {Math.round((answeredCount / questions.length) * 100)}%
              </span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${(answeredCount / questions.length) * 100}%` }}
              />
            </div>
          </div>

        </div>

      </div>

      {/* Confirmation Modal Before Final Submission */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="glass-card max-w-md w-full rounded-3xl p-6 border border-emerald-500/40 space-y-5 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div className="text-center space-y-2">
              <h3 className="text-xl font-bold text-white">Submit CBT Exam?</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Are you sure you want to conclude the test and view your detailed scorecard and answers analysis?
              </p>
            </div>

            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 text-xs space-y-2">
              <div className="flex justify-between text-slate-300">
                <span>Total Questions:</span>
                <span className="font-bold text-white">{questions.length}</span>
              </div>
              <div className="flex justify-between text-emerald-400">
                <span>Questions Answered:</span>
                <span className="font-bold">{answeredCount}</span>
              </div>
              <div className="flex justify-between text-amber-400">
                <span>Marked for Review:</span>
                <span className="font-bold">{flaggedCount}</span>
              </div>
              <div className="flex justify-between text-red-400">
                <span>Unanswered / Skipped:</span>
                <span className="font-bold">{questions.length - answeredCount}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowSubmitConfirm(false)}
                className="flex-1 py-2.5 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700"
              >
                Return to Test
              </button>
              <button
                onClick={handleFinalSubmit}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 shadow-md shadow-emerald-500/30"
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
