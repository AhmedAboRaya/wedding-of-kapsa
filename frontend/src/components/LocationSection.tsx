import './LocationSection.css';

const GOOGLE_MAPS_URL = 'https://maps.app.goo.gl/7QdZBdSaEqZdkHKW9?g_st=ipc';

export default function LocationSection() {
  return (
    <section className="location-section" id="location">
      <div className="location-icon">📍</div>
      <h2 className="location-title">Find the Venue</h2>
      <p className="location-subtitle">We can't wait to celebrate with you!</p>
      <a
        href={GOOGLE_MAPS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="location-btn"
        id="location-link"
      >
        <span className="btn-icon">🗺️</span>
        Open in Google Maps
      </a>
      <div className="location-footer">
        <p>22 June 2026 &nbsp;•&nbsp; With love, AbdUlrahman & Hager</p>
      </div>
    </section>
  );
}
