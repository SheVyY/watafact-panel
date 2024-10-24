'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Notification from '../components/Notification';

export default function ApiPlaygroundPage() {
    const [apiKey, setApiKey] = useState('');
    const [notification, setNotification] = useState(null);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setNotification(null); // Clear any existing notification
        try {
            const response = await fetch('/api/validate-key', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ apiKey }),
            });

            const result = await response.json();

            if (response.ok) {
                if (result.valid) {
                    setNotification({ type: 'success', message: 'Valid API key' });
                    setTimeout(() => router.push('/protected'), 2000);
                } else {
                    setNotification({ type: 'error', message: result.message });
                }
            } else {
                throw new Error('Error validating API key');
            }
        } catch (error) {
            console.error('Error validating API key:', error);
            setNotification({ type: 'error', message: 'An unexpected error occurred' });
        }
    };

    return (
        <div className="container mx-auto mt-10 p-4 bg-gray-100 rounded-lg shadow-md">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold mb-2 text-indigo-600">API Playground</h1>
                <p className="text-gray-600">Welcome to your API testing environment</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm max-w-md mx-auto">
                <div className="mb-4">
                    <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-2">
                        Enter your API Key
                    </label>
                    <input
                        type="text"
                        id="apiKey"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                        placeholder="Your API Key"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                >
                    Validate Key
                </button>
            </form>

            {notification && (
                <Notification
                    type={notification.type}
                    message={notification.message}
                    onClose={() => setNotification(null)}
                />
            )}
        </div>
    );
}
