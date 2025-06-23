/**
 * Utility functions for handling images across the application
 */

/**
 * Get the correct image URL for an artist, with special handling for known cases
 * @param {string} artistName - The name of the artist
 * @param {string} defaultImage - The default image URL
 * @returns {string} The correct image URL
 */
export const getArtistImage = (artistName, defaultImage) => {
  // Special case for Sarah Johnson - use a reliable image source
  if (artistName === 'Sarah Johnson') {
    return 'https://randomuser.me/api/portraits/women/44.jpg';
  }
  return defaultImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(artistName)}&background=random`;
};

/**
 * Handle image loading errors by providing a fallback
 * @param {Event} e - The error event
 */
export const handleImageError = (e) => {
  e.target.onerror = null; // Prevent infinite error loop
  const name = e.target.alt || 'User';
  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name.charAt(0))}&background=random`;
};
