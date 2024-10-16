import React from 'react';

export default function ProtectedPage() {
    return (
        <div className="container mx-auto mt-10 p-4">
            <h1 className="text-3xl font-bold mb-6">Protected Page</h1>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Welcome to the Protected Area</h2>
                <p className="mb-4">This is a protected page that can only be accessed with a valid API key.</p>
                <ul className="list-disc list-inside mb-4">
                    <li>Sensitive information is safe here</li>
                    <li>Only authorized users can view this content</li>
                </ul>
            </div>
        </div>
    );
}
