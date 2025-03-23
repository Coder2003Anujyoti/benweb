import React, { useRef, useEffect, useState } from "react";
import { Fireworks } from "fireworks-js";

const Fire = ({ show }) => {
  const containerRef = useRef(null);
  const [fireworks, setFireworks] = useState(null);

  useEffect(() => {
    if (show && containerRef.current) {
      const fw = new Fireworks(containerRef.current, {
        speed: 5,
        intensity: 6,
        friction: 0.96,
        gravity: 2.5,
        particles: 200, // More particles for a richer effect
        traceLength: 4,
        explosion: 15,
        colors: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff", "#ff8800"], // Added more vibrant colors
      });
      fw.start();
      setFireworks(fw);

      // Stop fireworks after 5 seconds
   // setTimeout(() => fw.stop(),20000);
    }
  }, [show]);

  return <div ref={containerRef} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", overflow:"hidden" }} />;
};

export default Fire;