'use client';

import { useState } from 'react';
import { supabase } from '@/lib/db/supabase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    await supabase.auth.signInWithPassword({ email, password });
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="border p-2" />
      <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="border p-2" />
      <button onClick={handleLogin} className="bg-blue-500 text-white p-2">Login</button>
    </div>
  );
}
