import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Users, Calendar, Shield, Zap, Heart, Sparkles, Play, Music, Mic, Camera, Palette, Volume2 } from 'lucide-react';
import { artistCategories } from '../data/mockData';
import { Card, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useAppContext } from '../App';

const Home = () => {
  const { theme } = useAppContext();
  
  const stats = [
    { label: 'Active Artists', value: '10,000+', icon: Users },
    { label: 'Events Completed', value: '50,000+', icon: Calendar },
    { label: 'Customer Rating', value: '4.9/5', icon: Star },
    { label: 'Cities Covered', value: '200+', icon: Heart }
  ];

  const features = [
    {
      icon: Shield,
      title: 'Verified Artists',
      description: 'All artists are background-checked and verified for your peace of mind.'
    },
    {
      icon: Zap,
      title: 'Instant Booking',
      description: 'Book artists instantly with our streamlined booking process.'
    },
    {
      icon: Heart,
      title: 'Quality Guarantee',
      description: 'We guarantee the quality of performances or your money back.'
    }
  ];

  // Chaotic floating elements data
  const floatingElements = [
    { icon: Music, delay: 0, duration: 15, color: 'text-purple-400' },
    { icon: Mic, delay: 2, duration: 18, color: 'text-pink-400' },
    { icon: Camera, delay: 4, duration: 12, color: 'text-cyan-400' },
    { icon: Palette, delay: 1, duration: 20, color: 'text-orange-400' },
    { icon: Volume2, delay: 3, duration: 16, color: 'text-green-400' },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Chaotic Floating Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {floatingElements.map((element, index) => {
          const IconComponent = element.icon;
          return (
            <motion.div
              key={index}
              className={`absolute ${element.color} opacity-20`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 200 - 100, Math.random() * 300 - 150, 0],
                y: [0, Math.random() * 200 - 100, Math.random() * 300 - 150, 0],
                rotate: [0, 180, 360],
                scale: [1, 1.5, 0.8, 1],
              }}
              transition={{
                duration: element.duration,
                repeat: Infinity,
                delay: element.delay,
                ease: "easeInOut"
              }}
            >
              <IconComponent className="w-8 h-8" />
            </motion.div>
          );
        })}
      </div>

      {/* Hero Section - Completely Tilted and Chaotic */}
      <section className="relative min-h-screen pt-4 overflow-hidden">
        {/* Tilted Background Sections */}
        <div className="absolute inset-0">
          <div 
            className={`absolute inset-0 ${
              theme === 'light' 
                ? 'bg-gradient-to-br from-yellow-300 via-pink-400 to-purple-500' 
                : 'bg-gradient-to-br from-purple-900 via-pink-900 to-indigo-900'
            }`}
            style={{ transform: 'rotate(-12deg) scale(1.2)', transformOrigin: 'center' }}
          />
          <div 
            className={`absolute inset-0 ${
              theme === 'light' 
                ? 'bg-gradient-to-tl from-cyan-400 via-blue-500 to-indigo-600' 
                : 'bg-gradient-to-tl from-cyan-800 via-blue-800 to-indigo-900'
            }`}
            style={{ 
              transform: 'rotate(8deg) scale(1.1)', 
              transformOrigin: 'center',
              mixBlendMode: 'multiply'
            }}
          />
          <div 
            className={`absolute inset-0 ${
              theme === 'light' ? 'bg-white/20' : 'bg-black/40'
            }`}
            style={{ transform: 'rotate(-5deg) scale(1.05)', transformOrigin: 'center' }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Floating Badge - Rotated */}
          <motion.div
            initial={{ opacity: 0, rotate: -45, scale: 0 }}
            animate={{ opacity: 1, rotate: -12, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute top-10 right-10 z-20"
          >
            <div className={`
              px-6 py-3 rounded-full font-black text-sm shadow-2xl border-4
              ${theme === 'light' 
                ? 'bg-yellow-400 text-black border-white' 
                : 'bg-purple-500 text-white border-purple-300'
              }
              transform rotate-12 hover:rotate-0 transition-transform duration-300
            `}>
              ⚡ 50K+ EVENTS
            </div>
          </motion.div>

          {/* Main Content Area - Tilted Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start pt-2">
            
            {/* Left: Hero Text - Multiple Rotations */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -100, rotate: -20 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="space-y-6"
              >
                {/* Chaotic Typography */}
                <div className="relative">
                  <h1 className="relative">
                    <motion.span 
                      className={`block text-5xl sm:text-6xl lg:text-7xl font-black transform -rotate-6 ${
                        theme === 'light' ? 'text-white' : 'text-white'
                      }`}
                      whileHover={{ rotate: 6, scale: 1.05 }}
                    >
                      FIND
                    </motion.span>
                    
                    <motion.span 
                      className="block text-6xl sm:text-7xl lg:text-8xl font-black bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent transform rotate-3 my-4"
                      whileHover={{ rotate: -3, scale: 1.1 }}
                    >
                      WILD
                    </motion.span>
                    
                    <motion.span 
                      className={`block text-4xl sm:text-5xl lg:text-6xl font-black transform -rotate-2 ${
                        theme === 'light' ? 'text-white' : 'text-gray-200'
                      }`}
                      whileHover={{ rotate: 8, scale: 1.05 }}
                    >
                      ARTISTS
                    </motion.span>
                  </h1>
                  
                  {/* Decorative text behind */}
                  <div className="absolute -top-8 -left-8 text-9xl font-black text-white/10 select-none transform rotate-45">
                    ★
                  </div>
                </div>

                {/* Description - Tilted */}
                <motion.div
                  className="transform rotate-1 hover:rotate-0 transition-transform duration-300"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  <p className={`text-xl leading-relaxed max-w-lg p-6 rounded-2xl backdrop-blur-md border-2 ${
                    theme === 'light' 
                      ? 'bg-white/30 border-white/50 text-gray-800' 
                      : 'bg-black/30 border-white/20 text-gray-200'
                  }`}>
                    🎭 Break conventions. Discover extraordinary performers. Create events that shatter expectations and leave everyone speechless.
                  </p>
                </motion.div>

                {/* Tilted Buttons */}
                <div className="space-y-4">
                  <motion.div
                    whileHover={{ rotate: 0, scale: 1.05 }}
                    className="transform -rotate-3"
                  >
                    <Button 
                      size="xl" 
                      className="bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 hover:from-pink-600 hover:via-red-600 hover:to-orange-600 text-white font-black px-10 py-5 rounded-full shadow-2xl text-lg border-4 border-white/30"
                      asChild
                    >
                      <Link to="/artists">
                        🚀 EXPLORE CHAOS
                      </Link>
                    </Button>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ rotate: 0, scale: 1.05 }}
                    className="transform rotate-2"
                  >
                    <Button 
                      size="xl" 
                      className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold px-10 py-5 rounded-full shadow-2xl text-lg border-2 border-purple-300"
                      asChild
                    >
                      <Link to="/onboard">
                        ⭐ JOIN REVOLUTION
                      </Link>
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Right: Floating Stats - Chaotic Layout */}
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="space-y-6"
              >
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  const rotations = ['-rotate-12', 'rotate-6', '-rotate-3', 'rotate-8'];
                  const positions = ['ml-0', 'ml-16', 'ml-8', 'ml-20'];
                  
                  return (
                    <motion.div
                      key={stat.label}
                      className={`${rotations[index]} ${positions[index]} transform hover:rotate-0 transition-all duration-300`}
                      whileHover={{ scale: 1.1, y: -10 }}
                      style={{ 
                        marginTop: index * 20,
                        zIndex: 10 - index 
                      }}
                    >
                      <div className={`
                        relative p-6 rounded-3xl backdrop-blur-xl border-2 shadow-2xl max-w-xs
                        ${theme === 'light' 
                          ? 'bg-white/40 border-white/60' 
                          : 'bg-black/40 border-white/20'
                        }
                      `}>
                        <div className="flex items-center space-x-4">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            theme === 'light' ? 'bg-white/50' : 'bg-white/20'
                          }`}>
                            <Icon className={`w-6 h-6 ${
                              theme === 'light' ? 'text-purple-600' : 'text-purple-400'
                            }`} />
                          </div>
                          <div>
                            <div className={`text-2xl font-black ${
                              theme === 'light' ? 'text-gray-900' : 'text-white'
                            }`}>
                              {stat.value}
                            </div>
                            <div className={`text-sm font-bold ${
                              theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                            }`}>
                              {stat.label}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories - Broken Grid with Tilted Cards */}
      <section className={`relative py-32 ${
        theme === 'light' 
          ? 'bg-gradient-to-br from-cyan-100 via-blue-50 to-purple-100' 
          : 'bg-gradient-to-br from-gray-900 via-purple-900/30 to-blue-900/30'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Tilted Section Title */}
          <motion.div
            initial={{ opacity: 0, rotate: -10 }}
            whileInView={{ opacity: 1, rotate: 0 }}
            viewport={{ once: true }}
            className="mb-20 transform -rotate-3 hover:rotate-0 transition-transform duration-500"
          >
            <div className={`inline-block p-8 rounded-3xl backdrop-blur-md border-2 ${
              theme === 'light' 
                ? 'bg-white/50 border-white/70' 
                : 'bg-black/30 border-white/20'
            }`}>
              <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-black ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>
                <span className="block transform rotate-2">BROWSE</span>
                <span className="block bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 bg-clip-text text-transparent transform -rotate-1">
                  TALENT
                </span>
                <span className="block transform rotate-1 text-2xl mt-2">↗ CATEGORIES</span>
              </h2>
            </div>
          </motion.div>

          {/* Chaotic Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {artistCategories.map((category, index) => {
              const rotations = ['-rotate-6', 'rotate-3', '-rotate-2', 'rotate-4', '-rotate-1', 'rotate-5'];
              const scales = ['scale-95', 'scale-105', 'scale-100', 'scale-110', 'scale-95', 'scale-105'];
              
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 100, rotate: -30 }}
                  whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                  className={`${rotations[index]} ${scales[index]} transform hover:rotate-0 hover:scale-110 transition-all duration-500 group`}
                >
                  <Link to={`/artists?category=${category.id}`} className="block h-full">
                    <Card className={`
                      relative h-full overflow-hidden backdrop-blur-md transition-all duration-500 
                      border-0 shadow-2xl hover:shadow-cyan-500/20 group-hover:border-4 group-hover:border-white/50
                      ${theme === 'light' 
                        ? 'bg-gradient-to-br from-white/70 to-white/40' 
                        : 'bg-gradient-to-br from-black/50 to-gray-800/30'
                      }
                    `}
                    style={{ 
                      borderRadius: '2rem',
                      minHeight: '300px'
                    }}
                    >
                      {/* Gradient overlay */}
                      <div 
                        className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-20 group-hover:opacity-40 transition-opacity duration-500`}
                      />
                      
                      <CardContent className="relative p-8 h-full flex flex-col justify-between">
                        {/* Icon - Floating */}
                        <motion.div 
                          whileHover={{ rotate: 720, scale: 1.3 }}
                          transition={{ duration: 1 }}
                          className={`
                            w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-xl transform rotate-12
                            bg-gradient-to-br ${category.gradient} group-hover:shadow-2xl
                          `}
                        >
                          <span className="text-3xl transform -rotate-12">{category.icon}</span>
                        </motion.div>
                        
                        {/* Content */}
                        <div className="space-y-4">
                          <h3 className={`text-2xl font-black transform -rotate-1 group-hover:rotate-0 transition-transform ${
                            theme === 'light' ? 'text-gray-900' : 'text-white'
                          }`}>
                            {category.name.toUpperCase()}
                          </h3>
                          
                          <p className={`leading-relaxed transform rotate-1 group-hover:rotate-0 transition-transform ${
                            theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                          }`}>
                            {category.description}
                          </p>
                          
                          <div className={`flex items-center font-black transform -rotate-2 group-hover:rotate-0 group-hover:translate-x-4 transition-all ${
                            theme === 'light' ? 'text-purple-600' : 'text-cyan-400'
                          }`}>
                            <span>EXPLORE →</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features - Completely Asymmetric */}
      <section className="relative py-32 overflow-hidden">
        {/* Tilted Background */}
        <div 
          className={`absolute inset-0 ${
            theme === 'light' 
              ? 'bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400' 
              : 'bg-gradient-to-r from-purple-900 via-pink-900 to-orange-900'
          }`}
          style={{ transform: 'rotate(-3deg) scale(1.1)' }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Floating Title */}
          <motion.div
            initial={{ opacity: 0, y: -50, rotate: 20 }}
            whileInView={{ opacity: 1, y: 0, rotate: -8 }}
            viewport={{ once: true }}
            className="text-center mb-20 transform hover:rotate-0 transition-transform duration-700"
          >
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-4">
              WHY US?
            </h2>
            <div className="text-3xl">🤔 → 🤯 → 🎉</div>
          </motion.div>

          {/* Chaotic Features Layout */}
          <div className="space-y-32">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isLeft = index % 2 === 0;
              const rotations = ['-rotate-12', 'rotate-8', '-rotate-6'];
              
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: isLeft ? -200 : 200, rotate: isLeft ? -45 : 45 }}
                  whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: index * 0.3 }}
                  className={`flex flex-col lg:flex-row items-center gap-16 ${isLeft ? '' : 'lg:flex-row-reverse'}`}
                >
                  {/* Icon Section - Heavily Tilted */}
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 1 }}
                    className={`${rotations[index]} transform hover:rotate-0 transition-all duration-500`}
                  >
                    <div className={`
                      w-48 h-48 rounded-full flex items-center justify-center shadow-2xl border-8 border-white/30
                      bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl
                    `}>
                      <Icon className="w-24 h-24 text-white" />
                    </div>
                  </motion.div>
                  
                  {/* Content - Tilted Cards */}
                  <motion.div
                    whileHover={{ rotate: 0, scale: 1.05 }}
                    className={`flex-1 transform ${isLeft ? 'rotate-3' : '-rotate-3'} transition-all duration-500`}
                  >
                    <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-8 border-2 border-white/30 shadow-2xl">
                      <h3 className="text-4xl font-black text-white mb-6 transform -rotate-1">
                        {feature.title.toUpperCase()}
                      </h3>
                      <p className="text-xl text-white/90 leading-relaxed transform rotate-1">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA - Complete Chaos */}
      <section className="relative py-32 overflow-hidden">
        {/* Multiple Tilted Backgrounds */}
        <div className="absolute inset-0">
          <div 
            className={`absolute inset-0 ${
              theme === 'light' 
                ? 'bg-gradient-to-br from-red-500 to-pink-600' 
                : 'bg-gradient-to-br from-red-900 to-pink-900'
            }`}
            style={{ transform: 'rotate(15deg) scale(1.2)' }}
          />
          <div 
            className={`absolute inset-0 ${
              theme === 'light' 
                ? 'bg-gradient-to-tl from-blue-500 to-purple-600' 
                : 'bg-gradient-to-tl from-blue-800 to-purple-900'
            }`}
            style={{ 
              transform: 'rotate(-10deg) scale(1.1)',
              mixBlendMode: 'multiply'
            }}
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: 45 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="space-y-12"
          >
            {/* Chaotic Title */}
            <div className="space-y-4">
              <motion.h2 
                className="text-6xl sm:text-7xl lg:text-8xl font-black text-white transform -rotate-3"
                whileHover={{ rotate: 3, scale: 1.1 }}
              >
                READY?
              </motion.h2>
              <motion.div 
                className="text-4xl sm:text-5xl font-black text-yellow-300 transform rotate-6"
                whileHover={{ rotate: -6, scale: 1.1 }}
              >
                LET'S GO! 🚀
              </motion.div>
            </div>
            
            {/* Tilted Buttons */}
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
              <motion.div
                whileHover={{ rotate: 0, scale: 1.1 }}
                className="transform -rotate-6"
              >
                <Button 
                  size="xl" 
                  className="bg-white text-purple-600 hover:bg-yellow-300 hover:text-black font-black px-12 py-6 rounded-full shadow-2xl text-xl border-4 border-yellow-300"
                  asChild
                >
                  <Link to="/artists">
                    🎪 FIND ARTISTS
                  </Link>
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ rotate: 0, scale: 1.1 }}
                className="transform rotate-8"
              >
                <Button 
                  size="xl" 
                  className="bg-black/50 backdrop-blur-md text-white hover:bg-white hover:text-black font-black px-12 py-6 rounded-full border-4 border-white shadow-2xl text-xl"
                  asChild
                >
                  <Link to="/onboard">
                    ⭐ BE ARTIST
                  </Link>
                </Button>
              </motion.div>
            </div>

            {/* Floating Testimonial */}
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="transform rotate-2"
            >
              <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-6 border-2 border-white/40 max-w-md mx-auto">
                <p className="text-white font-bold text-lg">
                  "This platform is absolutely insane! 🤯"
                  <br />
                  <span className="text-sm text-white/70">- Mind-Blown Customer</span>
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;