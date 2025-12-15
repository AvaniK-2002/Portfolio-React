// Advanced Animated Input Component based on shadcn/ui design system
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { useResponsiveAnimation, useMagnetic } from '../../hooks/useAnimations';

const inputVariants = cva(
  "flex w-full rounded-xl border bg-transparent text-white placeholder:text-gray-500 transition-all duration-300 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-gray-600 focus:border-purple-500 focus:bg-purple-500/5",
        filled: "border-gray-700 bg-gray-800/50 focus:bg-gray-800 focus:border-purple-500",
        glass: "border-white/20 bg-white/5 backdrop-blur-sm focus:bg-white/10 focus:border-purple-500/50",
        gradient: "border-purple-500/30 bg-gradient-to-r from-purple-500/10 to-blue-500/10 focus:from-purple-500/20 focus:to-blue-500/20 focus:border-purple-500",
      },
      size: {
        sm: "h-9 px-3 text-sm",
        default: "h-11 px-4",
        lg: "h-12 px-6 text-base",
      },
      state: {
        default: "",
        error: "border-red-500 focus:border-red-500 focus:bg-red-500/5",
        success: "border-green-500 focus:border-green-500 focus:bg-green-500/5",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      state: "default",
    },
  }
);

const AnimatedInput = React.forwardRef(({ 
  className, 
  type = "text", 
  variant, 
  size, 
  state,
  label,
  icon: Icon,
  error,
  success,
  magnetic = false,
  shimmer = false,
  ...props 
}, ref) => {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const { isMobile, reducedMotion } = useResponsiveAnimation();
  const { ref: magneticRef, position, handleMouseMove, handleMouseLeave } = useMagnetic(0.05);
  
  // Magnetic effect only on desktop and not reduced motion
  const shouldUseMagnetic = magnetic && !isMobile && !reducedMotion;

  const handleInputChange = (e) => {
    setHasValue(e.target.value.length > 0);
    props.onChange?.(e);
  };

  const inputState = error ? 'error' : success ? 'success' : state;

  return (
    <motion.div
      ref={shouldUseMagnetic ? magneticRef : null}
      className="relative w-full"
      style={shouldUseMagnetic ? {
        x: position.x * 0.05,
        y: position.y * 0.05,
      } : {}}
      onMouseMove={shouldUseMagnetic ? handleMouseMove : null}
      onMouseLeave={shouldUseMagnetic ? handleMouseLeave : null}
    >
      {/* Label */}
      {label && (
        <motion.label 
          className={cn(
            "block text-sm font-medium mb-2 transition-all duration-300",
            focused ? "text-purple-400" : "text-gray-300",
            error && "text-red-400",
            success && "text-green-400"
          )}
          animate={{ 
            scale: focused ? 1.02 : 1,
            y: focused ? -2 : 0
          }}
          transition={{ duration: 0.2 }}
        >
          {label}
        </motion.label>
      )}
      
      {/* Input Container */}
      <div className="relative">
        {/* Icon */}
        {Icon && (
          <motion.div
            className={cn(
              "absolute left-3 top-1/2 transform -translate-y-1/2 z-10 transition-colors duration-300",
              focused ? "text-purple-400" : "text-gray-500",
              error && "text-red-400",
              success && "text-green-400"
            )}
            animate={{ 
              scale: focused ? 1.1 : 1,
            }}
            transition={{ duration: 0.2 }}
          >
            <Icon size={18} />
          </motion.div>
        )}
        
        {/* Main Input */}
        <motion.input
          type={type}
          ref={ref}
          className={cn(
            inputVariants({ variant, size, state: inputState }),
            Icon && "pl-10",
            className
          )}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={handleInputChange}
          whileFocus={{ 
            scale: 1.01,
            boxShadow: "0 0 0 3px rgba(168, 85, 247, 0.1)"
          }}
          transition={{ duration: 0.2 }}
          {...props}
        />
        
        {/* Animated border glow */}
        <motion.div
          className={cn(
            "absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300",
            focused ? "opacity-100" : "opacity-0"
          )}
          animate={{
            boxShadow: focused ? [
              "0 0 0 0 rgba(168, 85, 247, 0.2)",
              "0 0 0 4px rgba(168, 85, 247, 0.1)",
              "0 0 0 0 rgba(168, 85, 247, 0.2)"
            ] : "0 0 0 0 rgba(168, 85, 247, 0)"
          }}
          transition={{ duration: 0.6 }}
        />
        
        {/* Shimmer effect */}
        {shimmer && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 opacity-0 rounded-xl"
            whileFocus={{
              opacity: [0, 1, 0],
              x: ['-100%', '100%'],
              transition: { duration: 1, ease: "easeInOut" }
            }}
          />
        )}
      </div>
      
      {/* Status Indicators */}
      <div className="flex items-center justify-between mt-2">
        {/* Error/Success Messages */}
        {error && (
          <motion.p
            className="text-sm text-red-400"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {error}
          </motion.p>
        )}
        
        {success && (
          <motion.p
            className="text-sm text-green-400"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {success}
          </motion.p>
        )}
        
        {/* Character count or validation indicator */}
        {props.maxLength && (
          <motion.span
            className={cn(
              "text-xs ml-auto",
              hasValue ? "text-gray-400" : "text-gray-600"
            )}
            animate={{
              color: hasValue ? "#9ca3af" : "#4b5563"
            }}
          >
            {hasValue ? `${props.value?.length || 0}/${props.maxLength}` : `0/${props.maxLength}`}
          </motion.span>
        )}
      </div>
      
      {/* Floating animation for focused state */}
      {focused && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-xl pointer-events-none"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  );
});

AnimatedInput.displayName = "AnimatedInput";

// Animated Textarea Component
const AnimatedTextarea = React.forwardRef(({ 
  className, 
  variant, 
  size, 
  state,
  label,
  icon: Icon,
  error,
  success,
  magnetic = false,
  shimmer = false,
  ...props 
}, ref) => {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const { isMobile, reducedMotion } = useResponsiveAnimation();
  const { ref: magneticRef, position, handleMouseMove, handleMouseLeave } = useMagnetic(0.05);
  
  const shouldUseMagnetic = magnetic && !isMobile && !reducedMotion;

  const handleInputChange = (e) => {
    setHasValue(e.target.value.length > 0);
    props.onChange?.(e);
  };

  const inputState = error ? 'error' : success ? 'success' : state;

  return (
    <motion.div
      ref={shouldUseMagnetic ? magneticRef : null}
      className="relative w-full"
      style={shouldUseMagnetic ? {
        x: position.x * 0.05,
        y: position.y * 0.05,
      } : {}}
      onMouseMove={shouldUseMagnetic ? handleMouseMove : null}
      onMouseLeave={shouldUseMagnetic ? handleMouseLeave : null}
    >
      {/* Label */}
      {label && (
        <motion.label 
          className={cn(
            "block text-sm font-medium mb-2 transition-all duration-300",
            focused ? "text-purple-400" : "text-gray-300",
            error && "text-red-400",
            success && "text-green-400"
          )}
          animate={{ 
            scale: focused ? 1.02 : 1,
            y: focused ? -2 : 0
          }}
          transition={{ duration: 0.2 }}
        >
          {label}
        </motion.label>
      )}
      
      {/* Textarea Container */}
      <div className="relative">
        {/* Icon */}
        {Icon && (
          <motion.div
            className={cn(
              "absolute left-3 top-3 z-10 transition-colors duration-300",
              focused ? "text-purple-400" : "text-gray-500",
              error && "text-red-400",
              success && "text-green-400"
            )}
            animate={{ 
              scale: focused ? 1.1 : 1,
            }}
            transition={{ duration: 0.2 }}
          >
            <Icon size={18} />
          </motion.div>
        )}
        
        {/* Main Textarea */}
        <motion.textarea
          ref={ref}
          className={cn(
            inputVariants({ variant, size, state: inputState }),
            "resize-none min-h-[120px]",
            Icon && "pl-10",
            className
          )}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={handleInputChange}
          whileFocus={{ 
            scale: 1.01,
            boxShadow: "0 0 0 3px rgba(168, 85, 247, 0.1)"
          }}
          transition={{ duration: 0.2 }}
          {...props}
        />
        
        {/* Animated border glow */}
        <motion.div
          className={cn(
            "absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300",
            focused ? "opacity-100" : "opacity-0"
          )}
          animate={{
            boxShadow: focused ? [
              "0 0 0 0 rgba(168, 85, 247, 0.2)",
              "0 0 0 4px rgba(168, 85, 247, 0.1)",
              "0 0 0 0 rgba(168, 85, 247, 0.2)"
            ] : "0 0 0 0 rgba(168, 85, 247, 0)"
          }}
          transition={{ duration: 0.6 }}
        />
      </div>
      
      {/* Status Messages */}
      {(error || success) && (
        <motion.div
          className="mt-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {error && (
            <p className="text-sm text-red-400">{error}</p>
          )}
          {success && (
            <p className="text-sm text-green-400">{success}</p>
          )}
        </motion.div>
      )}
    </motion.div>
  );
});

AnimatedTextarea.displayName = "AnimatedTextarea";

export { AnimatedInput, AnimatedTextarea, inputVariants };