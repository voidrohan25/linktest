import { NextResponse } from 'next/server';
import { supabase } from '@/lib/db/supabase';

async function verifyAuth(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { user: null, error: new Error('Missing or malformed Authorization header') };
  }
  const token = authHeader.split(' ')[1];
  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error || !user) {
    return { user: null, error: new Error('Invalid token') };
  }
  return { user, error: null };
}

function validateClassPayload(payload: any) {
  const required = ['name', 'start_time', 'end_time'];
  const missing = required.filter((k) => !(k in payload));
  if (missing.length) {
    return `Missing required fields: ${missing.join(', ')}`;
  }
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
