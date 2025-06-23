import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '../../utils/cn';

const Select = ({ 
  options = [], 
  value, 
  onChange, 
  placeholder = "Select option...", 
  label,
  error,
  multiple = false,
  className,
  disabled = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue) => {
    if (multiple) {
      const newValue = Array.isArray(value) ? value : [];
      const updatedValue = newValue.includes(optionValue)
        ? newValue.filter(v => v !== optionValue)
        : [...newValue, optionValue];
      onChange(updatedValue);
    } else {
      onChange(optionValue);
      setIsOpen(false);
    }
  };

  const getDisplayValue = () => {
    if (multiple && Array.isArray(value)) {
      if (value.length === 0) return placeholder;
      if (value.length === 1) {
        const option = options.find(opt => opt.value === value[0]);
        return option ? option.label : value[0];
      }
      return `${value.length} selected`;
    } else {
      const option = options.find(opt => opt.value === value);
      return option ? option.label : placeholder;
    }
  };

  const isSelected = (optionValue) => {
    if (multiple && Array.isArray(value)) {
      return value.includes(optionValue);
    }
    return value === optionValue;
  };

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      
      <div className="relative" ref={selectRef}>
        <motion.button
          type="button"
          className={cn(
            "flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm",
            "placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "dark:border-gray-600 dark:bg-gray-800 dark:text-white",
            "transition-all duration-200",
            error && "border-red-500 focus:ring-red-500",
            isOpen && "ring-2 ring-primary-500 border-transparent"
          )}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          whileTap={{ scale: 0.99 }}
        >
          <span className={cn(
            "truncate",
            !value || (Array.isArray(value) && value.length === 0) ? "text-gray-400" : "text-gray-900 dark:text-white"
          )}>
            {getDisplayValue()}
          </span>
          <ChevronDown 
            className={cn(
              "h-4 w-4 text-gray-400 transition-transform duration-200",
              isOpen && "rotate-180"
            )} 
          />
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg max-h-60 overflow-auto"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {options.map((option) => (
                <motion.button
                  key={option.value}
                  type="button"
                  className={cn(
                    "flex w-full items-center justify-between px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700",
                    "focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-700",
                    isSelected(option.value) && "bg-primary-50 text-primary-700 dark:bg-primary-900 dark:text-primary-300"
                  )}
                  onClick={() => handleSelect(option.value)}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.1 }}
                >
                  <span>{option.label}</span>
                  {isSelected(option.value) && (
                    <Check className="h-4 w-4" />
                  )}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
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
};

export default Select;