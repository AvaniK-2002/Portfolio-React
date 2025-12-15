import React, { useCallback } from 'react';
import { loadSlim } from "tsparticles-slim";
import Particles from "react-particles";

const ParticlesBackground = () => {
  const particlesInit = useCallback(async engine => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      className="absolute inset-0"
      init={particlesInit}
      options={{
        background: {
          color: {
            value: "transparent",
          },
        },
        fpsLimit: 60, // Reduced from 120 for better performance
        interactivity: {
          events: {
            onHover: {
              enable: false, // Disabled for better performance
            },
          },
          modes: {
            repulse: {
              distance: 100,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: "#a855f7",
          },
          links: {
            color: "#a855f7",
            distance: 120, // Reduced from 150
            enable: true,
            opacity: 0.2, // Reduced opacity
            width: 0.5, // Reduced width
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: false,
            speed: 0.8, // Reduced speed
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 1000, // Increased area for fewer particles
            },
            value: 40, // Reduced from 80 for better performance
          },
          opacity: {
            value: 0.2, // Reduced opacity
          },
          size: {
            value: { min: 1, max: 2 }, // Smaller particles
          },
        },
        detectRetina: true,
      }}
    />
  );
};

export default ParticlesBackground;