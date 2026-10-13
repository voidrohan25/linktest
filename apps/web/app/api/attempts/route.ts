import { NextResponse } from 'next/server';
import { supabase } from '@/lib/db/supabase';

// GET /api/attempts - List all attempts with optional filtering
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const testId = searchParams.get('test_id');
  const userId = searchParams.get('user_id');
  const status = searchParams.get('status');

  let query = supabase
    .from('attempts')
    .select(`
      *,
      tests:test_templates(name, title)
    `)
    .order('started_at', { ascending: false });

  if (testId) {
    query = query.eq('test_id', testId);
  }

  if (userId) {
    query = query.eq('user_id', userId);
  }

  if (status) {
    query = query.eq('status', status);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json(
      { error: 'Failed to fetch attempts', details: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}

// POST /api/attempts - Start a new test attempt
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    const { test_id, user_id } = body;

    if (!test_id || !user_id) {
      return NextResponse.json(
        { error: 'Missing required fields: test_id and user_id are required' },
        { status: 400 }
      );
    }

    // Verify test exists
    const { data: test, error: testError } = await supabase
      .from('test_templates')
      .select('id, title, duration_minutes')
      .eq('id', test_id)
      .single();

    if (testError || !test) {
      return NextResponse.json(
        { error: 'Test not found' },
        { status: 404 }
      );
    }

    // Check for existing in-progress attempt by this user for this test
    const { data: existingAttempt } = await supabase
      .from('attempts')
      .select('id, status')
      .eq('test_id', test_id)
      .eq('user_id', user_id)
      .eq('status', 'in_progress')
      .single();

    if (existingAttempt) {
      return NextResponse.json(
        { error: 'An active attempt already exists for this test', attempt_id: existingAttempt.id },
        { status: 409 }
      );
    }

    // Create the attempt record
    const { data, error } = await supabase
      .from('attempts')
      .insert({
        test_id,
        user_id,
        status: 'in_progress',
        started_at: new Date().toISOString(),
        expires_at: new Date(
          Date.now() + test.duration_minutes * 60 * 1000
        ).toISOString(),
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: 'Failed to create attempt', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error creating attempt:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}