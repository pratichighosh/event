import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

const buttonVariants = {
  default: "bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 active:bg-primary-800",
  destructive: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 active:bg-red-800",
  outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-primary-500 active:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:active:bg-gray-600",
  secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500 active:bg-gray-400 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:active:bg-gray-500",
  ghost: "text-gray-700 hover:bg-gray-100 focus:ring-gray-500 active:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800 dark:active:bg-gray-700",
  link: "text-primary-600 underline-offset-4 hover:underline focus:ring-primary-500 active:text-primary-700",
  gradient: "bg-gradient-to-r from-primary-600 to-accent-600 text-white hover:from-primary-700 hover:to-accent-700 active:from-primary-800 active:to-accent-800 shadow-lg hover:shadow-xl",
  glass: "glass text-white border-white/20 hover:bg-white/20 active:bg-white/10"
};

const sizeVariants = {
  default: "h-10 px-4 py-2 text-sm min-h-[40px]",
  sm: "h-9 px-3 py-1.5 text-sm min-h-[36px]",
  lg: "h-11 px-6 py-2.5 text-base min-h-[44px]",
  xl: "h-12 px-8 py-3 text-lg min-h-[48px] sm:h-14 sm:px-10 sm:py-4 sm:text-xl sm:min-h-[56px]",
  icon: "h-10 w-10 min-h-[40px] min-w-[40px] p-0",
  "icon-sm": "h-8 w-8 min-h-[32px] min-w-[32px] p-0",
  "icon-lg": "h-12 w-12 min-h-[48px] min-w-[48px] p-0"
};

const Button = forwardRef(({ 
  className, 
  variant = "default", 
  size = "default", 
  children, 
  loading = false,
  icon,
  disabled = false,
  asChild = false,
  ...props 
}, ref) => {
  const Component = asChild ? motion.div : motion.button;
  
  const buttonClasses = cn(
    // Base styles - mobile-first with proper touch targets
    "inline-flex items-center justify-center rounded-md font-medium transition-all duration-200",
    "focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
    "relative overflow-hidden cursor-pointer select-none",
    // Touch-friendly tap targets
    "touch-manipulation",
    // Ensure minimum touch target size (44px)
    "touch-target",
    // Responsive text handling
    "whitespace-nowrap",
    // Variant styles
    buttonVariants[variant],
    // Size styles
    sizeVariants[size],
    // Loading state
    loading && "pointer-events-none",
    // Disabled state
    disabled && "opacity-50 pointer-events-none cursor-not-allowed",
    className
  );

  const motionProps = {
    whileHover: !disabled && !loading ? { scale: 1.02 } : {},
    whileTap: !disabled && !loading ? { scale: 0.98 } : {},
    transition: { duration: 0.15 },
  };

  return (
    <Component
      ref={ref}
      className={buttonClasses}
      disabled={disabled || loading}
      {...motionProps}
      {...props}
    >
      {/* Loading overlay */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-inherit">
          <div className="loading-dots text-current">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
      
      {/* Button content */}
      <div className={cn(
        "flex items-center justify-center gap-2",
        loading && "opacity-0",
        // Icon-only buttons
        (size === "icon" || size === "icon-sm" || size === "icon-lg") && !children && "gap-0"
      )}>
        {icon && (
          <span className="flex-shrink-0" aria-hidden="true">
            {icon}
          </span>
        )}
        {children && (
          <span className={cn(
            // Responsive text sizing
            "text-center",
            // Hide text on very small screens for xl buttons if too long
            size === "xl" && "truncate"
          )}>
            {children}
          </span>
        )}
      </div>
      
      {/* Ripple effect overlay */}
      <div className="absolute inset-0 overflow-hidden rounded-md">
        <div className="absolute inset-0 bg-white/20 opacity-0 transition-opacity duration-200 group-active:opacity-100" />
      </div>
    </Component>
  );
});

Button.displayName = "Button";

export default Button;