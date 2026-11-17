import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import Dashboard from './components/Dashboard';
import CBTTestsCatalog from './components/CBTTestsCatalog';
import MockTestEngine from './components/MockTestEngine';
import TestResultsModal from './components/TestResultsModal';
import DailyQuiz from './components/DailyQuiz';
import SyllabusTracker from './components/SyllabusTracker';
import StudyMaterials from './components/StudyMaterials';
import CommunityForum from './components/CommunityForum';
import AdminPortal from './components/AdminPortal';
import Footer from './components/Footer';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userRole, setUserRole] = useState('aspirant'); // 'aspirant' | 'admin'
  const [targetExam, setTargetExam] = useState('Group 4 & VAO');
  
  // Persisted or default State
  const [streak, setStreak] = useState(() => {
    const saved = localStorage.getItem('tnpsc_streak');
    return saved ? parseInt(saved) : 5; // default 5-day streak
  });

  const [xpPoints, setXpPoints] = useState(() => {
    const saved = localStorage.getItem('tnpsc_xp');
    return saved ? parseInt(saved) : 320;
  });

  const [completedTopics, setCompletedTopics] = useState(() => {
    const saved = localStorage.getItem('tnpsc_syllabus_progress');
    return saved ? JSON.parse(saved) : {
      "திருக்குறள் தொடர்பான செய்திகள், மேற்கோள்கள் (25 அதிகாரங்கள்)": true,
      "பொருத்துதல், பொருத்தமான பொருளைத் தேர்வு செய்தல்": true,
      "Indian Constitution, Preamble, Fundamental Rights & DPSP": true,
      "Highest Common Factor (HCF) & Lowest Common Multiple (LCM)": true
    };
  });

  const [testHistory, setTestHistory] = useState(() => {
    const saved = localStorage.getItem('tnpsc_test_history');
    return saved ? JSON.parse(saved) : [
      {
        testTitle: "TNPSC Group 4 & VAO Full Mock Exam #01",
        score: "250.0",
        maxMarks: 300,
        accuracy: 83,
        date: "Yesterday"
      }
    ];
  });

  const [activeTestId, setActiveTestId] = useState('test-gr4-full-01');
  const [activeTestResult, setActiveTestResult] = useState(null);
  const [customQuestions, setCustomQuestions] = useState([]);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('tnpsc_streak', streak.toString());
  }, [streak]);

  useEffect(() => {
    localStorage.setItem('tnpsc_xp', xpPoints.toString());
  }, [xpPoints]);

  useEffect(() => {
    localStorage.setItem('tnpsc_syllabus_progress', JSON.stringify(completedTopics));
  }, [completedTopics]);

  useEffect(() => {
    localStorage.setItem('tnpsc_test_history', JSON.stringify(testHistory));
  }, [testHistory]);

  const handleEarnXp = (amount) => {
    setXpPoints(prev => prev + amount);
  };

  const handleIncrementStreak = () => {
    setStreak(prev => prev + 1);
  };

  const handleToggleTopic = (topicName) => {
    setCompletedTopics(prev => ({
      ...prev,
      [topicName]: !prev[topicName]
    }));
  };

  const handleResetSyllabus = () => {
    if (window.confirm('Reset all checked topics in your syllabus tracker?')) {
      setCompletedTopics({});
    }
  };

  const handleStartTest = (testId) => {
    setActiveTestId(testId);
    setActiveTab('test-session');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompleteTest = (results) => {
    setActiveTestResult(results);
    setActiveTab('test-results');

    // Add to test history
    const newRecord = {
      testTitle: results.test.title,
      score: results.score,
      maxMarks: results.maxMarks,
      accuracy: results.accuracy,
      date: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
    };
    setTestHistory([newRecord, ...testHistory]);
    handleEarnXp(100);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddCustomQuestion = (newQ) => {
    setCustomQuestions(prev => [newQ, ...prev]);
  };

  // Calculate overall syllabus percentage for dashboard
  const sampleTotalTopics = 20;
  const completedCount = Object.values(completedTopics).filter(Boolean).length;
  const syllabusPercent = Math.min(100, Math.round((completedCount / sampleTotalTopics) * 100));

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans">
      
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userRole={userRole}
        setUserRole={setUserRole}
        streak={streak}
        xpPoints={xpPoints}
        targetExam={targetExam}
        setTargetExam={setTargetExam}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* Hero banner shown on Dashboard */}
        {activeTab === 'dashboard' && (
          <HeroBanner
            onStartTest={() => handleStartTest('test-gr4-full-01')}
            onStartDailyQuiz={() => setActiveTab('daily-quiz')}
            targetExam={targetExam}
          />
        )}

        {/* Tab Router */}
        {activeTab === 'dashboard' && (
          <Dashboard
            onStartTest={handleStartTest}
            onNavigateTab={setActiveTab}
            streak={streak}
            xpPoints={xpPoints}
            testHistory={testHistory}
            syllabusPercent={syllabusPercent}
            targetExam={targetExam}
          />
        )}

        {activeTab === 'cbt-tests' && (
          <CBTTestsCatalog
            onStartTest={handleStartTest}
          />
        )}

        {activeTab === 'test-session' && (
          <MockTestEngine
            testId={activeTestId}
            onCompleteTest={handleCompleteTest}
            onExitTest={() => setActiveTab('cbt-tests')}
          />
        )}

        {activeTab === 'test-results' && (
          <TestResultsModal
            resultData={activeTestResult}
            onRetakeTest={() => handleStartTest(activeTestId)}
            onClose={() => setActiveTab('dashboard')}
          />
        )}

        {activeTab === 'daily-quiz' && (
          <DailyQuiz
            onEarnXp={handleEarnXp}
            onIncrementStreak={handleIncrementStreak}
            streak={streak}
          />
        )}

        {activeTab === 'materials' && (
          <StudyMaterials />
        )}

        {activeTab === 'syllabus' && (
          <SyllabusTracker
            completedTopics={completedTopics}
            onToggleTopic={handleToggleTopic}
            onResetProgress={handleResetSyllabus}
          />
        )}

        {activeTab === 'community' && (
          <CommunityForum
            userRole={userRole}
          />
        )}

        {activeTab === 'admin' && (
          <AdminPortal
            onAddCustomQuestion={handleAddCustomQuestion}
            customQuestionsCount={customQuestions.length}
          />
        )}

      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}

export default App;
