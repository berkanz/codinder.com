
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Job {
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

interface UseJobsReturn {
  jobs: Job[];
  loading: boolean;
  error: string | null;
  searchJobs: (params: SearchParams) => Promise<void>;
  totalJobs: number;
  currentPage: number;
  totalPages: number;
}

interface SearchParams {
  what?: string;
  where?: string;
  country?: string;
  page?: number;
  salary_min?: string;
  sort_by?: string;
}

export const useJobs = (): UseJobsReturn => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalJobs, setTotalJobs] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { toast } = useToast();

  const searchJobs = async (params: SearchParams = {}) => {
    setLoading(true);
    setError(null);

    try {
      console.log('Searching jobs with params:', params);

      // Build query parameters as URL search params for GET request
      const queryParams = new URLSearchParams();
      if (params.what) queryParams.set('what', params.what);
      if (params.where) queryParams.set('where', params.where);
      if (params.country) queryParams.set('country', params.country);
      if (params.page) queryParams.set('page', params.page.toString());
      if (params.salary_min) queryParams.set('salary_min', params.salary_min);
      if (params.sort_by) queryParams.set('sort_by', params.sort_by);

      // Call our Supabase Edge Function via GET with query parameters
      const { data, error: functionError } = await supabase.functions.invoke('fetch-jobs?' + queryParams.toString());

      if (functionError) {
        console.error('Supabase function error:', functionError);
        throw new Error(functionError.message || 'Failed to fetch jobs');
      }

      if (data.error) {
        console.error('API error:', data.error);
        throw new Error(data.details || data.error);
      }

      console.log('Jobs fetched successfully:', data.jobs?.length || 0);

      setJobs(data.jobs || []);
      setTotalJobs(data.total || 0);
      setCurrentPage(data.page || 1);
      setTotalPages(data.totalPages || 0);

      if (data.jobs?.length === 0) {
        toast({
          title: "No jobs found",
          description: "Try adjusting your search criteria.",
        });
      }

    } catch (err) {
      console.error('Error searching jobs:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch jobs';
      setError(errorMessage);
      
      toast({
        title: "Error fetching jobs",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Load default jobs on mount with simpler search terms
  useEffect(() => {
    searchJobs({ what: 'react typescript developer' });
  }, []);

  return {
    jobs,
    loading,
    error,
    searchJobs,
    totalJobs,
    currentPage,
    totalPages,
  };
};
