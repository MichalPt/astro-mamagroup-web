import type { Handler } from '@netlify/functions';

export const handler: Handler = async (event, context) => {
    // Handle CORS preflight
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'GET, OPTIONS'
            },
            body: ''
        };
    }

    // Only allow GET requests
    if (event.httpMethod !== 'GET') {
        return {
            statusCode: 405,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'GET, OPTIONS'
            },
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    const siteId = process.env.NETLIFY_SITE_ID;
    const accessToken = process.env.NETLIFY_ACCESS_TOKEN;
    
    console.log('=== BUILD STATUS FUNCTION DEBUG ===');
    console.log('Site ID:', siteId);
    console.log('Access Token exists:', !!accessToken);
    console.log('Access Token length:', accessToken?.length);
    console.log('====================================');
    
    if (!siteId || !accessToken) {
        console.log('Missing configuration - siteId:', !!siteId, 'accessToken:', !!accessToken);
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ 
                success: false, 
                error: 'Missing Netlify configuration' 
            })
        };
    }

    try {
        const response = await fetch(`https://api.netlify.com/api/v1/sites/${siteId}/builds`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        console.log('Netlify API response status:', response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.log('Netlify API error response:', errorText);
            throw new Error(`Netlify API error: ${response.status} - ${errorText}`);
        }

        const buildsData = await response.json();
        console.log('Builds data length:', buildsData?.length);
        console.log('First build:', buildsData[0]);
        
        if (!buildsData || buildsData.length === 0) {
            throw new Error('No builds found');
        }
        
        const lastBuild = buildsData[0];

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                success: true,
                done: lastBuild.done,
                status: lastBuild.deploy_state || 'initializing',
                created_at: lastBuild.created_at
            })
        };

    } catch (error) {
        console.error('Build status check error:', error);
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                success: false,
                error: 'Failed to fetch build status'
            })
        };
    }
};
