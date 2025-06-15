
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

const FloatingCard = ({ skill, delay, x, y }: { skill: Skill; delay: number; x: number; y: number }) => {
  return (
    <motion.div
      className={`absolute w-[300px] h-[400px] rounded-2xl shadow-2xl ${getCardBackground(skill.category)} opacity-30 blur-sm`}
      initial={{ x, y, rotate: Math.random() * 20 - 10 }}
      animate={{
        x: x + (Math.sin(Date.now() * 0.001 + delay) * 50),
        y: y + (Math.cos(Date.now() * 0.001 + delay) * 30),
        rotate: Math.sin(Date.now() * 0.0005 + delay) * 10,
      }}
      transition={{
        duration: 8 + Math.random() * 4,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
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
  // Select 6 random skills for floating animation
  const floatingSkills = React.useMemo(() => {
    const shuffled = [...skillsData].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 6);
  }, []);

  const positions = [
    { x: -200, y: -100 },
    { x: window.innerWidth - 100, y: -150 },
    { x: -150, y: window.innerHeight - 300 },
    { x: window.innerWidth - 200, y: window.innerHeight - 200 },
    { x: window.innerWidth / 2 - 150, y: -200 },
    { x: window.innerWidth / 2 + 100, y: window.innerHeight - 100 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {floatingSkills.map((skill, index) => (
        <FloatingCard
          key={skill.id}
          skill={skill}
          delay={index * 1.5}
          x={positions[index]?.x || 0}
          y={positions[index]?.y || 0}
        />
      ))}
    </div>
  );
};
