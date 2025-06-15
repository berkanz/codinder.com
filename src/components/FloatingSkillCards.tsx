
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

const StaticCard = ({ skill, x, y, rotation }: { skill: Skill; x: number; y: number; rotation: number }) => {
  return (
    <motion.div
      className={`absolute w-[280px] h-[180px] rounded-xl shadow-lg ${getCardBackground(skill.category)} cursor-pointer`}
      style={{
        left: `${x}px`,
        top: `${y}px`,
        transform: `rotate(${rotation}deg)`,
      }}
      initial={{ 
        opacity: 0.4,
        scale: 0.9,
      }}
      whileHover={{
        opacity: 0.9,
        scale: 1.05,
        x: Math.random() * 20 - 10, // Random movement between -10 and 10px
        y: Math.random() * 20 - 10, // Random movement between -10 and 10px
        rotate: rotation + (Math.random() * 10 - 5), // Slight rotation change
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      animate={{
        opacity: 0.4,
        scale: 0.9,
      }}
      transition={{
        duration: 0.3,
        ease: "easeOut"
      }}
    >
      <div className="flex items-center justify-center h-full p-4">
        <h3 className="text-lg font-bold text-white text-center leading-tight">
          {skill.name}
        </h3>
      </div>
    </motion.div>
  );
};

export const FloatingSkillCards = () => {
  // Select 15 random skills for scattered background
  const scatteredSkills = React.useMemo(() => {
    const shuffled = [...skillsData].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 15);
  }, []);

  // Generate random positions across the viewport
  const positions = React.useMemo(() => {
    const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
    
    return scatteredSkills.map(() => ({
      x: Math.random() * (viewportWidth - 280), // Account for card width
      y: Math.random() * (viewportHeight - 180), // Account for card height
      rotation: Math.random() * 30 - 15, // Random rotation between -15 and 15 degrees
    }));
  }, [scatteredSkills]);

  return (
    <div className="fixed inset-0 overflow-hidden z-0">
      {scatteredSkills.map((skill, index) => (
        <StaticCard
          key={skill.id}
          skill={skill}
          x={positions[index]?.x || 0}
          y={positions[index]?.y || 0}
          rotation={positions[index]?.rotation || 0}
        />
      ))}
    </div>
  );
};
