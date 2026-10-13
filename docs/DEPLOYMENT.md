# Deploy Configuration

Ensure the following environment variables are set in your Vercel deployment:

- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase Project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase Anonymous Key
- `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase Service Role Key (Keep strictly secure!)
- `DATABASE_URL`: Your Postgres connection string

### Build and Deployment Steps
1. Push your code to a GitHub repository.
2. Connect the repository to Vercel.
3. Configure the environment variables above in the Vercel project settings.
4. Set the Framework Preset to "Next.js".
5. Deploy.
