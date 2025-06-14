
import React from 'react';
import { motion, PanInfo } from 'framer-motion';
import { CodeSnippetBackground } from './CodeSnippetBackground';

interface SkillCardProps {
  skillName: string;
  skillCategory: string;
  onSwipe: (direction: 'left' | 'right') => void;
}

const SWIPE_CONFIDENCE_THRESHOLD = 10000;

const variants = {
  enter: {
    y: 100,
    opacity: 0,
    scale: 0.8,
  },
  center: {
    zIndex: 1,
    y: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? -300 : 300,
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.3
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

  return (
    <motion.div
      className={`absolute flex items-center justify-center w-[300px] h-[400px] rounded-2xl shadow-2xl cursor-grab ${getCardBackground(skillCategory)} overflow-hidden`}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={1}
      onDragEnd={handleDragEnd}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      custom={0}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {isTechSkill && <CodeSnippetBackground skillName={skillName} />}
      <h2 className="relative text-3xl font-bold text-center p-4 text-primary-foreground">{skillName}</h2>
    </motion.div>
  );
};
