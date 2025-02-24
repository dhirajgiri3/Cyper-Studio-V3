// src/components/ParticleBackground.jsx
import React, { memo, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";

const ParticleBackground = memo(() => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const options = useMemo(() => ({
    fullScreen: false,
    fpsLimit: 120,
    particles: {
      number: {
        value: 50,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: ["#60A5FA", "#A855F7", "#34D399", "#F472B6"],
        animation: {
          enable: true,
          speed: 20,
          sync: false
        }
      },
      shape: {
        type: ["circle", "triangle"]
      },
      opacity: {
        value: 0.5,
        random: false,
        animation: {
          enable: true,
          speed: 0.5,
          minimumValue: 0.1,
          sync: false
        }
      },
      size: {
        value: { min: 1, max: 3 },
        animation: {
          enable: true,
          speed: 2,
          minimumValue: 0.1,
          sync: false
        }
      },
      links: {
        enable: true,
        distance: 150,
        color: {
          value: "#ffffff"
        },
        opacity: 0.016,
        width: 1
      },
      move: {
        enable: true,
        speed: 0.8,
        direction: "none",
        random: false,
        straight: false,
        outModes: {
          default: "bounce"
        },
        attract: {
          enable: true,
          rotateX: 600,
          rotateY: 1200
        }
      }
    },
    interactivity: {
      detectsOn: "window",
      events: {
        onHover: {
          enable: true,
          mode: ["grab", "bubble"]
        },
        onClick: {
          enable: true,
          mode: "push"
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 180,
          links: {
            opacity: 0.25,
            color: "#ffffff"
          }
        },
        bubble: {
          distance: 200,
          size: 5,
          duration: 2,
          opacity: 0.25,
          speed: 2
        },
        push: {
          quantity: 4
        }
      }
    },
    background: {
      color: "transparent"
    },
    detectRetina: true,
    themes: [
      {
        name: "light",
        default: {
          value: false
        },
        options: {
          background: {
            color: "transparent"
          },
          particles: {
            color: {
              value: ["#60A5FA", "#A855F7", "#34D399", "#F472B6"]
            }
          }
        }
      }
    ],
    responsive: [
      {
        maxWidth: 768,
        options: {
          particles: {
            number: {
              value: 30
            },
            move: {
              speed: 0.6
            }
          }
        }
      }
    ],
    smooth: true,
    autoPlay: true,
    pauseOnBlur: true,
    pauseOnOutsideViewport: true,
    zLayers: 1
  }), []);

  return (
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={options}
        className="h-full w-full"
      />
    </motion.div>
  );
});

ParticleBackground.displayName = "ParticleBackground";
export default ParticleBackground;