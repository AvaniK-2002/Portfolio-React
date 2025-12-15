// Advanced Animated Card Component based on shadcn/ui design system
import React from 'react';
import { motion } from 'framer-motion';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { useResponsiveAnimation, useMagnetic, useScrollReveal } from '../../hooks/useAnimations';
import { cardHoverVariants, revealVariants, staggerItem } from '../../lib/animations';

const cardVariants = cva(
  "rounded-2xl border bg-card text-card-foreground shadow-sm transition-all duration-300 relative overflow-hidden group",
  {
    variants: {
      variant: {
        default: "bg-gray-900/50 backdrop-blur-sm border-purple-500/20 hover:border-purple-500/40",
        elevated: "bg-gray-900/80 backdrop-blur-lg border-purple-500/30 shadow-xl hover:shadow-2xl hover:shadow-purple-500/20",
        glass: "bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 hover:border-white/20",
        gradient: "bg-gradient-to-br from-purple-900/50 to-blue-900/50 backdrop-blur-sm border-purple-500/30 hover:from-purple-900/70 hover:to-blue-900/70",
      },
      padding: {
        none: "p-0",
        sm: "p-4",
        default: "p-6",
        lg: "p-8",
      },
      hover: {
        none: "",
        lift: "hover:-translate-y-2 hover:shadow-2xl",
        scale: "hover:scale-105",
        glow: "hover:shadow-lg hover:shadow-purple-500/25",
        magnetic: "cursor-pointer",
      }
    },
    defaultVariants: {
      variant: "default",
      padding: "default",
      hover: "lift",
    },
  }
);

const AnimatedCard = React.forwardRef(({ 
  className, 
  variant, 
  padding, 
  hover,
  children, 
  magnetic = false,
  shimmer = false,
  glow = false,
  floating = false,
  reveal = true,
  delay = 0,
  ...props 
}, ref) => {
  const { isMobile, reducedMotion } = useResponsiveAnimation();
  const { ref: magneticRef, position, handleMouseMove, handleMouseLeave } = useMagnetic(0.15);
  const { ref: cardRef, isInView } = useScrollReveal();
  
  // Magnetic effect only on desktop and not reduced motion
  const shouldUseMagnetic = magnetic && !isMobile && !reducedMotion;
  const shouldUseHover = hover === 'magnetic' && !isMobile && !reducedMotion;

  const CardWrapper = ({ children: wrapperChildren }) => (
    <motion.div
      ref={shouldUseMagnetic || shouldUseHover ? magneticRef : cardRef}
      className={cn("relative inline-block w-full", {
        "cursor-pointer": shouldUseHover
      })}
      style={shouldUseMagnetic ? {
        x: position.x * 0.1,
        y: position.y * 0.1,
      } : {}}
      onMouseMove={shouldUseMagnetic || shouldUseHover ? handleMouseMove : null}
      onMouseLeave={shouldUseHover ? handleMouseLeave : null}
      {...(reveal ? {
        variants: revealVariants,
        initial: "hidden",
        animate: isInView ? "visible" : "hidden",
        transition: { delay }
      } : {})}
      {...props}
    >
      {/* Shimmer effect */}
      {shimmer && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100"
          initial={{ x: '-100%' }}
          whileHover={{
            x: '100%',
            transition: { duration: 0.8, ease: "easeInOut" }
          }}
        />
      )}
      
      {/* Glow effect */}
      {glow && (
        <motion.div
          className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          animate={{
            opacity: [0, 0.3, 0],
            scale: [1, 1.02, 1]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      )}

      {/* Floating animation */}
      {floating && (
        <motion.div
          className="absolute -inset-1 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl"
          animate={{
            y: [0, -5, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}

      <div
        className={cn(
          cardVariants({ variant, padding, hover }),
          className
        )}
        {...(shouldUseHover ? {
          variants: cardHoverVariants,
          initial: "rest",
          whileHover: "hover",
          whileTap: "tap"
        } : {})}
      >
        {wrapperChildren}
      </div>
    </motion.div>
  );

  if (Array.isArray(children)) {
    return (
      <CardWrapper>
        {children.map((child, index) => (
          <motion.div
            key={index}
            variants={staggerItem}
            initial="hidden"
            animate={reveal ? (isInView ? "visible" : "hidden") : "visible"}
            transition={{ delay: delay + (index * 0.1) }}
          >
            {child}
          </motion.div>
        ))}
      </CardWrapper>
    );
  }

  return (
    <CardWrapper>
      {children}
    </CardWrapper>
  );
});

AnimatedCard.displayName = "AnimatedCard";

export { AnimatedCard, cardVariants };