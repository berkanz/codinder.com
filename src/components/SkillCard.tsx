
import React from 'react';
import { motion, PanInfo, Variants } from 'framer-motion';
import { CodeSnippetBackground } from './CodeSnippetBackground';

interface SkillCardProps {
  skillName: string;
  skillCategory: string;
  onSwipe: (direction: 'left' | 'right') => void;
}

const SWIPE_CONFIDENCE_THRESHOLD = 10000;

const variants: Variants = {
  enter: {
    y: 100,
    opacity: 0,
    scale: 0.8,
    rotate: 0,
  },
  center: {
    zIndex: 1,
    y: 0,
    opacity: 1,
    scale: 1,
    rotate: 0,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? -1000 : 1000,
    y: direction < 0 ? -100 : -100,
    opacity: 0,
    scale: 0.5,
    rotate: direction < 0 ? -30 : 30,
    transition: {
      duration: 0.5,
      ease: [0.42, 0, 0.58, 1] as const
    }
  }),
};

const getCardBackground = (category: string) => {
  switch (category) {
    case 'tech':
      return 'bg-gradient-to-br from-gray-700 via-gray-900 to-black';
    case 'design':
      return 'bg-gradient-to-br from-purple-500 to-pink-500';
    case 'management':
      return 'bg-gradient-to-br from-green-500 to-blue-500';
    case 'soft':
      return 'bg-gradient-to-br from-yellow-400 via-red-500 to-pink-500';
    case 'data':
      return 'bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500';
    default:
      return 'bg-card';
  }
};

const getSkillBio = (skillName: string): string | null => {
  const skill = skillName.toLowerCase();
  
  // Tech skills with funny dating profiles
  if (skill.includes('react')) {
    return "Looking for someone who appreciates my hooks and doesn't mind my state management issues 💕";
  }
  if (skill.includes('docker')) {
    return "I like to containerize my feelings. Let's build something together! 🐳";
  }
  if (skill.includes('javascript')) {
    return "I'm async but I promise I'll always return to you. Sometimes undefined though... 😅";
  }
  if (skill.includes('typescript')) {
    return "I'm strict about types but flexible in relationships. No any allowed! 💪";
  }
  if (skill.includes('python')) {
    return "I'm simple, readable, and I don't bite. Looking for someone who loves snakes 🐍";
  }
  if (skill.includes('node')) {
    return "Single-threaded but ready to handle all your requests. Non-blocking love! ⚡";
  }
  if (skill.includes('git')) {
    return "I'll commit to you forever. No merge conflicts in our relationship! 💝";
  }
  if (skill.includes('css') || skill.includes('tailwind')) {
    return "I make things look pretty. Responsive design in streets, flexbox in the sheets 💅";
  }
  if (skill.includes('sql')) {
    return "I love long walks on the beach and complex JOINs. Let's SELECT each other! 💍";
  }
  if (skill.includes('java')) {
    return "Write once, love everywhere. I'm object-oriented and looking for my class mate ☕";
  }
  if (skill.includes('rust')) {
    return "Memory safe and blazingly fast. I'll never leave you with dangling pointers! 🦀";
  }
  if (skill.includes('go') || skill.includes('golang')) {
    return "Simple, fast, and concurrent. I can handle multiple goroutines but you're my main! 🐹";
  }
  if (skill.includes('vue')) {
    return "Progressive and reactive. I'll make your heart skip a beat with my composition! 💚";
  }
  if (skill.includes('angular')) {
    return "Structured and opinionated. I come with built-in dependency injection for love! ❤️";
  }
  if (skill.includes('php')) {
    return "I might be controversial but I'm still serving millions. Give me a chance! 🐘";
  }
  if (skill.includes('ruby')) {
    return "I'm like a gem - beautiful, elegant, and make everything more enjoyable! 💎";
  }
  if (skill.includes('c++')) {
    return "Low-level but high-maintenance. I promise the performance is worth it! ⚡";
  }
  if (skill.includes('kubernetes')) {
    return "I orchestrate containers like I orchestrate hearts. Always scaling for you! 🚢";
  }
  if (skill.includes('aws')) {
    return "Cloud-native and always available. 99.99% uptime guaranteed in love! ☁️";
  }
  if (skill.includes('mongodb')) {
    return "NoSQL, no rules! I'm flexible with schemas and relationships 🍃";
  }
  if (skill.includes('postgresql')) {
    return "ACID compliant and reliable. I'll never corrupt your heart data! 🐘";
  }
  if (skill.includes('redis')) {
    return "I'm fast, in-memory, and I'll cache all your favorite moments together! ⚡";
  }
  if (skill.includes('graphql')) {
    return "I'll give you exactly what you ask for, nothing more, nothing less! 📊";
  }
  if (skill.includes('rest')) {
    return "RESTful by nature, stateless but not heartless. Let's exchange some data! 🔄";
  }
  if (skill.includes('jenkins')) {
    return "I automate the boring stuff so we can focus on the fun parts! 🤖";
  }
  if (skill.includes('linux')) {
    return "Open source and free as in freedom. sudo make me a sandwich? 🐧";
  }
  if (skill.includes('blockchain')) {
    return "Decentralized but ready to commit to you. Our love will be immutable! ⛓️";
  }
  if (skill.includes('terraform')) {
    return "Infrastructure as Code, Love as a Service. Let me provision your heart! 🏗️";
  }
  if (skill.includes('ansible')) {
    return "I'll automate all the tedious tasks in our relationship. Idempotent love! 📜";
  }
  
  // Data skills
  if (skill.includes('machine learning')) {
    return "I learn from every interaction. Training my heart to love you better! 🤖";
  }
  if (skill.includes('tensorflow')) {
    return "Deep learning, deeper feelings. Let me analyze your heart patterns! 🧠";
  }
  if (skill.includes('pytorch')) {
    return "Dynamic and eager execution. My love for you compiles just-in-time! 🔥";
  }
  if (skill.includes('tableau')) {
    return "I turn data into beautiful stories. Let me visualize our future together! 📊";
  }
  if (skill.includes('power bi')) {
    return "Business intelligence in the streets, emotional intelligence in the sheets! 💼";
  }
  if (skill.includes('excel')) {
    return "I might be old school but I still VLOOKUP amazing. #N/A means Not Available for others! 📊";
  }
  
  return null;
};

export const SkillCard: React.FC<SkillCardProps> = ({ skillName, skillCategory, onSwipe }) => {
  const handleDragEnd = (e: MouseEvent | TouchEvent | PointerEvent, { offset, velocity }: PanInfo) => {
    const swipePower = Math.abs(offset.x) * velocity.x;

    if (swipePower < -SWIPE_CONFIDENCE_THRESHOLD) {
      onSwipe('left');
    } else if (swipePower > SWIPE_CONFIDENCE_THRESHOLD) {
      onSwipe('right');
    }
  };

  const isTechSkill = skillCategory === 'tech' || skillCategory === 'data';
  const skillBio = getSkillBio(skillName);

  return (
    <motion.div
      className={`absolute flex flex-col items-center justify-center w-[300px] h-[400px] rounded-2xl shadow-2xl cursor-grab ${getCardBackground(skillCategory)} overflow-hidden`}
      drag="x"
      dragConstraints={{ left: -300, right: 300 }}
      dragElastic={0.1}
      dragMomentum={false}
      onDragEnd={handleDragEnd}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      custom={0}
      whileDrag={{
        scale: 1.05,
        transition: { duration: 0 }
      } as const}
      style={{
        rotate: 0
      }}
      transition={{ 
        type: 'spring', 
        stiffness: 300, 
        damping: 30
      }}
    >
      {isTechSkill && <CodeSnippetBackground skillName={skillName} />}
      <div className="relative text-center p-4 z-10">
        <motion.h2 
          className="text-3xl font-bold text-primary-foreground mb-3"
          style={{
            rotate: 0
          }}
        >
          {skillName}
        </motion.h2>
        {skillBio && (
          <motion.p 
            className="text-sm text-primary-foreground/90 italic leading-relaxed px-2"
            style={{
              rotate: 0
            }}
          >
            {skillBio}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};
