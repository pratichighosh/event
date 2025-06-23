import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Star } from 'lucide-react';
import { mockArtists } from '../data/mockData';
import ArtistFilters from '../components/artist/ArtistFilters';
import ArtistGrid from '../components/artist/ArtistGrid';
import { useAppContext } from '../App';

const ArtistListing = () => {
  const location = useLocation();
  const { theme } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: 'all',
    location: 'all',
    availability: [],
    verified: false,
    featured: false,
    sortBy: 'rating'
  });

  // Unified image handling functions
  const getReliableArtistImage = (artistName, defaultImage) => {
    // Special case for Sarah Johnson with multiple fallback options
    if (artistName === 'Sarah Johnson') {
      // Use a more reliable image service
      return 'https://picsum.photos/400/400?random=1';
    }
    // For other artists, try the default first
    return defaultImage || `https://picsum.photos/400/400?random=${Math.floor(Math.random() * 1000)}`;
  };
  
  const handleImageError = (e, artistName) => {
    console.log('Image failed to load for:', artistName);
    e.target.onerror = null;
    
    // For Sarah Johnson, try a specific working image
    if (artistName === 'Sarah Johnson') {
      e.target.src = 'https://randomuser.me/api/portraits/women/32.jpg';
      return;
    }
    
    // Create a consistent fallback based on artist name
    const fallbackUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(artistName)}&size=400&background=8B5CF6&color=ffffff&bold=true`;
    e.target.src = fallbackUrl;
  };

  // Parse URL parameters on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const categoryParam = urlParams.get('category');
    
    if (categoryParam) {
      setFilters(prev => ({
        ...prev,
        categories: [categoryParam]
      }));
    }
  }, [location.search]);

  // Set mobile view mode based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setViewMode('grid'); // Force grid view on mobile for better experience
      }
    };

    handleResize(); // Check on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Filter and sort artists
  const filteredArtists = useMemo(() => {
    let result = [...mockArtists];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(artist =>
        artist.name.toLowerCase().includes(query) ||
        artist.bio.toLowerCase().includes(query) ||
        artist.location.toLowerCase().includes(query) ||
        (artist.skills && artist.skills.some(skill => skill.toLowerCase().includes(query))) ||
        (artist.categories && artist.categories.some(cat => cat.toLowerCase().includes(query))) ||
        artist.category.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (filters.categories.length > 0) {
      result = result.filter(artist =>
        filters.categories.some(category =>
          (artist.categories && artist.categories.includes(category)) || 
          artist.category === category
        )
      );
    }

    // Price range filter
    if (filters.priceRange !== 'all') {
      result = result.filter(artist => {
        const priceMatch = artist.priceRange.match(/\$(\d+)-?(\d+)?/);
        if (!priceMatch) return false;
        
        const artistMin = parseInt(priceMatch[1]);
        const artistMax = priceMatch[2] ? parseInt(priceMatch[2]) : artistMin;
        
        switch (filters.priceRange) {
          case '0-500':
            return artistMin >= 0 && artistMax <= 500;
          case '500-1000':
            return (artistMin >= 500 && artistMin <= 1000) || (artistMax >= 500 && artistMax <= 1000);
          case '1000-2000':
            return (artistMin >= 1000 && artistMin <= 2000) || (artistMax >= 1000 && artistMax <= 2000);
          case '2000-5000':
            return (artistMin >= 2000 && artistMin <= 5000) || (artistMax >= 2000 && artistMax <= 5000);
          case '5000+':
            return artistMin >= 5000;
          default:
            return true;
        }
      });
    }

    // Location filter
    if (filters.location !== 'all') {
      result = result.filter(artist =>
        artist.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Availability filter
    if (filters.availability.length > 0) {
      result = result.filter(artist =>
        filters.availability.includes(artist.availability)
      );
    }

    // Verified filter
    if (filters.verified) {
      result = result.filter(artist => artist.verified);
    }

    // Featured filter
    if (filters.featured) {
      result = result.filter(artist => artist.featured);
    }

    // Sort results
    result.sort((a, b) => {
      switch (filters.sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'reviews':
          return b.reviews - a.reviews;
        case 'price-low':
          const aPriceLow = parseInt(a.priceRange.match(/\$(\d+)/)?.[1] || '0');
          const bPriceLow = parseInt(b.priceRange.match(/\$(\d+)/)?.[1] || '0');
          return aPriceLow - bPriceLow;
        case 'price-high':
          const aPriceHigh = parseInt(a.priceRange.match(/\$(\d+)/)?.[1] || '0');
          const bPriceHigh = parseInt(b.priceRange.match(/\$(\d+)/)?.[1] || '0');
          return bPriceHigh - aPriceHigh;
        case 'featured':
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    // Apply consistent image handling to all artists
    return result.map(artist => ({
      ...artist,
      image: getReliableArtistImage(artist.name, artist.image)
    }));
  }, [searchQuery, filters]);

  const handleFiltersChange = (newFilters) => {
    setLoading(true);
    setFilters(newFilters);
    
    // Simulate loading delay
    setTimeout(() => {
      setLoading(false);
    }, 300);
  };

  const handleSearchChange = (query) => {
    setLoading(true);
    setSearchQuery(query);
    
    // Simulate loading delay
    setTimeout(() => {
      setLoading(false);
    }, 300);
  };

  return (
    <div className="min-h-screen py-6 sm:py-8 lg:py-12">
      <div className="container-responsive px-4 sm:px-6">
        {/* Header section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-primary-600 to-accent-600 flex items-center justify-center">
              <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h1 className={`text-title font-bold text-center sm:text-left ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>
              Find Artists
            </h1>
          </div>
          <p className={`text-body max-w-2xl mx-auto px-4 ${
            theme === 'light' ? 'text-gray-700' : 'text-gray-300'
          }`}>
            Discover talented performers, speakers, and entertainers for your next event
          </p>
        </motion.div>

        {/* Filters section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 sm:mb-12"
        >
          <ArtistFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onSearchChange={handleSearchChange}
            searchQuery={searchQuery}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
        </motion.div>

        {/* Results count */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-6 sm:mb-8"
        >
          <div className={`text-sm sm:text-base font-medium ${
            theme === 'light' ? 'text-gray-700' : 'text-gray-300'
          }`}>
            {filteredArtists.length} artists found
          </div>
        </motion.div>

        {/* Artists Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-8 sm:mb-12"
        >
          <ArtistGrid
            artists={filteredArtists}
            viewMode={viewMode}
            loading={loading}
            onImageError={handleImageError}
          />
        </motion.div>

        {/* Load More Section */}
        {filteredArtists.length > 0 && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center"
          >
            <p className={`mb-4 sm:mb-6 text-sm sm:text-base ${
              theme === 'light' ? 'text-gray-700' : 'text-gray-400'
            }`}>
              Showing {filteredArtists.length} of {mockArtists.length} artists
            </p>
            {filteredArtists.length < mockArtists.length && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-lg font-medium hover:from-primary-700 hover:to-accent-700 transition-all duration-200 shadow-lg min-h-[44px] touch-manipulation"
              >
                Load More Artists
              </motion.button>
            )}
          </motion.div>
        )}

        {/* Featured Section */}
        {!searchQuery && filters.categories.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className={`mt-12 sm:mt-16 lg:mt-20 pt-8 sm:pt-12 lg:pt-16 border-t transition-all duration-300 ${
              theme === 'light' ? 'border-gray-200' : 'border-gray-700'
            }`}
          >
            <div className="text-center mb-6 sm:mb-8 lg:mb-12">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Star className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
                <h2 className={`text-subtitle font-bold ${
                  theme === 'light' ? 'text-gray-900' : 'text-white'
                }`}>
                  Featured Artists
                </h2>
              </div>
              <p className={`text-body px-4 ${
                theme === 'light' ? 'text-gray-700' : 'text-gray-300'
              }`}>
                Hand-picked top performers for exceptional events
              </p>
            </div>
            
            {/* Featured artists grid */}
            <div className="grid-responsive-3 gap-4 sm:gap-6">
              {mockArtists
                .filter(artist => artist.featured)
                .slice(0, 3)
                .map((artist, index) => {
                  const artistImage = getReliableArtistImage(artist.name, artist.image);
                  
                  return (
                    <motion.div
                      key={artist.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                      className={`rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${
                        theme === 'light' 
                          ? 'bg-white border border-gray-200' 
                          : 'bg-gray-800 border border-gray-700'
                      }`}
                    >
                      {/* Artist image */}
                      <div className="relative aspect-[4/3] sm:aspect-[16/9] lg:aspect-[4/3]">
                        <img
                          src={artistImage}
                          alt={artist.name}
                          className="absolute inset-0 w-full h-full object-cover"
                          onError={(e) => handleImageError(e, artist.name)}
                          loading="lazy"
                        />
                        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                          Featured
                        </div>
                      </div>
                      
                      {/* Artist info */}
                      <div className="p-3 sm:p-4">
                        <h3 className={`font-semibold mb-1 text-sm sm:text-base ${
                          theme === 'light' ? 'text-gray-900' : 'text-white'
                        }`}>
                          {artist.name}
                        </h3>
                        <p className={`text-xs sm:text-sm mb-2 ${
                          theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                        }`}>
                          {artist.category}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
                            <span className={`text-xs sm:text-sm font-medium ${
                              theme === 'light' ? 'text-gray-800' : 'text-gray-200'
                            }`}>
                              {artist.rating}
                            </span>
                          </div>
                          <span className="text-xs sm:text-sm font-semibold text-primary-600">
                            {artist.priceRange}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ArtistListing;