
import React from 'react';
import { motion } from 'framer-motion';
import skillsData from '@/skills.json';

type Skill = {
  id: number;
  name: string;
  category: string;
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

const FloatingCard = ({ skill, delay, x, y, direction }: { skill: Skill; delay: number; x: number; y: number; direction: 'horizontal' | 'vertical' }) => {
  const isHorizontal = direction === 'horizontal';
  const endX = isHorizontal ? (x < 0 ? window.innerWidth + 300 : -300) : x;
  const endY = isHorizontal ? y : (y < 0 ? window.innerHeight + 400 : -400);

  return (
    <motion.div
      className={`absolute w-[300px] h-[400px] rounded-2xl shadow-2xl ${getCardBackground(skill.category)} blur-[2px]`}
      initial={{ 
        x, 
        y, 
        rotate: Math.random() * 20 - 10,
        opacity: 1
      }}
      animate={{
        x: endX,
        y: endY,
        rotate: Math.random() * 20 - 10,
        opacity: 1
      }}
      transition={{
        duration: 15,
        delay: delay,
        ease: "linear",
        repeat: Infinity,
        repeatDelay: 0
      }}
    >
      <div className="flex items-center justify-center h-full p-4">
        <h3 className="text-2xl font-bold text-white text-center">
          {skill.name}
        </h3>
      </div>
    </motion.div>
  );
};

export const FloatingSkillCards = () => {
  // Select 12 random skills for floating animation (increased from 6)
  const floatingSkills = React.useMemo(() => {
    const shuffled = [...skillsData].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 12);
  }, []);

  const positions = [
    // Cards moving from left to right
    { x: -350, y: 100, direction: 'horizontal' as const },
    { x: -350, y: 300, direction: 'horizontal' as const },
    { x: -350, y: 500, direction: 'horizontal' as const },
    { x: -350, y: 700, direction: 'horizontal' as const },
    
    // Cards moving from right to left
    { x: window.innerWidth + 50, y: 150, direction: 'horizontal' as const },
    { x: window.innerWidth + 50, y: 350, direction: 'horizontal' as const },
    { x: window.innerWidth + 50, y: 550, direction: 'horizontal' as const },
    { x: window.innerWidth + 50, y: 750, direction: 'horizontal' as const },
    
    // Cards moving from top to bottom
    { x: 200, y: -450, direction: 'vertical' as const },
    { x: 600, y: -450, direction: 'vertical' as const },
    
    // Cards moving from bottom to top
    { x: 400, y: window.innerHeight + 50, direction: 'vertical' as const },
    { x: 800, y: window.innerHeight + 50, direction: 'vertical' as const },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {floatingSkills.map((skill, index) => (
        <FloatingCard
          key={skill.id}
          skill={skill}
          delay={index * 2}
          x={positions[index]?.x || 0}
          y={positions[index]?.y || 0}
          direction={positions[index]?.direction || 'horizontal'}
        />
      ))}
    </div>
  );
};
