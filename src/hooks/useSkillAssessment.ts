
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Skill {
  id: number;
  name: string;
  category: string;
}

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  salary: string;
  postedDate: string;
  applyUrl: string;
  category: string;
  requiredSkills: string[];
}

export const useSkillAssessment = () => {
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [matchedSkills, setMatchedSkills] = useState<Skill[]>([]);
  const [jobsSaved, setJobsSaved] = useState(false);
  const { toast } = useToast();

  const createSession = async (totalSkills: number, location: string) => {
    try {
      // Create anonymous session in the simplified table
      const { data, error } = await supabase
        .from('skill_sessions')
        .insert({
          total_skills_shown: totalSkills,
          skills_matched: 0,
          matched_skills: [],
          location: location || null,
          job_matches: null,
        })
        .select()
        .single();

      if (error) throw error;

      setCurrentSessionId(data.id);
      setMatchedSkills([]);
      setJobsSaved(false);
      console.log('Created anonymous session:', data.id);
      return data.id;
    } catch (error: any) {
      console.error('Error creating session:', error);
      toast({
        title: "Error",
        description: "Failed to create skill session",
        variant: "destructive",
      });
      return null;
    }
  };

  const addSkillMatch = async (skill: Skill) => {
    if (!currentSessionId) return;

    try {
      const updatedSkills = [...matchedSkills, skill];
      setMatchedSkills(updatedSkills);

      // Convert skills to plain objects for JSON storage
      const skillsForDb = updatedSkills.map(s => ({
        id: s.id,
        name: s.name,
        category: s.category
      }));

      const { error } = await supabase
        .from('skill_sessions')
        .update({
          skills_matched: updatedSkills.length,
          matched_skills: skillsForDb,
        })
        .eq('id', currentSessionId);

      if (error) throw error;
      console.log('Added skill match:', skill.name);
    } catch (error: any) {
      console.error('Error adding skill match:', error);
      toast({
        title: "Error",
        description: "Failed to save skill match",
        variant: "destructive",
      });
    }
  };

  const saveJobMatches = async (jobs: Job[]) => {
    if (!currentSessionId || jobs.length === 0 || jobsSaved) return;

    try {
      const jobData = jobs.map(job => ({
        id: job.id,
        title: job.title,
        company: job.company,
        location: job.location,
        salary: job.salary,
        applyUrl: job.applyUrl,
        category: job.category,
        description: job.description,
      }));

      const { error } = await supabase
        .from('skill_sessions')
        .update({ job_matches: jobData })
        .eq('id', currentSessionId);

      if (error) throw error;
      
      setJobsSaved(true);
      console.log('Saved', jobs.length, 'job matches');
      
      toast({
        title: "Assessment Saved",
        description: `Your skill assessment and ${jobs.length} job matches have been saved!`,
      });
    } catch (error: any) {
      console.error('Error saving job matches:', error);
      toast({
        title: "Error",
        description: "Failed to save job matches",
        variant: "destructive",
      });
    }
  };

  const resetSession = () => {
    setCurrentSessionId(null);
    setMatchedSkills([]);
    setJobsSaved(false);
  };

  return {
    createAssessment: createSession,
    addSkillMatch,
    updateAssessmentCount: () => {}, // No longer needed with simplified structure
    saveJobMatches,
    resetAssessment: resetSession,
  };
};
