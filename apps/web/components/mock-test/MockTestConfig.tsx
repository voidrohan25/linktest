'use client';

import { useState } from 'react';
import { Clock, ShieldCheck } from 'lucide-react';

interface QuestionConfig {
  category: string;
  difficulty: string;
  length: number;
  proctored: boolean;
}

export default function MockTestConfig() {
  const [config, setConfig] = useState<QuestionConfig>({
    category: 'Quantitative Aptitude',
    difficulty: 'Medium',
    length: 20,
    proctored: true,
  });

  const categories = [
    'Quantitative Aptitude',
    'Logical Reasoning',
    'Verbal Ability',
    'Data Interpretation',
    'Branch Core',
    'Full Online Assessment',
  ];

  const difficulties = ['Easy', 'Medium', 'Hard'];
  const lengths = [10, 20, 30];

  return (
    <div className="bg-white rounded-xl shadow-md p-8 max-w-md">
      <h2 className="text-xl font-bold mb-6 text-blue-900">Mock Tests</h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
          <select
            value={config.category}
            onChange={(e) => setConfig({ ...config, category: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
          >
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Difficulty</label>
          <div className="flex gap-2">
            {difficulties.map((d) => (
              <button
                key={d}
                onClick={() => setConfig({ ...config, difficulty: d })}
                className={`flex-1 py-2 rounded-lg font-medium text-sm transition-colors ${
                  config.difficulty === d
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Length</label>
          <div className="flex gap-2">
            {lengths.map((len) => (
              <button
                key={len}
                onClick={() => setConfig({ ...config, length: len })}
                className={`flex-1 py-2 rounded-lg font-medium text-sm transition-colors ${
                  config.length === len
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {len} {len === 1 ? 'Question' : 'Questions'}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <ShieldCheck className="w-5 h-5 text-blue-600" />
          <label className="text-sm font-medium text-gray-700 flex-1">Proctored</label>
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={config.proctored}
              onChange={(e) => setConfig({ ...config, proctored: e.target.checked })}
              className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
          </label>
        </div>
        <p className="text-xs text-gray-500 pl-8 -mt-2">We monitor your screen and camera during the test for authenticity.</p>
      </div>

      <a href="/tests/start" className="mt-8 block w-full bg-blue-600 hover:bg-blue-700 text-white text-center font-bold py-3 rounded-lg transition-colors shadow-md">
        Start Mock Test
      </a>
    </div>
  );
}