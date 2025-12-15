// Custom Hooks for Advanced Scroll-Based Animations
import { useEffect, useRef, useState } from 'react';
import { useInView, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useReducedMotion } from '../lib/animations';

// Hook for scroll-triggered animations
export const useScrollReveal = (options = {}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px 0px",
    amount: 0.1,
    ...options
  });

  return { ref, isInView };
};

// Hook for parallax scrolling effects
export const useParallax = (offset = 50) => {
  const [offsetY, setOffsetY] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        setOffsetY(rate);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { ref, offsetY };
};

// Hook for sticky scroll animations
export const useStickyScroll = (start = 0, end = 1000) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [start, end], [0, -100]);
  const opacity = useTransform(scrollY, [start, end], [1, 0]);

  return { y, opacity };
};

// Hook for magnetic hover effects
export const useMagnetic = (strength = 0.3) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;
    
    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return { ref, position, handleMouseMove, handleMouseLeave };
};

// Hook for viewport-based animations
export const useViewportAnimation = () => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  
  return { scale, opacity, scrollYProgress };
};

// Hook for scroll-based rotation
export const useScrollRotation = (maxRotation = 360) => {
  const { scrollYProgress } = useScroll();
  const rotate = useTransform(scrollYProgress, [0, 1], [0, maxRotation]);
  
  return rotate;
};

// Hook for section-based scroll tracking
export const useSectionScroll = () => {
  const [activeSection, setActiveSection] = useState(0);
  const sections = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      sections.current.forEach((section, index) => {
        if (section && scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
          setActiveSection(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { activeSection, setSection: (index) => sections.current[index] };
};

// Hook for smooth spring animations
export const useSpringAnimation = (initial = 0) => {
  const motionValue = useMotionValue(initial);
  const spring = useSpring(motionValue, { stiffness: 100, damping: 15 });
  
  const setSpringValue = (value) => {
    motionValue.set(value);
  };
  
  return { motionValue: spring, setSpringValue };
};

// Hook for scroll-based progress indicators
export const useScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      setScrollPercentage(Math.round(latest * 100));
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  return scrollPercentage;
};

// Hook for responsive animations
export const useResponsiveAnimation = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return { isMobile, isTablet, reducedMotion };
};

// Hook for intersection-based animations
export const useIntersection = (threshold = 0.1) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  return { ref, isIntersecting };
};

// Hook for scroll-triggered text animations
export const useScrollText = () => {
  const ref = useRef(null);
  const [text, setText] = useState('');
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (ref.current && isInView) {
      const originalText = ref.current.textContent;
      let index = 0;
      
      const typeWriter = () => {
        if (index < originalText.length) {
          setText(originalText.slice(0, index + 1));
          index++;
          setTimeout(typeWriter, 50);
        }
      };
      
      typeWriter();
    }
  }, [isInView]);

  return { ref, text, isInView };
};

// Hook for gesture-based animations
export const useGestures = () => {
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0, top: 0, bottom: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleDrag = (event, info) => {
    setDragOffset({ x: info.offset.x, y: info.offset.y });
  };

  return { dragConstraints, dragOffset, handleDrag };
};

// Hook for performance-optimized animations
export const useOptimizedAnimation = (dependencies = []) => {
  const shouldReduceMotion = useReducedMotion();
  const { isMobile } = useResponsiveAnimation();

  const getOptimizedConfig = (normalConfig) => {
    if (shouldReduceMotion || isMobile) {
      return {
        ...normalConfig,
        duration: normalConfig.duration * 0.5,
        type: "tween",
        ease: "linear"
      };
    }
    return normalConfig;
  };

  return { shouldReduceMotion, isMobile, getOptimizedConfig };
};