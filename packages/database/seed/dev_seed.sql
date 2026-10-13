-- Seed Data
-- Insert a sample tenant
INSERT INTO tenants (id, name, slug, settings)
VALUES (uuid_generate_v4(), 'Development Institute', 'dev-institute', '{}')
ON CONFLICT DO NOTHING;

-- Note: User creation should happen through Auth provider (Supabase/NextAuth)
-- These seed files would ideally be run after Auth setup.
