
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, DollarSign, Calendar, ExternalLink, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useJobs } from '@/hooks/useJobs';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState('developer');
  const [location, setLocation] = useState('');
  const { jobs, loading, error, searchJobs, totalJobs, currentPage, totalPages } = useJobs();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchJobs({
      what: searchTerm,
      where: location,
      page: 1,
    });
  };

  const handlePageChange = (page: number) => {
    searchJobs({
      what: searchTerm,
      where: location,
      page,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Find Your Dream Job</h1>
          <p className="text-gray-600">Discover opportunities that match your skills and aspirations</p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="mb-8">
            <CardContent className="p-6">
              <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Job title, keywords..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Location (optional)"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Button type="submit" disabled={loading} className="px-8">
                  {loading ? 'Searching...' : 'Search Jobs'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Results Summary */}
        {!loading && !error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <p className="text-gray-600">
              Found {totalJobs.toLocaleString()} jobs
              {searchTerm && ` for "${searchTerm}"`}
              {location && ` in ${location}`}
            </p>
          </motion.div>
        )}

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6"
          >
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-6">
                <p className="text-red-600">{error}</p>
                <Button
                  onClick={() => searchJobs({ what: searchTerm, where: location })}
                  variant="outline"
                  className="mt-4"
                >
                  Try Again
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                    <div className="h-3 bg-gray-200 rounded w-4/6"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Jobs Grid */}
        {!loading && !error && jobs.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
          >
            {jobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg line-clamp-2">{job.title}</CardTitle>
                    <div className="flex items-center text-gray-600 text-sm">
                      <Briefcase className="h-4 w-4 mr-1" />
                      {job.company}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center text-gray-600 text-sm">
                      <MapPin className="h-4 w-4 mr-1" />
                      {job.location}
                    </div>
                    
                    <div className="flex items-center text-gray-600 text-sm">
                      <DollarSign className="h-4 w-4 mr-1" />
                      {job.salary}
                    </div>
                    
                    <div className="flex items-center text-gray-600 text-sm">
                      <Calendar className="h-4 w-4 mr-1" />
                      {job.postedDate}
                    </div>

                    <Badge variant="secondary">{job.category}</Badge>
                    
                    <p className="text-gray-600 text-sm line-clamp-3">{job.description}</p>
                    
                    <Button
                      asChild
                      className="w-full"
                      variant="outline"
                    >
                      <a
                        href={job.applyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center"
                      >
                        Apply Now
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Pagination */}
        {!loading && !error && totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center"
          >
            <Pagination>
              <PaginationContent>
                {currentPage > 1 && (
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => handlePageChange(currentPage - 1)}
                      className="cursor-pointer"
                    />
                  </PaginationItem>
                )}
                
                {[...Array(Math.min(5, totalPages))].map((_, i) => {
                  const pageNum = Math.max(1, currentPage - 2) + i;
                  if (pageNum > totalPages) return null;
                  
                  return (
                    <PaginationItem key={pageNum}>
                      <PaginationLink
                        onClick={() => handlePageChange(pageNum)}
                        isActive={pageNum === currentPage}
                        className="cursor-pointer"
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}
                
                {currentPage < totalPages && (
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => handlePageChange(currentPage + 1)}
                      className="cursor-pointer"
                    />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          </motion.div>
        )}

        {/* No Results */}
        {!loading && !error && jobs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search criteria</p>
            <Button onClick={() => searchJobs({ what: 'developer' })}>
              Show All Developer Jobs
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
