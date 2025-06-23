import React from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Heart, MessageSquare, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import Button from '../ui/Button';
import { useAppContext } from '../../App';
import { cn } from '../../utils/cn';

const ArtistCard = ({ artist, viewMode = 'grid' }) => {
  const { favorites, addToFavorites, addNotification } = useAppContext();
  const isFavorite = favorites.includes(artist.id);

  const handleBookingRequest = () => {
    addNotification({
      type: 'success',
      message: `Booking request sent to ${artist.name}!`,
      description: 'You will receive a response within 24 hours.'
    });
  };

  const handleFavoriteToggle = () => {
    addToFavorites(artist.id);
  };

  const getAvailabilityColor = (status) => {
    switch (status) {
      case 'Available':
        return 'text-green-600 bg-green-100';
      case 'Busy':
        return 'text-orange-600 bg-orange-100';
      case 'Unavailable':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getAvailabilityIcon = (status) => {
    switch (status) {
      case 'Available':
        return <CheckCircle className="w-3 h-3" />;
      case 'Busy':
        return <Clock className="w-3 h-3" />;
      default:
        return <Clock className="w-3 h-3" />;
    }
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="mb-4 overflow-hidden">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row">
              {/* Image */}
              <div className="relative md:w-48 h-48 md:h-32">
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="w-full h-full object-cover"
                />
                {artist.featured && (
                  <div className="absolute top-2 left-2 bg-accent-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    Featured
                  </div>
                )}
                <button
                  onClick={handleFavoriteToggle}
                  className="absolute top-2 right-2 p-1 rounded-full bg-white/80 hover:bg-white transition-colors"
                >
                  <Heart className={cn("w-4 h-4", isFavorite ? "fill-red-500 text-red-500" : "text-gray-600")} />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 p-6">
                <div className="flex flex-col md:flex-row md:items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {artist.name}
                      </h3>
                      {artist.verified && (
                        <CheckCircle className="w-5 h-5 text-blue-500" />
                      )}
                    </div>

                    <div className="flex items-center gap-4 mb-3 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{artist.rating}</span>
                        <span>({artist.reviews} reviews)</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{artist.location}</span>
                      </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                      {artist.bio}
                    </p>

                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-lg font-bold text-gray-900 dark:text-white">
                        {artist.priceRange}
                      </span>
                      <div className={cn(
                        "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
                        getAvailabilityColor(artist.availability)
                      )}>
                        {getAvailabilityIcon(artist.availability)}
                        <span>{artist.availability}</span>
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {artist.skills?.slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 md:ml-6">
                    <Button
                      variant="gradient"
                      size="sm"
                      icon={<MessageSquare className="w-4 h-4" />}
                      onClick={handleBookingRequest}
                      disabled={artist.availability === 'Unavailable'}
                    >
                      Ask for Quote
                    </Button>
                    <Button variant="outline" size="sm">
                      View Profile
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
    >
      <Card className="overflow-hidden group">
        <CardContent className="p-0">
          {/* Image */}
          <div className="relative h-48 overflow-hidden">
            <img
              src={artist.image}
              alt={artist.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {artist.featured && (
              <div className="absolute top-3 left-3 bg-accent-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                Featured
              </div>
            )}
            <button
              onClick={handleFavoriteToggle}
              className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
            >
              <Heart className={cn("w-4 h-4", isFavorite ? "fill-red-500 text-red-500" : "text-gray-600")} />
            </button>
            
            {/* Availability Badge */}
            <div className={cn(
              "absolute bottom-3 left-3 flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm",
              getAvailabilityColor(artist.availability)
            )}>
              {getAvailabilityIcon(artist.availability)}
              <span>{artist.availability}</span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">
                {artist.name}
              </h3>
              {artist.verified && (
                <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
              )}
            </div>

            <div className="flex items-center gap-3 mb-3 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{artist.rating}</span>
                <span>({artist.reviews})</span>
              </div>
            </div>

            <div className="flex items-center gap-1 mb-3 text-sm text-gray-600 dark:text-gray-400">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{artist.location}</span>
            </div>

            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
              {artist.bio}
            </p>

            {/* Skills */}
            <div className="flex flex-wrap gap-1 mb-4">
              {artist.skills?.slice(0, 3).map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Price and Actions */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                {artist.priceRange}
              </span>
            </div>

            <div className="flex gap-2">
              <Button
                variant="gradient"
                size="sm"
                className="flex-1"
                icon={<MessageSquare className="w-4 h-4" />}
                onClick={handleBookingRequest}
                disabled={artist.availability === 'Unavailable'}
              >
                Ask Quote
              </Button>
              <Button variant="outline" size="sm">
                View
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ArtistCard;