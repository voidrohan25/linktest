'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import { BarChart3 } from 'lucide-react';

export default function ProgressPage() {
  return (
    <DashboardLayout>
      <div className="max-w-6xl">
        <h1 className="text-3xl font-bold mb-8">Progress</h1>

        {/* Practice Stats */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Your progress</h2>
          <p className="text-gray-600 mb-6">Practice and training progress, kept separate.</p>

          <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm mb-6">
            <h3 className="text-lg font-semibold mb-6">Practice</h3>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-600">Mock tests · interviews · coding · adaptive practice</span>
            </div>

            <div className="grid grid-cols-4 gap-6">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Mock Tests</p>
                <p className="text-3xl font-bold text-gray-900">0</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Mock Avg Score</p>
                <p className="text-3xl font-bold text-gray-900">—</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Interviews</p>
                <p className="text-3xl font-bold text-gray-900">1</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Problems Solved</p>
                <p className="text-3xl font-bold text-gray-900">0</p>
              </div>
            </div>

            <p className="text-sm text-gray-600 mt-6">Average interview score: 15 / 100.</p>
          </div>

          {/* Training Section */}
          <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Training</h3>
            <p className="text-gray-600 mb-6">
              You're not in a college batch. Enter your organisation code on the Batches page — training progress (attendance, class quizzes, assignments) starts recording once you're enrolled.
            </p>
            <button className="px-6 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50">
              Find a batch
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
