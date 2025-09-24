'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Power } from 'lucide-react';

const Header: React.FC = () => {
  const router = useRouter();
  const [logoutLoading, setLogoutLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLogoutLoading(true);
      // Simulate logout API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      localStorage.removeItem("token");
      router.push("/login");
      toast.success("Logged out successfully");
    } catch (err) {
      toast.error("Failed to logout");
      setLogoutLoading(false);
    }
  };

  return (
    <header className="Header border-b border-black bg-white shadow-inner px-6 fixed right-0 left-0 top-0 z-50">
      <nav className="flex w-full justify-between items-center">
        <div className="flex justify-between w-full">
          <img src="/imgs/app_logo.png" alt="" className="h-[60px] w-[60px]" />
          <div className="my-3">
            <button
              onClick={handleLogout}
              disabled={logoutLoading}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
            >
              <Power className="w-4 h-4" />
              {logoutLoading ? 'Logging out...' : 'Logout'}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;