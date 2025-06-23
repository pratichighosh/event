import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { useAppContext } from '../../App';

const Card = forwardRef(({ className, children, hover = true, glass = false, interactive = false, ...props }, ref) => {
  const { theme } = useAppContext();
  
  const cardClasses = cn(
    // Base responsive card styles
    "rounded-lg border shadow-sm transition-all duration-300",
    "w-full", // Full width by default for mobile-first
    // Light theme styling - bright white background
    theme === 'light' && !glass && "bg-white border-gray-200 shadow-md",
    // Dark theme styling
    theme === 'dark' && !glass && "bg-gray-900 border-gray-800",
    // Glass effect with theme awareness
    glass && theme === 'light' && "bg-white/90 backdrop-blur-md border-gray-200/50 shadow-lg",
    glass && theme === 'dark' && "bg-gray-800/20 backdrop-blur-md border-gray-700/30",
    // Interactive cards (clickable)
    interactive && "cursor-pointer select-none touch-manipulation",
    // Hover effects (disabled on touch devices to prevent sticky hover)
    hover && "hover:shadow-lg @media (hover: hover) { hover:shadow-xl }",
    // Touch-friendly active states
    interactive && "active:scale-[0.98] active:shadow-sm",
    className
  );

  const motionProps = hover ? {
    whileHover: { y: -4, scale: 1.02 },
    whileTap: interactive ? { scale: 0.98 } : {},
    transition: { duration: 0.2, ease: "easeOut" }
  } : {};

  return (
    <motion.div
      ref={ref}
      className={cardClasses}
      {...motionProps}
      {...props}
    >
      {children}
    </motion.div>
  );
});

Card.displayName = "Card";

const CardHeader = forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      // Responsive padding
      "flex flex-col space-y-1.5",
      "p-4 sm:p-6", // Mobile: 16px, Desktop: 24px
      className
    )}
    {...props}
  >
    {children}
  </div>
));

CardHeader.displayName = "CardHeader";

const CardTitle = forwardRef(({ className, children, ...props }, ref) => {
  const { theme } = useAppContext();
  
  return (
    <h3
      ref={ref}
      className={cn(
        // Responsive text sizing
        "text-lg sm:text-xl lg:text-2xl font-semibold leading-tight tracking-tight",
        // Theme-aware text colors
        theme === 'light' ? "text-gray-900" : "text-white",
        // Mobile-optimized line height
        "leading-tight",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
});

CardTitle.displayName = "CardTitle";

const CardDescription = forwardRef(({ className, children, ...props }, ref) => {
  const { theme } = useAppContext();
  
  return (
    <p
      ref={ref}
      className={cn(
        // Responsive text sizing
        "text-sm sm:text-base",
        // Theme-aware text colors with better contrast
        theme === 'light' ? "text-gray-700" : "text-gray-400",
        // Mobile-optimized line height
        "leading-relaxed",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
});

CardDescription.displayName = "CardDescription";

const CardContent = forwardRef(({ className, children, ...props }, ref) => (
  <div 
    ref={ref} 
    className={cn(
      // Responsive padding
      "p-4 sm:p-6 pt-0", // Mobile: 16px, Desktop: 24px, no top padding
      className
    )} 
    {...props}
  >
    {children}
  </div>
));

CardContent.displayName = "CardContent";

const CardFooter = forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      // Responsive padding and layout
      "flex items-center",
      "p-4 sm:p-6 pt-0", // Mobile: 16px, Desktop: 24px, no top padding
      // Mobile: stack vertically, Desktop: horizontal
      "flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4",
      className
    )}
    {...props}
  >
    {children}
  </div>
));

CardFooter.displayName = "CardFooter";

// Additional responsive card variants
const CardGrid = forwardRef(({ className, children, cols = 3, ...props }, ref) => {
  const gridClasses = cn(
    "grid gap-4 sm:gap-6 lg:gap-8",
    // Responsive grid columns
    cols === 1 && "grid-cols-1",
    cols === 2 && "grid-cols-1 sm:grid-cols-2",
    cols === 3 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    cols === 4 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
    cols === 6 && "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6",
    className
  );

  return (
    <div ref={ref} className={gridClasses} {...props}>
      {children}
    </div>
  );
});

CardGrid.displayName = "CardGrid";

const CardImage = forwardRef(({ className, src, alt, aspectRatio = "16/9", ...props }, ref) => (
  <div 
    ref={ref}
    className={cn(
      "relative overflow-hidden rounded-t-lg",
      // Responsive aspect ratios
      aspectRatio === "16/9" && "aspect-[16/9]",
      aspectRatio === "4/3" && "aspect-[4/3]", 
      aspectRatio === "1/1" && "aspect-square",
      aspectRatio === "3/4" && "aspect-[3/4]",
      className
    )}
    {...props}
  >
    <img
      src={src}
      alt={alt}
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
      loading="lazy"
    />
  </div>
));

CardImage.displayName = "CardImage";

const CardActions = forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      // Mobile-first button layout
      "flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2",
      // Full width buttons on mobile
      "[&>button]:w-full sm:[&>button]:w-auto",
      className
    )}
    {...props}
  >
    {children}
  </div>
));

CardActions.displayName = "CardActions";

export { 
  Card, 
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardDescription, 
  CardContent,
  CardGrid,
  CardImage,
  CardActions
};