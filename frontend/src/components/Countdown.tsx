import { useState, useEffect } from 'react';
import './Countdown.css';

const WEDDING_DATE = new Date('2026-06-22T00:00:00').getTime();

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): TimeLeft {
  const now = Date.now();
  const diff = Math.max(0, WEDDING_DATE - now);

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(n: number): string {
  return n.toString().padStart(2, '0');
}

export default function Countdown() {
  const [time, setTime] = useState<TimeLeft>(getTimeLeft);

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  const blocks = [
    { value: time.days, label: 'Days' },
    { value: time.hours, label: 'Hours' },
    { value: time.minutes, label: 'Minutes' },
    { value: time.seconds, label: 'Seconds' },
  ];

  return (
    <section className="countdown" id="countdown">
      <h2 className="countdown-title">Counting Down To Our Day</h2>
      <div className="countdown-grid">
        {blocks.map((block, i) => (
          <div key={block.label} className="countdown-block">
            <div className="countdown-value">
              <span className="digit" key={`${block.label}-${block.value}`}>
                {pad(block.value)}
              </span>
            </div>
            <span className="countdown-label">{block.label}</span>
            {i < blocks.length - 1 && <span className="countdown-separator">:</span>}
          </div>
        ))}
      </div>
    </section>
  );
}
