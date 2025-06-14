import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SkillCard } from '@/components/SkillCard';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, Linkedin, RefreshCw } from 'lucide-react';
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
};

const Index = () => {
  const [skills] = useState<Skill[]>(skillsData);
  const [jobProfiles] = useState<JobProfile[]>(jobProfilesData);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mySkills, setMySkills] = useState<Skill[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [direction, setDirection] = useState(0);
  const [bestMatch, setBestMatch] = useState<JobProfile | null>(null);

  const calculateBestMatch = (currentSkills: Skill[]) => {
    const userSkillIds = new Set(currentSkills.map(s => s.id));
    let bestProfile: JobProfile | null = null;
    let maxMatchCount = -1;

    jobProfiles.forEach(profile => {
      const matchedSkills = profile.requiredSkills.filter(skillId => userSkillIds.has(skillId));
      const matchCount = matchedSkills.length;

      if (matchCount > maxMatchCount) {
        maxMatchCount = matchCount;
        bestProfile = profile;
      }
    });

    if (bestProfile && maxMatchCount > 0) {
      setBestMatch(bestProfile);
    } else {
      setBestMatch(null);
    }
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
      calculateBestMatch(updatedMySkills);
      setTimeout(() => setShowResults(true), 300);
    }
    setCurrentIndex(nextIndex);
  };

  const restart = () => {
    setCurrentIndex(0);
    setMySkills([]);
    setShowResults(false);
    setBestMatch(null);
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
    const percentage = Math.round((mySkills.length / skills.length) * 100);
    return (
      <motion.div 
        className="flex flex-col items-center justify-center min-h-screen text-center p-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-2 text-primary">Your Skill Profile</h1>
        <p className="text-xl text-muted-foreground mb-6">You have {mySkills.length} out of {skills.length} skills.</p>
        
        <div className="w-full max-w-md mb-6">
          <div className="flex justify-between mb-1">
             <span className="text-base font-medium text-primary">{percentage}% Match</span>
          </div>
          <Progress value={percentage} className="w-full h-4" />
        </div>

        {bestMatch && (
          <Card className="w-full max-w-md mb-6 bg-card border-primary/50 text-left">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">Your Top Role Match</CardTitle>
              <CardDescription>Based on your skills, this could be a great fit for you!</CardDescription>
            </CardHeader>
            <CardContent>
              <h3 className="text-xl font-semibold text-card-foreground">{bestMatch.title}</h3>
              <p className="text-muted-foreground mt-1">{bestMatch.description}</p>
            </CardContent>
          </Card>
        )}

        <div className="mb-8 text-left max-w-md w-full">
            <h3 className="text-lg font-semibold mb-2">Skills you have:</h3>
            <ul className="list-disc list-inside text-muted-foreground">
                {mySkills.length > 0 ? mySkills.map(s => <li key={s.id}>{s.name}</li>) : <li>None yet!</li>}
            </ul>
        </div>
        
        <div className="flex gap-4">
            <Button onClick={restart} variant="outline"><RefreshCw className="mr-2 h-4 w-4" /> Try Again</Button>
            <Button onClick={shareOnLinkedIn}><Linkedin className="mr-2 h-4 w-4" /> Share on LinkedIn</Button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4 text-center">
        Swipe Your Skill
      </h1>
      <p className="text-muted-foreground mb-12">Swipe right for "I have it", left for "I don't".</p>
      
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
