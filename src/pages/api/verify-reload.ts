import type { APIRoute } from 'astro';
import bcrypt from 'bcryptjs';

export const prerender = false; // Disable prerendering for this API route

export const POST: APIRoute = async ({ request }) => {
    try {
        const { password } = await request.json();
        
        const storedHash = import.meta.env.REBUILD_PASSWORD_HASH.replace('$', '\$');
        const hiddenUrl = import.meta.env.NETLIFY_BUILD_HOOK;

        if (!storedHash || !hiddenUrl) {
            console.log('Missing configuration - storedHash:', !!storedHash, 'hiddenUrl:', !!hiddenUrl);
            return new Response(JSON.stringify({ success: false, error: 'Configuration error' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        
        const isValid = bcrypt.compareSync(password, storedHash.trim());
        console.log('Password verification result:', isValid);
        
        if (isValid) {
            console.log('Authentication successful!');
            return new Response(JSON.stringify({ 
                success: true, 
                url: hiddenUrl 
            }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        } else {
            console.log('Authentication failed - password mismatch');
            return new Response(JSON.stringify({ 
                success: false, 
                error: 'Invalid password' 
            }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' }
            });
        }
    } catch (error) {
        console.error('API Error:', error);
        return new Response(JSON.stringify({ 
            success: false, 
            error: 'Server error' 
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};