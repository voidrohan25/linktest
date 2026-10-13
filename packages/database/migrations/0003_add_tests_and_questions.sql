-- Questions and Tests Schema
-- Supporting Question Bank, Tests, Versioning, and Assignments

-- Questions Bank
CREATE TABLE questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL, -- 'mcq_single', 'mcq_multiple', 'true_false', 'short_text'
    prompt TEXT NOT NULL,
    options_json JSONB,
    answer_key_json JSONB,
    explanation TEXT,
    marks NUMERIC(5,2) DEFAULT 1.0,
    negative_marks NUMERIC(5,2) DEFAULT 0.0,
    difficulty VARCHAR(20) DEFAULT 'medium', -- 'easy', 'medium', 'hard'
    topic VARCHAR(100),
    status VARCHAR(50) DEFAULT 'draft',
    version INT DEFAULT 1,
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Test Templates
CREATE TABLE test_templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE, -- NULL for global/default tests
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'draft',
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Immutable Test Versions
CREATE TABLE test_versions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    test_template_id UUID NOT NULL REFERENCES test_templates(id) ON DELETE CASCADE,
    version INT NOT NULL,
    settings_json JSONB DEFAULT '{}',
    published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(test_template_id, version)
);

-- Join table: Test Version to Questions
CREATE TABLE test_questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    test_version_id UUID NOT NULL REFERENCES test_versions(id) ON DELETE CASCADE,
    question_id UUID NOT NULL REFERENCES questions(id) ON DELETE RESTRICT,
    question_version INT NOT NULL,
    position INT NOT NULL,
    marks_override NUMERIC(5,2),
    settings_json JSONB DEFAULT '{}'
);

-- Test Assignments (Scheduled Instances to Batches)
CREATE TABLE test_assignments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    test_version_id UUID NOT NULL REFERENCES test_versions(id) ON DELETE RESTRICT,
    batch_id UUID NOT NULL REFERENCES batches(id) ON DELETE CASCADE,
    available_from TIMESTAMP WITH TIME ZONE NOT NULL,
    available_until TIMESTAMP WITH TIME ZONE NOT NULL,
    duration_seconds INT NOT NULL,
    max_attempts INT DEFAULT 1,
    approval_required BOOLEAN DEFAULT FALSE,
    proctoring_policy_json JSONB DEFAULT '{}',
    result_release_mode VARCHAR(50) DEFAULT 'immediate',
    status VARCHAR(50) DEFAULT 'scheduled',
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_questions_tenant ON questions(tenant_id);
CREATE INDEX idx_test_templates_tenant ON test_templates(tenant_id);
CREATE INDEX idx_test_assignments_batch ON test_assignments(batch_id);
