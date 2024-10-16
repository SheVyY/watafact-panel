'use client'; // This should be removed

import { useState } from 'react'; // This import can be removed if not used
import Sidebar from './components/Sidebar';
import './globals.css'; // Add this line to import the global CSS
import Layout from './components/Layout';

export default function RootLayout({ children }) {
  // Remove the unused state and setter
  // const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
