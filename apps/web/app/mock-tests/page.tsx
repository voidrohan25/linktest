'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { AlertCircle } from 'lucide-react';

export default function MockTestsPage() {
  const [selectedCategory, setSelectedCategory] = useState('quantitative');
  const [selectedDifficulty, setSelectedDifficulty] = useState('medium');
  const [selectedLength, setSelectedLength] = useState(20);
  const [proctored, setProctored] = useState(true);

  const categories = [
    { id: 'quantitative', label: 'Quantitative Aptitude' },
    { id: 'logical', label: 'Logical Reasoning' },
    { id: 'verbal', label: 'Verbal Ability' },
    { id: 'data', label: 'Data Interpretation' },
    { id: 'core', label: 'Branch Core' },
    { id: 'full', label: 'Full Online Assessment' },
  ];

  const difficulties = ['Easy', 'Medium', 'Hard'];
  const lengths = [10, 20, 30];

  return (
    <DashboardLayout>
      <div className="max-w-6xl">
        <h1 className="text-3xl font-bold mb-8">Mock Tests</h1>

        <div className="grid grid-cols-3 gap-8">
          {/* Configuration Panel */}
          <div className="col-span-2 space-y-8">
            {/* Category Selection */}
            <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
              <h2 className="text-lg font-semibold mb-6">Category</h2>
              <div className="grid grid-cols-2 gap-4">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`p-4 rounded-lg border-2 text-left font-medium transition-all ${
                      selectedCategory === cat.id
                        ? 'border-blue-600 bg-blue-50 text-blue-900'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty Selection */}
            <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
              <h2 className="text-lg font-semibold mb-6">Difficulty Level</h2>
              <div className="flex gap-4">
                {difficulties.map((diff) => (
                  <button
                    key={diff}
                    onClick={() => setSelectedDifficulty(diff.toLowerCase())}
                    className={`px-6 py-3 rounded-lg border-2 font-medium transition-all ${
                      selectedDifficulty === diff.toLowerCase()
                        ? 'border-blue-600 bg-blue-50 text-blue-900'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>

            {/* Test Length Selection */}
            <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
              <h2 className="text-lg font-semibold mb-6">Test Length</h2>
              <div className="flex gap-4">
                {lengths.map((len) => (
                  <button
                    key={len}
                    onClick={() => setSelectedLength(len)}
                    className={`px-6 py-3 rounded-lg border-2 font-medium transition-all ${
                      selectedLength === len
                        ? 'border-blue-600 bg-blue-50 text-blue-900'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {len} Questions
                  </button>
                ))}
              </div>
            </div>

            {/* Proctoring Option */}
            <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-gray-900">Proctored Test</span>
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={proctored}
                    onChange={(e) => setProctored(e.target.checked)}
                    className="w-5 h-5 rounded border-gray-300"
                  />
                </label>
              </div>
              <p className="text-sm text-gray-500 mt-2">We monitor your screen and camera during the test for authenticity.</p>
            </div>

            {/* Start Button */}
            <button className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors">
              Start mock test
            </button>
          </div>

          {/* Right Panel - Test List */}
          <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm h-fit">
            <h2 className="text-lg font-semibold mb-6">Your Tests</h2>
            <div className="text-center py-8">
              <p className="text-gray-500 text-sm mb-4">No mock tests yet</p>
              <p className="text-gray-400 text-xs">Generate your first test to get started</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
