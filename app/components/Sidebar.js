'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
    { name: 'Overview', href: '/', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { name: 'Dashboards', href: '/dashboards', icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { name: 'API Playground', href: '/playground', icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg flex flex-col h-full">
            {/* Sidebar header */}
            <div className="px-6 py-4 border-b border-gray-200">
                <h1 className="text-xl font-bold text-gray-900">Watafact Admin</h1>
            </div>

            {/* Sidebar content */}
            <div className="flex-grow overflow-y-auto px-6">
                <nav className="mt-5 space-y-1">
                    {menuItems.map((item) => (
                        <Link 
                            key={item.name}
                            href={item.href} 
                            className="group flex items-center py-2 text-base leading-6 font-medium text-gray-900 rounded-md hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150"
                        >
                            <svg className="mr-4 h-6 w-6 text-gray-500 group-hover:text-gray-500 group-focus:text-gray-600 transition ease-in-out duration-150" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                            </svg>
                            {item.name}
                        </Link>
                    ))}
                </nav>
            </div>
            
            {/* Simplified user profile section */}
            <div className="p-6 border-t border-gray-200">
                <div className="flex items-center">
                    <div>
                        <p className="font-semibold">Sebastian Hozák</p>
                        <button className="text-sm text-gray-600 hover:text-gray-800">
                            <svg className="h-4 w-4 inline mr-1" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M12 4v16m8-8H4"></path>
                            </svg>
                            Add Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
