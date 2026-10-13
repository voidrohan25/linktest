'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Check } from 'lucide-react';

export default function PlansPage() {
  const [selectedPlan, setSelectedPlan] = useState('free');

  return (
    <DashboardLayout>
      <div className="max-w-6xl">
        <h1 className="text-2xl font-bold mb-2">Plans</h1>
        <p className="text-gray-500 mb-8">Pick the plan that fits how hard you're preparing.</p>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm mb-8">
          <h2 className="font-bold text-lg">You're on the <span className="text-blue-600">Free</span> plan.</h2>
          <p className="text-gray-600 text-sm">Today: 0 / 1 mock tests · 0 / 1 coding · this week: 0 / 1 AI interviews.</p>
        </div>

        <div className="grid grid-cols-4 gap-6">
          {[
            { name: 'Free', price: 'Free', current: true, features: ['1 mock test / day', '1 AI interview / week', '1 coding problem / day', 'Custom Test: not included', 'Progress tracking'], buttons: [{ text: 'Included', style: 'bg-gray-100 text-gray-600' }] },
            { name: 'Trial', price: '₹21', period: 'One-time, 3-day access', features: ['2 mock tests / day', '3 AI interviews / week', '2 coding problems / day', 'Custom Test: included', 'Custom Test from a job description', '3-day access, one-time purchase'], buttons: [{ text: 'Get Trial — ₹21', style: 'bg-blue-600 text-white hover:bg-blue-700' }] },
            { name: 'Weekly', price: '₹49', period: '/ week', features: ['3 mock tests / day', '5 AI interviews / week', '3 coding problems / day', 'Custom Test: included', 'Custom Test from a job description', 'Full proctored practice'], buttons: [{ text: 'Get Weekly — ₹49', style: 'bg-blue-600 text-white hover:bg-blue-700' }] },
            { name: 'Monthly', price: '₹149', period: '/ month', features: ['9 mock tests / day', '5 AI interviews / week', '3 coding problems / day', 'Custom Test: included', 'Custom Test from a job description', 'Full proctored practice', 'AI exam categories + full QA mode'], buttons: [{ text: 'Get Monthly — ₹149', style: 'bg-blue-600 text-white hover:bg-blue-700' }] },
          ].map((plan) => (
            <div key={plan.name} className={`bg-white rounded-xl border-2 p-6 shadow-sm ${plan.current ? 'border-blue-200 bg-blue-50/50' : 'border-gray-200'}`}>
              <h3 className="font-bold text-lg mb-1">{plan.name}</h3>
              {plan.current && <span className="inline-block bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-full mb-3">Current</span>}
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-3xl font-extrabold">{plan.price}</span>
                {plan.period ? <span className="text-sm text-gray-500">{plan.period}</span> : null}
              </div>

              <ul className="mt-4 mb-6 space-y-3 text-sm">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={`${plan.buttons[0].style} w-full py-3 rounded-lg font-semibold text-sm transition-colors`}>
                {plan.buttons[0].text}
              </button>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}