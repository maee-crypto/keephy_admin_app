'use client';

import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  showRetry?: boolean;
}

export function ErrorMessage({ message, onRetry, showRetry = true }: ErrorMessageProps) {
  return (
    <div className="error-container">
      <AlertCircle className="error-icon" />
      <h2 className="error-title">Something went wrong</h2>
      <p className="error-message">{message}</p>
      {showRetry && onRetry && (
        <button onClick={onRetry} className="error-button">
          <RefreshCw className="w-4 h-4 mr-2" />
          Try Again
        </button>
      )}
    </div>
  );
}