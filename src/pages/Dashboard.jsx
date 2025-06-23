import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Users, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
  Download,
  Plus
} from 'lucide-react';
import { dashboardData } from '../data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import DashboardTable from '../components/dashboard/DashboardTable';

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('30d');

  // Add responsive state
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  
  // Add resize listener
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Fix Sarah Johnson's image with a more reliable approach
  const getArtistImage = (artist) => {
    if (artist.name === 'Sarah Johnson') {
      return 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face';
    }
    return artist.image;
  };
  
  // Add fallback handler for image loading errors
  const handleImageError = (e) => {
    e.target.onerror = null;
    const name = e.target.alt || 'User';
    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name.charAt(0))}&background=random`;
  };

  const stats = [
    {
      title: 'Total Applications',
      value: '124',
      change: '+12%',
      changeType: 'positive',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Pending Review',
      value: '23',
      change: '+5%',
      changeType: 'positive',
      icon: Clock,
      color: 'bg-yellow-500'
    },
    {
      title: 'Approved Artists',
      value: '89',
      change: '+18%',
      changeType: 'positive',
      icon: CheckCircle,
      color: 'bg-green-500'
    },
    {
      title: 'Total Revenue',
      value: '$47,250',
      change: '+22%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'bg-purple-500'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'application',
      message: 'New artist application from Sarah Johnson',
      time: '2 minutes ago',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      id: 2,
      type: 'approval',
      message: 'Marcus Rodriguez application approved',
      time: '1 hour ago',
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      id: 3,
      type: 'booking',
      message: 'New booking request for DJ Alex Rivera',
      time: '3 hours ago',
      icon: Calendar,
      color: 'text-purple-600'
    },
    {
      id: 4,
      type: 'payment',
      message: 'Payment processed for The Harmony Trio',
      time: '5 hours ago',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      id: 5,
      type: 'review',
      message: 'New 5-star review for Lisa Thompson',
      time: '1 day ago',
      icon: Star,
      color: 'text-yellow-600'
    }
  ];

  const topArtists = [
    {
      id: 1,
      name: 'Sarah Johnson',
      category: 'Singer',
      bookings: 45,
      rating: 4.9,
      revenue: '$12,750',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 2,
      name: 'Marcus Rodriguez',
      category: 'Dancer',
      bookings: 38,
      rating: 4.8,
      revenue: '$9,200',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 3,
      name: 'Dr. Emily Chen',
      category: 'Speaker',
      bookings: 32,
      rating: 5.0,
      revenue: '$16,000',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 4,
      name: 'DJ Alex Rivera',
      category: 'DJ',
      bookings: 41,
      rating: 4.7,
      revenue: '$11,300',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    }
  ];

  return (
    <div className="min-h-screen py-4 sm:py-6 md:py-8">
      <div className="container-responsive px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 sm:mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Manager Dashboard
              </h1>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                Manage artist applications and monitor platform performance
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-3 py-2 min-h-[44px] w-full sm:w-auto border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>

              <div className="flex gap-2 w-full sm:w-auto">
                <Button
                  variant="gradient"
                  icon={<Plus className="w-4 h-4" />}
                  className="flex-1 sm:flex-initial min-h-[44px]"
                >
                  Add Artist
                </Button>

                <Button
                  variant="outline"
                  icon={<Download className="w-4 h-4" />}
                  className="flex-1 sm:flex-initial min-h-[44px]"
                >
                  Export Data
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
              >
                <Card className="relative overflow-hidden">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
                          {stat.title}
                        </p>
                        <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mt-1 sm:mt-2">
                          {stat.value}
                        </p>
                        <div className="flex items-center mt-1 sm:mt-2">
                          <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mr-1" />
                          <span className="text-xs sm:text-sm font-medium text-green-600">
                            {stat.change}
                          </span>
                          <span className="text-xs sm:text-sm text-gray-500 ml-1">
                            vs last period
                          </span>
                        </div>
                      </div>
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <Card>
              <CardHeader className="px-4 sm:px-6">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary-600" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 sm:px-6 py-4">
                <div className="space-y-3 sm:space-y-4">
                  {recentActivity.map((activity, index) => {
                    const Icon = activity.icon;
                    return (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-start space-x-3"
                      >
                        <div className={`p-1.5 sm:p-2 rounded-full bg-gray-100 dark:bg-gray-800 ${activity.color}`}>
                          <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
                            {activity.message}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {activity.time}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
                <div className="mt-4 sm:mt-6">
                  <Button variant="outline" className="w-full text-sm">
                    View All Activity
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Top Performing Artists */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader className="px-4 sm:px-6">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
                  Top Performing Artists
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 sm:px-6 py-4">
                <div className="space-y-3 sm:space-y-4">
                  {topArtists.map((artist, index) => (
                    <motion.div
                      key={artist.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors gap-4"
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={artist.image}
                          alt={artist.name}
                          className="w-12 h-12 rounded-full object-cover"
                          onError={handleImageError}
                          loading="lazy"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {artist.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {artist.category}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 sm:space-x-6">
                        <div className="text-center">
                          <p className="text-xs text-gray-500 dark:text-gray-400">Bookings</p>
                          <p className="font-semibold text-gray-900 dark:text-white">{artist.bookings}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-500 dark:text-gray-400">Rating</p>
                          <div className="flex items-center">
                            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                            <p className="font-semibold text-gray-900 dark:text-white ml-1">{artist.rating}</p>
                          </div>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-500 dark:text-gray-400">Revenue</p>
                          <p className="font-semibold text-gray-900 dark:text-white">{artist.revenue}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-4 sm:mt-6">
                  <Button variant="outline" className="w-full text-sm">
                    View All Artists
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Analytics Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-8"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary-600" />
                Platform Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-lg">
                <div className="text-center">
                  <BarChart3 className="w-16 h-16 text-primary-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400 text-lg font-medium">
                    Analytics Chart Placeholder
                  </p>
                  <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">
                    Integration with Chart.js or Recharts would go here
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Applications Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <DashboardTable data={dashboardData} />
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
