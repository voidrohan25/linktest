import { NextResponse } from 'next/server';
import { supabase } from '@/lib/db/supabase';

// Helper to extract and verify JWT token using Supabase Auth
async function verifyAuth(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { user: null, error: new Error('Missing or malformed Authorization header') };
  }
  const token = authHeader.split(' ')[1];
  // Supabase client can verify JWT via auth.getUser
  const { data: user, error } = await supabase.auth.api.getUser(token);
  if (error) {
    return { user: null, error: new Error('Invalid token') };
  }
  return { user, error: null };
}

// Validation utilities
function validateClassPayload(payload: any) {
  const required = ['name', 'start_time', 'end_time'];
  const missing = required.filter((k) => !(k in payload));
  if (missing.length) {
    return `Missing required fields: ${missing.join(', ')}`;
  }
  // Optional: add more validation (e.g., start_time < end_time)
  if (new Date(payload.start_time) >= new Date(payload.end_time)) {
    return 'start_time must be before end_time';
  }
  return null;
}

export async function GET(request: Request) {
  const { error, data } = await supabase.from('live_classes').select('*');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const { user, error: authError } = await verifyAuth(request);
  if (authError) return NextResponse.json({ error: authError.message }, { status: 401 });

  const payload = await request.json();
  const validationError = validateClassPayload(payload);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const { data, error } = await supabase.from('live_classes').insert([payload]);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}

export async function PUT(request: Request) {
  const { user, error: authError } = await verifyAuth(request);
  if (authError) return NextResponse.json({ error: authError.message }, { status: 401 });

  const payload = await request.json();
  const { id, ...updates } = payload;
  if (!id) return NextResponse.json({ error: 'Missing class id' }, { status: 400 });
  const validationError = validateClassPayload({ ...updates, id });
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }
  const { data, error } = await supabase
    .from('live_classes')
    .update(updates)
    .eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(request: Request) {
  const { user, error: authError } = await verifyAuth(request);
  if (authError) return NextResponse.json({ error: authError.message }, { status: 401 });

  const { id } = await request.json();
  if (!id) return NextResponse.json({ error: 'Missing class id' }, { status: 400 });
  const { data, error } = await supabase.from('live_classes').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true, deleted: data });
}
