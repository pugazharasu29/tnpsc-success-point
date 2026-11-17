import React, { useState } from 'react';
import { 
  ShieldCheck, 
  PlusCircle, 
  CheckCircle2, 
  Activity
} from 'lucide-react';
import { sampleQuestions } from '../data/mockQuestions';

const AdminPortal = ({ onAddCustomQuestion, customQuestionsCount }) => {
  const [activeTab, setActiveTab] = useState('questions');
  const [showAddModal, setShowAddModal] = useState(false);
  
  const [section, setSection] = useState('பொதுத்தமிழ் (General Tamil)');
  const [subject, setSubject] = useState('தமிழ் இலக்கியம்');
  const [questionTa, setQuestionTa] = useState('');
  const [questionEn, setQuestionEn] = useState('');
  const [opt0, setOpt0] = useState('');
  const [opt1, setOpt1] = useState('');
  const [opt2, setOpt2] = useState('');
  const [opt3, setOpt3] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [explanation, setExplanation] = useState('');
  const [reference, setReference] = useState('');

  const [toastMessage, setToastMessage] = useState('');

  const handleCreateQuestion = (e) => {
    e.preventDefault();
    if (!questionTa.trim() || !opt0.trim() || !opt1.trim() || !opt2.trim() || !opt3.trim()) {
      alert('Please fill out the question and all 4 options.');
      return;
    }

    const newQ = {
      id: `custom-q-${Date.now()}`,
      testId: 'test-gr4-full-01',
      section,
      subject,
      question: questionTa,
      questionEn: questionEn || null,
      options: [opt0, opt1, opt2, opt3],
      correctAnswer: parseInt(correctAnswer),
      explanation: explanation || 'Refer to relevant Samacheer Kalvi school textbooks.',
      reference: reference || 'TNPSC Standard Question Bank 2026'
    };

    onAddCustomQuestion(newQ);
    setShowAddModal(false);
    setToastMessage('New TNPSC Question added successfully to Mock Test Bank!');
    setTimeout(() => setToastMessage(''), 4000);

    setQuestionTa('');
    setQuestionEn('');
    setOpt0('');
    setOpt1('');
    setOpt2('');
    setOpt3('');
    setExplanation('');
    setReference('');
  };

  return (
    <div className="space-y-6">
      
      {/* Admin Top Welcome Banner */}
      <div className="bg-gradient-to-r from-[#2C3B64]/50 via-[#172138] to-[#0c121e] border border-[#2C3B64] p-6 sm:p-8 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#942F67]/25 text-[#f38ac3] border border-[#942F67]/50 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-[#F2C368]" />
            <span>Faculty & Administrator Operations</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">
            TNPSC SuccessPoint Faculty Desk
          </h2>
          <p className="text-xs text-[#A9A4C9] max-w-xl">
            Manage live mock question banks, evaluate student performance analytics, upload latest Samacheer book digests, and curate doubt forums.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="self-start md:self-center px-5 py-3 rounded-2xl bg-[#F2C368] hover:bg-[#e4b557] text-[#101626] font-bold text-xs flex items-center gap-2 shadow-lg shadow-[#F2C368]/20 transition-all shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Exam Question</span>
        </button>
      </div>

      {/* Toast Alert */}
      {toastMessage && (
        <div className="p-4 rounded-2xl bg-[#86947A]/30 border border-[#86947A] text-[#b7c7ab] text-xs flex items-center gap-3 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-[#86947A] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Admin Quick KPI Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-5 rounded-3xl border-[#2C3B64] space-y-1">
          <span className="text-xs text-[#A9A4C9] font-medium">Total Questions in Bank</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
            <span>{sampleQuestions.length + customQuestionsCount}</span>
            <span className="text-xs font-mono text-[#86947A] font-normal">Active</span>
          </div>
        </div>

        <div className="glass-card p-5 rounded-3xl border-[#2C3B64] space-y-1">
          <span className="text-xs text-[#A9A4C9] font-medium">Active Aspirants Today</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#F2C368]">1,842</div>
        </div>

        <div className="glass-card p-5 rounded-3xl border-[#2C3B64] space-y-1">
          <span className="text-xs text-[#A9A4C9] font-medium">CBT Tests Attempted</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#DD8F6B]">12,680</div>
        </div>

        <div className="glass-card p-5 rounded-3xl border-[#2C3B64] space-y-1">
          <span className="text-xs text-[#A9A4C9] font-medium">Avg Student Accuracy</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#942F67]">76.4%</div>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-2 border-b border-[#2C3B64] pb-3">
        <button
          onClick={() => setActiveTab('questions')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'questions' ? 'bg-[#F2C368] text-[#101626] font-bold shadow-md shadow-[#F2C368]/20' : 'text-[#A9A4C9] hover:text-white'
          }`}
        >
          Mock Question Bank ({sampleQuestions.length + customQuestionsCount})
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'analytics' ? 'bg-[#F2C368] text-[#101626] font-bold shadow-md shadow-[#F2C368]/20' : 'text-[#A9A4C9] hover:text-white'
          }`}
        >
          Live Exam Analytics
        </button>
      </div>

      {/* Questions Manager Tab Content */}
      {activeTab === 'questions' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-[#A9A4C9]">
            <span>Listing verified mock exam questions across General Tamil, GS, and Aptitude:</span>
            <span className="font-mono">{sampleQuestions.length + customQuestionsCount} Items</span>
          </div>

          <div className="space-y-3 max-h-[550px] overflow-y-auto pr-1">
            {sampleQuestions.map((q, idx) => (
              <div 
                key={q.id}
                className="glass-card p-5 rounded-2xl border-[#2C3B64] flex items-start justify-between gap-4 hover:border-[#F2C368]/40"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#F2C368]">#{idx + 1}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#101626] text-[#A9A4C9] border border-[#2C3B64]">
                      {q.section}
                    </span>
                    <span className="text-[10px] text-[#A9A4C9]">• {q.subject}</span>
                  </div>

                  <p className="text-sm font-semibold text-white font-tamil leading-snug">
                    {q.question}
                  </p>

                  <div className="text-xs text-[#86947A] font-tamil flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>Answer: {q.options[q.correctAnswer]}</span>
                  </div>
                </div>

                <div className="shrink-0 text-right space-y-1">
                  <span className="text-[10px] font-mono text-[#A9A4C9]/70 block">Standard Verified</span>
                  <span className="text-[10px] text-[#F2C368] block font-mono">{q.testId}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Analytics Tab Content */}
      {activeTab === 'analytics' && (
        <div className="glass-card rounded-3xl p-6 border-[#2C3B64] space-y-6">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#F2C368]" />
            <span>TNPSC 2026-2027 Aspirant Accuracy Trends</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-[#101626] border border-[#2C3B64] space-y-2">
              <span className="text-xs font-semibold text-slate-300 font-tamil">பொதுத்தமிழ் (General Tamil)</span>
              <div className="text-xl font-bold text-[#86947A]">88.5% Accuracy</div>
              <p className="text-[11px] text-[#A9A4C9]">Highest scoring section across all mock test takers.</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#101626] border border-[#2C3B64] space-y-2">
              <span className="text-xs font-semibold text-slate-300">Aptitude & Mental Ability</span>
              <div className="text-xl font-bold text-[#F2C368]">71.2% Accuracy</div>
              <p className="text-[11px] text-[#A9A4C9]">Time & Work and Compound Interest identified as weak areas.</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#101626] border border-[#2C3B64] space-y-2">
              <span className="text-xs font-semibold text-slate-300">Unit 8 & Unit 9 Administration</span>
              <div className="text-xl font-bold text-[#DD8F6B]">69.8% Accuracy</div>
              <p className="text-[11px] text-[#A9A4C9]">Requires additional Tamil Nadu state welfare policy revision.</p>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add New Question */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
          <div className="glass-card max-w-2xl w-full rounded-3xl p-6 sm:p-8 border border-[#F2C368]/40 space-y-5 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#2C3B64]">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-[#F2C368]" />
                <span>Add Question to Mock Exam Bank</span>
              </h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-xs text-[#A9A4C9] hover:text-white"
              >
                Cancel
              </button>
            </div>

            <form onSubmit={handleCreateQuestion} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-300 mb-1 font-semibold">Section</label>
                  <select 
                    value={section} 
                    onChange={(e) => setSection(e.target.value)}
                    className="w-full bg-[#101626] border border-[#2C3B64] text-xs text-white rounded-xl p-2.5"
                  >
                    <option value="பொதுத்தமிழ் (General Tamil)">பொதுத்தமிழ் (General Tamil)</option>
                    <option value="பொது அறிவு (General Studies)">பொது அறிவு (General Studies)</option>
                    <option value="திறனறிவு (Aptitude)">திறனறிவு (Aptitude)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-slate-300 mb-1 font-semibold">Subject / Unit</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. திருக்குறள், இந்திய அரசியலமைப்பு..."
                    className="w-full bg-[#101626] border border-[#2C3B64] text-xs text-white rounded-xl p-2.5 font-tamil"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1 font-semibold">Question (Tamil)</label>
                <textarea
                  rows={2}
                  value={questionTa}
                  onChange={(e) => setQuestionTa(e.target.value)}
                  placeholder="Enter Tamil question text here..."
                  className="w-full bg-[#101626] border border-[#2C3B64] text-xs text-white rounded-xl p-2.5 font-tamil"
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1 font-semibold">Question (English Translation - Optional)</label>
                <input
                  type="text"
                  value={questionEn}
                  onChange={(e) => setQuestionEn(e.target.value)}
                  placeholder="Enter English translated question..."
                  className="w-full bg-[#101626] border border-[#2C3B64] text-xs text-white rounded-xl p-2.5"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs text-slate-300 font-semibold">4 Multiple Choice Options</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={opt0}
                    onChange={(e) => setOpt0(e.target.value)}
                    placeholder="Option A"
                    className="bg-[#101626] border border-[#2C3B64] text-xs text-white rounded-xl p-2.5 font-tamil"
                    required
                  />
                  <input
                    type="text"
                    value={opt1}
                    onChange={(e) => setOpt1(e.target.value)}
                    placeholder="Option B"
                    className="bg-[#101626] border border-[#2C3B64] text-xs text-white rounded-xl p-2.5 font-tamil"
                    required
                  />
                  <input
                    type="text"
                    value={opt2}
                    onChange={(e) => setOpt2(e.target.value)}
                    placeholder="Option C"
                    className="bg-[#101626] border border-[#2C3B64] text-xs text-white rounded-xl p-2.5 font-tamil"
                    required
                  />
                  <input
                    type="text"
                    value={opt3}
                    onChange={(e) => setOpt3(e.target.value)}
                    placeholder="Option D"
                    className="bg-[#101626] border border-[#2C3B64] text-xs text-white rounded-xl p-2.5 font-tamil"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1 font-semibold">Correct Option</label>
                <select
                  value={correctAnswer}
                  onChange={(e) => setCorrectAnswer(e.target.value)}
                  className="w-full bg-[#101626] border border-[#2C3B64] text-xs text-white rounded-xl p-2.5"
                >
                  <option value={0}>Option A is Correct</option>
                  <option value={1}>Option B is Correct</option>
                  <option value={2}>Option C is Correct</option>
                  <option value={3}>Option D is Correct</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1 font-semibold">Explanation & Samacheer Reference</label>
                <textarea
                  rows={2}
                  value={explanation}
                  onChange={(e) => setExplanation(e.target.value)}
                  placeholder="Explain why this option is correct..."
                  className="w-full bg-[#101626] border border-[#2C3B64] text-xs text-white rounded-xl p-2.5 font-tamil"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-[#2C3B64]">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs text-[#A9A4C9] hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#F2C368] hover:bg-[#e4b557] text-[#101626] shadow-md shadow-[#F2C368]/20"
                >
                  Save Question to Bank
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminPortal;
