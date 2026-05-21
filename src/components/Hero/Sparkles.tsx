import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export default function Sparkles() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    // Generate static list of sparkles on mount
    const generated = Array.from({ length: 30 }, (_, i) => {
      const x = 33 + Math.random() * 63; // right two-thirds (33% to 96%)
      const y = 8 + Math.random() * 84;  // various heights (8% to 92%)
      const size = 1.2 + Math.random() * 2.5; // size 1.2px - 3.7px
      const duration = 3 + Math.random() * 4; // slow pulse 3s - 7s
      const delay = Math.random() * 3;
      const opacity = 0.3 + Math.random() * 0.5;

      return { id: i, x, y, size, duration, delay, opacity };
    });
    setSparkles(generated);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute rounded-full bg-teal"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
          }}
          animate={{
            opacity: [sparkle.opacity * 0.2, sparkle.opacity, sparkle.opacity * 0.2],
          }}
          transition={{
            duration: sparkle.duration,
            repeat: Infinity,
            delay: sparkle.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}
