
-- Drop the existing tables and create a single simplified table
DROP TABLE IF EXISTS public.job_matches;
DROP TABLE IF EXISTS public.user_skills;
DROP TABLE IF EXISTS public.skill_assessments;

-- Create a single table to store everything we need
CREATE TABLE public.skill_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL DEFAULT gen_random_uuid(),
  total_skills_shown INTEGER NOT NULL,
  skills_matched INTEGER NOT NULL,
  matched_skills JSONB, -- Array of skill objects {id, name, category}
  location TEXT,
  job_matches JSONB, -- Array of job match objects
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Since this is anonymous, we don't need RLS - make it publicly accessible
ALTER TABLE public.skill_sessions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous access
CREATE POLICY "Allow anonymous access to skill sessions" 
  ON public.skill_sessions 
  FOR ALL 
  USING (true)
  WITH CHECK (true);
