import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Star, Users, Calendar, Moon, Sun, LogOut, User } from 'lucide-react';
import { useAppContext } from '../../App';
import Button from '../ui/Button';
import { SignInModal, GetStartedModal } from '../ui/AuthModals';
import { cn } from '../../utils/cn';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { 
    theme, 
    toggleTheme, 
    user, 
    signOut, 
    setShowSignInModal, 
    setShowGetStartedModal 
  } = useAppContext();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const navigation = [
    { name: 'Home', href: '/', icon: Star },
    { name: 'Find Artists', href: '/artists', icon: Users },
    { name: 'Join as Artist', href: '/onboard', icon: Calendar },
    { name: 'Dashboard', href: '/dashboard', icon: Calendar }
  ];

  const isActive = (path) => location.pathname === path;

  const handleSignIn = () => {
    setShowSignInModal(true);
    setIsMenuOpen(false);
  };

  const handleGetStarted = () => {
    setShowGetStartedModal(true);
    setIsMenuOpen(false);
  };

  const handleSignOut = () => {
    signOut();
    setIsMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full",
          isScrolled 
            ? theme === 'light'
              ? "bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm"
              : "glass border-b border-white/20 backdrop-blur-md bg-black/10"
            : "bg-transparent"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container-responsive">
          <div className="flex justify-between items-center h-14 sm:h-16 lg:h-18">
            {/* Logo - Responsive sizing */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0"
            >
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-primary-600 to-accent-600 rounded-lg flex items-center justify-center">
                  <Star className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
                </div>
                <span className="text-lg sm:text-xl font-bold gradient-text">Artistly</span>
              </Link>
            </motion.div>

            {/* Desktop Navigation - Hidden on mobile/tablet */}
            <nav className="hidden lg:flex space-x-6 xl:space-x-8">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div key={item.name} whileHover={{ y: -2 }}>
                    <Link
                      to={item.href}
                      className={cn(
                        "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 touch-target",
                        isActive(item.href)
                          ? theme === 'light'
                            ? "text-primary-600 bg-primary-50"
                            : "text-primary-400 bg-primary-900/20"
                          : theme === 'light'
                            ? "text-gray-800 hover:text-primary-600 hover:bg-gray-100"
                            : "text-gray-300 hover:text-primary-400 hover:bg-gray-800"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="hidden xl:inline">{item.name}</span>
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Desktop Right Section - Hidden on mobile/tablet */}
            <div className="hidden lg:flex items-center space-x-3 xl:space-x-4">
              {/* Theme Toggle */}
              <motion.button
                onClick={toggleTheme}
                className={cn(
                  "p-2 rounded-lg transition-colors touch-target",
                  theme === 'light'
                    ? "hover:bg-gray-100 text-gray-700"
                    : "hover:bg-gray-800 text-gray-300"
                )}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5 text-yellow-500" />
                )}
              </motion.button>

              {/* User Section */}
              {user ? (
                <div className="flex items-center space-x-3">
                  <div className="hidden xl:flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-primary-600" />
                    </div>
                    <span className={cn(
                      "text-sm font-medium",
                      theme === 'light' ? "text-gray-800" : "text-gray-300"
                    )}>
                      {user.name}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSignOut}
                    icon={<LogOut className="w-4 h-4" />}
                    className="hidden xl:flex"
                  >
                    Sign Out
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSignOut}
                    className="xl:hidden touch-target"
                    aria-label="Sign out"
                  >
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleSignIn}
                    className="touch-target hidden xl:flex"
                  >
                    Sign In
                  </Button>
                  <Button 
                    variant="gradient" 
                    size="sm" 
                    onClick={handleGetStarted}
                    className="touch-target"
                  >
                    <span className="hidden sm:inline">Get Started</span>
                    <span className="sm:hidden">Join</span>
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile/Tablet Right Section */}
            <div className="flex lg:hidden items-center space-x-2">
              {/* Theme Toggle - Mobile */}
              <motion.button
                onClick={toggleTheme}
                className={cn(
                  "p-2 rounded-lg transition-colors touch-target",
                  theme === 'light'
                    ? "hover:bg-gray-100 text-gray-700"
                    : "hover:bg-gray-800 text-gray-300"
                )}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5 text-yellow-500" />
                )}
              </motion.button>

              {/* User Avatar - Mobile (if logged in) */}
              {user && (
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-primary-600" />
                </div>
              )}
              
              {/* Mobile Menu Button */}
              <motion.button
                onClick={toggleMobileMenu}
                className={cn(
                  "p-2 rounded-lg transition-colors touch-target",
                  theme === 'light'
                    ? "hover:bg-gray-100 text-gray-700"
                    : "hover:bg-gray-800 text-gray-300"
                )}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
                onClick={() => setIsMenuOpen(false)}
              />
              
              {/* Menu Content */}
              <motion.div
                className={cn(
                  "fixed inset-x-0 top-14 sm:top-16 bottom-0 z-50 lg:hidden",
                  "overflow-y-auto",
                  theme === 'light'
                    ? "bg-white"
                    : "bg-gray-900"
                )}
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
              >
                <div className="px-4 py-6 space-y-6 h-full">
                  {/* Navigation Links */}
                  <nav className="space-y-2">
                    {navigation.map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Link
                            to={item.href}
                            onClick={() => setIsMenuOpen(false)}
                            className={cn(
                              "flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 touch-target",
                              isActive(item.href)
                                ? theme === 'light'
                                  ? "text-primary-600 bg-primary-50 shadow-sm"
                                  : "text-primary-400 bg-primary-900/20"
                                : theme === 'light'
                                  ? "text-gray-800 hover:text-primary-600 hover:bg-gray-100 active:bg-gray-200"
                                  : "text-gray-300 hover:text-primary-400 hover:bg-gray-800 active:bg-gray-700"
                            )}
                          >
                            <Icon className="w-5 h-5 flex-shrink-0" />
                            <span>{item.name}</span>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </nav>
                  
                  {/* Mobile User Section */}
                  <div className={cn(
                    "pt-6 space-y-4 border-t",
                    theme === 'light' ? "border-gray-200" : "border-gray-700"
                  )}>
                    {user ? (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-4"
                      >
                        {/* User Info */}
                        <div className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-primary-600" />
                          </div>
                          <div>
                            <p className={cn(
                              "font-medium",
                              theme === 'light' ? "text-gray-900" : "text-white"
                            )}>
                              {user.name}
                            </p>
                            <p className={cn(
                              "text-sm",
                              theme === 'light' ? "text-gray-600" : "text-gray-400"
                            )}>
                              {user.email}
                            </p>
                          </div>
                        </div>
                        
                        {/* Sign Out Button */}
                        <Button 
                          variant="outline" 
                          className="w-full touch-target" 
                          onClick={handleSignOut}
                          icon={<LogOut className="w-4 h-4" />}
                        >
                          Sign Out
                        </Button>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-3"
                      >
                        <Button 
                          variant="outline" 
                          className="w-full touch-target" 
                          onClick={handleSignIn}
                        >
                          Sign In
                        </Button>
                        <Button 
                          variant="gradient" 
                          className="w-full touch-target" 
                          onClick={handleGetStarted}
                        >
                          Get Started
                        </Button>
                      </motion.div>
                    )}
                  </div>

                  {/* App Info - Mobile */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className={cn(
                      "pt-6 border-t text-center",
                      theme === 'light' ? "border-gray-200" : "border-gray-700"
                    )}
                  >
                    <p className={cn(
                      "text-sm",
                      theme === 'light' ? "text-gray-600" : "text-gray-400"
                    )}>
                      Artistly v1.0
                    </p>
                    <p className={cn(
                      "text-xs mt-1",
                      theme === 'light' ? "text-gray-500" : "text-gray-500"
                    )}>
                      Connect artists with events
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Auth Modals */}
      <SignInModal />
      <GetStartedModal />
    </>
  );
};

export default Header;