import React from 'react';

export default function Gradient({ plan, usedRequests, totalRequests }) {
    const percentUsed = (usedRequests / totalRequests) * 100;

    return (
        <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-blue-400 rounded-lg p-6 text-white mb-8">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <p className="text-sm font-semibold">CURRENT PLAN</p>
                    <h2 className="text-3xl font-bold">{plan}</h2>
                </div>
                <button className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-3 py-1 rounded text-sm">
                    Manage Plan
                </button>
            </div>
            <div>
                <p className="text-sm mb-2">API Limit</p>
                <div className="bg-white bg-opacity-20 rounded-full h-2 mb-2">
                    <div
                        className="bg-white rounded-full h-2"
                        style={{ width: `${percentUsed}%` }}
                    ></div>
                </div>
                <p className="text-sm">{usedRequests}/{totalRequests} Requests</p>
            </div>
        </div>
    );
}
