
import { useState } from 'react';
import { User } from '@supabase/supabase-js';
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

export const useSkillAssessment = (user: User) => {
  const [currentAssessmentId, setCurrentAssessmentId] = useState<string | null>(null);
  const { toast } = useToast();

  const createAssessment = async (totalSkills: number, location: string) => {
    try {
      const { data, error } = await supabase
        .from('skill_assessments')
        .insert({
          user_id: user.id,
          total_skills_shown: totalSkills,
          skills_matched: 0,
          location: location || null,
        })
        .select()
        .single();

      if (error) throw error;

      setCurrentAssessmentId(data.id);
      console.log('Created assessment:', data.id);
      return data.id;
    } catch (error: any) {
      console.error('Error creating assessment:', error);
      toast({
        title: "Error",
        description: "Failed to create skill assessment",
        variant: "destructive",
      });
      return null;
    }
  };

  const addSkillMatch = async (skill: Skill) => {
    if (!currentAssessmentId) return;

    try {
      const { error } = await supabase
        .from('user_skills')
        .insert({
          assessment_id: currentAssessmentId,
          skill_id: skill.id,
          skill_name: skill.name,
          skill_category: skill.category,
        });

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

  const updateAssessmentCount = async (skillsMatched: number) => {
    if (!currentAssessmentId) return;

    try {
      const { error } = await supabase
        .from('skill_assessments')
        .update({ skills_matched: skillsMatched })
        .eq('id', currentAssessmentId);

      if (error) throw error;
      console.log('Updated assessment with', skillsMatched, 'skills matched');
    } catch (error: any) {
      console.error('Error updating assessment:', error);
      toast({
        title: "Error",
        description: "Failed to update assessment",
        variant: "destructive",
      });
    }
  };

  const saveJobMatches = async (jobs: Job[]) => {
    if (!currentAssessmentId || jobs.length === 0) return;

    try {
      const jobData = jobs.map(job => ({
        assessment_id: currentAssessmentId,
        job_title: job.title,
        company: job.company,
        location: job.location,
        salary: job.salary,
        apply_url: job.applyUrl,
        category: job.category,
        description: job.description,
      }));

      const { error } = await supabase
        .from('job_matches')
        .insert(jobData);

      if (error) throw error;
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

  const resetAssessment = () => {
    setCurrentAssessmentId(null);
  };

  return {
    createAssessment,
    addSkillMatch,
    updateAssessmentCount,
    saveJobMatches,
    resetAssessment,
  };
};
