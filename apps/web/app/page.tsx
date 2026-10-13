'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Clock, ShieldCheck } from 'lucide-react';

export default function TestsPage() {
  const [tests, setTests] = useState([]);

  useEffect(() => {
    setTests([
      { id: 1, name: 'Mock Test - Quantitative', status: 'Completed', score: 85 },
      { id: 2, name: 'Mock Test - Logical Reasoning', status: 'Pending', score: 0 },
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-950 to-black">
      <header className="flex items-center justify-between px-8 py-6">
        <Link href="/" className="text-2xl font-extrabold text-white tracking-tight">Vidyaan</Link>
        <Link href="/dashboard" className="text-blue-200 hover:text-white text-sm font-medium">Dashboard →</Link>
      </header>

      <main className="max-w-5xl mx-auto px-8 py-16 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight">
          Start with a mock test tonight.
        </h1>
        <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
          Register free, pick a category, and get a paper no one else is taking.
        </p>

        <div className="flex justify-center gap-4 mb-16">
          <Link href="/mock-tests" className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-900/50">Start free</Link>
          <Link href="/contact" className="border-2 border-white/20 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-colors">Talk to us about a college</Link>
        </div>
      </main>
    </div>
  );
}