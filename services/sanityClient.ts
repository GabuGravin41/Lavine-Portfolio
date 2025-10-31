import { createClient } from '@sanity/client';

// Validate required environment variables
const requiredEnvVars = ['VITE_SANITY_PROJECT_ID', 'VITE_SANITY_DATASET'];
const missingVars = requiredEnvVars.filter(varName => !import.meta.env[varName]);

if (missingVars.length > 0) {
  console.warn(`Missing required environment variables: ${missingVars.join(', ')}`);
}

export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || '',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION || '2024-07-01',
  useCdn: import.meta.env.PROD, // Use CDN in production, real-time updates in development
  token: import.meta.env.VITE_SANITY_TOKEN, // Only needed for write operations
  ignoreBrowserTokenWarning: true, // Only needed if you're using token in the browser
  withCredentials: true, // Required for CORS with credentials
});

// Test the connection
if (import.meta.env.DEV) {
  sanityClient.fetch('*[_type == "sanity.imageAsset"][0]')
    .then(() => console.log('Successfully connected to Sanity'))
    .catch(error => console.error('Error connecting to Sanity:', error.message));
}
