'use client';

import { Star, Clock, MessageSquare } from 'lucide-react';

interface Submission {
  _id: string;
  rating: number;
  comment: string;
  createdAt: string;
  form: {
    title: string;
  };
  franchise: {
    name: string;
  };
}

interface RecentSubmissionsProps {
  submissions: Submission[];
}

export function RecentSubmissions({ submissions }: RecentSubmissionsProps) {
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString();
  };

  if (submissions.length === 0) {
    return (
      <div className="text-center py-8">
        <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">No submissions</h3>
        <p className="mt-1 text-sm text-gray-500">
          Get started by creating a form and sharing it with your customers.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {submissions.map((submission) => (
        <div
          key={submission._id}
          className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {/* Rating */}
          <div className="flex-shrink-0">
            <div className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-medium ${getRatingBg(submission.rating)} ${getRatingColor(submission.rating)}`}>
              <Star className="w-4 h-4 mr-1 fill-current" />
              {submission.rating}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900 truncate">
                {submission.form.title}
              </p>
              <div className="flex items-center text-xs text-gray-500">
                <Clock className="w-3 h-3 mr-1" />
                {formatDate(submission.createdAt)}
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              {submission.franchise.name}
            </p>
            {submission.comment && (
              <p className="text-sm text-gray-700 mt-2 line-clamp-2">
                "{submission.comment}"
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default RecentSubmissions;