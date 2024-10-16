import React, { useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function Notification({ onClose, type = 'success', message }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 5000); // 5 seconds auto-close

        return () => clearTimeout(timer);
    }, [onClose]);

    const bgColor = type === 'error' ? 'bg-red-500' : 'bg-green-500';

    return (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
            <div className={`${bgColor} text-white px-4 py-2 rounded-md shadow-lg flex items-center`}>
                {type === 'success' ? (
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                ) : (
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                )}
                <span className="flex-grow">{message}</span>
                <button
                    onClick={onClose}
                    className="ml-2 text-white hover:text-gray-200 focus:outline-none"
                >
                    <XMarkIcon className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}
