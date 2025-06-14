
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface AdzunaJob {
  id: string;
  title: string;
  company: {
    display_name: string;
  };
  location: {
    display_name: string;
  };
  description: string;
  salary_min?: number;
  salary_max?: number;
  created: string;
  redirect_url: string;
  category: {
    label: string;
    tag: string;
  };
}

interface AdzunaResponse {
  results: AdzunaJob[];
  count: number;
}

// Country name to ISO code mapping
const countryCodeMap: Record<string, string> = {
  'United Kingdom': 'gb',
  'United States': 'us',
  'Canada': 'ca',
  'Australia': 'au',
  'Germany': 'de',
  'France': 'fr',
  'Netherlands': 'nl',
  'Sweden': 'se',
  'Norway': 'no',
  'Denmark': 'dk',
  'Switzerland': 'ch',
  'Austria': 'at',
  'Belgium': 'be',
  'Ireland': 'ie',
  'Spain': 'es',
  'Italy': 'it',
  'Portugal': 'pt',
  'Poland': 'pl',
  'Czech Republic': 'cz',
  'Hungary': 'hu',
  'Finland': 'fi',
  'Estonia': 'ee',
  'Latvia': 'lv',
  'Lithuania': 'lt',
  'Slovenia': 'si',
  'Slovakia': 'sk',
  'Croatia': 'hr',
  'Romania': 'ro',
  'Bulgaria': 'bg',
  'Greece': 'gr',
  'Cyprus': 'cy',
  'Malta': 'mt',
  'Luxembourg': 'lu',
  'Japan': 'jp',
  'Singapore': 'sg',
  'Hong Kong': 'hk',
  'South Korea': 'kr',
  'Taiwan': 'tw',
  'Israel': 'il',
  'UAE': 'ae',
  'Saudi Arabia': 'sa',
  'Qatar': 'qa',
  'Kuwait': 'kw',
  'Bahrain': 'bh',
  'Oman': 'om',
  'Turkey': 'tr',
  'India': 'in',
  'China': 'cn',
  'Thailand': 'th',
  'Malaysia': 'my',
  'Indonesia': 'id',
  'Philippines': 'ph',
  'Vietnam': 'vn',
  'New Zealand': 'nz',
  'South Africa': 'za',
  'Kenya': 'ke',
  'Nigeria': 'ng',
  'Egypt': 'eg',
  'Morocco': 'ma',
  'Brazil': 'br',
  'Argentina': 'ar',
  'Chile': 'cl',
  'Colombia': 'co',
  'Mexico': 'mx'
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Fetch jobs function called');
    
    const { searchParams } = new URL(req.url);
    const what = searchParams.get('what') || '';
    const what_or = searchParams.get('what_or') || ''; // Support OR logic
    const where = searchParams.get('where') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const results_per_page = parseInt(searchParams.get('results_per_page') || '20');
    const salary_min = searchParams.get('salary_min');
    const sort_by = searchParams.get('sort_by') || 'relevance';
    const country = searchParams.get('country') || '';

    console.log('Received parameters:', { what, what_or, where, page, country });

    // Get API credentials from environment
    const appId = Deno.env.get('ADZUNA_APP_ID');
    const appKey = Deno.env.get('ADZUNA_APP_KEY');

    if (!appId || !appKey) {
      console.error('Missing Adzuna API credentials');
      return new Response(
        JSON.stringify({ error: 'API credentials not configured' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Determine country code - default to 'us' for worldwide if no country specified
    let countryCode = 'us'; // Default for worldwide searches
    if (country && countryCodeMap[country]) {
      countryCode = countryCodeMap[country];
      console.log('Country selected:', country, '-> using country code:', countryCode);
    } else {
      console.log('No specific country selected, using worldwide default:', countryCode);
    }

    // Build Adzuna API URL with dynamic country
    const baseUrl = `https://api.adzuna.com/v1/api/jobs/${countryCode}/search`;
    const url = new URL(`${baseUrl}/${page}`);
    
    url.searchParams.set('app_id', appId);
    url.searchParams.set('app_key', appKey);
    url.searchParams.set('results_per_page', results_per_page.toString());
    url.searchParams.set('content-type', 'application/json');
    
    // Add tech-specific parameters to get better programming jobs
    url.searchParams.set('max_days_old', '60'); // Jobs from last 60 days
    url.searchParams.set('permanent', '1'); // Permanent positions only
    
    // Use either what or what_or depending on what's provided
    if (what_or) {
      url.searchParams.set('what_or', what_or);
      console.log('Using OR logic with terms:', what_or);
    } else if (what) {
      url.searchParams.set('what', what);
      console.log('Using AND logic with terms:', what);
    }
    
    if (where) url.searchParams.set('where', where);
    if (salary_min) url.searchParams.set('salary_min', salary_min);
    if (sort_by) url.searchParams.set('sort_by', sort_by);

    console.log('Calling Adzuna API:', url.toString().replace(appKey, '***'));

    // Fetch from Adzuna API
    const response = await fetch(url.toString());
    
    if (!response.ok) {
      console.error('Adzuna API error:', response.status, response.statusText);
      const errorText = await response.text();
      console.error('Error details:', errorText);
      
      return new Response(
        JSON.stringify({ 
          error: 'Failed to fetch jobs from Adzuna',
          details: `${response.status}: ${response.statusText}`
        }),
        { 
          status: response.status, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const data: AdzunaResponse = await response.json();
    console.log(`Successfully fetched ${data.results?.length || 0} jobs from Adzuna for country code: ${countryCode}`);

    // Transform the data to match our expected format
    const transformedJobs = data.results?.map(job => ({
      id: job.id,
      title: job.title,
      company: job.company?.display_name || 'Unknown Company',
      location: job.location?.display_name || 'Unknown Location',
      description: job.description || '',
      salary: job.salary_min && job.salary_max 
        ? `${job.salary_min.toLocaleString()} - ${job.salary_max.toLocaleString()}`
        : job.salary_min 
        ? `${job.salary_min.toLocaleString()}+`
        : 'Salary not specified',
      postedDate: new Date(job.created).toLocaleDateString(),
      applyUrl: job.redirect_url,
      category: job.category?.label || 'General',
      requiredSkills: [] // Adzuna doesn't provide structured skills data
    })) || [];

    return new Response(
      JSON.stringify({
        jobs: transformedJobs,
        total: data.count || 0,
        page,
        totalPages: Math.ceil((data.count || 0) / results_per_page)
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error in fetch-jobs function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        details: error.message
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
