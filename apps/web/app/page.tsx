'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CheckSquare, ArrowRight, ShieldCheck, Zap, Award, Sparkles, BotMessageSquare, Code2, Users, BarChart3 } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 via-indigo-950 to-slate-950 text-white selection:bg-blue-600 selection:text-white">
      {/* Header / Navbar */}
      <header className="max-w-7xl mx-auto flex items-center justify-between px-6 py-6">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/30 group-hover:scale-105 transition-transform">
            <CheckSquare className="w-6 h-6" />
          </div>
          <span className="text-2xl font-black tracking-tight text-white">Vidyaan</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-semibold text-blue-200 hover:text-white transition-colors">
            Sign in
          </Link>
          <Link href="/login" className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/30">
            Get Started Free
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-5xl mx-auto px-6 py-20 text-center relative">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900/40 border border-blue-500/30 text-blue-300 text-xs font-bold uppercase tracking-wider mb-8">
          <Sparkles className="w-4 h-4 text-blue-400" />
          India's Elite Test Prep & AI Interview Platform
        </div>

        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8 leading-tight">
          Master your placements with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400">Vidyaan</span>
        </h1>

        <p className="text-lg md:text-xl text-blue-100/80 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
          Proctored mock tests, AI-driven behavioral and technical interviews, adaptive coding practice, and college batch management — all in one powerful suite.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-20">
          <Link href="/mock-tests" className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/40 flex items-center justify-center gap-3">
            Start Free Mock Test
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link href="/dashboard" className="border-2 border-white/20 bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3 backdrop-blur-sm">
            Explore Dashboard
          </Link>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mb-20">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl hover:border-blue-500/50 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">Proctored Assessments</h3>
            <p className="text-blue-200/70 text-sm leading-relaxed">
              Real-time webcam monitoring and screen proctoring ensuring 100% test integrity and authentic rankings.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl hover:border-blue-500/50 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <BotMessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">AI Interviewer</h3>
            <p className="text-blue-200/70 text-sm leading-relaxed">
              Practice role-specific technical and HR interviews with instant feedback on communication and problem-solving.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl hover:border-blue-500/50 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-cyan-600/20 text-cyan-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Code2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">Adaptive Coding & QA</h3>
            <p className="text-blue-200/70 text-sm leading-relaxed">
              Curated coding problems and quantitative aptitude tests designed specifically for top-tier college placements.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-white/10 pt-8 pb-12 text-center text-sm text-blue-300/60 font-medium">
          © {new Date().getFullYear()} Vidyaan. All rights reserved. Built for elite candidate success.
        </div>
      </main>
    </div>
  );
}
