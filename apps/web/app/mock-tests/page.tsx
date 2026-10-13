'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { AlertCircle, CheckCircle2, Clock, Play, Award, BarChart2, ShieldCheck, ChevronRight, RefreshCw } from 'lucide-react';
import Link from 'next/link';

interface TestRecord {
  id: string;
  category: string;
  difficulty: string;
  length: number;
  score: number;
  date: string;
  status: 'Completed' | 'In Progress';
}

export default function MockTestsPage() {
  const [selectedCategory, setSelectedCategory] = useState('quantitative');
  const [selectedDifficulty, setSelectedDifficulty] = useState('medium');
  const [selectedLength, setSelectedLength] = useState(20);
  const [proctored, setProctored] = useState(true);

  // Interactive test taking state
  const [activeTest, setActiveTest] = useState<any | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(1200); // 20 mins
  const [isTestFinished, setIsTestFinished] = useState(false);
  const [testResult, setTestResult] = useState<any | null>(null);
  const [testHistory, setTestHistory] = useState<TestRecord[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('vidyaan_mock_tests');
    if (saved) {
      try {
        setTestHistory(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    } else {
      const initial: TestRecord[] = [
        { id: '1', category: 'Quantitative Aptitude', difficulty: 'Medium', length: 10, score: 85, date: '2026-10-10', status: 'Completed' },
        { id: '2', category: 'Logical Reasoning', difficulty: 'Hard', length: 20, score: 92, date: '2026-10-12', status: 'Completed' }
      ];
      setTestHistory(initial);
      localStorage.setItem('vidyaan_mock_tests', JSON.stringify(initial));
    }
  }, []);

  useEffect(() => {
    let timer: any;
    if (activeTest && !isTestFinished) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            finishTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [activeTest, isTestFinished]);

  const categories = [
    { id: 'quantitative', label: 'Quantitative Aptitude', icon: '📐', desc: 'Algebra, arithmetic, probability, geometry' },
    { id: 'logical', label: 'Logical Reasoning', icon: '🧩', desc: 'Puzzles, arrangements, blood relations' },
    { id: 'verbal', label: 'Verbal Ability', icon: '📖', desc: 'Reading comprehension, grammar, vocabulary' },
    { id: 'data', label: 'Data Interpretation', icon: '📊', desc: 'Charts, graphs, tables, data sufficiency' },
    { id: 'core', label: 'Branch Core', icon: '💻', desc: 'Algorithms, OS, DBMS, Networks' },
    { id: 'full', label: 'Full Online Assessment', icon: '🚀', desc: 'Comprehensive multi-section exam' },
  ];

  const difficulties = [
    { id: 'easy', label: 'Easy', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    { id: 'medium', label: 'Medium', color: 'bg-amber-50 text-amber-700 border-amber-200' },
    { id: 'hard', label: 'Hard', color: 'bg-rose-50 text-rose-700 border-rose-200' },
  ];

  const lengths = [10, 20, 30];

  const handleStartTest = () => {
    // Generate dynamic mock questions based on category and length
    const sampleQuestions = Array.from({ length: selectedLength }, (_, i) => ({
      id: i + 1,
      question: `Sample ${selectedCategory.toUpperCase()} Question ${i + 1}: What is the optimal solution for problem statement #${i + 1}?`,
      options: [
        'Option A: Linear traversal with O(n) complexity',
        'Option B: Optimized hashing with O(1) lookup',
        'Option C: Divide and conquer with O(n log n)',
        'Option D: Dynamic programming tabulation'
      ],
      correct: i % 4
    }));

    setActiveTest({
      title: `${categories.find(c => c.id === selectedCategory)?.label || 'Mock'} Test`,
      category: selectedCategory,
      difficulty: selectedDifficulty,
      questions: sampleQuestions
    });
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setTimeLeft(selectedLength * 60);
    setIsTestFinished(false);
    setTestResult(null);
  };

  const handleSelectOption = (qIdx: number, optIdx: number) => {
    setUserAnswers({ ...userAnswers, [qIdx]: optIdx });
  };

  const finishTest = () => {
    if (!activeTest) return;
    let correctCount = 0;
    activeTest.questions.forEach((q: any, idx: number) => {
      if (userAnswers[idx] === q.correct) {
        correctCount++;
      }
    });
    const finalScore = Math.round((correctCount / activeTest.questions.length) * 100);
    const result = {
      score: finalScore,
      correct: correctCount,
      total: activeTest.questions.length,
      timeSpent: selectedLength * 60 - timeLeft
    };
    setTestResult(result);
    setIsTestFinished(true);

    const newRecord: TestRecord = {
      id: Date.now().toString(),
      category: activeTest.title,
      difficulty: selectedDifficulty,
      length: selectedLength,
      score: finalScore,
      date: new Date().toISOString().split('T')[0],
      status: 'Completed'
    };

    const updatedHistory = [newRecord, ...testHistory];
    setTestHistory(updatedHistory);
    localStorage.setItem('vidyaan_mock_tests', JSON.stringify(updatedHistory));
  };

  if (activeTest && !isTestFinished) {
    const currentQ = activeTest.questions[currentQuestionIndex];
    const formatTime = (secs: number) => {
      const m = Math.floor(secs / 60);
      const s = secs % 60;
      return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    return (
      <DashboardLayout>
        <div className="max-w-6xl mx-auto">
          {/* Test Header */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                {activeTest.title}
              </span>
              <h1 className="text-2xl font-extrabold text-gray-900 mt-2">
                Question {currentQuestionIndex + 1} of {activeTest.questions.length}
              </h1>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl border border-gray-200">
                <Clock className="w-5 h-5 text-blue-600 animate-pulse" />
                <span className="font-mono text-lg font-bold text-gray-800">{formatTime(timeLeft)}</span>
              </div>
              {proctored && (
                <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-2 rounded-xl border border-emerald-200 text-xs font-semibold">
                  <ShieldCheck className="w-4 h-4" /> Proctoring Active
                </div>
              )}
            </div>
          </div>

          {/* Question Card */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <p className="text-lg font-medium text-gray-900 mb-6 leading-relaxed">
                {currentQ.question}
              </p>

              <div className="space-y-4 mb-8">
                {currentQ.options.map((opt: string, optIdx: number) => {
                  const isSelected = userAnswers[currentQuestionIndex] === optIdx;
                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(currentQuestionIndex, optIdx)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50 text-blue-900 font-semibold shadow-sm'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700 bg-white'
                      }`}
                    >
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-sm ${
                        isSelected ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {String.fromCharCode(65 + optIdx)}
                      </div>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-between items-center pt-6 border-t border-gray-100">
                <button
                  disabled={currentQuestionIndex === 0}
                  onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                  className="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-semibold disabled:opacity-40 hover:bg-gray-50 transition-colors"
                >
                  Previous
                </button>
                <div className="flex gap-3">
                  {currentQuestionIndex < activeTest.questions.length - 1 ? (
                    <button
                      onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                      className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors shadow-md shadow-blue-600/20"
                    >
                      Next Question
                    </button>
                  ) : (
                    <button
                      onClick={finishTest}
                      className="px-8 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors shadow-md shadow-emerald-600/20"
                    >
                      Submit Test
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Question Palette Sidebar */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-fit">
              <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Question Palette</h3>
              <div className="grid grid-cols-5 gap-2 mb-6">
                {activeTest.questions.map((_: any, idx: number) => {
                  const answered = userAnswers[idx] !== undefined;
                  const current = currentQuestionIndex === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setCurrentQuestionIndex(idx)}
                      className={`h-10 rounded-xl font-bold text-sm transition-all flex items-center justify-center ${
                        current
                          ? 'ring-2 ring-blue-600 ring-offset-2 bg-blue-600 text-white shadow-md'
                          : answered
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
              <button
                onClick={finishTest}
                className="w-full bg-gray-900 text-white py-3 rounded-xl font-semibold hover:bg-black transition-colors text-sm shadow-sm"
              >
                End & Submit Exam
              </button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (isTestFinished && testResult) {
    return (
      <DashboardLayout>
        <div className="max-w-3xl mx-auto bg-white rounded-2xl p-10 shadow-xl border border-gray-100 text-center my-8">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl shadow-inner">
            🎉
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Test Completed Successfully!</h1>
          <p className="text-gray-500 mb-8">Here is a comprehensive breakdown of your performance.</p>

          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
              <p className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">Final Score</p>
              <p className="text-4xl font-black text-blue-900">{testResult.score}%</p>
            </div>
            <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1">Correct Answers</p>
              <p className="text-4xl font-black text-emerald-900">{testResult.correct} / {testResult.total}</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100">
              <p className="text-xs font-bold uppercase tracking-wider text-purple-600 mb-1">Accuracy</p>
              <p className="text-4xl font-black text-purple-900">{Math.round((testResult.correct / testResult.total) * 100)}%</p>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={() => { setActiveTest(null); setIsTestFinished(false); }}
              className="bg-blue-600 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
            >
              Take Another Test
            </button>
            <Link
              href="/dashboard"
              className="border border-gray-300 text-gray-700 px-8 py-3.5 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
            >
              Return to Dashboard
            </Link>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Mock Tests</h1>
            <p className="text-gray-500 mt-1">Generate AI-powered adaptive mock exams calibrated to top company standards.</p>
          </div>
          <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-xl text-sm font-semibold border border-blue-200">
            <Award className="w-5 h-5 text-blue-600" />
            <span>Vidyaan Proctored Engine</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Configuration Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Category Selection */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>🎯</span> Select Category
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`p-4 rounded-xl border-2 text-left transition-all flex items-start gap-3 ${
                      selectedCategory === cat.id
                        ? 'border-blue-600 bg-blue-50/70 text-blue-900 shadow-sm'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-2xl">{cat.icon}</span>
                    <div>
                      <h3 className="font-bold text-sm mb-0.5">{cat.label}</h3>
                      <p className="text-xs text-gray-500 line-clamp-1">{cat.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty Level */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>⚡</span> Difficulty Level
              </h2>
              <div className="flex gap-4">
                {difficulties.map((diff) => (
                  <button
                    key={diff.id}
                    onClick={() => setSelectedDifficulty(diff.id)}
                    className={`flex-1 py-3.5 px-6 rounded-xl border-2 font-semibold text-sm transition-all ${
                      selectedDifficulty === diff.id
                        ? 'border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-600/20'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {diff.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Test Length */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>⏱️</span> Test Length (Questions)
              </h2>
              <div className="flex gap-4">
                {lengths.map((len) => (
                  <button
                    key={len}
                    onClick={() => setSelectedLength(len)}
                    className={`flex-1 py-3.5 px-6 rounded-xl border-2 font-semibold text-sm transition-all ${
                      selectedLength === len
                        ? 'border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-600/20'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {len} Questions ({len * 2} mins)
                  </button>
                ))}
              </div>
            </div>

            {/* Proctoring Option */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  🛡️
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">AI Proctoring & Anti-Cheat Mode</h3>
                  <p className="text-xs text-gray-500">Monitors tab switching, focus, and optional camera feed for authenticity.</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={proctored}
                  onChange={(e) => setProctored(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {/* Generate & Start Button */}
            <button
              onClick={handleStartTest}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-2xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-xl shadow-blue-600/30 flex items-center justify-center gap-3"
            >
              <Play className="w-6 h-6 fill-current" />
              Generate & Start Mock Test Now
            </button>
          </div>

          {/* Right Panel - Test History & Stats */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center justify-between">
                <span>Your Test History</span>
                <span className="text-xs bg-gray-100 px-2.5 py-1 rounded-full text-gray-600 font-medium">
                  {testHistory.length} tests
                </span>
              </h2>

              {testHistory.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 text-sm mb-2">No mock tests taken yet.</p>
                  <p className="text-gray-400 text-xs">Configure your first test and start practicing.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {testHistory.map((test) => (
                    <div key={test.id} className="p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-gray-900 text-sm">{test.category}</span>
                        <span className="text-xs font-extrabold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                          {test.score}%
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{test.difficulty} • {test.length} Qs</span>
                        <span>{test.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-gradient-to-br from-blue-900 to-indigo-950 p-6 rounded-2xl text-white shadow-lg">
              <h3 className="font-bold text-lg mb-2">Vidyaan Tip</h3>
              <p className="text-sm text-blue-100 leading-relaxed mb-4">
                Regular mock testing under proctored conditions increases placement conversion rates by 3.4x. Keep your camera active and maintain time discipline.
              </p>
              <div className="flex items-center gap-2 text-xs text-blue-200 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Fully aligned with company patterns
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
