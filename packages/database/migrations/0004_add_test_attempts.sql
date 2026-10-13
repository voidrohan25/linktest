-- Test Attempt and Proctoring Schema
-- Managed state for test participants, answers, and proctoring events.

-- Test Attempts
CREATE TABLE test_attempts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    assignment_id UUID NOT NULL REFERENCES test_assignments(id) ON DELETE CASCADE,
    test_version_id UUID NOT NULL REFERENCES test_versions(id) ON DELETE RESTRICT,
    student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    attempt_number INT NOT NULL,
    state VARCHAR(50) DEFAULT 'draft', -- draft, awaiting_approval, ready, in_progress, submitted, auto_submitted, expired, cancelled
    requested_at TIMESTAMP WITH TIME ZONE,
    approved_at TIMESTAMP WITH TIME ZONE,
    started_at TIMESTAMP WITH TIME ZONE,
    deadline_at TIMESTAMP WITH TIME ZONE,
    submitted_at TIMESTAMP WITH TIME ZONE,
    submit_reason VARCHAR(100),
    score NUMERIC(5,2),
    max_score NUMERIC(5,2),
    review_status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Attempt Answers
CREATE TABLE attempt_answers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    attempt_id UUID NOT NULL REFERENCES test_attempts(id) ON DELETE CASCADE,
    question_id UUID NOT NULL REFERENCES questions(id) ON DELETE RESTRICT,
    answer_json JSONB,
    saved_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_final BOOLEAN DEFAULT FALSE
);

-- Attempt Proctoring Events
CREATE TABLE attempt_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    attempt_id UUID NOT NULL REFERENCES test_attempts(id) ON DELETE CASCADE,
    event_type VARCHAR(100) NOT NULL,
    severity VARCHAR(50),
    weight NUMERIC(5,2),
    confidence NUMERIC(3,2),
    occurred_at TIMESTAMP WITH TIME ZONE NOT NULL,
    received_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    metadata_json JSONB,
    policy_version VARCHAR(50)
);

-- Test Approvals
CREATE TABLE test_approvals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    attempt_id UUID NOT NULL REFERENCES test_attempts(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    trainer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    status VARCHAR(50) NOT NULL,
    reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    decided_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_attempts_assignment ON test_attempts(assignment_id);
CREATE INDEX idx_attempts_student ON test_attempts(student_id);
CREATE INDEX idx_attempt_answers_attempt ON attempt_answers(attempt_id);
CREATE INDEX idx_attempt_events_attempt ON attempt_events(attempt_id);
