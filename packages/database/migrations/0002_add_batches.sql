-- Batch Management Schema
-- Creates batches, batch_trainers, and batch_students

CREATE TABLE batches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(20) UNIQUE NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'draft',
    starts_at TIMESTAMP WITH TIME ZONE,
    ends_at TIMESTAMP WITH TIME ZONE,
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE batch_trainers (
    batch_id UUID REFERENCES batches(id) ON DELETE CASCADE,
    trainer_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    PRIMARY KEY (batch_id, trainer_id)
);

CREATE TABLE batch_students (
    batch_id UUID REFERENCES batches(id) ON DELETE CASCADE,
    student_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status VARCHAR(50) DEFAULT 'active',
    PRIMARY KEY (batch_id, student_id)
);

CREATE INDEX idx_batches_tenant_id ON batches(tenant_id);
CREATE INDEX idx_batches_code ON batches(code);
CREATE INDEX idx_batch_trainers_trainer_id ON batch_trainers(trainer_id);
CREATE INDEX idx_batch_students_student_id ON batch_students(student_id);
