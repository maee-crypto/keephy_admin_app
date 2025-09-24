'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Eye, DollarSign, Users, CheckCircle, XCircle, Star } from 'lucide-react';

interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  billingCycle: 'monthly' | 'yearly';
  features: string[];
  limits: {
    submissions: number;
    businesses: number;
    staff: number;
    forms: number;
  };
  status: 'active' | 'inactive' | 'archived';
  popular: boolean;
  createdAt: string;
}

export default function PlansPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Mock data - replace with API call
  useEffect(() => {
    const mockPlans: Plan[] = [
      {
        id: '1',
        name: 'Starter',
        description: 'Perfect for small businesses getting started',
        price: 29,
        billingCycle: 'monthly',
        features: [
          'Up to 3 businesses',
          '500 submissions/month',
          'Basic analytics',
          'Email support',
          'Standard forms'
        ],
        limits: {
          submissions: 500,
          businesses: 3,
          staff: 10,
          forms: 5
        },
        status: 'active',
        popular: false,
        createdAt: '2024-01-01T00:00:00Z'
      },
      {
        id: '2',
        name: 'Professional',
        description: 'Ideal for growing businesses with multiple locations',
        price: 99,
        billingCycle: 'monthly',
        features: [
          'Up to 10 businesses',
          '2,000 submissions/month',
          'Advanced analytics',
          'Priority support',
          'Custom forms',
          'API access',
          'Integrations'
        ],
        limits: {
          submissions: 2000,
          businesses: 10,
          staff: 50,
          forms: 20
        },
        status: 'active',
        popular: true,
        createdAt: '2024-01-01T00:00:00Z'
      },
      {
        id: '3',
        name: 'Enterprise',
        description: 'For large organizations with complex needs',
        price: 299,
        billingCycle: 'monthly',
        features: [
          'Unlimited businesses',
          'Unlimited submissions',
          'Premium analytics',
          '24/7 support',
          'Custom branding',
          'Advanced API',
          'White-label options',
          'SSO integration'
        ],
        limits: {
          submissions: -1, // unlimited
          businesses: -1, // unlimited
          staff: -1, // unlimited
          forms: -1 // unlimited
        },
        status: 'active',
        popular: false,
        createdAt: '2024-01-01T00:00:00Z'
      },
      {
        id: '4',
        name: 'Legacy Basic',
        description: 'Old basic plan - being phased out',
        price: 19,
        billingCycle: 'monthly',
        features: [
          'Up to 1 business',
          '100 submissions/month',
          'Basic support'
        ],
        limits: {
          submissions: 100,
          businesses: 1,
          staff: 5,
          forms: 2
        },
        status: 'archived',
        popular: false,
        createdAt: '2023-06-01T00:00:00Z'
      }
    ];
    
    setTimeout(() => {
      setPlans(mockPlans);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredPlans = plans.filter(plan => {
    const matchesSearch = plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plan.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || plan.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatPrice = (price: number, cycle: string) => {
    return `$${price}/${cycle === 'monthly' ? 'mo' : 'yr'}`;
  };

  const formatLimit = (limit: number) => {
    return limit === -1 ? 'Unlimited' : limit.toLocaleString();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Subscription Plans</h1>
          <p className="text-gray-600">Manage pricing plans and feature limits</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Create Plan
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <div className="flex gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search plans..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <Star className="w-8 h-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-sm text-gray-600">Total Plans</p>
              <p className="text-2xl font-bold text-gray-900">{plans.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <CheckCircle className="w-8 h-8 text-green-600" />
            <div className="ml-3">
              <p className="text-sm text-gray-600">Active Plans</p>
              <p className="text-2xl font-bold text-gray-900">{plans.filter(p => p.status === 'active').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <DollarSign className="w-8 h-8 text-purple-600" />
            <div className="ml-3">
              <p className="text-sm text-gray-600">Avg. Price</p>
              <p className="text-2xl font-bold text-gray-900">${Math.round(plans.filter(p => p.status === 'active').reduce((sum, p) => sum + p.price, 0) / plans.filter(p => p.status === 'active').length)}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-orange-600" />
            <div className="ml-3">
              <p className="text-sm text-gray-600">Popular Plan</p>
              <p className="text-2xl font-bold text-gray-900">{plans.find(p => p.popular)?.name || 'None'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlans.map((plan) => (
          <div key={plan.id} className={`bg-white rounded-lg shadow-sm border p-6 relative ${plan.popular ? 'ring-2 ring-blue-500' : ''}`}>
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">Most Popular</span>
              </div>
            )}
            
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
              <div className="mb-4">
                <span className="text-4xl font-bold text-gray-900">{formatPrice(plan.price, plan.billingCycle)}</span>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(plan.status)}`}>
                {plan.status.charAt(0).toUpperCase() + plan.status.slice(1)}
              </span>
            </div>

            <div className="space-y-3 mb-6">
              <h4 className="font-medium text-gray-900">Features:</h4>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2 mb-6">
              <h4 className="font-medium text-gray-900">Limits:</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Submissions:</span>
                  <span className="font-medium">{formatLimit(plan.limits.submissions)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Businesses:</span>
                  <span className="font-medium">{formatLimit(plan.limits.businesses)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Staff:</span>
                  <span className="font-medium">{formatLimit(plan.limits.staff)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Forms:</span>
                  <span className="font-medium">{formatLimit(plan.limits.forms)}</span>
                </div>
              </div>
            </div>

            <div className="flex space-x-2">
              <button className="flex-1 text-blue-600 hover:text-blue-900 text-sm font-medium">
                <Eye className="w-4 h-4 inline mr-1" />
                View
              </button>
              <button className="flex-1 text-green-600 hover:text-green-900 text-sm font-medium">
                <Edit className="w-4 h-4 inline mr-1" />
                Edit
              </button>
              <button className="flex-1 text-red-600 hover:text-red-900 text-sm font-medium">
                <Trash2 className="w-4 h-4 inline mr-1" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Plan Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Create New Plan</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Plan Name</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" rows={3}></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                  <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Billing Cycle</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
              </div>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Create Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}


