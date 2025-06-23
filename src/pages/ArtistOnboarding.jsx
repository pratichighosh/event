import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Users, TrendingUp, Shield, CheckCircle } from 'lucide-react';
import ArtistOnboardingForm from '../components/forms/ArtistOnboardingForm';
import { Card, CardContent } from '../components/ui/Card';

const ArtistOnboarding = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const benefits = [
    {
      icon: TrendingUp,
      title: 'Grow Your Career',
      description: 'Access thousands of event opportunities and expand your professional network.'
    },
    {
      icon: Shield,
      title: 'Secure Payments',
      description: 'Get paid safely and on time with our secure payment protection system.'
    },
    {
      icon: Users,
      title: 'Professional Support',
      description: 'Our team provides ongoing support to help you succeed on the platform.'
    }
  ];

  const stats = [
    { value: '10,000+', label: 'Active Bookings Monthly' },
    { value: '95%', label: 'Artist Satisfaction Rate' },
    { value: '$2M+', label: 'Paid to Artists in 2024' },
    { value: '24/7', label: 'Customer Support' }
  ];

  const handleFormSubmit = async (formData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Store submission data (in real app, this would go to backend)
    console.log('Form submitted:', formData);
    
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Application Submitted Successfully!
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Thank you for joining Artistly! We've received your application and will review it within 48 hours.
            </p>

            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  What happens next?
                </h2>
                
                <div className="space-y-4 text-left">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary-600 text-sm font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        Application Review
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Our team will review your application and verify your credentials.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary-600 text-sm font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        Account Activation
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        You'll receive an email with your account details and access to the artist dashboard.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary-600 text-sm font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        Start Receiving Bookings
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Your profile will be live and you can start receiving booking requests!
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-blue-800 dark:text-blue-200 text-center">
                    <strong>Application ID:</strong> #ART-{Date.now().toString().slice(-6)}
                  </p>
                  <p className="text-blue-600 dark:text-blue-400 text-center text-sm mt-1">
                    Keep this ID for your records
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-accent-600 rounded-xl flex items-center justify-center">
              <Star className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Become an Artist
            </h1>
          </div>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Join thousands of talented artists on Artistly and turn your passion into a thriving career. 
            Connect with event planners and showcase your skills to the world.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-primary-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
        >
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card key={benefit.title} className="text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </motion.div>

        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <ArtistOnboardingForm onSubmit={handleFormSubmit} />
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Frequently Asked Questions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-6 text-left">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  How long does the approval process take?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Most applications are reviewed within 48 hours. We may reach out for additional 
                  information or verification if needed.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-left">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Is there a fee to join Artistly?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Joining Artistly is completely free. We only take a small commission 
                  when you successfully complete a booking.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-left">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Can I set my own prices?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Yes! You have full control over your pricing. You can set different rates 
                  for different types of events and services.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-left">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  What kind of support do you provide?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We provide 24/7 customer support, marketing assistance, and tools to help 
                  you manage your bookings and grow your business.
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ArtistOnboarding;