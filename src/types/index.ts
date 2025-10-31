export interface BlogPost {
    _id: string;
    title: string;
    img: string;
    excerpt: string;
    content: string;
    _createdAt?: string;
    _updatedAt?: string;
    slug?: string;
    author?: {
        name: string;
        image: string;
    };
}

export interface Service {
    _id: string;
    title: string;
    description: string;
    tasks: string[];
    tools: string[];
    skills: string[];
    _createdAt?: string;
    _updatedAt?: string;
    order?: number;
    icon?: string;
}

export interface CaseStudy {
    _id: string;
    title: string;
    description: string;
    outcome: string;
    services: string[];
    tools: string[];
    _createdAt?: string;
    _updatedAt?: string;
    order?: number;
}
