import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Search, X, Grid, List, SlidersHorizontal } from 'lucide-react';
import { artistCategories, priceRanges, locations } from '../../data/mockData';
import { Card, CardContent } from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Checkbox from '../ui/Checkbox';
import { cn } from '../../utils/cn';

const ArtistFilters = ({
  filters,
  onFiltersChange,
  onSearchChange,
  searchQuery,
  resultsCount,
  viewMode,
  onViewModeChange
}) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState(filters);

  const categoryOptions = artistCategories.map(cat => ({
    value: cat.id,
    label: cat.name
  }));

  const locationOptions = locations.slice(0, 20).map(loc => ({
    value: loc,
    label: loc
  }));

  const availabilityOptions = [
    { value: 'Available', label: 'Available' },
    { value: 'Busy', label: 'Busy' },
    { value: 'Unavailable', label: 'Unavailable' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      categories: [],
      priceRange: 'all',
      location: 'all',
      availability: [],
      verified: false,
      featured: false
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const hasActiveFilters = () => {
    return (
      localFilters.categories.length > 0 ||
      localFilters.priceRange !== 'all' ||
      localFilters.location !== 'all' ||
      localFilters.availability.length > 0 ||
      localFilters.verified ||
      localFilters.featured ||
      searchQuery
    );
  };

  return (
    <div className="space-y-4">
      {/* Search and View Controls */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="flex-1 w-full">
              <Input
                placeholder="Search artists by name, skill, or location..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                icon={<Search className="w-4 h-4" />}
                className="w-full"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2">
              <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                <button
                  onClick={() => onViewModeChange('grid')}
                  className={cn(
                    "p-2 rounded-md transition-colors",
                    viewMode === 'grid'
                      ? "bg-white dark:bg-gray-700 text-primary-600 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  )}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onViewModeChange('list')}
                  className={cn(
                    "p-2 rounded-md transition-colors",
                    viewMode === 'list'
                      ? "bg-white dark:bg-gray-700 text-primary-600 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  )}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Filter Toggle */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                icon={<SlidersHorizontal className="w-4 h-4" />}
                className={cn(
                  "relative",
                  hasActiveFilters() && "border-primary-500 text-primary-600"
                )}
              >
                Filters
                {hasActiveFilters() && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary-500 rounded-full" />
                )}
              </Button>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-medium text-gray-900 dark:text-white">
                {resultsCount}
              </span>{' '}
              artists found
            </p>

            {hasActiveFilters() && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearFilters}
                icon={<X className="w-4 h-4" />}
              >
                Clear all
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Advanced Filters */}
      <AnimatePresence>
        {isFiltersOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Categories */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                      Categories
                    </h3>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {categoryOptions.map((category) => (
                        <Checkbox
                          key={category.value}
                          label={category.label}
                          checked={localFilters.categories.includes(category.value)}
                          onChange={(checked) => {
                            const newCategories = checked
                              ? [...localFilters.categories, category.value]
                              : localFilters.categories.filter(c => c !== category.value);
                            handleFilterChange('categories', newCategories);
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                      Price Range
                    </h3>
                    <Select
                      options={priceRanges}
                      value={localFilters.priceRange}
                      onChange={(value) => handleFilterChange('priceRange', value)}
                      placeholder="Select price range"
                    />
                  </div>

                  {/* Location */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                      Location
                    </h3>
                    <Select
                      options={[
                        { value: 'all', label: 'All Locations' },
                        ...locationOptions
                      ]}
                      value={localFilters.location}
                      onChange={(value) => handleFilterChange('location', value)}
                      placeholder="Select location"
                    />
                  </div>

                  {/* Availability */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                      Availability
                    </h3>
                    <div className="space-y-2">
                      {availabilityOptions.map((option) => (
                        <Checkbox
                          key={option.value}
                          label={option.label}
                          checked={localFilters.availability.includes(option.value)}
                          onChange={(checked) => {
                            const newAvailability = checked
                              ? [...localFilters.availability, option.value]
                              : localFilters.availability.filter(a => a !== option.value);
                            handleFilterChange('availability', newAvailability);
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Special Filters */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                      Special
                    </h3>
                    <div className="space-y-2">
                      <Checkbox
                        label="Verified Only"
                        checked={localFilters.verified}
                        onChange={(checked) => handleFilterChange('verified', checked)}
                      />
                      <Checkbox
                        label="Featured Artists"
                        checked={localFilters.featured}
                        onChange={(checked) => handleFilterChange('featured', checked)}
                      />
                    </div>
                  </div>

                  {/* Sort Options */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                      Sort By
                    </h3>
                    <Select
                      options={[
                        { value: 'rating', label: 'Highest Rated' },
                        { value: 'reviews', label: 'Most Reviews' },
                        { value: 'price-low', label: 'Price: Low to High' },
                        { value: 'price-high', label: 'Price: High to Low' },
                        { value: 'newest', label: 'Newest First' },
                        { value: 'featured', label: 'Featured First' }
                      ]}
                      value={localFilters.sortBy || 'rating'}
                      onChange={(value) => handleFilterChange('sortBy', value)}
                    />
                  </div>
                </div>

                {/* Active Filters */}
                {hasActiveFilters() && (
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        Active filters:
                      </span>
                      
                      {localFilters.categories.map((category) => {
                        const categoryName = categoryOptions.find(c => c.value === category)?.label;
                        return (
                          <motion.span
                            key={category}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-1 px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs"
                          >
                            {categoryName}
                            <button
                              onClick={() => {
                                const newCategories = localFilters.categories.filter(c => c !== category);
                                handleFilterChange('categories', newCategories);
                              }}
                              className="hover:text-primary-900"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </motion.span>
                        );
                      })}

                      {localFilters.priceRange !== 'all' && (
                        <motion.span
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs"
                        >
                          {priceRanges.find(p => p.value === localFilters.priceRange)?.label}
                          <button
                            onClick={() => handleFilterChange('priceRange', 'all')}
                            className="hover:text-primary-900"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </motion.span>
                      )}

                      {localFilters.location !== 'all' && (
                        <motion.span
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs"
                        >
                          {localFilters.location}
                          <button
                            onClick={() => handleFilterChange('location', 'all')}
                            className="hover:text-primary-900"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </motion.span>
                      )}

                      {searchQuery && (
                        <motion.span
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs"
                        >
                          Search: "{searchQuery}"
                          <button
                            onClick={() => onSearchChange('')}
                            className="hover:text-primary-900"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </motion.span>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ArtistFilters;