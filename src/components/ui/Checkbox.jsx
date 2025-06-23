import React, { forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '../../utils/cn';

const Checkbox = forwardRef(({ 
  className, 
  label,
  description,
  checked = false,
  onChange,
  disabled = false,
  ...props 
}, ref) => {
  return (
    <div className="flex items-start space-x-3">
      <div className="relative flex items-center">
        <input
          ref={ref}
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          {...props}
        />
        
        <motion.div
          className={cn(
            "flex h-5 w-5 items-center justify-center rounded border-2 transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
            "cursor-pointer",
            checked 
              ? "bg-primary-600 border-primary-600 text-white" 
              : "border-gray-300 bg-white hover:border-gray-400",
            disabled && "cursor-not-allowed opacity-50",
            className
          )}
          whileHover={!disabled ? { scale: 1.05 } : {}}
          whileTap={!disabled ? { scale: 0.95 } : {}}
          onClick={() => !disabled && onChange && onChange(!checked)}
        >
          <AnimatePresence>
            {checked && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Check className="h-3 w-3" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      
      {(label || description) && (
        <div className="flex flex-col">
          {label && (
            <label 
              className={cn(
                "text-sm font-medium text-gray-900 dark:text-white cursor-pointer",
                disabled && "cursor-not-allowed opacity-50"
              )}
              onClick={() => !disabled && onChange && onChange(!checked)}
            >
              {label}
            </label>
          )}
          {description && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;