import { useState, useEffect } from 'react';
import { fetchApiKeys, createApiKey, updateApiKey, deleteApiKey } from '../../lib/apiKeyOperations';

export function useApiKeys() {
    const [apiKeys, setApiKeys] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAndSetApiKeys = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const keys = await fetchApiKeys();
            setApiKeys(keys);
        } catch (err) {
            console.error('Error fetching API keys:', err);
            setError('Failed to fetch API keys');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAndSetApiKeys();
    }, []);

    const createKey = async (name, limit) => {
        try {
            const newKey = await createApiKey(name, limit);
            setApiKeys([...apiKeys, newKey]);
            return newKey;
        } catch (error) {
            console.error('Error creating API key:', error);
            throw error;
        }
    };

    const updateKey = async (id, name, limit) => {
        try {
            const updatedKey = await updateApiKey(id, name, limit);
            setApiKeys(apiKeys.map(key => key.id === id ? updatedKey : key));
            return updatedKey;
        } catch (error) {
            console.error('Error updating API key:', error);
            throw error;
        }
    };

    const deleteKey = async (id) => {
        try {
            await deleteApiKey(id);
            setApiKeys(apiKeys.filter(key => key.id !== id));
        } catch (error) {
            console.error('Error deleting API key:', error);
            throw error;
        }
    };

    return { apiKeys, isLoading, error, createKey, updateKey, deleteKey, fetchAndSetApiKeys };
}
