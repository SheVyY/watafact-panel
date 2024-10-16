'use client';

import { useState } from 'react';
import Sidebar from './components/Sidebar';
import './globals.css'; // Add this line to import the global CSS

export default function RootLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <html lang="en">
      <body>
        <div className="flex">
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          <main className={`flex-1 bg-gray-100 min-h-screen transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
