export type QuestionType = 'mcq_single' | 'mcq_multiple' | 'true_false' | 'short_text';

export interface Question {
  id: string;
  tenant_id: string;
  type: QuestionType;
  prompt: string;
  options_json?: any;
  answer_key_json?: any;
  explanation?: string;
  marks: number;
  negative_marks: number;
  difficulty: 'easy' | 'medium' | 'hard';
  topic?: string;
  status: 'draft' | 'reviewed' | 'published' | 'archived';
  version: number;
  created_by: string;
  created_at: Date;
  updated_at: Date;
}

export interface TestTemplate {
  id: string;
  tenant_id?: string;
  title: string;
  description?: string;
  status: 'draft' | 'published' | 'archived';
  created_by: string;
  created_at: Date;
}

export interface TestAssignment {
  id: string;
  tenant_id: string;
  test_version_id: string;
  batch_id: string;
  available_from: Date;
  available_until: Date;
  duration_seconds: number;
  max_attempts: number;
  approval_required: boolean;
  status: 'scheduled' | 'active' | 'closed';
}
