import type { BlogPost, Service, CaseStudy } from './types';

export const initialServices: Service[] = [
    {
        _id: 'service-1',
        title: 'Executive Administrative Support',
        description: 'Helping busy executives and healthcare professionals save time and stay organized.',
        tasks: [
            'Inbox & Email Triage',
            'Calendar Management & Scheduling',
            'Meeting Coordination & Minutes',
            'Travel Planning & Logistics',
            'Digital File & Document Organization',
        ],
        tools: ['Google Workspace', 'Microsoft 365', 'Calendly', 'Notion', 'Slack'],
        skills: ['Time Management', 'Organization', 'Communication', 'Proactive Support'],
    },
    {
        _id: 'service-2',
        title: 'Healthcare Operations & Documentation Support',
        description: 'Streamlining healthcare workflows, secure documentation, and telehealth admin so clinicians can focus on care.',
        tasks: [
            'Patient Record Organization (EHR/EMR)',
            'Clinical Transcription & Scribing',
            'Telehealth Coordination & Support',
            'Standard Operating Procedure (SOP) Creation',
            'HIPAA-Compliant Communication',
        ],
        tools: ['Notion', 'Otter.ai', 'Fireflies.ai', 'Doximity', 'EHR Systems'],
        skills: ['HIPAA Compliance', 'Medical Terminology', 'Workflow Optimization', 'Detail-Oriented'],
    },
    {
        _id: 'service-3',
        title: 'Project Management & Team Coordination',
        description: 'Keeping projects on time and teams aligned, especially for health startups and clinics.',
        tasks: [
            'Task & Milestone Planning',
            'Agile Meeting Facilitation',
            'Resource Tracking & Allocation',
            'Project Dashboard Creation & Reporting',
            'Cross-functional Team Communication',
        ],
        tools: ['Asana', 'Trello', 'ClickUp', 'Jira', 'Slack'],
        skills: ['Agile Methodologies', 'Team Leadership', 'Risk Management', 'Reporting & Analytics'],
    },
    {
        _id: 'service-4',
        title: 'Automation & Systems Integration (AI-Savvy Ops)',
        description: 'Reducing repetitive work and speeding up processes with automations and simple AI workflows.',
        tasks: [
            'Automated Reminders & Email Sequences',
            'AI-Assisted Content Creation & Research',
            'Workflow Automation Design',
            'Connecting Apps to Reduce Manual Entry',
            'Creating Simple Process-bots',
        ],
        tools: ['Zapier', 'Make (Integromat)', 'Notion AI', 'ChatGPT', 'Airtable'],
        skills: ['Process Automation', 'Workflow Design', 'API Integration', 'Problem Solving'],
    },
];

export const initialCaseStudies: CaseStudy[] = [
    {
        _id: 'case-1',
        title: "Streamlining a Clinic's Onboarding Process",
        description: 'A busy private practice was struggling with inconsistent and time-consuming new patient onboarding, leading to administrative errors and delays in care.',
        outcome: 'Developed and implemented an automated onboarding workflow using Notion and Zapier, reducing administrative time by 60% and eliminating data entry errors. Patient satisfaction scores for the onboarding experience increased by 25%.',
        services: ['Healthcare Operations Support', 'Automation & Systems Integration'],
        tools: ['Notion', 'Zapier', 'Google Forms', 'Acuity Scheduling'],
    },
    {
        _id: 'case-2',
        title: 'Executive Support for a Health Tech CEO',
        description: 'The CEO of a fast-growing health tech startup was overwhelmed with calendar conflicts, a disorganized inbox, and inefficient meeting structures, hindering strategic focus.',
        outcome: "Implemented a streamlined executive support system, saving the CEO 10+ hours per week. Introduced a 'Focus Day' protocol, reducing meeting fragmentation and boosting productivity.",
        services: ['Executive Administrative Support', 'Project Management'],
        tools: ['Google Workspace', 'Calendly', 'Asana', 'Slack'],
    },
];

export const initialBlogPosts: BlogPost[] = [
    {
        _id: 'blog-1',
        title: '5 Ways AI is Revolutionizing Nursing Documentation',
        img: 'https://images.unsplash.com/photo-1584515933487-779824d27929?q=80&w=800&auto=format&fit=crop',
        excerpt: "From ambient scribing to predictive charting, AI tools are poised to drastically reduce the administrative burden on nurses. Here's what you need to know about the future of healthcare documentation.",
        content: `The administrative burden of documentation is a major source of burnout for nurses. Hours are spent charting, often taking time away from direct patient care. However, a new wave of AI-powered tools is set to change the game.

1.  **Ambient Scribing**: Imagine a world where conversations with patients are automatically and securely transcribed into structured clinical notes. Tools like Abridge and Nuance DAX are making this a reality, allowing nurses to focus on the patient, not the computer screen.

2.  **Predictive Charting**: AI can analyze a patient's data to suggest likely assessments and interventions, pre-populating parts of the chart. This not only saves time but can also act as a clinical decision support tool, highlighting potential risks or care gaps.

3.  **Voice-to-Text Dictation**: While not new, modern AI has made voice recognition incredibly accurate. Nurses can dictate notes on the go, making documentation more efficient, especially in busy environments like the ER or ICU.

4.  **Automated Summarization**: AI algorithms can read through lengthy patient histories and generate concise summaries. This is invaluable during handoffs or when a clinician needs to quickly get up to speed on a complex case.

5.  **Quality Assurance**: AI can scan notes for completeness, consistency, and compliance with hospital protocols. This helps reduce errors and ensures that documentation meets regulatory standards.

The integration of these tools promises to give nurses back their most valuable resource: time. By automating the mundane, we can empower nurses to practice at the top of their license and focus on what they do best—caring for patients.`,
    },
    {
        _id: 'blog-2',
        title: 'The Virtual Assistant Advantage for Healthcare Leaders',
        img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop',
        excerpt: 'Busy clinicians and healthcare execs are drowning in admin. Discover how a specialized virtual assistant can reclaim your time and sharpen your focus on what matters most.',
        content: `In the high-stakes world of healthcare, the time of clinical leaders and executives is incredibly valuable. Yet, too much of it is consumed by administrative tasks: managing chaotic inboxes, scheduling back-to-back meetings, and preparing presentations. This is where a specialized Virtual Assistant (VA) becomes a strategic advantage.

A healthcare-savvy VA understands the unique demands of the industry, including the importance of HIPAA compliance and the nuances of clinical terminology. They aren't just administrative support; they are operational partners.

Here's how they can help:

*   **Gatekeeping & Prioritization**: A VA can triage your inbox, handling routine inquiries and flagging urgent matters, ensuring you focus on high-priority issues.
*   **Intelligent Scheduling**: They can manage complex calendars, coordinating with multiple stakeholders across different time zones, and proactively schedule prep time before important meetings.
*   **Research & Preparation**: Need a summary of the latest research on a specific topic or a deck prepared for a board meeting? A VA can gather information and create professional, polished documents.
*   **Streamlining Operations**: They can manage projects, track action items from meetings, and even set up simple automations to handle repetitive tasks.

By delegating these responsibilities, healthcare leaders can reclaim their time to focus on strategy, patient outcomes, and team leadership—the work that truly moves the needle.`,
    },
];
