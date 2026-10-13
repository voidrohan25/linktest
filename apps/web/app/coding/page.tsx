'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import { Code2 } from 'lucide-react';

export default function CodingPage() {
  return (
    <DashboardLayout>
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold mb-4">Coding</h1>
        <p className="text-gray-600 mb-8">Solve coding problems and track your progress.</p>

        <div className="bg-white p-12 rounded-xl border border-gray-100 shadow-sm text-center">
          <Code2 className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-4">Start coding practice</h2>
          <p className="text-gray-500 max-w-md mx-auto mb-6">
            Solve coding problems and track your progress.
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700">
            Start Coding
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}