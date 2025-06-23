import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import { useAppContext } from '../../App';

const NotificationIcon = ({ type }) => {
  switch (type) {
    case 'success':
      return <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />;
    case 'error':
      return <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 flex-shrink-0" />;
    case 'warning':
      return <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 flex-shrink-0" />;
    default:
      return <Info className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0" />;
  }
};

const Notifications = () => {
  const { notifications, removeNotification, theme } = useAppContext();

  return (
    <div className="fixed top-16 sm:top-20 right-2 sm:right-4 z-50 space-y-2 max-w-[calc(100vw-16px)] sm:max-w-md">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 300, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className={`p-3 sm:p-4 rounded-lg border backdrop-blur-md shadow-lg ${
              theme === 'light' 
                ? 'bg-white/95 border-gray-200' 
                : 'bg-gray-800/95 border-gray-700'
            }`}
          >
            <div className="flex items-start space-x-2 sm:space-x-3">
              <NotificationIcon type={notification.type} />
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium leading-tight ${
                  theme === 'light' ? 'text-gray-900' : 'text-white'
                }`}>
                  {notification.message}
                </p>
                {notification.description && (
                  <p className={`text-xs sm:text-sm mt-1 leading-relaxed ${
                    theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                  }`}>
                    {notification.description}
                  </p>
                )}
              </div>
              <button
                onClick={() => removeNotification(notification.id)}
                className={`flex-shrink-0 p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors touch-manipulation ${
                  theme === 'light' ? 'text-gray-400 hover:text-gray-600' : 'text-gray-500 hover:text-gray-300'
                }`}
                aria-label="Dismiss notification"
              >
                <X className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

const Layout = ({ children }) => {
  const { theme } = useAppContext();
  
  return (
    <div className={`min-h-screen transition-all duration-300 ${theme} overflow-x-hidden`}>
      {/* Main container with responsive background */}
      <div className={`min-h-screen transition-all duration-300 ${
        theme === 'light' 
          ? 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50' 
          : 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
      }`}>
        
        {/* Header - Fixed positioning with responsive height */}
        <Header />
        
        {/* Main content area - Responsive padding */}
        <main className="pt-14 sm:pt-16 lg:pt-18 min-h-screen">
          {/* Content wrapper with smooth transitions */}
          <div className="relative">
            {children}
          </div>
        </main>
        
        {/* Footer - Responsive */}
        <Footer />
        
        {/* Notifications - Mobile-optimized */}
        <Notifications />
        
        {/* Background pattern overlay - Hidden on mobile for performance */}
        <div className="fixed inset-0 pointer-events-none opacity-30 hidden sm:block">
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23${theme === 'light' ? '3b82f6' : 'ffffff'}' fill-opacity='0.02'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '40px 40px'
            }}
          />
        </div>
      </div>
      
      {/* Mobile-specific optimizations */}
      <style jsx>{`
        @media (max-width: 640px) {
          /* Improve touch scrolling */
          body {
            -webkit-overflow-scrolling: touch;
            scroll-behavior: smooth;
          }
          
          /* Prevent zoom on input focus */
          input, select, textarea {
            font-size: 16px !important;
          }
          
          /* Optimize animations for mobile */
          * {
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
          }
        }
        
        /* Tablet optimizations */
        @media (min-width: 641px) and (max-width: 1024px) {
          /* Optimize for tablet interactions */
          .tablet-optimized {
            padding: 1.5rem;
          }
        }
        
        /* Desktop optimizations */
        @media (min-width: 1025px) {
          /* Enable hover effects only on desktop */
          .hover-desktop:hover {
            transform: translateY(-2px);
          }
        }
        
        /* High DPI display optimizations */
        @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
          .retina-optimized {
            image-rendering: -webkit-optimize-contrast;
          }
        }
        
        /* Reduce motion for users who prefer it */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
        
        /* Dark mode system preference support */
        @media (prefers-color-scheme: dark) {
          :root {
            color-scheme: dark;
          }
        }
        
        /* Improve text rendering */
        body {
          text-rendering: optimizeLegibility;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        /* Ensure touch targets are accessible */
        button, a, input, select, textarea {
          min-height: 44px;
          min-width: 44px;
        }
        
        /* Responsive image optimization */
        img {
          max-width: 100%;
          height: auto;
        }
        
        /* Prevent horizontal scroll */
        html, body {
          overflow-x: hidden;
          width: 100%;
        }
        
        /* Optimize focus indicators for accessibility */
        :focus-visible {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
};

export default Layout;