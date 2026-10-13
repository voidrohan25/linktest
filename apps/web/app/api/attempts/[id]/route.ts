import { NextResponse } from 'next/server';
import { supabase } from '@/lib/db/supabase';

// GET /api/attempts/:id - Get a specific attempt by ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const { data, error } = await supabase
    .from('attempts')
    .select(`
      *,
      tests:test_templates(*),
      user_profiles:users(*)`)
    .eq('id', id)
    .single();

  if (error) {
    return NextResponse.json(
      { error: 'Failed to fetch attempt', details: error.message },
      { status: 500 }
    );
  }

  if (!data) {
    return NextResponse.json(
      { error: 'Attempt not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(data);
}

// PUT /api/attempts/:id - Update an attempt (submit answers, update status)
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = await request.json();

  // Validate attempt exists first
  const { data: existingAttempt, error: fetchError } = await supabase
    .from('attempts')
    .select('id, status, test_id, user_id, started_at, answers')
    .eq('id', id)
    .single();

  if (fetchError || !existingAttempt) {
    return NextResponse.json(
      { error: 'Attempt not found' },
      { status: 404 }
    );
  }

  // Prevent updating completed attempts
  if (existingAttempt.status === 'completed') {
    return NextResponse.json(
      { error: 'Cannot modify a completed attempt' },
      { status: 400 }
    );
  }

  // Handle answer submission
  const { answers, status, score, feedback } = body;

  const updateData: Record<string, any> = {};

  if (answers !== undefined) {
    updateData.answers = answers;
  }

  if (status) {
    updateData.status = status;
  }

  if (score !== undefined) {
    updateData.score = score;
  }

  if (feedback) {
    updateData.feedback = feedback;
  }

  // Auto-complete if status is set to completed but expires_at is not set
  if (status === 'completed' && !existingAttempt.expires_at) {
    updateData.completed_at = new Date().toISOString();
  }

  const { data, error } = await supabase
    .from('attempts')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return NextResponse.json(
      { error: 'Failed to update attempt', details: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}

// DELETE /api/attempts/:id - Delete an attempt (use with caution)
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const { data, error } = await supabase
    .from('attempts')
    .delete()
    .eq('id', id)
    .select();

  if (error) {
    return NextResponse.json(
      { error: 'Failed to delete attempt', details: error.message },
      { status: 500 }
    );
  }

  if (!data) {
    return NextResponse.json(
      { error: 'Attempt not found' },
      { status: 404 }
    );
  }

  return NextResponse.json({ message: 'Attempt deleted successfully' });
}