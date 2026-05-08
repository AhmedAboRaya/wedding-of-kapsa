import { useRef, useEffect, useState, type ReactNode } from 'react';
import './ScrollStack.css';

interface ScrollStackProps {
  children: ReactNode[];
}

export default function ScrollStack({ children }: ScrollStackProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScroll = rect.height - windowHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalScroll));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalCards = children.length;

  return (
    <div
      ref={containerRef}
      className="scroll-stack-container"
      style={{ height: `${totalCards * 100}vh` }}
    >
      <div className="scroll-stack-sticky">
        {children.map((child, index) => {
          const cardProgress = scrollProgress * totalCards;
          const isActive = cardProgress >= index;
          const distanceFromCurrent = cardProgress - index;
          const scale = isActive
            ? Math.max(0.85, 1 - distanceFromCurrent * 0.04)
            : 1;
          const translateY = isActive
            ? Math.min(0, -distanceFromCurrent * 20)
            : (index - cardProgress) * 100;
          const opacity = isActive
            ? Math.max(0.4, 1 - distanceFromCurrent * 0.25)
            : 1;

          return (
            <div
              key={index}
              className="scroll-stack-card"
              style={{
                transform: `translateY(${translateY}%) scale(${scale})`,
                opacity,
                zIndex: index,
              }}
            >
              {child}
            </div>
          );
        })}
      </div>
    </div>
  );
}
