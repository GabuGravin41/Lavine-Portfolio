
import { sanityClient } from './sanityClient';
import type { BlogPost, Service, CaseStudy } from '../types';

// Type guards for runtime type checking
const isBlogPost = (post: any): post is BlogPost => 
  post && typeof post.title === 'string';

const isService = (service: any): service is Service =>
  service && typeof service.title === 'string';

const isCaseStudy = (caseStudy: any): caseStudy is CaseStudy =>
  caseStudy && typeof caseStudy.title === 'string';

// GROQ query to fetch all blog posts, ordered by creation date
const postsQuery = `*[_type == "blogPost"] | order(_createdAt desc) {
  _id,
  _createdAt,
  _updatedAt,
  title,
  "slug": slug.current,
  "mainImage": mainImage.asset->{
    url,
    "dimensions": metadata.dimensions,
    alt
  },
  excerpt,
  content,
  "author": author->{
    name,
    "image": image.asset->url
  }
}`;

// GROQ query to fetch all services, ordered by a custom 'order' field
const servicesQuery = `*[_type == "service"] | order(order asc) {
  _id,
  _createdAt,
  _updatedAt,
  title,
  description,
  "icon": icon.asset->url,
  tasks,
  tools,
  skills,
  order
}`;

// GROQ query to fetch all case studies, ordered by a custom 'order' field
const caseStudiesQuery = `*[_type == "caseStudy"] | order(order asc) {
  _id,
  _createdAt,
  _updatedAt,
  title,
  description,
  outcome,
  services,
  tools
}`;

/**
 * Fetches all blog posts from Sanity
 * @returns Promise with an array of BlogPost objects
 */
export const fetchBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const posts = await sanityClient.fetch<BlogPost[]>(postsQuery);
    if (!Array.isArray(posts)) {
      throw new Error('Invalid response format: Expected an array of blog posts');
    }
    return posts.filter(isBlogPost);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw new Error(`Failed to fetch blog posts: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

/**
 * Fetches all services from Sanity
 * @returns Promise with an array of Service objects
 */
export const fetchServices = async (): Promise<Service[]> => {
  try {
    const services = await sanityClient.fetch<Service[]>(servicesQuery);
    if (!Array.isArray(services)) {
      throw new Error('Invalid response format: Expected an array of services');
    }
    return services.filter(isService);
  } catch (error) {
    console.error('Error fetching services:', error);
    throw new Error(`Failed to fetch services: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

/**
 * Fetches all case studies from Sanity
 * @returns Promise with an array of CaseStudy objects
 */
export const fetchCaseStudies = async (): Promise<CaseStudy[]> => {
  try {
    const caseStudies = await sanityClient.fetch<CaseStudy[]>(caseStudiesQuery);
    if (!Array.isArray(caseStudies)) {
      throw new Error('Invalid response format: Expected an array of case studies');
    }
    return caseStudies.filter(isCaseStudy);
  } catch (error) {
    console.error('Error fetching case studies:', error);
    throw new Error(`Failed to fetch case studies: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};
