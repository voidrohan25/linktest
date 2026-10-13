'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import { Bell } from 'lucide-react';

export default function NotificationsPage() {
  return (
    <DashboardLayout>
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold mb-4">Notifications</h1>
        <p className="text-gray-500 mb-8">Your account updates and alerts.</p>

        <div className="bg-white p-12 rounded-xl border border-gray-100 shadow-sm text-center">
          <Bell className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">No notifications yet</h2>
          <p className="text-gray-500">You'll see updates about your batches and practice progress here.</p>
        </div>
      </div>
    </DashboardLayout>
  );
}