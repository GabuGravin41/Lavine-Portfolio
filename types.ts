
export interface Message {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export interface BlogPost {
    _id: string;
    title: string;
    img: string;
    excerpt: string;
    content: string;
}

export interface Service {
    _id: string;
    title: string;
    description: string;
    tasks: string[];
    tools: string[];
    skills: string[];
}

export interface CaseStudy {
    _id: string;
    title: string;
    description: string;
    outcome: string;
    services: string[];
    tools: string[];
}
