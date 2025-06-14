
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SkillCard } from '@/components/SkillCard';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight, Linkedin, RefreshCw, CheckCircle, XCircle, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import skillsData from '@/skills.json';
import jobProfilesData from '@/jobProfiles.json';

type Skill = {
  id: number;
  name: string;
  category: string;
};

type JobProfile = {
  id: string;
  title: string;
  description: string;
  requiredSkills: number[];
  company: string;
  location: string;
};

type MatchedJob = JobProfile & {
  matchPercentage: number;
  matchedSkills: Skill[];
  missingSkills: Skill[];
};

const Index = () => {
  const [skills] = useState<Skill[]>(skillsData);
  const [jobProfiles] = useState<JobProfile[]>(jobProfilesData);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mySkills, setMySkills] = useState<Skill[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [direction, setDirection] = useState(0);
  const [matchedJobs, setMatchedJobs] = useState<MatchedJob[]>([]);

  const calculateJobMatches = (currentSkills: Skill[]) => {
    const userSkillIds = new Set(currentSkills.map(s => s.id));

    const allJobsWithScores = jobProfiles.map(profile => {
      const matchedSkillObjects = profile.requiredSkills
        .map(id => skills.find(s => s.id === id))
        .filter((s): s is Skill => s !== undefined && userSkillIds.has(s.id));

      const missingSkillObjects = profile.requiredSkills
        .map(id => skills.find(s => s.id === id))
        .filter((s): s is Skill => s !== undefined && !userSkillIds.has(s.id));
      
      const matchPercentage = profile.requiredSkills.length > 0
        ? Math.round((matchedSkillObjects.length / profile.requiredSkills.length) * 100)
        : 0;

      return {
        ...profile,
        matchPercentage,
        matchedSkills: matchedSkillObjects,
        missingSkills: missingSkillObjects,
      };
    });

    const sortedJobs = allJobsWithScores
      .filter(j => j.matchPercentage > 0)
      .sort((a, b) => b.matchPercentage - a.matchPercentage || b.matchedSkills.length - a.matchedSkills.length);
      
    setMatchedJobs(sortedJobs.slice(0, 5));
  };

  const handleSwipe = (dir: 'left' | 'right') => {
    const swipedSkill = skills[currentIndex];
    
    setDirection(dir === 'right' ? 1 : -1);

    let updatedMySkills = mySkills;
    if (dir === 'right') {
      updatedMySkills = [...mySkills, swipedSkill];
      setMySkills(updatedMySkills);
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
    setMatchedJobs([]);
  };
  
  const shareOnLinkedIn = () => {
    const percentage = Math.round((mySkills.length / skills.length) * 100);
    const text = `I just discovered my skill profile with Swipe-Your-Skill! I have ${percentage}% of the most in-demand skills. 🚀 Find out yours!`;
    const url = `https://32a707b0-75b5-4b12-bc14-114bdbfa17a3.lovable.app/`; // Placeholder URL
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&summary=${encodeURIComponent(text)}`;
    window.open(linkedInUrl, '_blank');
  };

  const currentSkill = skills[currentIndex];

  if (showResults) {
    return (
      <motion.div 
        className="flex flex-col items-center justify-center min-h-screen text-center p-4 md:p-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-2 text-primary">Your Job Matches</h1>
        <p className="text-xl text-muted-foreground mb-8">Based on your {mySkills.length} skills, here are your top opportunities.</p>
        
        {matchedJobs.length > 0 ? (
          <div className="w-full max-w-2xl space-y-6">
            {matchedJobs.map(job => (
              <Card key={job.id} className="text-left bg-card border-primary/20 hover:border-primary/50 transition-all">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl text-primary">{job.title}</CardTitle>
                      <CardDescription>{job.company} • {job.location}</CardDescription>
                    </div>
                    <div className="text-right">
                       <p className="text-lg font-semibold text-primary">{job.matchPercentage}%</p>
                       <p className="text-sm text-muted-foreground">Match</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{job.description}</p>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center"><CheckCircle className="text-green-500 mr-2 h-5 w-5" /> Skills you have ({job.matchedSkills.length})</h4>
                      <div className="flex flex-wrap gap-2">
                        {job.matchedSkills.map(s => <Badge key={s.id} variant="secondary">{s.name}</Badge>)}
                      </div>
                    </div>
                    {job.missingSkills.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center"><XCircle className="text-yellow-500 mr-2 h-5 w-5" /> To improve your match ({job.missingSkills.length})</h4>
                         <div className="flex flex-wrap gap-2">
                          {job.missingSkills.map(s => <Badge key={s.id} variant="outline">{s.name}</Badge>)}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No job matches found based on your skills. Try again!</p>
        )}

        <div className="flex gap-4 mt-8">
            <Button onClick={restart} variant="outline"><RefreshCw className="mr-2 h-4 w-4" /> Try Again</Button>
            <Button onClick={shareOnLinkedIn}><Linkedin className="mr-2 h-4 w-4" /> Share Results</Button>
            <Button asChild variant="default">
              <Link to="/jobs">
                <Search className="mr-2 h-4 w-4" /> Browse Real Jobs
              </Link>
            </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4 text-center">
        Swipe Your Skill
      </h1>
      <p className="text-muted-foreground mb-4">Swipe right for "I have it", left for "I don't".</p>
      
      <div className="mb-8">
        <Button asChild variant="outline">
          <Link to="/jobs">
            <Search className="mr-2 h-4 w-4" /> Browse Real Jobs
          </Link>
        </Button>
      </div>
      
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

export default Index;
