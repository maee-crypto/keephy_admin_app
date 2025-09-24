'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Edit, Trash2, Star, Users, MapPin, Clock, Building2, TrendingUp, MessageSquare, Calendar } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Business {
  id: string;
  name: string;
  type: string;
  description: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  website?: string;
  status: 'active' | 'inactive' | 'pending';
  owner: {
    name: string;
    email: string;
    phone: string;
  };
  stats: {
    totalSubmissions: number;
    averageRating: number;
    staffCount: number;
    branchCount: number;
    formsCount: number;
    lastSubmission: string;
  };
  branches: Array<{
    id: string;
    name: string;
    address: string;
    manager: string;
    status: string;
    staffCount: number;
  }>;
  recentSubmissions: Array<{
    id: string;
    rating: number;
    comment?: string;
    submittedAt: string;
    branchName: string;
  }>;
  createdAt: string;
}

export default function BusinessDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data - replace with API call
  useEffect(() => {
    const mockBusiness: Business = {
      id: params.id,
      name: 'Grand Hotel Downtown',
      type: 'Hotel',
      description: 'A luxury hotel located in the heart of downtown, offering premium accommodations and world-class service.',
      address: '123 Main Street',
      city: 'New York',
      country: 'USA',
      phone: '+1 (555) 123-4567',
      email: 'info@grandhotel.com',
      website: 'https://grandhotel.com',
      status: 'active',
      owner: {
        name: 'John Smith',
        email: 'john@grandhotel.com',
        phone: '+1 (555) 123-4568'
      },
      stats: {
        totalSubmissions: 1247,
        averageRating: 4.2,
        staffCount: 45,
        branchCount: 2,
        formsCount: 8,
        lastSubmission: '2024-03-15T10:30:00Z'
      },
      branches: [
        {
          id: '1',
          name: 'Downtown Location',
          address: '123 Main Street',
          manager: 'John Smith',
          status: 'active',
          staffCount: 25
        },
        {
          id: '2',
          name: 'Airport Branch',
          address: '456 Airport Road',
          manager: 'Sarah Johnson',
          status: 'active',
          staffCount: 20
        }
      ],
      recentSubmissions: [
        {
          id: '1',
          rating: 5,
          comment: 'Excellent service and beautiful rooms!',
          submittedAt: '2024-03-15T10:30:00Z',
          branchName: 'Downtown Location'
        },
        {
          id: '2',
          rating: 4,
          comment: 'Great location, friendly staff',
          submittedAt: '2024-03-15T09:15:00Z',
          branchName: 'Airport Branch'
        },
        {
          id: '3',
          rating: 3,
          comment: 'Room was clean but could use some updates',
          submittedAt: '2024-03-15T08:45:00Z',
          branchName: 'Downtown Location'
        }
      ],
      createdAt: '2024-01-15T09:00:00Z'
    };
    
    setTimeout(() => {
      setBusiness(mockBusiness);
      setLoading(false);
    }, 1000);
  }, [params.id]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!business) {
    return (
      <div className="text-center py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Business Not Found</h1>
        <p className="text-gray-600 mb-4">The business you're looking for doesn't exist.</p>
        <button
          onClick={() => router.back()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{business.name}</h1>
            <p className="text-gray-600">Business ID: {business.id}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <Edit className="w-4 h-4" />
            Edit Business
          </button>
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center gap-2">
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>

      {/* Status and Basic Info */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(business.status)}`}>
                {business.status.charAt(0).toUpperCase() + business.status.slice(1)}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {business.type}
              </span>
            </div>
            <p className="text-gray-700 mb-4">{business.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Contact Information</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>📧 {business.email}</p>
                  <p>📞 {business.phone}</p>
                  {business.website && <p>🌐 <a href={business.website} className="text-blue-600 hover:underline">{business.website}</a></p>}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Location</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>📍 {business.address}</p>
                  <p>🏙️ {business.city}, {business.country}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <MessageSquare className="w-8 h-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-sm text-gray-600">Total Submissions</p>
              <p className="text-2xl font-bold text-gray-900">{business.stats.totalSubmissions.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <Star className="w-8 h-8 text-green-600" />
            <div className="ml-3">
              <p className="text-sm text-gray-600">Average Rating</p>
              <p className="text-2xl font-bold text-gray-900">{business.stats.averageRating.toFixed(1)}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-purple-600" />
            <div className="ml-3">
              <p className="text-sm text-gray-600">Total Staff</p>
              <p className="text-2xl font-bold text-gray-900">{business.stats.staffCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <Building2 className="w-8 h-8 text-orange-600" />
            <div className="ml-3">
              <p className="text-sm text-gray-600">Branches</p>
              <p className="text-2xl font-bold text-gray-900">{business.stats.branchCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            {[
              { id: 'overview', name: 'Overview', icon: TrendingUp },
              { id: 'branches', name: 'Branches', icon: Building2 },
              { id: 'submissions', name: 'Recent Submissions', icon: MessageSquare },
              { id: 'owner', name: 'Owner Info', icon: Users }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Business Information</h3>
                  <dl className="space-y-3">
                    <div className="flex justify-between">
                      <dt className="text-sm text-gray-600">Created:</dt>
                      <dd className="text-sm text-gray-900">{formatDate(business.createdAt)}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm text-gray-600">Forms:</dt>
                      <dd className="text-sm text-gray-900">{business.stats.formsCount}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm text-gray-600">Last Submission:</dt>
                      <dd className="text-sm text-gray-900">{formatTimeAgo(business.stats.lastSubmission)}</dd>
                    </div>
                  </dl>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Summary</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Customer Satisfaction</span>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                        <span className="text-sm font-medium">{business.stats.averageRating}/5</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Response Rate</span>
                      <span className="text-sm font-medium">87%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Growth Trend</span>
                      <span className="text-sm font-medium text-green-600">+12%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'branches' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Branches ({business.branches.length})</h3>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  Add Branch
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {business.branches.map((branch) => (
                  <div key={branch.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-900">{branch.name}</h4>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        branch.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {branch.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{branch.address}</p>
                    <p className="text-sm text-gray-500">Manager: {branch.manager}</p>
                    <p className="text-sm text-gray-500">Staff: {branch.staffCount}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'submissions' && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Recent Submissions ({business.recentSubmissions.length})</h3>
              <div className="space-y-3">
                {business.recentSubmissions.map((submission) => (
                  <div key={submission.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          submission.rating >= 4 ? 'bg-green-100 text-green-800' :
                          submission.rating >= 3 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          <Star className="w-3 h-3 mr-1 fill-current" />
                          {submission.rating}/5
                        </span>
                        <span className="text-sm text-gray-500">{submission.branchName}</span>
                      </div>
                      <span className="text-sm text-gray-500">{formatTimeAgo(submission.submittedAt)}</span>
                    </div>
                    {submission.comment && (
                      <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                        "{submission.comment}"
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'owner' && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Owner Information</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Contact Details</h4>
                    <dl className="space-y-2">
                      <div>
                        <dt className="text-sm text-gray-600">Name:</dt>
                        <dd className="text-sm text-gray-900">{business.owner.name}</dd>
                      </div>
                      <div>
                        <dt className="text-sm text-gray-600">Email:</dt>
                        <dd className="text-sm text-gray-900">{business.owner.email}</dd>
                      </div>
                      <div>
                        <dt className="text-sm text-gray-600">Phone:</dt>
                        <dd className="text-sm text-gray-900">{business.owner.phone}</dd>
                      </div>
                    </dl>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Account Status</h4>
                    <dl className="space-y-2">
                      <div>
                        <dt className="text-sm text-gray-600">Status:</dt>
                        <dd className="text-sm text-gray-900">Active</dd>
                      </div>
                      <div>
                        <dt className="text-sm text-gray-600">Last Login:</dt>
                        <dd className="text-sm text-gray-900">2 hours ago</dd>
                      </div>
                      <div>
                        <dt className="text-sm text-gray-600">Subscription:</dt>
                        <dd className="text-sm text-gray-900">Professional Plan</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


