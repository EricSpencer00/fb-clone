/**
 * Cloudflare Pages Function to proxy API requests to the backend Worker
 * This function handles all /api/* requests and forwards them to the backend
 */

export const onRequest = async (context: any) => {
  const url = new URL(context.request.url);
  const pathParts = context.params.path || [];
  const path = Array.isArray(pathParts) ? pathParts.join('/') : '';
  
  // Handle CORS preflight requests
  if (context.request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
        'Access-Control-Max-Age': '86400',
      },
    });
  }
  
  // Construct the backend URL - keep the full path including /api
  const backendPath = path ? `/api/${path}` : '/api';
  const backendUrl = new URL(`https://gracenook.thebiggydg2019.workers.dev${backendPath}`);
  
  // Copy query parameters
  backendUrl.search = url.search;
  
  // Create a new request to the backend with the same method, headers, and body
  const backendRequest = new Request(backendUrl.toString(), {
    method: context.request.method,
    headers: context.request.headers,
    body: context.request.method !== 'GET' && context.request.method !== 'HEAD' 
      ? context.request.body 
      : undefined,
  });
  
  try {
    const response = await fetch(backendRequest);
    
    // Clone the response to modify headers if needed
    const newResponse = new Response(response.body, response);
    
    // Add CORS headers to allow frontend to access the response
    newResponse.headers.set('Access-Control-Allow-Origin', '*');
    newResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    newResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    
    return newResponse;
  } catch (error) {
    console.error('API proxy error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to connect to backend' }),
      {
        status: 502,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
};
