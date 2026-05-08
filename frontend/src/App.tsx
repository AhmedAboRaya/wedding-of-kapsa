import { useState } from 'react';
import './index.css';
import Intro from './components/Intro';
import Hero from './components/Hero';
import Countdown from './components/Countdown';
import ScrollStack from './components/ScrollStack';
import CommentsSection from './components/CommentsSection';
import LocationSection from './components/LocationSection';

const scrollImages = [
  'https://i.postimg.cc/T35j7nG2/Chat-GPT-Image-8-mayw-2026-11-15-41-s.png',
  'https://i.postimg.cc/bNJ9nKBK/Chat-GPT-Image-8-mayw-2026-11-15-49-s.png',
  'https://i.postimg.cc/QxtJ7Ryz/Chat-GPT-Image-May-8-2026-11-24-56-AM.png',
  'https://i.postimg.cc/Wb3wZQHK/Chat-GPT-Image-May-8-2026-11-16-37-AM.png',
  'https://i.postimg.cc/P5vb31hP/Chat-GPT-Image-8-mayw-2026-11-15-28-s.png',
  'https://i.postimg.cc/rshGbJKW/Chat-GPT-Image-May-8-2026-11-28-13-AM.png',
];

function App() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <>
      {!introComplete && <Intro onComplete={() => setIntroComplete(true)} />}

      <div className={`app ${introComplete ? 'app-visible' : 'app-hidden'}`}>
        <Hero />
        <Countdown />

        <ScrollStack>
          {scrollImages.map((src, i) => (
            <div className="stack-card stack-card-image" key={i}>
              <img src={src} alt={`Wedding moment ${i + 1}`} loading="lazy" />
            </div>
          ))}
        </ScrollStack>

        <CommentsSection />
        <LocationSection />
      </div>
    </>
  );
}

export default App;
