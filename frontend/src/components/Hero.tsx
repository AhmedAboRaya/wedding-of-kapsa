import './Hero.css';

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-overlay" />
      <div className="hero-particles">
        {Array.from({ length: 20 }).map((_, i) => (
          <span
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${6 + Math.random() * 6}s`,
              fontSize: `${8 + Math.random() * 14}px`,
              opacity: 0.15 + Math.random() * 0.3,
            }}
          >
            ✦
          </span>
        ))}
      </div>
      <div className="hero-content">
        <p className="hero-subtitle">You are invited to the wedding of</p>
        <h1 className="hero-names">
          <span className="name-groom">AbdUlrahman</span>
          <div className="ampersand ">&</div>
          <span className="name-bride">Hager</span>
        </h1>
        <div className="hero-date">
          <div className="date-line" />
          <p>22 . 06 . 2026</p>
          <div className="date-line" />
        </div>
        <p className="hero-tagline">Together with their families, request the honor of your presence</p>
      </div>
      <div className="scroll-hint">
        <span className="scroll-arrow">↓</span>
      </div>
    </section>
  );
}
