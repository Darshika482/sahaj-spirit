import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'motion/react';

export default function Cursor() {
  const [hoveredType, setHoveredType] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [isInsideForm, setIsInsideForm] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const innerSpringConfig = { damping: 25, stiffness: 600, mass: 0.2 };
  const outerSpringConfig = { damping: 35, stiffness: 220, mass: 0.85 };

  const innerX = useSpring(mouseX, innerSpringConfig);
  const innerY = useSpring(mouseY, innerSpringConfig);
  const outerX = useSpring(mouseX, outerSpringConfig);
  const outerY = useSpring(mouseY, outerSpringConfig);

  const isVisibleRef = useRef(false);

  const updateVisibility = (visible: boolean) => {
    if (isVisibleRef.current !== visible) {
      isVisibleRef.current = visible;
      setIsVisible(visible);
    }
  };

  useEffect(() => {
    let lastX = 0;
    let lastY = 0;
    let lastTime = Date.now();
    let idleTimer: number;

    const handleTouchStart = () => {
      setIsTouchDevice(true);
      updateVisibility(false);
    };

    const moveMouse = (e: MouseEvent) => {
      // If mouse moves, user is actively using a pointer device
      setIsTouchDevice(false);
      updateVisibility(true);

      const now = Date.now();
      const dt = now - lastTime;
      
      const currentX = e.clientX;
      const currentY = e.clientY;
      
      mouseX.set(currentX);
      mouseY.set(currentY);
      
      if (dt > 0) {
        const dx = currentX - lastX;
        const dy = currentY - lastY;
        const vx = dx / dt; // pixels per ms
        const vy = dy / dt; // pixels per ms
        
        const maxVel = 2.5;
        const cappedVx = Math.max(Math.min(vx, maxVel), -maxVel);
        const cappedVy = Math.max(Math.min(vy, maxVel), -maxVel);
        
        setVelocity({ x: cappedVx, y: cappedVy });
      }
      
      lastX = currentX;
      lastY = currentY;
      lastTime = now;
      
      clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        setVelocity({ x: 0, y: 0 });
      }, 50);
    };

    const handleMouseLeave = () => {
      updateVisibility(false);
    };

    const handleMouseEnter = () => {
      updateVisibility(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const insideForm = !!target.closest('.show-system-cursor');
      setIsInsideForm(insideForm);

      const interactive = target.closest('a, button, [role="button"], .interactive-cursor');
      if (interactive && !insideForm) {
        const label = interactive.getAttribute('data-cursor-label');
        setHoveredType(label || 'pointer');
      } else {
        setHoveredType(null);
      }
    };

    window.addEventListener('mousemove', moveMouse);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });

    return () => {
      window.removeEventListener('mousemove', moveMouse);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('touchstart', handleTouchStart);
      clearTimeout(idleTimer);
    };
  }, [mouseX, mouseY]);

  if (isTouchDevice || !isVisible) return null;

  const isCustomLabel = hoveredType && hoveredType !== 'pointer' && hoveredType !== 'orange';

  return (
    <>
      {/* Outer Trailing Ring Container */}
      <motion.div
        id="custom-cursor-outer"
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full flex items-center justify-center font-sans font-bold text-[9px] uppercase tracking-[0.2em] transition-shadow duration-300"
        style={{
          x: outerX,
          y: outerY,
          translateX: '-50%',
          translateY: '-50%',
          width: isCustomLabel ? '72px' : (hoveredType ? '48px' : '24px'),
          height: isCustomLabel ? '48px' : (hoveredType ? '48px' : '24px'),
          opacity: isVisible && !isInsideForm ? 1 : 0,
        }}
        animate={{
          scale: hoveredType ? 1.15 : 1,
        }}
        transition={{ type: 'spring', ...outerSpringConfig }}
      >
        {/* Ring 1: Teal Chromatic Trail */}
        <motion.div
          className="absolute inset-0 rounded-full border pointer-events-none"
          animate={{
            borderColor: hoveredType === 'orange' || hoveredType === 'look' 
              ? 'rgba(43, 168, 158, 0.45)' 
              : 'rgba(43, 168, 158, 0.7)',
            x: velocity.x * 5,
            y: velocity.y * 5,
            boxShadow: hoveredType && hoveredType !== 'orange' && hoveredType !== 'look' 
              ? '0 0 14px rgba(43, 168, 158, 0.3)' 
              : 'none',
          }}
          transition={{ type: 'spring', stiffness: 280, damping: 24 }}
        />

        {/* Ring 2: Orange Chromatic Trail */}
        <motion.div
          className="absolute inset-0 rounded-full border pointer-events-none"
          animate={{
            borderColor: hoveredType === 'orange' || hoveredType === 'look' 
              ? 'rgba(243, 112, 33, 0.8)' 
              : 'rgba(243, 112, 33, 0.45)',
            x: -velocity.x * 5,
            y: -velocity.y * 5,
            boxShadow: hoveredType === 'orange' || hoveredType === 'look' 
              ? '0 0 14px rgba(243, 112, 33, 0.3)' 
              : 'none',
          }}
          transition={{ type: 'spring', stiffness: 280, damping: 24 }}
        />

        {/* Ring 3: Center White/Cream Neutral Ring */}
        <motion.div
          className="absolute inset-0 rounded-full border pointer-events-none"
          animate={{
            borderColor: hoveredType === 'orange' || hoveredType === 'look'
              ? 'rgba(243, 112, 33, 0.95)'
              : (hoveredType ? 'rgba(43, 168, 158, 0.95)' : 'rgba(247, 243, 236, 0.55)'),
          }}
          transition={{ duration: 0.15 }}
        />

        <AnimatePresence>
          {isCustomLabel && (
            <motion.span
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.2 }}
              className="text-center font-bold relative z-10"
              style={{
                color: hoveredType === 'look' ? '#F37021' : '#2BA89E'
              }}
            >
              {hoveredType}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Inner Precise Dot */}
      <motion.div
        id="custom-cursor-inner"
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full"
        style={{
          x: innerX,
          y: innerY,
          translateX: '-50%',
          translateY: '-50%',
          width: '8px',
          height: '8px',
          opacity: isVisible && !isInsideForm ? 1 : 0,
        }}
        animate={{
          scale: hoveredType ? 0 : 1,
          backgroundColor: hoveredType === 'orange' || hoveredType === 'look' ? '#F37021' : '#2BA89E',
        }}
        transition={{ type: 'spring', ...innerSpringConfig }}
      />
    </>
  );
}


