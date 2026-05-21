import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function Cursor() {
  const [hoveredType, setHoveredType] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 40, stiffness: 400, mass: 0.6 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if it is a touch device
    const checkTouch = () => {
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsTouchDevice(hasTouch);
    };

    checkTouch();

    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      return;
    }

    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX - 6);
      mouseY.set(e.clientY - 6);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', moveMouse);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const interactive = target.closest('a, button, [role="button"], .interactive-cursor');
      if (interactive) {
        const label = interactive.getAttribute('data-cursor-label');
        setHoveredType(label || 'pointer');
      } else {
        setHoveredType(null);
      }
    };

    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveMouse);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY, isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <motion.div
      id="custom-cursor"
      className="fixed top-0 left-0 pointer-events-none z-50 rounded-full flex items-center justify-center font-sans font-medium text-[9px] uppercase tracking-widest text-[#F7F3EC] bg-teal"
      style={{
        x: cursorX,
        y: cursorY,
        width: hoveredType ? '48px' : '12px',
        height: hoveredType ? '48px' : '12px',
        marginLeft: hoveredType ? '-18px' : '0px',
        marginTop: hoveredType ? '-18px' : '0px',
        opacity: isVisible ? 1 : 0,
      }}
      animate={{
        scale: hoveredType ? 1.2 : 1,
        backgroundColor: hoveredType === 'orange' ? '#F37021' : '#2BA89E',
      }}
      transition={{ type: 'spring', ...springConfig }}
    >
      {hoveredType && hoveredType !== 'pointer' && hoveredType !== 'orange' && (
        <motion.span
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center font-bold"
        >
          {hoveredType}
        </motion.span>
      )}
    </motion.div>
  );
}
