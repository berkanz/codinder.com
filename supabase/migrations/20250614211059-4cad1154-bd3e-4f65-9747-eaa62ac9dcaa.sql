
-- Create a table for skill assessments (when users swipe through skills)
CREATE TABLE public.skill_assessments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  session_id UUID NOT NULL DEFAULT gen_random_uuid(),
  total_skills_shown INTEGER NOT NULL,
  skills_matched INTEGER NOT NULL,
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create a table for individual skill matches within an assessment
CREATE TABLE public.user_skills (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  assessment_id UUID REFERENCES public.skill_assessments(id) ON DELETE CASCADE NOT NULL,
  skill_id INTEGER NOT NULL,
  skill_name TEXT NOT NULL,
  skill_category TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create a table for job matches found for each assessment
CREATE TABLE public.job_matches (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  assessment_id UUID REFERENCES public.skill_assessments(id) ON DELETE CASCADE NOT NULL,
  job_title TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT NOT NULL,
  salary TEXT,
  apply_url TEXT NOT NULL,
  category TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS) to ensure users can only see their own data
ALTER TABLE public.skill_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_matches ENABLE ROW LEVEL SECURITY;

-- Create policies for skill_assessments
CREATE POLICY "Users can view their own assessments" 
  ON public.skill_assessments 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own assessments" 
  ON public.skill_assessments 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create policies for user_skills
CREATE POLICY "Users can view their own skills" 
  ON public.user_skills 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.skill_assessments 
      WHERE id = user_skills.assessment_id 
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create their own skills" 
  ON public.user_skills 
  FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.skill_assessments 
      WHERE id = user_skills.assessment_id 
      AND user_id = auth.uid()
    )
  );

-- Create policies for job_matches
CREATE POLICY "Users can view their own job matches" 
  ON public.job_matches 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.skill_assessments 
      WHERE id = job_matches.assessment_id 
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create their own job matches" 
  ON public.job_matches 
  FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.skill_assessments 
      WHERE id = job_matches.assessment_id 
      AND user_id = auth.uid()
    )
  );
