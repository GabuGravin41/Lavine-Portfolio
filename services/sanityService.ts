
import { sanityClient } from './sanityClient';
import type { BlogPost, Service, CaseStudy } from '../types';

// GROQ query to fetch all blog posts, ordered by creation date
// Assumes a Sanity schema of type 'blogPost' with fields: title, mainImage, excerpt, content
const postsQuery = `*[_type == "blogPost"] | order(_createdAt desc) {
  _id,
  title,
  "img": mainImage.asset->url,
  excerpt,
  content
}`;

// GROQ query to fetch all services, ordered by a custom 'order' field
// Assumes a Sanity schema of type 'service' with a numeric 'order' field
const servicesQuery = `*[_type == "service"] | order(order asc) {
  _id,
  title,
  description,
  tasks,
  tools,
  skills
}`;

// GROQ query to fetch all case studies, ordered by a custom 'order' field
// Assumes a Sanity schema of type 'caseStudy' with a numeric 'order' field
const caseStudiesQuery = `*[_type == "caseStudy"] | order(order asc) {
  _id,
  title,
  description,
  outcome,
  services,
  tools
}`;


export const fetchBlogPosts = (): Promise<BlogPost[]> => {
    return sanityClient.fetch(postsQuery);
};

export const fetchServices = (): Promise<Service[]> => {
    return sanityClient.fetch(servicesQuery);
};

export const fetchCaseStudies = (): Promise<CaseStudy[]> => {
    return sanityClient.fetch(caseStudiesQuery);
};
