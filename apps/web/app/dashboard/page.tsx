'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Clock, MessageCircle, FileText, BarChart3 } from 'lucide-react';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="max-w-6xl">
        <h1 className="text-3xl font-bold mb-2">Welcome back, Rohan</h1>
        <p className="text-gray-500 mb-8">Practice and training progress, kept separate.</p>

        {/* Welcome / Call to Action */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 p-8 rounded-2xl shadow-lg mb-8 text-white">
          <h2 className="text-2xl font-bold mb-2">Your next step: sit your first mock test</h2>
          <p className="text-blue-100 mb-6">See exactly where you stand before diving deeper.</p>
          <div className="flex gap-4">
            <a href="/mock-tests" className="bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-md">Take a mock test</a>
            <a href="/progress" className="border border-white/30 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">View progress</a>
          </div>
        </div>

        {/* Stats Section */}
        <h3 className="text-xl font-bold mb-4">Practice</h3>
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Mock Tests', value: '0', icon: Clock },
            { label: 'Mock Avg Score', value: '—', icon: BarChart3 },
            { label: 'Interviews', value: '1', icon: MessageCircle },
            { label: 'Problems Solved', value: '0', icon: FileText },
          ].map((stat) => (
            <div key={stat.label} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-3">
                <stat.icon className="w-5 h-5 text-blue-600" />
                <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">{stat.label}</span>
              </div>
              <p className="text-3xl font-extrabold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>

        <p className="text-gray-500 mb-4">Average interview score: 15 / 100.</p>

        {/* Recent Tests */}
        <h3 className="text-xl font-bold mb-4 mt-8">Recent Activity</h3>
        <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-gray-500 text-center">No recent practice activity. Take your first mock test to start.</p>
        </div>
      </div>
    </DashboardLayout>
  );
}