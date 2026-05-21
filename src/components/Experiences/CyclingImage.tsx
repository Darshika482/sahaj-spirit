import { useEffect, useState } from 'react';

interface CyclingImageProps {
  images: string[];
  alt: string;
  intervalMs?: number;
  fadeMs?: number;
  showDots?: boolean;
  className?: string;
  imgClassName?: string;
}

export default function CyclingImage({
  images,
  alt,
  intervalMs = 1000,
  fadeMs = 700,
  showDots = true,
  className = '',
  imgClassName = '',
}: CyclingImageProps) {
  const [idx, setIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    setIdx(0);
    setIsPaused(false);
  }, [images]);

  useEffect(() => {
    if (images.length < 2 || isPaused) return;
    const id = setInterval(() => {
      setIdx((i) => (i + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [images.length, isPaused, intervalMs]);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity ease-in-out ${
            i === idx ? 'opacity-100' : 'opacity-0'
          } ${imgClassName}`}
          style={{ transitionDuration: `${fadeMs}ms` }}
        />
      ))}

      {showDots && images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {images.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === idx ? 'w-5 bg-white' : 'w-1.5 bg-white/55'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
