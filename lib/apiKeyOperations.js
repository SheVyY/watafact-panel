import { supabase } from './supabaseClient';

export const fetchApiKeys = async () => {
    try {
        console.log('Fetching API keys...');
        const { data, error } = await supabase
            .from('api_keys')
            .select('*');

        if (error) throw error;
        console.log('Fetched API keys:', data);
        return data || []; // Ensure we always return an array
    } catch (error) {
        console.error('Error in fetchApiKeys:', error);
        throw error;
    }
};

export const createApiKey = async (name) => {
    try {
        console.log('Creating new API key:', name);
        const newKey = `tvly-${Math.random().toString(36).substr(2, 32)}`;
        const { data, error } = await supabase
            .from('api_keys')
            .insert([{ name, key: newKey }])
            .select();

        if (error) throw error;
        console.log('Created API key:', data[0]);
        return data[0];
    } catch (error) {
        console.error('Error creating API key:', error);
        throw error;
    }
};

export const updateApiKey = async (id, name) => {
    try {
        console.log('Updating API key:', id, name);
        const { data, error } = await supabase
            .from('api_keys')
            .update({ name })
            .eq('id', id)
            .select();

        if (error) throw error;
        console.log('Updated API key:', data[0]);
        return data[0];
    } catch (error) {
        console.error('Error updating API key:', error);
        throw error;
    }
};

export const deleteApiKey = async (id) => {
    const { error } = await supabase
        .from('api_keys')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting API key:', error);
        throw error;
    }
};
