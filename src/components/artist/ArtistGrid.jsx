import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users } from 'lucide-react';
import ArtistCard from './ArtistCard';

const ArtistGrid = ({ artists, viewMode, loading }) => {
  // Enhanced image handling functions
  const getArtistImage = (artistName, defaultImage) => {
    // Special case for Sarah Johnson with multiple fallback options
    if (artistName === 'Sarah Johnson') {
      // Use a more reliable image service
      return 'https://picsum.photos/400/400?random=1';
    }
    // For other artists, use default or generate a random placeholder
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
    const name = artistName || e.target.alt || 'User';
    const fallbackUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=400&background=8B5CF6&color=ffffff&bold=true`;
    e.target.src = fallbackUrl;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="loading-dots text-primary-600 mb-4">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <p className="text-gray-600 dark:text-gray-400">Loading artists...</p>
        </div>
      </div>
    );
  }

  if (artists.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-20"
      >
        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
          <Users className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          No artists found
        </h3>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
          Try adjusting your search criteria or filters to find more artists.
        </p>
      </motion.div>
    );
  }

  return (
    <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
      <AnimatePresence mode="popLayout">
        {artists.map((artist, index) => {
          // Ensure artist has a valid image before rendering
          const artistWithImage = {
            ...artist,
            image: getArtistImage(artist.name, artist.image)
          };
          
          return (
            <motion.div
              key={artist.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{
                duration: 0.3,
                delay: index * 0.05,
                layout: { duration: 0.3 }
              }}
              layout
            >
              <ArtistCard 
                artist={artistWithImage} 
                viewMode={viewMode} 
                onImageError={handleImageError}
              />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default ArtistGrid;