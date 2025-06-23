import React, { forwardRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

const Input = forwardRef(({ 
  className, 
  type = "text", 
  label,
  error,
  icon,
  rightIcon,
  placeholder,
  ...props 
}, ref) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        
        <motion.input
          ref={ref}
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm",
            "placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500",
            "transition-all duration-200",
            icon && "pl-10",
            rightIcon && "pr-10",
            error && "border-red-500 focus:ring-red-500",
            focused && "ring-2 ring-primary-500 border-transparent",
            className
          )}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          animate={{
            scale: focused ? 1.01 : 1,
          }}
          transition={{ duration: 0.2 }}
          {...props}
        />
        
        {rightIcon && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {rightIcon}
          </div>
        )}
      </div>
      
      {error && (
        <motion.p 
          className="text-sm text-red-600"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {error}
        </motion.p>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;