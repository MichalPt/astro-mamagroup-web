import { Handler } from '@netlify/functions';
import bcrypt from 'bcryptjs';

export const handler: Handler = async (event, context) => {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, OPTIONS'
            },
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    // Handle CORS preflight
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, OPTIONS'
            },
            body: ''
        };
    }

    try {
        if (!event.body) {
            return {
                statusCode: 400,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({ success: false, error: 'No request body' })
            };
        }

        const { password } = JSON.parse(event.body);
        
        const storedHash = process.env.REBUILD_PASSWORD_HASH?.replace('$', '\\$');
        const hiddenUrl = process.env.NETLIFY_BUILD_HOOK;

        if (!storedHash || !hiddenUrl) {
            console.log('Missing configuration - storedHash:', !!storedHash, 'hiddenUrl:', !!hiddenUrl);
            return {
                statusCode: 500,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({ success: false, error: 'Configuration error' })
            };
        }
        
        const isValid = bcrypt.compareSync(password, storedHash.trim());
        console.log('Password verification result:', isValid);
        
        if (isValid) {
            console.log('Authentication successful!');
            return {
                statusCode: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({ 
                    success: true, 
                    url: hiddenUrl 
                })
            };
        } else {
            console.log('Authentication failed - password mismatch');
            return {
                statusCode: 401,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({ 
                    success: false, 
                    error: 'Invalid password' 
                })
            };
        }
    } catch (error) {
        console.error('Function Error:', error);
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ 
                success: false, 
                error: 'Server error' 
            })
        };
    }
};
