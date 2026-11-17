import React from 'react';
import { 
  Play, 
  Flame, 
  Trophy, 
  BookOpen, 
  Clock, 
  ArrowRight, 
  Sparkles,
  TrendingUp
} from 'lucide-react';
import { tnpscExamTests } from '../data/mockQuestions';

const Dashboard = ({ 
  onStartTest, 
  onNavigateTab, 
  streak, 
  xpPoints, 
  testHistory, 
  syllabusPercent, 
  targetExam,
  currentUser,
  onOpenAuth
}) => {
  return (
    <div className="space-y-8">
      
      {/* Personalized Welcome Card */}
      {currentUser ? (
        <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-[#2C3B64]/60 via-[#172138] to-[#0c121e] border border-[#2C3B64] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#F2C368] to-[#DD8F6B] text-[#101626] flex items-center justify-center font-extrabold text-base shrink-0 shadow-md shadow-[#F2C368]/20">
              {currentUser.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-white text-base font-tamil">
                  வணக்கம், {currentUser.name}!
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#942F67]/25 text-[#f38ac3] border border-[#942F67]/50">
                  {currentUser.rank}
                </span>
              </div>
              <p className="text-xs text-[#A9A4C9]">
                Aspirant from <span className="text-[#F2C368] font-medium">{currentUser.district}</span> • Focus: <span className="text-white font-medium">{targetExam}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#A9A4C9] hidden md:inline">Account Synced</span>
            <div className="w-2.5 h-2.5 rounded-full bg-[#86947A] animate-pulse" />
          </div>
        </div>
      ) : (
        <div className="p-4 sm:p-5 rounded-3xl bg-[#172138] border border-[#2C3B64] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#F2C368]/15 text-[#F2C368] flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">
                Create or Log In to Your Aspirant Profile
              </h4>
              <p className="text-xs text-[#A9A4C9]">
                Save your mock test scorecard history, syllabus tick marks, and join state-wide rank tracking.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenAuth}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-[#F2C368] hover:bg-[#e4b557] text-[#101626] shadow-md transition-all self-start sm:self-center"
          >
            Sign In / Register Free →
          </button>
        </div>
      )}

      {/* Aspirant Target Status & Readiness Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Exam Target & Readiness */}
        <div className="glass-card rounded-3xl p-6 border-[#2C3B64] flex flex-col justify-between group hover:border-[#86947A]/50 transition-all">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#86947A] font-bold uppercase tracking-wider">
                Exam Readiness
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#86947A]/20 text-[#b7c7ab] border border-[#86947A]/40 font-mono">
                {targetExam}
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-white">
              Syllabus Completion
            </h3>
            <p className="text-xs text-[#A9A4C9]">
              Track unit mastery across General Tamil, Indian Polity, and Aptitude.
            </p>
          </div>

          <div className="space-y-2 pt-4">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-[#A9A4C9]">Total Progress:</span>
              <span className="font-bold text-[#F2C368]">{syllabusPercent}%</span>
            </div>
            <div className="w-full bg-[#101626] h-2.5 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-[#86947A] to-[#F2C368] h-full rounded-full transition-all duration-500"
                style={{ width: `${syllabusPercent}%` }}
              />
            </div>
            <button
              onClick={() => onNavigateTab('syllabus')}
              className="text-xs text-[#F2C368] hover:underline font-semibold inline-flex items-center gap-1 pt-1"
            >
              <span>Update Syllabus Progress</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Daily Streak & Gamified XP */}
        <div className="glass-card rounded-3xl p-6 border-[#2C3B64] flex flex-col justify-between group hover:border-[#F2C368]/40 transition-all">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#F2C368] font-bold uppercase tracking-wider">
                Daily Motivation
              </span>
              <div className="flex items-center gap-1 text-[#F2C368] text-xs font-bold font-mono">
                <Flame className="w-4 h-4 fill-[#F2C368]" />
                <span>{streak} Days</span>
              </div>
            </div>
            <h3 className="text-xl font-extrabold text-white">
              Daily Practice Streak
            </h3>
            <p className="text-xs text-[#A9A4C9]">
              Solve 5 quick questions every morning to build exam stamina and retain memory.
            </p>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-[#A9A4C9] block">Total Experience</span>
              <span className="text-lg font-bold text-[#F2C368] font-mono">{xpPoints} XP</span>
            </div>
            <button
              onClick={() => onNavigateTab('daily-quiz')}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-[#F2C368] hover:bg-[#e4b557] text-[#101626] flex items-center gap-1.5 shadow-md shadow-[#F2C368]/20"
            >
              <Flame className="w-3.5 h-3.5 fill-[#101626]" />
              <span>Take Today's Quiz</span>
            </button>
          </div>
        </div>

        {/* Mock Exam History Average */}
        <div className="glass-card rounded-3xl p-6 border-[#2C3B64] flex flex-col justify-between group hover:border-[#942F67]/50 transition-all">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#942F67] font-bold uppercase tracking-wider">
                Mock Accuracy
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#942F67]/20 text-[#f38ac3] border border-[#942F67]/40 font-mono">
                {testHistory.length} Attempted
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-white">
              Recent CBT Performance
            </h3>
            <p className="text-xs text-[#A9A4C9]">
              Simulate actual exam hall time pressure with negative mark free CBT pattern.
            </p>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-[#A9A4C9] block">Latest Accuracy</span>
              <span className="text-lg font-bold text-[#86947A] font-mono">
                {testHistory.length > 0 ? `${testHistory[0].accuracy}%` : 'Not Taken Yet'}
              </span>
            </div>
            <button
              onClick={() => onNavigateTab('cbt-tests')}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-[#2C3B64] hover:bg-[#384a7d] text-white flex items-center gap-1.5 shadow-md border border-[#2C3B64]"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Open Test Center</span>
            </button>
          </div>
        </div>

      </div>

      {/* Featured Mock Test Options */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-white">
              Featured CBT Mock Tests
            </h2>
            <p className="text-xs text-[#A9A4C9]">
              Official TNPSC question ratio with immediate bilingual explanations.
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('cbt-tests')}
            className="text-xs font-semibold text-[#F2C368] hover:underline flex items-center gap-1"
          >
            <span>View All Tests</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tnpscExamTests.slice(0, 2).map((test) => (
            <div 
              key={test.id}
              className="glass-card rounded-3xl p-6 border-[#2C3B64] flex flex-col justify-between hover:border-[#F2C368]/40 transition-all duration-300"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-[#942F67]/20 text-[#f38ac3] border border-[#942F67]/40">
                    {test.examType}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-[#A9A4C9] font-mono">
                    <Clock className="w-3.5 h-3.5 text-[#F2C368]" />
                    <span>{test.durationMinutes} Mins</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white font-tamil leading-snug">
                  {test.title}
                </h3>

                <p className="text-xs text-[#A9A4C9] leading-relaxed font-tamil">
                  {test.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {test.sections.map((sec, sIdx) => (
                    <span 
                      key={sIdx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#101626] text-[#A9A4C9] border border-[#2C3B64]"
                    >
                      {sec}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-[#2C3B64] flex items-center justify-between">
                <div className="text-xs text-[#A9A4C9]">
                  <span>Max Marks: <strong className="text-white font-mono">{test.totalMarks}</strong></span>
                </div>

                <button
                  onClick={() => onStartTest(test.id)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#F2C368] hover:bg-[#e4b557] text-[#101626] flex items-center gap-1.5 shadow-md shadow-[#F2C368]/20"
                >
                  <Play className="w-3.5 h-3.5 fill-[#101626]" />
                  <span>Start CBT Test</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Test History Card */}
      {testHistory.length > 0 && (
        <div className="glass-card rounded-3xl p-6 border-[#2C3B64] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#F2C368]" />
              <span>Recent Test Attempts & Accuracy Log</span>
            </h3>
            <span className="text-xs text-[#A9A4C9] font-mono">{testHistory.length} Session(s)</span>
          </div>

          <div className="divide-y divide-[#2C3B64]">
            {testHistory.map((rec, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between gap-4 text-xs">
                <div>
                  <h4 className="font-bold text-white">{rec.testTitle}</h4>
                  <p className="text-[#A9A4C9] text-[11px] font-mono">{rec.date}</p>
                </div>
                <div className="flex items-center gap-4 text-right">
                  <div>
                    <span className="text-[#A9A4C9] block text-[10px]">SCORE</span>
                    <span className="font-mono font-bold text-[#F2C368]">{rec.score} / {rec.maxMarks}</span>
                  </div>
                  <div>
                    <span className="text-[#A9A4C9] block text-[10px]">ACCURACY</span>
                    <span className="font-mono font-bold text-[#86947A]">{rec.accuracy}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default Dashboard;
