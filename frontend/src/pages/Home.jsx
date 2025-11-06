import { useEffect, useState } from "react";

export function Home() {
  const [heroImagePosition, setHeroImagePosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroImagePosition((prev) => (prev > -1600 ? prev - 410 : 0));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main>
      <section className="hero-section">
        <img
          src="hp-hero.jpg"
          alt="hero"
          style={{
            transition: "transform 0.3s ease",
            transform: `translateX(${heroImagePosition}px)`,
          }}
        />
      </section>
    </main>
  );
}
