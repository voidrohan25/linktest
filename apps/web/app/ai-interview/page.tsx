'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';

export default function AIInterviewPage() {
  const [selectedExperience, setSelectedExperience] = useState('fresher');
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const roles = [
    {
      id: 'software-engineer',
      title: 'Software Engineer',
      description: 'Backend and full-stack fundamentals — data structures, one language deep, databases, HTTP and trade-offs.',
      skills: ['DSA', 'System basics', 'Databases', 'Problem solving'],
    },
    {
      id: 'data-analyst',
      title: 'Data Analyst',
      description: 'SQL, dashboards and telling a clear story with data to non-technical stakeholders.',
      skills: ['SQL', 'Statistics', 'Dashboards', 'Storytelling'],
    },
    {
      id: 'core-electronics',
      title: 'Core Electronics Engineer',
      description: 'Embedded systems — microcontrollers, datasheets, and debugging hardware and firmware from first principles.',
      skills: ['Digital electronics', 'Embedded C', 'UART / SPI / I2C', 'Signals'],
    },
    {
      id: 'hr-behavioural',
      title: 'HR / Behavioural Round',
      description: 'Motivation, teamwork, handling failure and self-awareness — answered with the situation-action-result structure.',
      skills: ['Communication', 'Self-awareness', 'Teamwork', 'Structure'],
    },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">AI Interview</h1>

        {/* Experience Level Selection */}
        <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm mb-8">
          <h2 className="text-lg font-semibold mb-6">Your experience level</h2>
          <select
            value={selectedExperience}
            onChange={(e) => setSelectedExperience(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="fresher">Fresher (final year)</option>
            <option value="experience1">1 year experience</option>
            <option value="experience2">2 years experience</option>
            <option value="experience3">3+ years experience</option>
          </select>
        </div>

        {/* Role Selection Grid */}
        <div className="space-y-6">
          <h2 className="text-lg font-semibold">Choose a role</h2>
          <div className="grid grid-cols-2 gap-6">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`p-6 rounded-xl border-2 text-left transition-all ${
                  selectedRole === role.id
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <h3 className={`text-lg font-bold mb-2 ${
                  selectedRole === role.id ? 'text-blue-900' : 'text-gray-900'
                }`}>
                  {role.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{role.description}</p>
                <div className="flex flex-wrap gap-2">
                  {role.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        selectedRole === role.id
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Start Button */}
        {selectedRole && (
          <button className="w-full mt-8 bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors">
            Start interview
          </button>
        )}
      </div>
    </DashboardLayout>
  );
}
