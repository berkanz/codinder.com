
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import skillsData from '@/skills.json';

interface FloatingSkill {
  id: number;
  name: string;
  category: string;
  x: number;
  y: number;
  scale: number;
  rotation: number;
  duration: number;
  delay: number;
}

const getCardBackground = (category: string) => {
  switch (category) {
    case 'tech':
      return 'bg-gradient-to-br from-gray-700/20 via-gray-900/20 to-black/20';
    case 'design':
      return 'bg-gradient-to-br from-purple-500/20 to-pink-500/20';
    case 'data':
      return 'bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20';
    default:
      return 'bg-card/20';
  }
};

export const FloatingSkillCards: React.FC = () => {
  const [floatingSkills, setFloatingSkills] = useState<FloatingSkill[]>([]);

  useEffect(() => {
    // Create 12 random floating skills
    const randomSkills = skillsData
      .sort(() => 0.5 - Math.random())
      .slice(0, 12)
      .map((skill, index) => ({
        ...skill,
        x: Math.random() * 100,
        y: Math.random() * 100,
        scale: 0.3 + Math.random() * 0.4, // 0.3 to 0.7
        rotation: Math.random() * 360,
        duration: 20 + Math.random() * 30, // 20-50 seconds
        delay: index * 2, // Stagger animations
      }));
    
    setFloatingSkills(randomSkills);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {floatingSkills.map((skill) => (
        <motion.div
          key={skill.id}
          className={`absolute w-32 h-40 rounded-xl shadow-lg ${getCardBackground(skill.category)} backdrop-blur-sm border border-white/10`}
          initial={{
            x: `${skill.x}vw`,
            y: `${skill.y}vh`,
            rotate: skill.rotation,
            scale: skill.scale,
            opacity: 0.6,
          }}
          animate={{
            x: [`${skill.x}vw`, `${(skill.x + 20) % 100}vw`, `${skill.x}vw`],
            y: [`${skill.y}vh`, `${(skill.y + 15) % 100}vh`, `${skill.y}vh`],
            rotate: [skill.rotation, skill.rotation + 360, skill.rotation],
          }}
          transition={{
            duration: skill.duration,
            delay: skill.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div className="p-3 h-full flex flex-col justify-center items-center text-center">
            <h3 className="text-xs font-semibold text-white/80 mb-1">
              {skill.name}
            </h3>
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
              <div className={`w-3 h-3 rounded-full ${
                skill.category === 'tech' ? 'bg-blue-400' :
                skill.category === 'design' ? 'bg-purple-400' :
                'bg-pink-400'
              }`} />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
