import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  // This is the unique ID for your Sanity project.
  projectId: 'ngkken67',
  dataset: 'production',
  useCdn: true, // `false` if you want to ensure fresh data
  apiVersion: '2024-07-01', // use a UTC date in YYYY-MM-DD format
});
