import { NextResponse } from 'next/server';
import { supabase } from '@/lib/db/supabase';

export async function GET(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  const { id } = params;

  const { data, error } = await supabase
    .from('interview_sessions')
    .select('*, interview_turns(*)')
    .eq('id', id)
    .single();

  if (error) {
    return NextResponse.json({ error: 'Failed to fetch interview session', details: error.message }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json({ error: 'Interview session not found' }, { status: 404 });
  }

  return NextResponse.json(data);
}

export async function PUT(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  const { id } = params;
  const body = await request.json();
  const { state, completed_at, settings_json } = body;

  const updateData: Record<string, any> = {};
  if (state) updateData.state = state;
  if (completed_at) updateData.completed_at = completed_at;
  if (settings_json) updateData.settings_json = settings_json;

  const { data, error } = await supabase
    .from('interview_sessions')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: 'Failed to update interview session', details: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function DELETE(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  const { id } = params;

  const { error } = await supabase
    .from('interview_sessions')
    .delete()
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: 'Failed to delete interview session', details: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: 'Interview session deleted successfully' });
}
