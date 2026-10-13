'use client';

import { LayoutDashboard, Clock, BotMessageSquare, CodeXml, Users, FileText, BarChart3, CreditCard, Bell, LogOut, CheckSquare } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const practiceItems = [
    { name: 'Mock Tests', href: '/mock-tests', icon: Clock },
    { name: 'AI Interview', href: '/ai-interview', icon: BotMessageSquare },
    { name: 'Coding', href: '/coding', icon: CodeXml },
    { name: 'Adaptive Practice', href: '/adaptive', icon: LayoutDashboard },
  ];

  const trainingItems = [
    { name: 'Batches', href: '/batches', icon: Users },
  ];

  const progressItems = [
    { name: 'Progress', href: '/progress', icon: BarChart3 },
    { name: 'Results', href: '/results', icon: FileText },
  ];

  const accountItems = [
    { name: 'Plans', href: '/plans', icon: CreditCard },
    { name: 'Notifications', href: '/notifications', icon: Bell },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 flex items-center gap-2">
          <CheckSquare className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-blue-900">Vidyaan</h1>
        </div>
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-4">Practice</div>
          {practiceItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm ${
                pathname === item.href ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          ))}

          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-8">Training</div>
          {trainingItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm ${
                pathname === item.href ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          ))}

          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-8">Progress</div>
          {progressItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm ${
                pathname === item.href ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          ))}

          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-8">Account</div>
          {accountItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm ${
                pathname === item.href ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">RY</div>
            <div className="flex-1">
              <p className="text-sm font-medium">Rohan Yewale</p>
              <p className="text-xs text-gray-500">Free plan</p>
            </div>
          </div>
          <Link href="/login" className="flex items-center gap-3 px-4 py-2 mt-2 text-gray-600 hover:bg-gray-50 rounded-lg text-sm">
            <LogOut className="w-5 h-5" />
            Sign out
          </Link>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  );
}