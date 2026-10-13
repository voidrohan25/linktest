import { NextResponse } from 'next/server';
import { supabase } from '@/lib/db/supabase';

export async function POST(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const attemptId = params.id;
  const body = await request.json();
  const { question_id, answer_json } = body;

  const { data, error } = await supabase
    .from('attempt_answers')
    .upsert({
      attempt_id: attemptId,
      question_id,
      answer_json,
      is_final: false
    });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ message: 'Answer saved', data });
}
