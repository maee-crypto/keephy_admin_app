'use client';

import { LucideIcon } from 'lucide-react';

interface DashboardStatsProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
}

export function DashboardStats({ 
  title, 
  value, 
  change, 
  changeType, 
  icon: Icon 
}: DashboardStatsProps) {
  const changeColor = {
    positive: 'text-green-600',
    negative: 'text-red-600',
    neutral: 'text-gray-600'
  };

  const changeBgColor = {
    positive: 'bg-green-100',
    negative: 'bg-red-100',
    neutral: 'bg-gray-100'
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <div className="flex items-center mt-2">
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${changeBgColor[changeType]} ${changeColor[changeType]}`}>
              {change}
            </span>
            <span className="ml-2 text-xs text-gray-500">vs last month</span>
          </div>
        </div>
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
            <Icon className="w-6 h-6 text-primary-600" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardStats;