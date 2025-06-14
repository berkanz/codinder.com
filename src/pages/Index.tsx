
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SkillCard } from '@/components/SkillCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, ArrowRight, RefreshCw, MapPin, Loader, Download } from 'lucide-react';
import { useJobs } from '@/hooks/useJobs';
import { useSkillAssessment } from '@/hooks/useSkillAssessment';
import skillsData from '@/skills.json';

type Skill = {
  id: number;
  name: string;
  category: string;
};

// Function to randomly select skills
const getRandomSkills = (allSkills: Skill[], count: number): Skill[] => {
  const shuffled = [...allSkills].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const SkillSwipeApp = () => {
  const [allSkills] = useState<Skill[]>(skillsData);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mySkills, setMySkills] = useState<Skill[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [direction, setDirection] = useState(0);
  const [location, setLocation] = useState('');
  const [countrySelected, setCountrySelected] = useState(false);
  const { jobs: realJobs, loading: jobsLoading, searchJobs } = useJobs();
  const { 
    createAssessment, 
    addSkillMatch, 
    saveJobMatches, 
    resetAssessment 
  } = useSkillAssessment();

  // Initialize with 20 random skills when country is selected
  useEffect(() => {
    if (countrySelected && allSkills.length > 0) {
      const randomSkills = getRandomSkills(allSkills, 20);
      setSkills(randomSkills);
    }
  }, [countrySelected, allSkills]);

  const countries = [
    { code: 'gb', name: 'United Kingdom' },
    { code: 'us', name: 'United States' },
    { code: 'at', name: 'Austria' },
    { code: 'au', name: 'Australia' },
    { code: 'be', name: 'Belgium' },
    { code: 'br', name: 'Brazil' },
    { code: 'ca', name: 'Canada' },
    { code: 'ch', name: 'Switzerland' },
    { code: 'de', name: 'Germany' },
    { code: 'es', name: 'Spain' },
    { code: 'fr', name: 'France' },
    { code: 'in', name: 'India' },
    { code: 'it', name: 'Italy' },
    { code: 'mx', name: 'Mexico' },
    { code: 'nl', name: 'Netherlands' },
    { code: 'nz', name: 'New Zealand' },
    { code: 'pl', name: 'Poland' },
    { code: 'sg', name: 'Singapore' },
    { code: 'za', name: 'South Africa' }
  ];

  const calculateJobMatches = async (currentSkills: Skill[]) => {
    console.log('Calculating job matches with skills:', currentSkills.map(s => s.name));

    // Create anonymous session in database
    const sessionId = await createAssessment(skills.length, location);
    if (!sessionId) return;

    // If no skills selected, don't search for jobs
    if (currentSkills.length === 0) {
      console.log('No skills selected, skipping job search');
      return;
    }

    // Fetch real jobs based on skills - focus on programming/tech jobs
    const techSkills = currentSkills.filter(skill => 
      skill.category === 'tech' || skill.category === 'data'
    );
    
    let searchTerms = '';
    
    if (techSkills.length > 0) {
      const skillTerms = techSkills.map(skill => {
        if (skill.name === 'Git & GitHub') return 'git';
        if (skill.name === 'Tailwind CSS') return 'tailwind';
        if (skill.name === 'UX/UI Design') return 'frontend developer';
        if (skill.name === 'Node.js') return 'nodejs';
        return skill.name.toLowerCase();
      });
      
      const programmingTerms = ['developer', 'programmer', 'software engineer', 'frontend', 'backend', 'fullstack'];
      const allTerms = [...skillTerms, ...programmingTerms];
      
      searchTerms = allTerms.join(' ');
    } else {
      searchTerms = 'developer programmer software engineer frontend backend';
    }
    
    console.log('Searching programming jobs with OR terms:', searchTerms, 'location:', location);
    
    const searchParams: any = {
      what_or: searchTerms,
      page: 1,
    };
    
    if (location) {
      searchParams.country = location;
      console.log('Setting country parameter to:', location);
    }
    
    await searchJobs(searchParams);
  };

  // Save job matches when jobs are loaded - only once per session
  useEffect(() => {
    if (showResults && realJobs.length > 0) {
      saveJobMatches(realJobs);
    }
  }, [showResults, realJobs]);

  const handleSwipe = async (dir: 'left' | 'right') => {
    const swipedSkill = skills[currentIndex];
    
    setDirection(dir === 'right' ? 1 : -1);

    let updatedMySkills = mySkills;
    if (dir === 'right') {
      updatedMySkills = [...mySkills, swipedSkill];
      setMySkills(updatedMySkills);
      
      // Save the skill match to database
      await addSkillMatch(swipedSkill);
    }

    const nextIndex = currentIndex + 1;
    if (nextIndex >= skills.length) {
      calculateJobMatches(updatedMySkills);
      setTimeout(() => setShowResults(true), 300);
    }
    setCurrentIndex(nextIndex);
  };

  const restart = () => {
    setCurrentIndex(0);
    setMySkills([]);
    setShowResults(false);
    setCountrySelected(false);
    setLocation('');
    resetAssessment();
  };

  const handleCountrySelection = (selectedCountry: string) => {
    setLocation(selectedCountry);
    setCountrySelected(true);
  };
  
  const shareOnLinkedIn = () => {
    const percentage = Math.round((mySkills.length / skills.length) * 100);
    const text = `I just discovered my skill profile with Swipe-Your-Skill! I have ${percentage}% of the most in-demand skills. 🚀 Find out yours!`;
    const url = `https://32a707b0-75b5-4b12-bc14-114bdbfa17a3.lovable.app/`;
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&summary=${encodeURIComponent(text)}`;
    window.open(linkedInUrl, '_blank');
  };

  const exportJobsToTxt = () => {
    if (realJobs.length === 0) return;
    
    const jobLinks = realJobs.map(job => job.applyUrl).join('\n');
    const blob = new Blob([jobLinks], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `job-opportunities-${location.toLowerCase().replace(/\s+/g, '-')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  // Country selection screen
  if (!countrySelected) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <motion.div 
          className="text-center max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6">
            <img 
              src="/lovable-uploads/ceaabc34-8495-41f4-8c5c-7ddf246ec2c3.png" 
              alt="Codinder Logo" 
              className="w-64 h-64 mx-auto mb-4"
            />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
            Swipe Your Skills
          </h1>
          <p className="text-muted-foreground mb-8">
            Pick your stack and find job opportunities tailored to your skills and location.
          </p>
          
          <div className="w-full mb-6">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <span className="text-lg font-medium">Select Your Job Location</span>
            </div>
            <Select value={location} onValueChange={handleCountrySelection}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose a country to get started" />
              </SelectTrigger>
              <SelectContent>
                {countries.map(country => (
                  <SelectItem key={country.code} value={country.name}>{country.name}</SelectItem>
                ))}
                <SelectItem value="other_countries_disabled" disabled className="text-muted-foreground">
                  Other countries not yet available
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {location && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-muted-foreground"
            >
              Ready to discover programming opportunities in {location}!
            </motion.div>
          )}
        </motion.div>
      </div>
    );
  }

  const currentSkill = skills[currentIndex];

  if (showResults) {
    return (
      <motion.div 
        className="flex flex-col items-center justify-center min-h-screen text-center p-4 md:p-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Show message when no skills are selected */}
        {mySkills.length === 0 ? (
          <div className="max-w-md">
            <h1 className="text-4xl font-bold mb-4 text-primary">Oops!</h1>
            <p className="text-xl text-muted-foreground mb-8">
              You didn't pick any of the skills, I can't find a job for you now. Expand your tech stack my friend!
            </p>
            <Button onClick={restart} variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" /> Try Again
            </Button>
          </div>
        ) : (
          <>
            <h1 className="text-4xl font-bold mb-2 text-primary">Your Job Matches</h1>
            <p className="text-xl text-muted-foreground mb-8">Based on your {mySkills.length} skills, here are your opportunities in {location}.</p>
            
            {/* Loading spinner while jobs are being fetched */}
            {jobsLoading && (
              <div className="flex flex-col items-center justify-center mb-8">
                <Loader className="h-8 w-8 animate-spin text-primary mb-4" />
                <p className="text-muted-foreground">Finding programming jobs for you...</p>
              </div>
            )}

            {/* Real Job Opportunities */}
            {!jobsLoading && realJobs.length > 0 && (
              <div className="w-full max-w-4xl mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-primary">Programming Job Opportunities for You</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {realJobs.map(job => (
                    <Card key={job.id} className="text-left bg-card border-primary/20 hover:border-primary/50 transition-all">
                      <CardHeader>
                        <CardTitle className="text-lg">{job.title}</CardTitle>
                        <CardDescription>{job.company} • {job.location}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <p className="text-sm text-muted-foreground">{job.salary}</p>
                          <Badge variant="secondary">{job.category}</Badge>
                          <p className="text-sm text-muted-foreground line-clamp-2">{job.description}</p>
                          <Button
                            asChild
                            variant="outline"
                            size="sm"
                            className="w-full"
                          >
                            <a href={job.applyUrl} target="_blank" rel="noopener noreferrer">
                              Apply Now
                            </a>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Show message if no jobs found and not loading */}
            {!jobsLoading && realJobs.length === 0 && (
              <div className="text-center mb-8">
                <p className="text-muted-foreground">No programming jobs found for your location. Try selecting a different country.</p>
              </div>
            )}

            <div className="flex gap-4 mt-8">
                <Button onClick={restart} variant="outline"><RefreshCw className="mr-2 h-4 w-4" /> Try Again</Button>
                <Button onClick={exportJobsToTxt} disabled={realJobs.length === 0}>
                  <Download className="mr-2 h-4 w-4" /> Export jobs to .txt file
                </Button>
            </div>
          </>
        )}
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4 text-center">
        Swipe Your Skills
      </h1>
      <p className="text-muted-foreground mb-6">Swipe right for "I have it", left for "I don't".</p>
      <p className="text-sm text-muted-foreground mb-8">Looking for jobs in: <strong>{location}</strong></p>
      
      <div className="relative w-[300px] h-[400px] mb-12">
        <AnimatePresence custom={direction}>
          {currentSkill && (
            <SkillCard
              key={currentIndex}
              skillName={currentSkill.name}
              skillCategory={currentSkill.category}
              onSwipe={(dir) => handleSwipe(dir)}
            />
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-8">
        <Button 
          variant="outline" 
          size="lg" 
          className="rounded-full w-20 h-20 bg-red-500/10 border-red-500/30 text-red-500 hover:bg-red-500/20"
          onClick={() => handleSwipe('left')}
        >
          <ArrowLeft size={32} />
        </Button>
        <Button 
          variant="outline" 
          size="lg" 
          className="rounded-full w-20 h-20 bg-green-500/10 border-green-500/30 text-green-500 hover:bg-green-500/20"
          onClick={() => handleSwipe('right')}
        >
          <ArrowRight size={32} />
        </Button>
      </div>
    </div>
  );
};

const Index = () => {
  return <SkillSwipeApp />;
};

export default Index;
