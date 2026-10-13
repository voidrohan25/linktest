-- Live Sessions and AI Interviews

-- Live Classes
CREATE TABLE live_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id),
    batch_id UUID NOT NULL REFERENCES batches(id),
    trainer_id UUID NOT NULL REFERENCES profiles(id),
    title VARCHAR(255) NOT NULL,
    scheduled_start TIMESTAMP WITH TIME ZONE NOT NULL,
    scheduled_end TIMESTAMP WITH TIME ZONE NOT NULL,
    started_at TIMESTAMP WITH TIME ZONE,
    ended_at TIMESTAMP WITH TIME ZONE,
    provider_room_id VARCHAR(255),
    status VARCHAR(50) DEFAULT 'scheduled'
);

-- AI Intervew Practice
CREATE TABLE interview_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    template_id UUID NOT NULL, -- references interview_templates(id), defined elsewhere if kept separate
    student_id UUID NOT NULL REFERENCES profiles(id),
    state VARCHAR(50) DEFAULT 'draft',
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    settings_json JSONB
);

CREATE TABLE interview_turns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID NOT NULL REFERENCES interview_sessions(id) ON DELETE CASCADE,
    sequence INT NOT NULL,
    speaker VARCHAR(50) NOT NULL, -- 'ai', 'student'
    prompt_text TEXT,
    answer_text TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
