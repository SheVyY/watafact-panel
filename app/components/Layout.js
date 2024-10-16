import { useState } from 'react';
import Sidebar from './Sidebar';

export default function Layout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            
            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Toggle button */}
                <button 
                    onClick={toggleSidebar}
                    className={`absolute top-4 ${isSidebarOpen ? 'left-64' : 'left-0'} z-40 p-2 bg-white rounded-r-md shadow-md transition-all duration-300`}
                >
                    <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isSidebarOpen ? "M11 19l-7-7 7-7m8 14l-7-7 7-7" : "M13 5l7 7-7 7M5 5l7 7-7 7"} />
                    </svg>
                </button>
                
                {/* Page content */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
