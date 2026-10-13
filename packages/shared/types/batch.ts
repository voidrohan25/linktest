export type BatchStatus = 'draft' | 'active' | 'archived';

export interface Batch {
  id: string;
  tenant_id: string;
  name: string;
  code: string;
  description?: string;
  status: BatchStatus;
  starts_at?: Date;
  ends_at?: Date;
  created_by: string;
  created_at: Date;
  updated_at: Date;
}

export interface BatchTrainer {
  batch_id: string;
  trainer_id: string;
}

export interface BatchStudent {
  batch_id: string;
  student_id: string;
  enrolled_at: Date;
  status: 'active' | 'inactive';
}
