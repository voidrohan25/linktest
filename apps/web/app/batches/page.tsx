'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { QrCode, Users } from 'lucide-react';

export default function BatchesPage() {
  const [joinCode, setJoinCode] = useState('');

  return (
    <DashboardLayout>
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold mb-4">Batches</h1>
        <p className="text-gray-600 mb-8">Join your training programme with its batch join code.</p>

        <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
              <QrCode className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold">Have a batch code?</h2>
              <p className="text-gray-500 text-sm">Enter the code shared by your instructor or organisation.</p>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <input
              type="text"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value)}
              placeholder="Enter batch code..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700">
              Join Batch
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}