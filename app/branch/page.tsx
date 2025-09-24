'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Eye, MapPin, Users, Star, Building2, Clock } from 'lucide-react';

interface Branch {
  id: string;
  name: string;
  businessId: string;
  businessName: string;
  address: string;
  city: string;
  country: string;
  status: 'active' | 'inactive' | 'maintenance';
  managerId: string;
  managerName: string;
  staffCount: number;
  totalSubmissions: number;
  averageRating: number;
  operatingHours: {
    open: string;
    close: string;
    days: string[];
  };
  createdAt: string;
}

export default function BranchPage() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterBusiness, setFilterBusiness] = useState<string>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Mock data - replace with API call
  useEffect(() => {
    const mockBranches: Branch[] = [
      {
        id: '1',
        name: 'Downtown Location',
        businessId: '1',
        businessName: 'Grand Hotel Downtown',
        address: '123 Main Street',
        city: 'New York',
        country: 'USA',
        status: 'active',
        managerId: '1',
        managerName: 'John Smith',
        staffCount: 25,
        totalSubmissions: 1247,
        averageRating: 4.2,
        operatingHours: {
          open: '06:00',
          close: '22:00',
          days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        },
        createdAt: '2024-01-15T09:00:00Z'
      },
      {
        id: '2',
        name: 'Airport Branch',
        businessId: '1',
        businessName: 'Grand Hotel Downtown',
        address: '456 Airport Road',
        city: 'New York',
        country: 'USA',
        status: 'active',
        managerId: '2',
        managerName: 'Sarah Johnson',
        staffCount: 20,
        totalSubmissions: 892,
        averageRating: 4.0,
        operatingHours: {
          open: '24/7',
          close: '24/7',
          days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        },
        createdAt: '2024-02-01T10:00:00Z'
      },
      {
        id: '3',
        name: 'Main Restaurant',
        businessId: '2',
        businessName: 'Tony\'s Pizza Palace',
        address: '789 Oak Avenue',
        city: 'Chicago',
        country: 'USA',
        status: 'active',
        managerId: '3',
        managerName: 'Mike Rodriguez',
        staffCount: 12,
        totalSubmissions: 654,
        averageRating: 4.5,
        operatingHours: {
          open: '11:00',
          close: '23:00',
          days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        },
        createdAt: '2024-02-20T11:15:00Z'
      },
      {
        id: '4',
        name: 'Mall Location',
        businessId: '2',
        businessName: 'Tony\'s Pizza Palace',
        address: '321 Mall Drive',
        city: 'Chicago',
        country: 'USA',
        status: 'maintenance',
        managerId: '4',
        managerName: 'Lisa Chen',
        staffCount: 8,
        totalSubmissions: 234,
        averageRating: 4.1,
        operatingHours: {
          open: '10:00',
          close: '21:00',
          days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        },
        createdAt: '2024-03-01T14:30:00Z'
      },
      {
        id: '5',
        name: 'Beach Resort',
        businessId: '3',
        businessName: 'Luxury Spa Resort',
        address: '555 Beach Road',
        city: 'Miami',
        country: 'USA',
        status: 'active',
        managerId: '5',
        managerName: 'David Wilson',
        staffCount: 15,
        totalSubmissions: 0,
        averageRating: 0,
        operatingHours: {
          open: '08:00',
          close: '20:00',
          days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        },
        createdAt: '2024-03-10T13:30:00Z'
      }
    ];
    
    setTimeout(() => {
      setBranches(mockBranches);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredBranches = branches.filter(branch => {
    const matchesSearch = branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         branch.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         branch.businessName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || branch.status === filterStatus;
    const matchesBusiness = filterBusiness === 'all' || branch.businessId === filterBusiness;
    return matchesSearch && matchesStatus && matchesBusiness;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return '🟢';
      case 'inactive': return '🔴';
      case 'maintenance': return '🔧';
      default: return '⚪';
    }
  };

  const uniqueBusinesses = [...new Set(branches.map(b => ({ id: b.businessId, name: b.businessName })))];

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
          <h1 className="text-2xl font-bold text-gray-900">Branches</h1>
          <p className="text-gray-600">Manage branch locations and their operations</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Branch
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
                placeholder="Search branches..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <select
            value={filterBusiness}
            onChange={(e) => setFilterBusiness(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Businesses</option>
            {uniqueBusinesses.map(business => (
              <option key={business.id} value={business.id}>{business.name}</option>
            ))}
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <Building2 className="w-8 h-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-sm text-gray-600">Total Branches</p>
              <p className="text-2xl font-bold text-gray-900">{branches.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <Star className="w-8 h-8 text-green-600" />
            <div className="ml-3">
              <p className="text-sm text-gray-600">Active Branches</p>
              <p className="text-2xl font-bold text-gray-900">{branches.filter(b => b.status === 'active').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-purple-600" />
            <div className="ml-3">
              <p className="text-sm text-gray-600">Total Staff</p>
              <p className="text-2xl font-bold text-gray-900">{branches.reduce((sum, b) => sum + b.staffCount, 0)}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <MapPin className="w-8 h-8 text-orange-600" />
            <div className="ml-3">
              <p className="text-sm text-gray-600">Total Submissions</p>
              <p className="text-2xl font-bold text-gray-900">{branches.reduce((sum, b) => sum + b.totalSubmissions, 0)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Branches Table */}
      <div className="bg-white shadow-sm rounded-lg border">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Branch</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Business</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Manager</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Staff</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hours</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBranches.map((branch) => (
                <tr key={branch.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{branch.name}</div>
                      <div className="text-sm text-gray-500">ID: {branch.id}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{branch.businessName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{branch.city}, {branch.country}</div>
                    <div className="text-sm text-gray-500">{branch.address}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{branch.managerName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(branch.status)}`}>
                      {getStatusIcon(branch.status)} {branch.status.charAt(0).toUpperCase() + branch.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm text-gray-900">
                        {branch.averageRating > 0 ? branch.averageRating.toFixed(1) : 'N/A'}
                      </span>
                      <span className="ml-1 text-sm text-gray-500">({branch.totalSubmissions})</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {branch.staffCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <Clock className="w-3 h-3 mr-1" />
                      {branch.operatingHours.open === '24/7' ? '24/7' : `${branch.operatingHours.open}-${branch.operatingHours.close}`}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Branch Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Create New Branch</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Branch Name</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Business</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option value="">Select Business</option>
                  {uniqueBusinesses.map(business => (
                    <option key={business.id} value={business.id}>{business.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Opening Time</label>
                  <input type="time" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Closing Time</label>
                  <input type="time" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
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
                  Create Branch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}


