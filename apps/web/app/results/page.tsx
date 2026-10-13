'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';

export default function ResultsPage() {
  return (
    <DashboardLayout>
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Results</h1>
        <p className="text-gray-600 mb-6">Your attendance and answers, class by class.</p>

        <div className="bg-white p-16 rounded-xl border border-gray-100 shadow-sm text-center">
          <h2 className="text-2xl font-semibold mb-4">Nothing to show yet</h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            Once you've joined a batch, attended a class, and it has ended, your recording for it — every question, your answer, and the right one — shows up here.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}