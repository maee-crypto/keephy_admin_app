'use client';

import React, { useState, useEffect } from 'react';
import { RefreshCw, Filter, Eye, MessageSquare, Star, Clock, MapPin, User } from 'lucide-react';

interface Submission {
  id: string;
  formTitle: string;
  businessName: string;
  branchName: string;
  customerName?: string;
  customerEmail?: string;
  rating: number;
  comment?: string;
  submittedAt: string;
  deviceType: 'mobile' | 'desktop' | 'tablet';
  source: 'qr' | 'nfc' | 'web' | 'api';
  location?: {
    city: string;
    country: string;
  };
  sentiment?: 'positive' | 'neutral' | 'negative';
}

export default function LiveSubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterBusiness, setFilterBusiness] = useState<string>('all');
  const [filterRating, setFilterRating] = useState<string>('all');
  const [filterSource, setFilterSource] = useState<string>('all');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  // Mock data - replace with real-time API call
  useEffect(() => {
    const generateMockSubmission = (): Submission => {
      const businesses = ['Grand Hotel Downtown', 'Tony\'s Pizza Palace', 'Luxury Spa Resort'];
      const branches = ['Downtown Location', 'Airport Branch', 'Main Restaurant', 'Mall Location', 'Beach Resort'];
      const forms = ['Customer Feedback', 'Service Rating', 'Food Quality', 'Room Experience', 'Spa Services'];
      const customers = ['John Smith', 'Sarah Johnson', 'Mike Rodriguez', 'Lisa Chen', 'David Wilson', 'Emma Davis', 'Robert Brown', 'Maria Garcia'];
      const comments = [
        'Great service!',
        'Food was amazing',
        'Room was clean and comfortable',
        'Staff was very helpful',
        'Quick and efficient',
        'Could be better',
        'Excellent experience',
        'Needs improvement'
      ];
      const sources: ('qr' | 'nfc' | 'web' | 'api')[] = ['qr', 'nfc', 'web', 'api'];
      const devices: ('mobile' | 'desktop' | 'tablet')[] = ['mobile', 'desktop', 'tablet'];
      const sentiments: ('positive' | 'neutral' | 'negative')[] = ['positive', 'neutral', 'negative'];
      
      const business = businesses[Math.floor(Math.random() * businesses.length)];
      const branch = branches[Math.floor(Math.random() * branches.length)];
      const form = forms[Math.floor(Math.random() * forms.length)];
      const customer = customers[Math.floor(Math.random() * customers.length)];
      const comment = comments[Math.floor(Math.random() * comments.length)];
      const source = sources[Math.floor(Math.random() * sources.length)];
      const device = devices[Math.floor(Math.random() * devices.length)];
      const rating = Math.floor(Math.random() * 5) + 1;
      const sentiment = sentiments[Math.floor(Math.random() * sentiments.length)];
      
      return {
        id: Math.random().toString(36).substr(2, 9),
        formTitle: form,
        businessName: business,
        branchName: branch,
        customerName: customer,
        customerEmail: `${customer.toLowerCase().replace(' ', '.')}@example.com`,
        rating,
        comment: Math.random() > 0.3 ? comment : undefined,
        submittedAt: new Date(Date.now() - Math.random() * 3600000).toISOString(), // Last hour
        deviceType: device,
        source,
        location: {
          city: ['New York', 'Chicago', 'Miami', 'Los Angeles'][Math.floor(Math.random() * 4)],
          country: 'USA'
        },
        sentiment
      };
    };

    const loadSubmissions = () => {
      setLoading(true);
      const newSubmissions = Array.from({ length: Math.floor(Math.random() * 5) + 1 }, generateMockSubmission);
      
      setTimeout(() => {
        setSubmissions(prev => [...newSubmissions, ...prev].slice(0, 50)); // Keep last 50
        setLastRefresh(new Date());
        setLoading(false);
      }, 500);
    };

    // Initial load
    loadSubmissions();

    // Auto-refresh every 10 seconds
    const interval = setInterval(() => {
      if (autoRefresh) {
        loadSubmissions();
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const filteredSubmissions = submissions.filter(submission => {
    const matchesBusiness = filterBusiness === 'all' || submission.businessName === filterBusiness;
    const matchesRating = filterRating === 'all' || 
      (filterRating === 'high' && submission.rating >= 4) ||
      (filterRating === 'medium' && submission.rating === 3) ||
      (filterRating === 'low' && submission.rating <= 2);
    const matchesSource = filterSource === 'all' || submission.source === filterSource;
    return matchesBusiness && matchesRating && matchesSource;
  });

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return 'text-green-600';
    if (rating >= 3) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRatingBg = (rating: number) => {
    if (rating >= 4) return 'bg-green-100';
    if (rating >= 3) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const getSentimentColor = (sentiment?: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-600';
      case 'negative': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'qr': return '📱';
      case 'nfc': return '📲';
      case 'web': return '🌐';
      case 'api': return '🔌';
      default: return '❓';
    }
  };

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case 'mobile': return '📱';
      case 'desktop': return '💻';
      case 'tablet': return '📱';
      default: return '❓';
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return date.toLocaleDateString();
  };

  const uniqueBusinesses = [...new Set(submissions.map(s => s.businessName))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Live Submissions</h1>
          <p className="text-gray-600">Real-time customer feedback stream</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">Auto-refresh:</label>
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                autoRefresh ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}
            >
              {autoRefresh ? 'ON' : 'OFF'}
            </button>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">Live Stream Active</span>
            </div>
            <div className="text-sm text-gray-600">
              Last refresh: {lastRefresh.toLocaleTimeString()}
            </div>
            <div className="text-sm text-gray-600">
              Total submissions: {submissions.length}
            </div>
          </div>
          <div className="text-sm text-gray-500">
            Showing last 50 submissions
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Business</label>
            <select
              value={filterBusiness}
              onChange={(e) => setFilterBusiness(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Businesses</option>
              {uniqueBusinesses.map(business => (
                <option key={business} value={business}>{business}</option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
            <select
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Ratings</option>
              <option value="high">High (4-5 stars)</option>
              <option value="medium">Medium (3 stars)</option>
              <option value="low">Low (1-2 stars)</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
            <select
              value={filterSource}
              onChange={(e) => setFilterSource(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Sources</option>
              <option value="qr">QR Code</option>
              <option value="nfc">NFC</option>
              <option value="web">Web</option>
              <option value="api">API</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <MessageSquare className="w-8 h-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-sm text-gray-600">Total Today</p>
              <p className="text-2xl font-bold text-gray-900">{submissions.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <Star className="w-8 h-8 text-green-600" />
            <div className="ml-3">
              <p className="text-sm text-gray-600">Avg Rating</p>
              <p className="text-2xl font-bold text-gray-900">
                {submissions.length > 0 ? (submissions.reduce((sum, s) => sum + s.rating, 0) / submissions.length).toFixed(1) : '0.0'}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <User className="w-8 h-8 text-purple-600" />
            <div className="ml-3">
              <p className="text-sm text-gray-600">With Comments</p>
              <p className="text-2xl font-bold text-gray-900">{submissions.filter(s => s.comment).length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <Clock className="w-8 h-8 text-orange-600" />
            <div className="ml-3">
              <p className="text-sm text-gray-600">Last Hour</p>
              <p className="text-2xl font-bold text-gray-900">{submissions.filter(s => new Date(s.submittedAt) > new Date(Date.now() - 3600000)).length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Live Submissions Feed */}
      <div className="bg-white shadow-sm rounded-lg border">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Live Feed</h3>
          <p className="text-sm text-gray-600">Real-time customer feedback submissions</p>
        </div>
        <div className="max-h-96 overflow-y-auto">
          {filteredSubmissions.length === 0 ? (
            <div className="text-center py-8">
              <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No submissions</h3>
              <p className="mt-1 text-sm text-gray-500">
                Submissions will appear here as customers provide feedback.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredSubmissions.map((submission) => (
                <div key={submission.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRatingBg(submission.rating)} ${getRatingColor(submission.rating)}`}>
                          <Star className="w-3 h-3 mr-1 fill-current" />
                          {submission.rating}/5
                        </span>
                        <span className="text-sm font-medium text-gray-900">{submission.formTitle}</span>
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm text-gray-500">{submission.businessName}</span>
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm text-gray-500">{submission.branchName}</span>
                      </div>
                      
                      {submission.customerName && (
                        <div className="flex items-center gap-2 mb-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{submission.customerName}</span>
                          {submission.customerEmail && (
                            <span className="text-sm text-gray-500">({submission.customerEmail})</span>
                          )}
                        </div>
                      )}
                      
                      {submission.comment && (
                        <div className="mb-3">
                          <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                            "{submission.comment}"
                          </p>
                          {submission.sentiment && (
                            <span className={`text-xs font-medium ${getSentimentColor(submission.sentiment)}`}>
                              Sentiment: {submission.sentiment}
                            </span>
                          )}
                        </div>
                      )}
                      
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatTimeAgo(submission.submittedAt)}
                        </div>
                        <div className="flex items-center gap-1">
                          <span>{getSourceIcon(submission.source)}</span>
                          {submission.source.toUpperCase()}
                        </div>
                        <div className="flex items-center gap-1">
                          <span>{getDeviceIcon(submission.deviceType)}</span>
                          {submission.deviceType}
                        </div>
                        {submission.location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {submission.location.city}, {submission.location.country}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


