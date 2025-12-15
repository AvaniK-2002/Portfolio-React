// Advanced Animated Button Component based on shadcn/ui design system
import React from 'react';
import { motion } from 'framer-motion';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { useResponsiveAnimation, useMagnetic } from '../../hooks/useAnimations';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg hover:from-purple-700 hover:to-blue-700 hover:shadow-xl",
        destructive: "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg hover:from-red-600 hover:to-pink-600 hover:shadow-xl",
        outline: "border-2 border-purple-500/30 bg-transparent text-purple-200 hover:bg-purple-500/10 hover:border-purple-500/50 backdrop-blur-sm",
        secondary: "bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border border-white/20",
        ghost: "text-gray-300 hover:text-white hover:bg-white/10",
        link: "text-purple-400 underline-offset-4 hover:underline hover:text-purple-300",
      },
      size: {
        default: "h-11 px-6 py-3",
        sm: "h-9 rounded-lg px-4 text-xs",
        lg: "h-12 rounded-xl px-8 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const AnimatedButton = React.forwardRef(({ 
  className, 
  variant, 
  size, 
  asChild = false, 
  children, 
  magnetic = false,
  loading = false,
  loadingText = "Loading...",
  shimmer = false,
  glow = false,
  ...props 
}, ref) => {
  const Comp = asChild ? Slot : motion.button;
  const { isMobile, reducedMotion } = useResponsiveAnimation();
  const { ref: magneticRef, position, handleMouseMove, handleMouseLeave } = useMagnetic(0.1);
  
  // Magnetic effect only on desktop and not reduced motion
  const shouldUseMagnetic = magnetic && !isMobile && !reducedMotion;

  return (
    <motion.div
      ref={shouldUseMagnetic ? magneticRef : null}
      className="relative inline-block"
      style={shouldUseMagnetic ? {
        x: position.x * 0.1,
        y: position.y * 0.1,
      } : {}}
      onMouseMove={shouldUseMagnetic ? handleMouseMove : null}
      onMouseLeave={shouldUseMagnetic ? handleMouseLeave : null}
    >
      {/* Shimmer effect */}
      {shimmer && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
          initial={{ x: '-100%' }}
          whileHover={{
            x: '100%',
            transition: { duration: 0.6, ease: "easeInOut" }
          }}
        />
      )}
      
      {/* Glow effect */}
      {glow && (
        <motion.div
          className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.02, 1]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}

      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={loading}
        whileHover={{
          scale: shouldUseMagnetic ? 1.05 : 1.02,
          y: shouldUseMagnetic ? -2 : -1,
          boxShadow: shouldUseMagnetic ? "0 10px 25px rgba(168, 85, 247, 0.3)" : "0 5px 15px rgba(168, 85, 247, 0.2)"
        }}
        whileTap={{
          scale: 0.98,
          transition: { duration: 0.1 }
        }}
        initial={{
          scale: 1,
          y: 0,
        }}
        transition={{
          duration: 0.2,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        {...props}
      >
        {loading ? (
          <>
            <motion.div
              className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <span>{loadingText}</span>
          </>
        ) : (
          children
        )}
        
        {/* Animated background pulse */}
        <motion.div
          className="absolute inset-0 bg-white/10 rounded-xl opacity-0 group-hover:opacity-100"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </Comp>
    </motion.div>
  );
});

AnimatedButton.displayName = "AnimatedButton";

export { AnimatedButton, buttonVariants };