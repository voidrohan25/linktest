import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const { data: { session } } = await supabase.auth.getSession();

  // Protect routes starting with /dashboard, /batches, /tests, /questions, /interviews, /classes
  if (!session && (
      req.nextUrl.pathname.startsWith('/dashboard') ||
      req.nextUrl.pathname.startsWith('/batches') ||
      req.nextUrl.pathname.startsWith('/tests') ||
      req.nextUrl.pathname.startsWith('/questions') ||
      req.nextUrl.pathname.startsWith('/interviews') ||
      req.nextUrl.pathname.startsWith('/classes')
  )) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return res;
}
