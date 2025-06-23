import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  MoreHorizontal, 
  Eye, 
  Check, 
  X, 
  Mail, 
  Phone, 
  MapPin,
  Calendar,
  Download,
  Filter,
  Search
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { useAppContext } from '../../App';
import { cn } from '../../utils/cn';

const DashboardTable = ({ data, title = "Artist Submissions" }) => {
  const [sortField, setSortField] = useState('submittedDate');
  const [sortDirection, setSortDirection] = useState('desc');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedRows, setSelectedRows] = useState([]);
  const { addNotification } = useAppContext();

  // Add responsive breakpoints state
  const [screenSize, setScreenSize] = useState({
    isXs: window.innerWidth < 480,
    isSm: window.innerWidth >= 480 && window.innerWidth < 640,
    isMd: window.innerWidth >= 640 && window.innerWidth < 768,
    isLg: window.innerWidth >= 768 && window.innerWidth < 1024,
    isXl: window.innerWidth >= 1024
  });
  
  // Update screen size state on resize
  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        isXs: window.innerWidth < 480,
        isSm: window.innerWidth >= 480 && window.innerWidth < 640,
        isMd: window.innerWidth >= 640 && window.innerWidth < 768,
        isLg: window.innerWidth >= 768 && window.innerWidth < 1024,
        isXl: window.innerWidth >= 1024
      });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Determine if we should use card view based on screen size
  const useCardView = screenSize.isXs || screenSize.isSm || screenSize.isMd;

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <Check className="w-3 h-3" />;
      case 'rejected':
        return <X className="w-3 h-3" />;
      default:
        return <Calendar className="w-3 h-3" />;
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleStatusChange = (id, newStatus) => {
    addNotification({
      type: 'success',
      message: `Application ${newStatus}`,
      description: `Artist application has been ${newStatus}.`
    });
  };

  const handleSelectRow = (id) => {
    setSelectedRows(prev => 
      prev.includes(id) 
        ? prev.filter(rowId => rowId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedRows(
      selectedRows.length === filteredData.length 
        ? [] 
        : filteredData.map(item => item.id)
    );
  };

  const filteredData = data
    .filter(item => {
      const matchesSearch = 
        item.artistName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.city.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const exportData = () => {
    const csvContent = [
      ['Name', 'Category', 'City', 'Fee', 'Status', 'Date', 'Email', 'Phone'].join(','),
      ...filteredData.map(item => [
        item.artistName,
        item.category,
        item.city,
        item.fee,
        item.status,
        item.submittedDate,
        item.email,
        item.phone
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'artist-applications.csv';
    a.click();
    window.URL.revokeObjectURL(url);

    addNotification({
      type: 'success',
      message: 'Data exported successfully',
      description: 'Artist applications have been exported to CSV.'
    });
  };

  // Add function to get the correct image URL for artists
  const getArtistImage = (artistName) => {
    // Special case for Sarah Johnson
    if (artistName === 'Sarah Johnson') {
      return 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face';
    }
    // Default placeholder image if needed
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(artistName)}&background=random`;
  };
  
  // Add fallback handler for image loading errors
  const handleImageError = (e) => {
    e.target.onerror = null;
    const name = e.target.alt || 'User';
    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name.charAt(0))}&background=random`;
  };

  return (
    <Card className="w-full">
      <CardHeader className="px-4 sm:px-6">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <CardTitle className="text-xl sm:text-2xl font-bold">{title}</CardTitle>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                onClick={exportData}
                icon={<Download className="w-4 h-4" />}
                className="min-h-[44px] w-full sm:w-auto"
              >
                Export Data
              </Button>
            </div>
          </div>
          
          {/* Responsive search and filter controls */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <Input
                placeholder="Search artists..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={<Search className="w-4 h-4" />}
                className="w-full min-h-[44px]"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 min-h-[44px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white w-full"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
              
              <select
                value={sortField}
                onChange={(e) => {
                  setSortField(e.target.value);
                  setSortDirection('asc');
                }}
                className="px-3 py-2 min-h-[44px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white w-full sm:w-auto"
              >
                <option value="submittedDate">Sort by Date</option>
                <option value="artistName">Sort by Name</option>
                <option value="category">Sort by Category</option>
                <option value="fee">Sort by Fee</option>
              </select>
              
              <Button
                variant="outline"
                onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
                className="min-h-[44px] w-full sm:w-auto"
              >
                {sortDirection === 'asc' ? '↑ Ascending' : '↓ Descending'}
              </Button>
            </div>
          </div>
        </div>

        {/* Summary Stats - Responsive grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
            <div className="text-xl sm:text-2xl font-bold text-blue-600">
              {data.length}
            </div>
            <div className="text-xs sm:text-sm text-blue-800 dark:text-blue-400">
              Total Applications
            </div>
          </div>
          
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
            <div className="text-xl sm:text-2xl font-bold text-yellow-600">
              {data.filter(item => item.status === 'pending').length}
            </div>
            <div className="text-xs sm:text-sm text-yellow-800 dark:text-yellow-400">
              Pending Review
            </div>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
            <div className="text-xl sm:text-2xl font-bold text-green-600">
              {data.filter(item => item.status === 'approved').length}
            </div>
            <div className="text-xs sm:text-sm text-green-800 dark:text-green-400">
              Approved
            </div>
          </div>
          
          <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
            <div className="text-xl sm:text-2xl font-bold text-red-600">
              {data.filter(item => item.status === 'rejected').length}
            </div>
            <div className="text-xs sm:text-sm text-red-800 dark:text-red-400">
              Rejected
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {/* Bulk Actions - Responsive */}
        {selectedRows.length > 0 && (
          <div className="p-3 sm:p-4 bg-primary-50 dark:bg-primary-900/20 border-b">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <span className="text-sm text-primary-800 dark:text-primary-200">
                {selectedRows.length} items selected
              </span>
              <div className="flex gap-2 w-full sm:w-auto">
                <Button size="sm" variant="outline" className="flex-1 sm:flex-initial">
                  Bulk Approve
                </Button>
                <Button size="sm" variant="outline" className="flex-1 sm:flex-initial">
                  Bulk Reject
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Card View for Mobile and Tablet */}
        {useCardView && (
          <div className="px-4 py-2">
            {filteredData.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-500 dark:text-gray-400">
                  No applications found matching your criteria.
                </div>
              </div>
            ) : (
              filteredData.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="mb-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(item.id)}
                        onChange={() => handleSelectRow(item.id)}
                        className="mr-3 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <div className="flex items-center">
                        {/* Add artist image with fallback */}
                        <img 
                          src={getArtistImage(item.artistName)}
                          alt={item.artistName}
                          className="w-8 h-8 rounded-full mr-2 object-cover"
                          onError={handleImageError}
                          loading="lazy"
                        />
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {item.artistName}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {item.category}
                          </div>
                        </div>
                      </div>
                    </div>
                    <span className={cn(
                      "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium",
                      getStatusColor(item.status)
                    )}>
                      {getStatusIcon(item.status)}
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
                    <div>
                      <p className="text-gray-500 dark:text-gray-400 text-xs">Location</p>
                      <div className="flex items-center text-gray-900 dark:text-white">
                        <MapPin className="w-3 h-3 mr-1 text-gray-400" />
                        {item.city}
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400 text-xs">Fee</p>
                      <p className="text-gray-900 dark:text-white">{item.fee}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400 text-xs">Contact</p>
                      <div className="flex items-center text-gray-900 dark:text-white text-xs">
                        <Mail className="w-3 h-3 mr-1 text-gray-400" />
                        <span className="truncate max-w-[100px]">{item.email}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400 text-xs">Date</p>
                      <p className="text-gray-900 dark:text-white text-xs">
                        {new Date(item.submittedDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-3">
                    <Button
                      size="sm"
                      variant="outline"
                      icon={<Eye className="w-4 h-4" />}
                      className="flex-1"
                    >
                      View
                    </Button>
                    
                    {item.status === 'pending' && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-green-600 border-green-600 hover:bg-green-50 flex-1"
                          icon={<Check className="w-4 h-4" />}
                          onClick={() => handleStatusChange(item.id, 'approved')}
                        >
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 border-red-600 hover:bg-red-50 flex-1"
                          icon={<X className="w-4 h-4" />}
                          onClick={() => handleStatusChange(item.id, 'rejected')}
                        >
                          Reject
                        </Button>
                      </>
                    )}
                  </div>
                </motion.div>
              ))
            )}
          </div>
        )}

        {/* Desktop Table View - Fixed responsive issues */}
        {!useCardView && (
          <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-4 sm:px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedRows.length === filteredData.length && filteredData.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                  </th>
                  {[
                    { key: 'artistName', label: 'Artist' },
                    { key: 'category', label: 'Category' },
                    { key: 'city', label: 'Location' },
                    { key: 'fee', label: 'Fee' },
                    { key: 'status', label: 'Status' },
                    { key: 'submittedDate', label: 'Date' },
                    { key: 'actions', label: 'Actions' }
                  ].map((column) => (
                    <th
                      key={column.key}
                      className={cn(
                        "px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap",
                        column.key !== 'actions' && "cursor-pointer hover:text-gray-700 dark:hover:text-gray-300"
                      )}
                      onClick={() => column.key !== 'actions' && handleSort(column.key)}
                    >
                      <div className="flex items-center gap-1">
                        {column.label}
                        {sortField === column.key && (
                          <span className="text-primary-500">
                            {sortDirection === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                      No applications found matching your criteria.
                    </td>
                  </tr>
                ) : (
                  filteredData.map((item, index) => (
                    <motion.tr
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <td className="px-4 sm:px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(item.id)}
                          onChange={() => handleSelectRow(item.id)}
                          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                      </td>
                      
                      <td className="px-4 sm:px-6 py-4">
                        <div className="flex items-center">
                          {/* Add artist image with fallback */}
                          <img 
                            src={getArtistImage(item.artistName)}
                            alt={item.artistName}
                            className="w-8 h-8 rounded-full mr-3 object-cover"
                            onError={handleImageError}
                            loading="lazy"
                          />
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {item.artistName}
                            </div>
                            <div className="flex items-center gap-3 mt-1 text-xs text-gray-500 dark:text-gray-400">
                              <div className="flex items-center gap-1">
                                <Mail className="w-3 h-3" />
                                <span className="hidden sm:inline">{item.email}</span>
                                <span className="sm:hidden">{item.email.substring(0, 10)}...</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Phone className="w-3 h-3" />
                                <span>{item.phone}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                      
                      <td className="px-4 sm:px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                          {item.category}
                        </span>
                      </td>
                      
                      <td className="px-4 sm:px-6 py-4">
                        <div className="flex items-center text-sm text-gray-900 dark:text-white">
                          <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                          {item.city}
                        </div>
                      </td>
                      
                      <td className="px-4 sm:px-6 py-4">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {item.fee}
                        </span>
                      </td>
                      
                      <td className="px-4 sm:px-6 py-4">
                        <span className={cn(
                          "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium",
                          getStatusColor(item.status)
                        )}>
                          {getStatusIcon(item.status)}
                          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                        </span>
                      </td>
                      
                      <td className="px-4 sm:px-6 py-4">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {new Date(item.submittedDate).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(item.submittedDate).toLocaleTimeString()}
                        </div>
                      </td>
                      
                      <td className="px-4 sm:px-6 py-4">
                        <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            icon={<Eye className="w-4 h-4" />}
                            className="min-h-[40px]"
                          >
                            View
                          </Button>
                          
                          {item.status === 'pending' && (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-green-600 border-green-600 hover:bg-green-50 min-h-[40px]"
                                icon={<Check className="w-4 h-4" />}
                                onClick={() => handleStatusChange(item.id, 'approved')}
                              >
                                <span className="hidden lg:inline">Approve</span>
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-red-600 border-red-600 hover:bg-red-50 min-h-[40px]"
                                icon={<X className="w-4 h-4" />}
                                onClick={() => handleStatusChange(item.id, 'rejected')}
                              >
                                <span className="hidden lg:inline">Reject</span>
                              </Button>
                            </>
                          )}
                          
                          <Button
                            size="sm"
                            variant="ghost"
                            icon={<MoreHorizontal className="w-4 h-4" />}
                          />
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination - Responsive */}
        {filteredData.length > 0 && (
          <div className="px-4 sm:px-6 py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-sm text-gray-700 dark:text-gray-300 w-full sm:w-auto text-center sm:text-left">
                Showing {filteredData.length} of {data.length} results
              </div>
              
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Button size="sm" variant="outline" disabled className="flex-1 sm:flex-initial">
                  Previous
                </Button>
                <Button size="sm" variant="outline" disabled className="flex-1 sm:flex-initial">
                  Next
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DashboardTable;
