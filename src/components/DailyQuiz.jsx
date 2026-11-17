import React, { useState } from 'react';
import { 
  Flame, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  Trophy,
  HelpCircle
} from 'lucide-react';
import { dailyQuizQuestions } from '../data/mockQuestions';

const DailyQuiz = ({ onEarnXp, onIncrementStreak, streak }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ = dailyQuizQuestions[currentIndex];

  const handleSelectOption = (optIdx) => {
    if (selectedAnswers[currentQ.id] !== undefined) return; // prevent re-selection
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQ.id]: optIdx
    }));
  };

  const handleNext = () => {
    if (currentIndex < dailyQuizQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsCompleted(true);
      // Award XP and maintain streak
      onEarnXp(50);
      onIncrementStreak();
    }
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setCurrentIndex(0);
    setIsCompleted(false);
  };

  const answeredOption = selectedAnswers[currentQ?.id];
  const hasAnsweredCurrent = answeredOption !== undefined;
  const isCurrentCorrect = hasAnsweredCurrent && answeredOption === currentQ.correctAnswer;

  const totalCorrect = dailyQuizQuestions.filter(
    q => selectedAnswers[q.id] === q.correctAnswer
  ).length;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Quiz Top Header */}
      <div className="flex items-center justify-between bg-slate-900/80 border border-slate-800 p-5 rounded-3xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
            <Flame className="w-6 h-6 fill-amber-400 text-amber-500" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span>Daily Practice Booster</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800 font-mono">
                5 Questions
              </span>
            </h2>
            <p className="text-xs text-slate-400 font-tamil">
              முயற்சி திருவினையாக்கும் • Complete today to lock in your daily streak!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 text-xs font-mono font-bold text-amber-400">
          <Flame className="w-4 h-4 fill-amber-400" />
          <span>{streak} Day Streak</span>
        </div>
      </div>

      {!isCompleted ? (
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6 shadow-xl">
          
          {/* Progress Bar & Counter */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-slate-400 font-mono">
              <span>Question {currentIndex + 1} of {dailyQuizQuestions.length}</span>
              <span className="text-emerald-400 font-semibold">{currentQ.subject}</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-amber-400 to-emerald-400 h-full rounded-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / dailyQuizQuestions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Text */}
          <div className="space-y-2 pt-2">
            <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed font-tamil">
              {currentQ.question}
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-3 pt-2">
            {currentQ.options.map((opt, oIdx) => {
              const isChosen = answeredOption === oIdx;
              const isCorrectAnswer = currentQ.correctAnswer === oIdx;

              let buttonStyle = "bg-slate-900 border-slate-800 text-slate-200 hover:bg-slate-800 hover:border-slate-700";

              if (hasAnsweredCurrent) {
                if (isCorrectAnswer) {
                  buttonStyle = "bg-emerald-950/70 border-emerald-500 text-emerald-200";
                } else if (isChosen && !isCorrectAnswer) {
                  buttonStyle = "bg-red-950/70 border-red-500 text-red-200";
                } else {
                  buttonStyle = "bg-slate-900/40 border-slate-800/60 text-slate-400 opacity-60";
                }
              }

              return (
                <button
                  key={oIdx}
                  onClick={() => handleSelectOption(oIdx)}
                  disabled={hasAnsweredCurrent}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 text-sm font-medium font-tamil ${buttonStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-slate-300 shrink-0">
                      {String.fromCharCode(65 + oIdx)}
                    </span>
                    <span>{opt}</span>
                  </div>

                  {hasAnsweredCurrent && isCorrectAnswer && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  )}
                  {hasAnsweredCurrent && isChosen && !isCorrectAnswer && (
                    <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Instant Solution Banner if answered */}
          {hasAnsweredCurrent && (
            <div className={`p-4 rounded-2xl border text-xs leading-relaxed space-y-1 font-tamil animate-in fade-in ${
              isCurrentCorrect ? 'bg-emerald-950/40 border-emerald-800 text-emerald-200' : 'bg-red-950/40 border-red-800 text-red-200'
            }`}>
              <div className="font-bold flex items-center gap-1.5">
                {isCurrentCorrect ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Great Job! Correct Answer.</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-red-400" />
                    <span>Incorrect. Learn from this explanation:</span>
                  </>
                )}
              </div>
              <p className="text-slate-300 pt-1">{currentQ.explanation}</p>
            </div>
          )}

          {/* Next Button */}
          <div className="flex justify-end pt-4 border-t border-slate-800">
            <button
              onClick={handleNext}
              disabled={!hasAnsweredCurrent}
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-emerald-400 text-slate-950 hover:bg-emerald-300 disabled:opacity-30 disabled:pointer-events-none flex items-center gap-2 shadow-md shadow-emerald-500/20"
            >
              <span>{currentIndex === dailyQuizQuestions.length - 1 ? 'Finish & Claim 50 XP' : 'Next Question'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      ) : (
        /* Quiz Completion Card */
        <div className="glass-card rounded-3xl p-8 border border-emerald-500/30 text-center space-y-6 shadow-2xl animate-in zoom-in-95">
          <div className="w-16 h-16 rounded-3xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
            <Trophy className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-extrabold text-white">Daily Goal Achieved! 🎉</h3>
            <p className="text-xs text-slate-300 max-w-md mx-auto">
              You scored <span className="text-emerald-400 font-bold">{totalCorrect} / {dailyQuizQuestions.length}</span> correct today and earned <span className="text-cyan-400 font-bold">+50 XP</span> towards your aspirant rank!
            </p>
          </div>

          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-slate-900 border border-slate-800 text-xs">
            <span className="text-slate-400">Current Streak:</span>
            <span className="text-amber-400 font-bold flex items-center gap-1 font-mono">
              <Flame className="w-4 h-4 fill-amber-400" />
              {streak} Days Active
            </span>
          </div>

          <div className="pt-2">
            <button
              onClick={handleRestart}
              className="px-6 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 inline-flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Practice Again</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default DailyQuiz;
