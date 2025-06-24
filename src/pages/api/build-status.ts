import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
    const siteId = import.meta.env.NETLIFY_SITE_ID;
    const accessToken = import.meta.env.NETLIFY_ACCESS_TOKEN;
    
    console.log('=== BUILD STATUS API DEBUG ===');
    console.log('Site ID:', siteId);
    console.log('Access Token exists:', !!accessToken);
    console.log('Access Token length:', accessToken?.length);
    console.log('=============================');
    
    if (!siteId || !accessToken) {
        console.log('Missing configuration - siteId:', !!siteId, 'accessToken:', !!accessToken);
        return new Response(JSON.stringify({ 
            success: false, 
            error: 'Missing Netlify configuration' 
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
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

        return new Response(JSON.stringify({
            success: true,
            done: lastBuild.done,
            status: lastBuild.deploy_state || 'unknown',
            created_at: lastBuild.created_at
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Build status check error:', error);
        return new Response(JSON.stringify({
            success: false,
            error: 'Failed to fetch build status'
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
