import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabaseClient';

export async function POST(request) {
    const { githubUrl } = await request.json();
    const apiKey = request.headers.get('x-api-key');

    if (!apiKey) {
        return NextResponse.json({ error: 'API key is required' }, { status: 401 });
    }

    // Validate API key
    try {
        const { data, error } = await supabase
            .from('api_keys')
            .select('id')
            .eq('key', apiKey)
            .single();

        if (error) {
            console.error('Error querying Supabase:', error);
            return NextResponse.json({ error: 'Error validating API key' }, { status: 500 });
        }

        if (!data) {
            return NextResponse.json({ error: 'Invalid API key' }, { status: 401 });
        }

        const readmeContent = await getReadmeContent(githubUrl);
        console.log(readmeContent);

        // Update the response to indicate that summarization is implemented
        return NextResponse.json({ 
            message: 'GitHub README content retrieved successfully',
            content: readmeContent
        }, { status: 200 });

    } catch (error) {
        console.error('Unexpected error:', error);
        return NextResponse.json({ error: 'Server error occurred' }, { status: 500 });
    }
}

async function getReadmeContent(githubUrl) {
    const urlParts = githubUrl.split('/');
    const owner = urlParts[3];
    const repo = urlParts[4];
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/readme`;

    try {
        const response = await fetch(apiUrl, {
            headers: {
                'Accept': 'application/vnd.github.v3.raw'
            }
        });

        if (!response.ok) {
            throw new Error(`GitHub API responded with status ${response.status}`);
        }

        const readmeContent = await response.text();
        return readmeContent;
    } catch (error) {
        console.error('Error fetching README:', error);
        throw error;
    }
}
