import React, { useState } from 'react';
import { 
  ShieldCheck, 
  PlusCircle, 
  BookPlus, 
  Trash2, 
  FileText, 
  Users, 
  Award, 
  CheckCircle2, 
  Activity,
  Layers,
  Sparkles
} from 'lucide-react';
import { sampleQuestions, tnpscExamTests } from '../data/mockQuestions';

const AdminPortal = ({ onAddCustomQuestion, customQuestionsCount }) => {
  const [activeTab, setActiveTab] = useState('questions'); // 'questions', 'materials', 'analytics'
  const [showAddModal, setShowAddModal] = useState(false);
  
  // New Question Form state
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

    // Reset Form
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
      <div className="bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-950 border border-amber-600/40 p-6 sm:p-8 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950 text-amber-300 border border-amber-700/60 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Faculty & Administrator Operations</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">
            TNPSC SuccessPoint Faculty Desk
          </h2>
          <p className="text-xs text-slate-300 max-w-xl">
            Manage live mock question banks, evaluate student performance analytics, upload latest Samacheer book digests, and curate doubt forums.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="self-start md:self-center px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Exam Question</span>
        </button>
      </div>

      {/* Toast Alert */}
      {toastMessage && (
        <div className="p-4 rounded-2xl bg-emerald-950/90 border border-emerald-500 text-emerald-200 text-xs flex items-center gap-3 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Admin Quick KPI Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-5 rounded-3xl border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-medium">Total Questions in Bank</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
            <span>{sampleQuestions.length + customQuestionsCount}</span>
            <span className="text-xs font-mono text-emerald-400 font-normal">Active</span>
          </div>
        </div>

        <div className="glass-card p-5 rounded-3xl border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-medium">Active Aspirants Today</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400">1,842</div>
        </div>

        <div className="glass-card p-5 rounded-3xl border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-medium">CBT Tests Attempted</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">12,680</div>
        </div>

        <div className="glass-card p-5 rounded-3xl border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-medium">Avg Student Accuracy</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-purple-400">76.4%</div>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('questions')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'questions' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
          }`}
        >
          Mock Question Bank ({sampleQuestions.length + customQuestionsCount})
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'analytics' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
          }`}
        >
          Live Exam Analytics
        </button>
      </div>

      {/* Questions Manager Tab Content */}
      {activeTab === 'questions' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Listing verified mock exam questions across General Tamil, GS, and Aptitude:</span>
            <span className="font-mono">{sampleQuestions.length + customQuestionsCount} Items</span>
          </div>

          <div className="space-y-3 max-h-[550px] overflow-y-auto pr-1">
            {sampleQuestions.map((q, idx) => (
              <div 
                key={q.id}
                className="glass-card p-5 rounded-2xl border border-slate-800 flex items-start justify-between gap-4 hover:border-slate-700"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-amber-400">#{idx + 1}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-900 text-emerald-300 border border-slate-800">
                      {q.section}
                    </span>
                    <span className="text-[10px] text-slate-400">• {q.subject}</span>
                  </div>

                  <p className="text-sm font-semibold text-white font-tamil leading-snug">
                    {q.question}
                  </p>

                  <div className="text-xs text-emerald-400 font-tamil flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>Answer: {q.options[q.correctAnswer]}</span>
                  </div>
                </div>

                <div className="shrink-0 text-right space-y-1">
                  <span className="text-[10px] font-mono text-slate-500 block">Standard Verified</span>
                  <span className="text-[10px] text-cyan-400 block font-mono">{q.testId}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Analytics Tab Content */}
      {activeTab === 'analytics' && (
        <div className="glass-card rounded-3xl p-6 border border-slate-800 space-y-6">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-400" />
            <span>TNPSC 2026-2027 Aspirant Accuracy Trends</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-xs font-semibold text-slate-300">பொதுத்தமிழ் (General Tamil)</span>
              <div className="text-xl font-bold text-emerald-400">88.5% Accuracy</div>
              <p className="text-[11px] text-slate-400">Highest scoring section across all mock test takers.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-xs font-semibold text-slate-300">Aptitude & Mental Ability</span>
              <div className="text-xl font-bold text-amber-400">71.2% Accuracy</div>
              <p className="text-[11px] text-slate-400">Time & Work and Compound Interest identified as weak areas.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-xs font-semibold text-slate-300">Unit 8 & Unit 9 Administration</span>
              <div className="text-xl font-bold text-cyan-400">69.8% Accuracy</div>
              <p className="text-[11px] text-slate-400">Requires additional Tamil Nadu state welfare policy revision.</p>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add New Question */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
          <div className="glass-card max-w-2xl w-full rounded-3xl p-6 sm:p-8 border border-amber-500/40 space-y-5 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-amber-400" />
                <span>Add Question to Mock Exam Bank</span>
              </h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-xs text-slate-400 hover:text-white"
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
                    className="w-full bg-slate-900 border border-slate-700 text-xs text-white rounded-xl p-2.5"
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
                    className="w-full bg-slate-900 border border-slate-700 text-xs text-white rounded-xl p-2.5 font-tamil"
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
                  className="w-full bg-slate-900 border border-slate-700 text-xs text-white rounded-xl p-2.5 font-tamil"
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
                  className="w-full bg-slate-900 border border-slate-700 text-xs text-white rounded-xl p-2.5"
                />
              </div>

              {/* 4 Options */}
              <div className="space-y-2">
                <label className="block text-xs text-slate-300 font-semibold">4 Multiple Choice Options</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={opt0}
                    onChange={(e) => setOpt0(e.target.value)}
                    placeholder="Option A"
                    className="bg-slate-900 border border-slate-700 text-xs text-white rounded-xl p-2.5 font-tamil"
                    required
                  />
                  <input
                    type="text"
                    value={opt1}
                    onChange={(e) => setOpt1(e.target.value)}
                    placeholder="Option B"
                    className="bg-slate-900 border border-slate-700 text-xs text-white rounded-xl p-2.5 font-tamil"
                    required
                  />
                  <input
                    type="text"
                    value={opt2}
                    onChange={(e) => setOpt2(e.target.value)}
                    placeholder="Option C"
                    className="bg-slate-900 border border-slate-700 text-xs text-white rounded-xl p-2.5 font-tamil"
                    required
                  />
                  <input
                    type="text"
                    value={opt3}
                    onChange={(e) => setOpt3(e.target.value)}
                    placeholder="Option D"
                    className="bg-slate-900 border border-slate-700 text-xs text-white rounded-xl p-2.5 font-tamil"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1 font-semibold">Correct Option</label>
                <select
                  value={correctAnswer}
                  onChange={(e) => setCorrectAnswer(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 text-xs text-white rounded-xl p-2.5"
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
                  className="w-full bg-slate-900 border border-slate-700 text-xs text-white rounded-xl p-2.5 font-tamil"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-md"
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
