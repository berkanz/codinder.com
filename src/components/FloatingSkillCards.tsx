
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

export const FloatingSkillCards = () => {
  // Select 8 random skills for floating cards
  const floatingSkills = React.useMemo(() => {
    const shuffled = [...skillsData].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 8);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {floatingSkills.map((skill: Skill, index) => (
        <motion.div
          key={skill.id}
          className={`absolute w-[300px] h-[400px] rounded-2xl shadow-2xl ${getCardBackground(skill.category)} blur-sm opacity-30`}
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            rotate: Math.random() * 360,
          }}
          animate={{
            x: [
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
            ],
            y: [
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight,
            ],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 30 + Math.random() * 20,
            repeat: Infinity,
            ease: "linear",
            delay: index * 2,
          }}
        >
          <div className="flex items-center justify-center h-full">
            <h3 className="text-2xl font-bold text-white text-center px-4">
              {skill.name}
            </h3>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
