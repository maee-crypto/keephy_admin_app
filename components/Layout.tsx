'use client';

import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <Sidebar />
      <main className="ml-[246px] mr-[25px] mt-[100px] mb-[20px]">
        {children}
      </main>
    </>
  );
};

export default Layout;
