import { useCallback, useState } from "react";
import OrbCanvas from "./OrbCanvas";

export default function InteractiveOrb() {
  const [ready, setReady] = useState(false);
  const onReady = useCallback(() => setReady(true), []);

  return (
    <div
      role="img"
      tabIndex={0}
      aria-label="Interactive three dimensional earth toned sculpture. Move the pointer or use arrow keys to explore."
      className="hero-orb"
    >
      <div className={`orb-fallback ${ready ? "orb-fallback-hidden" : ""}`} aria-hidden="true">
        <div className="orb-fallback-ring orb-fallback-ring-one" />
        <div className="orb-fallback-ring orb-fallback-ring-two" />
        <div className="orb-fallback-core" />
      </div>
      <OrbCanvas onReady={onReady} />
    </div>
  );
}
