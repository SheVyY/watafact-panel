import React from 'react';

export default function ProtectedPage() {
    return (
        <div className="container mx-auto mt-10 p-4">
            <h1 className="text-3xl text-center font-bold mb-6">Protected Page</h1>
            <div className="bg-gray-100 text-center p-6 rounded-lg">
                <p className="mb-4">
                    You have successfully validated your API key.</p>
            </div>
        </div>
    );
}
