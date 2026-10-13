import { NextResponse } from 'next/server';
import { supabase } from '@/lib/db/supabase';

// Helper to get tenant_id / user info from session
// In production, use proper Auth middleware
async function getAuthenticatedUser() {
  // Mocking/Stubbing for now
  return { tenant_id: 'some-tenant-id', user_id: 'some-user-id' };
}

export async function GET(request: Request) {
  const { tenant_id } = await getAuthenticatedUser();
  const { data, error } = await supabase
    .from('batches')
    .select('*')
    .eq('tenant_id', tenant_id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const { tenant_id, user_id } = await getAuthenticatedUser();
  const body = await request.json();

  const { data, error } = await supabase
    .from('batches')
    .insert([
      {
        ...body,
        tenant_id,
        created_by: user_id
      }
    ]);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
