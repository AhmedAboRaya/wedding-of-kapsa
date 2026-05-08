import { useState, useEffect, useCallback } from 'react';
import SplitText from './SplitText';
import './Intro.css';

interface IntroProps {
  onComplete: () => void;
}

const lines = [
  'Welcome To Our Wedding',
  'AbdUlrahman & Hager',
  'We Will Be Waiting For You',
];

export default function Intro({ onComplete }: IntroProps) {
  const [currentLine, setCurrentLine] = useState(0);
  const [phase, setPhase] = useState<'animating' | 'visible' | 'fading'>('animating');
  const [done, setDone] = useState(false);

  // Called when SplitText finishes animating the current line
  const handleAnimationComplete = useCallback(() => {
    setPhase('visible');

    // Stay visible for a moment, then fade out
    setTimeout(() => {
      setPhase('fading');

      // After fade out, move to next line or finish
      setTimeout(() => {
        if (currentLine < lines.length - 1) {
          setCurrentLine((prev) => prev + 1);
          setPhase('animating');
        } else {
          setDone(true);
          setTimeout(onComplete, 800);
        }
      }, 600);
    }, 1200);
  }, [currentLine, onComplete]);

  return (
    <div className={`intro-screen ${done ? 'intro-fade-out' : ''}`}>
      <div className="intro-particles">
        {Array.from({ length: 15 }).map((_, i) => (
          <span
            key={i}
            className="intro-particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
              fontSize: `${6 + Math.random() * 10}px`,
            }}
          >
            ✦
          </span>
        ))}
      </div>

      <div className="intro-content">
        <div
          className={`intro-line ${phase === 'fading' ? 'intro-line-fading' : ''} ${currentLine === 1 ? 'intro-names' : ''}`}
          key={currentLine}
        >
          <SplitText
            text={lines[currentLine]}
            delay={70}
            duration={0.7}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 50 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.01}
            rootMargin="0px"
            textAlign="center"
            onLetterAnimationComplete={handleAnimationComplete}
            tag="span"
          />
        </div>
      </div>
    </div>
  );
}
