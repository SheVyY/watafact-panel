"use client";

import React, { useState, useEffect } from 'react';
import Notification from '../components/Notification';
import Gradient from '../components/Gradient';
import ApiKeysTable from '../components/ApiKeysTable';
import ApiKeyDialog from '../components/ApiKeyDialog';
import '../globals.css';
import { fetchApiKeys, createApiKey, updateApiKey, deleteApiKey } from '../../lib/apiKeyOperations';

export default function DashboardPage() {
    const [apiKeys, setApiKeys] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedKey, setSelectedKey] = useState(null);
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        loadApiKeys();
    }, []);

    const loadApiKeys = async () => {
        try {
            const keys = await fetchApiKeys();
            setApiKeys(keys);
        } catch (error) {
            console.error('Failed to load API keys:', error);
            showNotification('error', 'Failed to load API keys');
        }
    };

    const handleCreateKey = async (name, limit) => {
        try {
            const newKey = await createApiKey(name, limit);
            setApiKeys([...apiKeys, newKey]);
            setIsDialogOpen(false);
            showNotification('success', 'API key created successfully');
        } catch (error) {
            console.error('Failed to create API key:', error);
            showNotification('error', 'Failed to create API key');
        }
    };

    const handleUpdateKey = async (id, name, limit) => {
        try {
            const updatedKey = await updateApiKey(id, name, limit);
            setApiKeys(apiKeys.map(key => key.id === id ? updatedKey : key));
            setIsDialogOpen(false);
            setSelectedKey(null);
            showNotification('success', 'API key updated successfully');
        } catch (error) {
            console.error('Failed to update API key:', error);
            showNotification('error', 'Failed to update API key');
        }
    };

    const handleDeleteKey = async (id) => {
        try {
            await deleteApiKey(id);
            setApiKeys(apiKeys.filter(key => key.id !== id));
            showNotification('success', 'API key deleted successfully');
        } catch (error) {
            console.error('Failed to delete API key:', error);
            showNotification('error', 'Failed to delete API key');
        }
    };

    const showNotification = (type, message) => {
        setNotification({ type, message });
        setTimeout(() => setNotification(null), 3000);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
        setSelectedKey(null);
    };

    const openCreateDialog = () => {
        setIsDialogOpen(true);
        setSelectedKey(null);
    };

    const openUpdateDialog = (key) => {
        setIsDialogOpen(true);
        setSelectedKey(key);
    };

    return (
        <div className="container mx-auto mt-10 p-4">
            <Gradient plan="Free" usedRequests={50} totalRequests={100} />

            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-semibold mb-4">API Keys</h2>
                <button
                    onClick={openCreateDialog}
                    className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition duration-300 mb-4"
                >
                    Create New API Key
                </button>
                <ApiKeysTable
                    apiKeys={apiKeys}
                    onUpdateKey={openUpdateDialog}
                    onDeleteKey={handleDeleteKey}
                    onCopyKey={(key) => {
                        navigator.clipboard.writeText(key);
                        showNotification('success', 'API key copied to clipboard');
                    }}
                />
            </div>

            <ApiKeyDialog
                isOpen={isDialogOpen}
                onClose={closeDialog}
                onSubmit={selectedKey ? 
                    (name, limit) => handleUpdateKey(selectedKey.id, name, limit) : 
                    handleCreateKey}
                selectedKey={selectedKey}
            />

            {notification && (
                <Notification
                    type={notification.type}
                    message={notification.message}
                    onClose={() => setNotification(null)}
                />
            )}

            <div className="mt-8 text-center">
                <p className="text-gray-600">Have any questions, feedback or need support? We'd love to hear from you!</p>
                <button className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700">
                    Contact us
                </button>
            </div>
        </div>
    );
}
