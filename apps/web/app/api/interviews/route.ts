import { NextResponse } from 'next/server';
import { supabase } from '@/lib/db/supabase';

// Helper to get authenticated user - using simple mock pattern found in other routes
async function getAuthenticatedUser() {
  // In a real application, you would validate the session here using supabase.auth.getSession()
  // For now, mirroring the mock approach found in the batches API
  return { user_id: 'some-user-id' };
}

// GET /api/interviews - List all interview sessions for the user
export async function GET(request: Request) {
  const { user_id } = await getAuthenticatedUser();
  
  const { data, error } = await supabase
    .from('interview_sessions')
    .select('*')
    .eq('student_id', user_id)
    .order('started_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: 'Failed to fetch interview sessions', details: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// POST /api/interviews - Start a new interview session
export async function POST(request: Request) {
  try {
    const { user_id } = await getAuthenticatedUser();
    const body = await request.json();
    const { template_id, settings_json } = body;

    if (!template_id) {
      return NextResponse.json({ error: 'template_id is required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('interview_sessions')
      .insert({
        template_id,
        student_id: user_id,
        state: 'draft',
        settings_json,
        started_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: 'Failed to start interview', details: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error starting interview:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
