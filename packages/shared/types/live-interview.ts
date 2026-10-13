export interface LiveSession {
  id: string;
  batch_id: string;
  trainer_id: string;
  title: string;
  scheduled_start: Date;
  status: 'scheduled' | 'active' | 'ended';
}

export interface InterviewSession {
  id: string;
  template_id: string;
  student_id: string;
  state: 'draft' | 'in_progress' | 'completed';
  started_at: Date;
}
