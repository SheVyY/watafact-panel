import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabaseClient';

export async function POST(request) {
    const { apiKey } = await request.json();

    try {
        // Query the database for the API key
        const { data, error } = await supabase
            .from('api_keys')
            .select('id')
            .eq('key', apiKey)
            .single();

        if (error) {
            console.error('Error querying Supabase:', error);
            return NextResponse.json({ valid: false, message: 'Error validating API key' }, { status: 500 });
        }

        if (data) {
            return NextResponse.json({ valid: true, message: 'Valid API key' }, { status: 200 });
        } else {
            return NextResponse.json({ valid: false, message: 'Invalid API key' }, { status: 401 });
        }
    } catch (error) {
        console.error('Unexpected error:', error);
        return NextResponse.json({ valid: false, message: 'Server error occurred' }, { status: 500 });
    }
}
