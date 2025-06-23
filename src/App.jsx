import React, { createContext, useContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import ArtistListing from './pages/ArtistListing';
import ArtistOnboarding from './pages/ArtistOnboarding';
import Dashboard from './pages/Dashboard';
import './index.css';

// Global Context for state management
const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

function AppProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Get theme from localStorage or default to 'light'
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });
  
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [bookingRequests, setBookingRequests] = useState([]);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showGetStartedModal, setShowGetStartedModal] = useState(false);

  // Apply theme to document
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove previous theme classes
    root.classList.remove('light', 'dark');
    
    // Add current theme class
    root.classList.add(theme);
    
    // Save to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const addNotification = (notification) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { ...notification, id }]);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const addToFavorites = (artistId) => {
    setFavorites(prev => {
      if (prev.includes(artistId)) {
        return prev.filter(id => id !== artistId);
      }
      return [...prev, artistId];
    });
    
    addNotification({
      type: 'success',
      message: favorites.includes(artistId) 
        ? 'Removed from favorites' 
        : 'Added to favorites'
    });
  };

  const submitBookingRequest = (artistId, details) => {
    const request = {
      id: Date.now(),
      artistId,
      ...details,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    setBookingRequests(prev => [...prev, request]);
    addNotification({
      type: 'success',
      message: 'Booking request submitted successfully!'
    });
  };

  // Mock sign in function
  const signIn = (email, password) => {
    // Simulate API call
    setTimeout(() => {
      setUser({
        id: 1,
        name: 'John Doe',
        email: email,
        role: 'event_planner'
      });
      setShowSignInModal(false);
      addNotification({
        type: 'success',
        message: 'Welcome back!',
        description: 'You have been signed in successfully.'
      });
    }, 1000);
  };

  const signOut = () => {
    setUser(null);
    addNotification({
      type: 'success',
      message: 'Signed out successfully'
    });
  };

  const value = {
    theme,
    toggleTheme,
    user,
    setUser,
    signIn,
    signOut,
    notifications,
    addNotification,
    removeNotification,
    favorites,
    addToFavorites,
    bookingRequests,
    submitBookingRequest,
    showSignInModal,
    setShowSignInModal,
    showGetStartedModal,
    setShowGetStartedModal
  };

  return (
    <AppContext.Provider value={value}>
      <div className={`min-h-screen transition-colors duration-200 ${theme}`}>
        {children}
      </div>
    </AppContext.Provider>
  );
}

function App() {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <AnimatePresence mode="wait">
            <Routes>
              <Route 
                path="/" 
                element={
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Home />
                  </motion.div>
                } 
              />
              <Route 
                path="/artists" 
                element={
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ArtistListing />
                  </motion.div>
                } 
              />
              <Route 
                path="/onboard" 
                element={
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ArtistOnboarding />
                  </motion.div>
                } 
              />
              <Route 
                path="/dashboard" 
                element={
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Dashboard />
                  </motion.div>
                } 
              />
            </Routes>
          </AnimatePresence>
        </Layout>
      </Router>
    </AppProvider>
  );
}

export default App;