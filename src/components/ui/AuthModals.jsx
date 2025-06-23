import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { useAppContext } from '../../App';
import Button from './Button';
import Input from './Input';
import { Card, CardContent, CardHeader, CardTitle } from './Card';

// Sign In Modal
export const SignInModal = () => {
  const { showSignInModal, setShowSignInModal, signIn, setShowGetStartedModal } = useAppContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Basic validation
    if (!email || !password) {
      setLoading(false);
      return;
    }
    
    await signIn(email, password);
    setLoading(false);
    setEmail('');
    setPassword('');
  };

  const switchToSignUp = () => {
    setShowSignInModal(false);
    setShowGetStartedModal(true);
  };

  if (!showSignInModal) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setShowSignInModal(false)}
        />
        
        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.2 }}
          className="relative z-10 w-full max-w-md mx-4"
        >
          <Card>
            <CardHeader className="relative">
              <button
                onClick={() => setShowSignInModal(false)}
                className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              
              <CardTitle className="text-2xl font-bold text-center">
                Welcome Back
              </CardTitle>
              <p className="text-gray-600 dark:text-gray-400 text-center">
                Sign in to your account
              </p>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="email"
                  label="Email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  icon={<Mail className="w-4 h-4" />}
                  required
                />
                
                <Input
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  icon={<Lock className="w-4 h-4" />}
                  rightIcon={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="hover:text-gray-700 dark:hover:text-gray-300"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  }
                  required
                />
                
                <Button
                  type="submit"
                  variant="gradient"
                  className="w-full"
                  loading={loading}
                >
                  Sign In
                </Button>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-gray-600 dark:text-gray-400">
                  Don't have an account?{' '}
                  <button
                    onClick={switchToSignUp}
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Sign up
                  </button>
                </p>
              </div>
              
              {/* Demo credentials */}
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200 text-center">
                  <strong>Demo:</strong> Use any email and password to sign in
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

// Get Started Modal
export const GetStartedModal = () => {
  const { showGetStartedModal, setShowGetStartedModal, setShowSignInModal, addNotification } = useAppContext();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'event_planner'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.password) {
      addNotification({
        type: 'error',
        message: 'Please fill in all required fields'
      });
      setLoading(false);
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      addNotification({
        type: 'error',
        message: 'Passwords do not match'
      });
      setLoading(false);
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setShowGetStartedModal(false);
      addNotification({
        type: 'success',
        message: 'Account created successfully!',
        description: 'Welcome to Artistly! Please sign in to continue.'
      });
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'event_planner'
      });
    }, 1500);
  };

  const switchToSignIn = () => {
    setShowGetStartedModal(false);
    setShowSignInModal(true);
  };

  if (!showGetStartedModal) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setShowGetStartedModal(false)}
        />
        
        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.2 }}
          className="relative z-10 w-full max-w-md mx-4"
        >
          <Card>
            <CardHeader className="relative">
              <button
                onClick={() => setShowGetStartedModal(false)}
                className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              
              <CardTitle className="text-2xl font-bold text-center">
                Get Started
              </CardTitle>
              <p className="text-gray-600 dark:text-gray-400 text-center">
                Create your account
              </p>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="text"
                  label="Full Name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  icon={<User className="w-4 h-4" />}
                  required
                />
                
                <Input
                  type="email"
                  label="Email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  icon={<Mail className="w-4 h-4" />}
                  required
                />
                
                <Input
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  icon={<Lock className="w-4 h-4" />}
                  rightIcon={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="hover:text-gray-700 dark:hover:text-gray-300"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  }
                  required
                />
                
                <Input
                  type="password"
                  label="Confirm Password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  icon={<Lock className="w-4 h-4" />}
                  required
                />
                
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    I am a...
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, role: 'event_planner' }))}
                      className={`p-3 rounded-lg border-2 transition-colors ${
                        formData.role === 'event_planner'
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <div className="text-sm font-medium">Event Planner</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Find artists</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, role: 'artist' }))}
                      className={`p-3 rounded-lg border-2 transition-colors ${
                        formData.role === 'artist'
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <div className="text-sm font-medium">Artist</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Get bookings</div>
                    </button>
                  </div>
                </div>
                
                <Button
                  type="submit"
                  variant="gradient"
                  className="w-full"
                  loading={loading}
                >
                  Create Account
                </Button>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-gray-600 dark:text-gray-400">
                  Already have an account?{' '}
                  <button
                    onClick={switchToSignIn}
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Sign in
                  </button>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};