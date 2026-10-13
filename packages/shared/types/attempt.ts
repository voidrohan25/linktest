export type AttemptState =
  | 'draft'
  | 'awaiting_approval'
  | 'ready'
  | 'in_progress'
  | 'submitted'
  | 'auto_submitted'
  | 'expired'
  | 'cancelled';

export interface TestAttempt {
  id: string;
  assignment_id: string;
  test_version_id: string;
  student_id: string;
  attempt_number: number;
  state: AttemptState;
  requested_at?: Date;
  approved_at?: Date;
  started_at?: Date;
  deadline_at?: Date;
  submitted_at?: Date;
  score?: number;
  max_score?: number;
  created_at: Date;
}

export interface AttemptAnswer {
  id: string;
  attempt_id: string;
  question_id: string;
  answer_json: any;
  saved_at: Date;
  is_final: boolean;
}

export interface AttemptEvent {
  id: string;
  attempt_id: string;
  event_type: string;
  severity?: string;
  weight?: number;
  occurred_at: Date;
  metadata_json?: any;
}
