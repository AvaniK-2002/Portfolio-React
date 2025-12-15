// Animated Badge Component based on shadcn/ui design system
import React from 'react';
import { motion } from 'framer-motion';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-all duration-300 relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-purple-500/20 text-purple-300 border border-purple-500/30",
        secondary: "bg-gray-500/20 text-gray-300 border border-gray-500/30",
        destructive: "bg-red-500/20 text-red-300 border border-red-500/30",
        outline: "border border-gray-500/30 bg-transparent text-gray-300",
        success: "bg-green-500/20 text-green-300 border border-green-500/30",
        warning: "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const Badge = React.forwardRef(({ 
  className, 
  variant, 
  children, 
  pulse = false,
  glow = false,
  ...props 
}, ref) => {
  return (
    <motion.div
      className="relative inline-block"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      {/* Glow effect */}
      {glow && (
        <motion.div
          className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur opacity-20"
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}

      <motion.div
        className={cn(badgeVariants({ variant }), className)}
        ref={ref}
        whileHover={{
          scale: 1.05,
          y: -1,
        }}
        whileTap={{
          scale: 0.95,
        }}
        {...props}
      >
        {/* Pulse effect */}
        {pulse && (
          <motion.div
            className="absolute inset-0 bg-current rounded-full opacity-20"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.1, 0.2],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
        
        <span className="relative z-10">
          {children}
        </span>
      </motion.div>
    </motion.div>
  );
});

Badge.displayName = "Badge";

export { Badge, badgeVariants };