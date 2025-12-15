// Advanced Framer Motion Animation Variants & Patterns
// Designed for premium, calm, and modern visual experiences

// Responsive motion detection
export const useReducedMotion = () => {
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
  return false;
};

// Page Transition Variants
export const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    filter: "blur(8px)",
  },
  in: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
      filter: {
        duration: 0.4,
        delay: 0.2
      }
    }
  },
  out: {
    opacity: 0,
    y: -20,
    filter: "blur(8px)",
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

// Scroll Reveal Animation Variants
export const revealVariants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.95,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
      opacity: { duration: 0.6 },
      y: { duration: 0.8 },
      scale: { duration: 0.8, delay: 0.1 },
      filter: { duration: 0.6, delay: 0.2 }
    }
  }
};

// Staggered Children Animation
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    }
  }
};

export const staggerItem = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

// Card Hover Animation Variants
export const cardHoverVariants = {
  rest: {
    scale: 1,
    y: 0,
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    borderRadius: "12px",
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  hover: {
    scale: 1.02,
    y: -8,
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(168, 85, 247, 0.1)",
    borderRadius: "16px",
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.1
    }
  }
};

// Floating Animation Variants
export const floatingVariants = {
  float: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  },
  floatHover: {
    y: [0, -15, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Gradient Animation Variants
export const gradientVariants = {
  initial: {
    backgroundPosition: "0% 50%",
  },
  animate: {
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

// Parallax Effect Variants
export const parallaxVariants = {
  slow: (distance) => ({
    y: distance * 0.3,
    transition: {
      duration: 0.1,
      ease: "linear"
    }
  }),
  medium: (distance) => ({
    y: distance * 0.5,
    transition: {
      duration: 0.1,
      ease: "linear"
    }
  }),
  fast: (distance) => ({
    y: distance * 0.8,
    transition: {
      duration: 0.1,
      ease: "linear"
    }
  })
};

// Micro-interaction Variants
export const microInteractionVariants = {
  buttonHover: {
    scale: 1.05,
    y: -2,
    boxShadow: "0 10px 25px rgba(168, 85, 247, 0.3)",
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  },
  buttonTap: {
    scale: 0.95,
    y: 0,
    boxShadow: "0 2px 10px rgba(168, 85, 247, 0.2)",
    transition: {
      duration: 0.1
    }
  },
  iconSpin: {
    rotate: 360,
    scale: 1.1,
    transition: {
      duration: 0.5,
      ease: "easeInOut"
    }
  }
};

// Text Animation Variants
export const textVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: "blur(4px)",
  },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      delay: custom * 0.1,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  })
};

// Image Hover Effects
export const imageHoverVariants = {
  rest: {
    scale: 1,
    filter: "brightness(1) saturate(1)",
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  hover: {
    scale: 1.05,
    filter: "brightness(1.1) saturate(1.2)",
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

// Loading Animation Variants
export const loadingVariants = {
  initial: {
    opacity: 0,
    scale: 0.8,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  },
  exit: {
    opacity: 0,
    scale: 1.1,
    transition: {
      duration: 0.3,
      ease: "easeIn"
    }
  }
};

// Modal/Dialog Animation Variants
export const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 50,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: -20,
    filter: "blur(4px)",
    transition: {
      duration: 0.3,
      ease: "easeIn"
    }
  }
};

// Tab Animation Variants
export const tabVariants = {
  inactive: {
    opacity: 0.7,
    scale: 0.95,
    y: 10,
  },
  active: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

// Glow Effect Variants
export const glowVariants = {
  rest: {
    boxShadow: "0 0 20px rgba(168, 85, 247, 0.3)",
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  hover: {
    boxShadow: [
      "0 0 20px rgba(168, 85, 247, 0.4)",
      "0 0 40px rgba(168, 85, 247, 0.6)",
      "0 0 20px rgba(168, 85, 247, 0.4)"
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Timeline Animation Variants
export const timelineVariants = {
  line: {
    initial: {
      scaleY: 0,
      opacity: 0
    },
    animate: {
      scaleY: 1,
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: "easeOut"
      }
    }
  },
  milestone: {
    hidden: {
      opacity: 0,
      scale: 0,
      x: -50
    },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }
};

// Responsive Animation Configurations
export const responsiveConfig = {
  mobile: {
    reducedMotion: true,
    staggerChildren: 0.05,
    durationMultiplier: 0.7,
    scaleMultiplier: 0.8
  },
  tablet: {
    reducedMotion: false,
    staggerChildren: 0.08,
    durationMultiplier: 0.85,
    scaleMultiplier: 0.9
  },
  desktop: {
    reducedMotion: false,
    staggerChildren: 0.1,
    durationMultiplier: 1,
    scaleMultiplier: 1
  }
};

// Export animation configurations
export const animationConfigs = {
  fast: {
    duration: 0.2,
    ease: "easeOut"
  },
  normal: {
    duration: 0.3,
    ease: [0.25, 0.46, 0.45, 0.94]
  },
  slow: {
    duration: 0.6,
    ease: [0.25, 0.46, 0.45, 0.94]
  },
  verySlow: {
    duration: 1.0,
    ease: [0.25, 0.46, 0.45, 0.94]
  }
};