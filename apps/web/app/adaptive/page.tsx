'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';

export default function AdaptivePracticePage() {
  return (
    <DashboardLayout>
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold mb-4">Adaptive Practice</h1>
        <p className="text-gray-600 mb-8">A ten-question set built from your own weak spots. Take it whenever you like.</p>

        <div className="bg-white p-12 rounded-xl border border-gray-100 shadow-sm text-center">
          <h2 className="text-xl font-semibold mb-4">Join a batch first</h2>
          <p className="text-gray-500 max-w-md mx-auto">
            Practice is drawn from the questions your batch's classes use. Once you're in a batch and a few classes have run, your set will be ready here.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}