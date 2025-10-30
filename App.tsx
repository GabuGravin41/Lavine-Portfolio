
import React, { useState, useEffect, FormEvent } from 'react';
import Chatbot from './components/Chatbot';
import { MailIcon, CalendarIcon, CreditCardIcon, BookOpenIcon, CheckCircleIcon } from './components/IconComponents';
import { fetchBlogPosts, fetchServices, fetchCaseStudies } from './services/sanityService';
import type { BlogPost, Service, CaseStudy } from './types';

// Types
type Page = 'home' | 'blog' | 'blog-post' | 'contact';

const Header: React.FC<{
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  handleNav: (page: Page, anchor?: string) => void;
}> = ({ isMenuOpen, setIsMenuOpen, handleNav }) => {
  
  const navLinks = [
    { label: 'About', page: 'home', anchor: '#about' },
    { label: 'Services', page: 'home', anchor: '#services' },
    { label: 'Portfolio', page: 'home', anchor: '#portfolio'},
    { label: 'Blog', page: 'blog' },
    { label: 'Contact', page: 'contact' },
  ];

  return (
    <header className="bg-white/80 backdrop-blur-md fixed top-0 left-0 right-0 z-30 shadow-sm border-b border-slate-200/80">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#" onClick={(e) => {e.preventDefault(); handleNav('home')}} className="text-2xl font-bold text-slate-800">Lavine K.</a>
        <nav className="hidden md:flex space-x-8">
          {navLinks.map(link => (
            <a key={link.label} href={link.anchor || '#'} onClick={(e) => { e.preventDefault(); handleNav(link.page as Page, link.anchor); }} className="cursor-pointer text-slate-600 hover:text-indigo-600 transition-colors">{link.label}</a>
          ))}
        </nav>
        <a href="#" onClick={(e) => { e.preventDefault(); handleNav('contact'); }} className="hidden md:inline-block bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors">Book a Call</a>
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md py-4">
          {navLinks.map(link => (
            <a key={link.label} href={link.anchor || '#'} onClick={(e) => { e.preventDefault(); handleNav(link.page as Page, link.anchor); setIsMenuOpen(false); }} className="block text-center py-2 text-slate-600 hover:text-indigo-600 hover:bg-slate-50">{link.label}</a>
          ))}
          <div className="text-center mt-2">
            <a href="#" onClick={(e) => { e.preventDefault(); handleNav('contact'); setIsMenuOpen(false); }} className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-md">Book a Call</a>
          </div>
        </div>
      )}
    </header>
  );
};

const Hero: React.FC<{ handleNav: (page: Page, anchor?: string) => void }> = ({ handleNav }) => (
    <section className="pt-28 md:pt-36 pb-20">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&h=300&auto=format&fit=crop&ixlib=rb-4.0.3" alt="Lavine" className="w-40 h-40 object-cover rounded-full mx-auto mb-6 shadow-lg border-4 border-white" />
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight">Bridging Healthcare & Data Science</h1>
          <p className="mt-6 text-lg md:text-xl text-slate-600">
            Leveraging data to revolutionize patient care and public health outcomes.
            Welcome to a new frontier of innovation where compassion meets computation.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <a href="#services" onClick={(e) => { e.preventDefault(); handleNav('home', '#services'); }} className="cursor-pointer bg-indigo-600 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-indigo-700 transition-colors shadow-sm">Explore Services</a>
            <a href="#portfolio" onClick={(e) => { e.preventDefault(); handleNav('home', '#portfolio'); }} className="cursor-pointer bg-white border border-slate-300 text-slate-700 px-8 py-3 rounded-md text-lg font-semibold hover:bg-slate-100 transition-colors shadow-sm">View Portfolio</a>
          </div>
        </div>
      </div>
    </section>
  );

const About: React.FC = () => (
    <section id="about" className="py-20">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">My Journey</h2>
            <p className="text-slate-600 mb-4">
              I began my career with a deep-seated passion for patient care, earning a <span className="font-semibold text-slate-700">Bachelor of Science in Nursing</span> from Kenyatta University. On the front lines of healthcare, I saw firsthand the potential for data to transform lives.
            </p>
            <p className="text-slate-600">
              This realization led me to pursue a certificate in <span className="font-semibold text-slate-700">Data Science from ALX</span>, where I honed my skills in analytics, machine learning, and visualization. Today, I stand at the unique intersection of these two dynamic fields, dedicated to creating intelligent, empathetic solutions for the world's most pressing health challenges.
            </p>
          </div>
          <div className="order-1 md:order-2">
            <img src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=800&h=600&auto=format&fit=crop&ixlib=rb-4.0.3" alt="Professional workspace" className="rounded-lg shadow-xl" />
          </div>
        </div>
      </div>
    </section>
  );

const Services: React.FC<{services: Service[]}> = ({ services }) => (
    <section id="services" className="py-20 md:py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Services I Offer</h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Comprehensive solutions tailored to the unique needs of healthcare and business professionals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service) => (
            <div key={service._id} className="p-6 hover:shadow-lg transition border border-slate-200/80 rounded-lg bg-white">
              <h3 className="text-xl font-bold mb-2 text-indigo-700">{service.title}</h3>
              <p className="text-slate-500 mb-4">{service.description}</p>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-slate-700 mb-2">Key Tasks:</p>
                  <ul className="space-y-1">
                    {service.tasks.map((task, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                        <CheckCircleIcon className="h-4 w-4 text-indigo-500 mt-0.5 flex-shrink-0" />
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-700 mb-2">Tools:</p>
                  <div className="flex flex-wrap gap-2">
                    {service.tools.map((tool, i) => (
                      <span key={i} className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-full">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-700 mb-2">Key Skills:</p>
                  <div className="flex flex-wrap gap-2">
                    {service.skills.map((skill, i) => (
                      <span key={i} className="text-xs bg-violet-100 text-violet-800 px-2 py-1 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
);

const Portfolio: React.FC<{caseStudies: CaseStudy[]}> = ({ caseStudies }) => (
    <section id="portfolio" className="py-20 md:py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Portfolio & Case Studies</h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Real results from real clients across healthcare and executive sectors.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {caseStudies.map((study) => (
            <div key={study._id} className="p-6 border border-slate-200/80 rounded-lg hover:shadow-lg transition bg-white">
              <h3 className="text-xl font-bold mb-2 text-indigo-700">{study.title}</h3>
              <p className="text-slate-500 mb-4">{study.description}</p>

              <div className="space-y-4">
                <div className="bg-violet-50 border border-violet-200/50 rounded p-3">
                  <p className="text-sm font-semibold text-violet-800 mb-1">Outcome:</p>
                  <p className="text-sm text-slate-700">{study.outcome}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {study.services.map((service, i) => (
                    <span key={i} className="text-xs font-medium bg-violet-100 text-violet-800 px-2.5 py-1 rounded-full">
                      {service}
                    </span>
                  ))}
                </div>

                <div>
                  <p className="text-xs font-semibold text-slate-500 mb-2">Tools Used:</p>
                  <div className="flex flex-wrap gap-1">
                    {study.tools.map((tool, i) => (
                      <span key={i} className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-full">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
);

const ContactCTA: React.FC<{ handleNav: (page: Page) => void }> = ({ handleNav }) => (
    <section id="contact" className="py-20 bg-indigo-700 text-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-4">Let's Collaborate</h2>
        <p className="max-w-2xl mx-auto text-lg text-indigo-200 mb-10">
            Have a project in mind or just want to connect? I'd love to hear from you. Reach out, and let's create something amazing together.
        </p>
        <a href="#" onClick={(e) => { e.preventDefault(); handleNav('contact'); }} className="bg-white text-indigo-700 px-8 py-3 rounded-md text-lg font-semibold hover:shadow-xl transition-shadow transform hover:scale-105 shadow-md hover:bg-slate-50">Get In Touch</a>
      </div>
    </section>
  );

const Footer: React.FC = () => (
    <footer className="bg-indigo-900 text-indigo-200 py-6">
        <div className="container mx-auto px-6 text-center">
            <p>&copy; {new Date().getFullYear()} Lavine K. All Rights Reserved.</p>
        </div>
    </footer>
  );
  
const BlogPage: React.FC<{ blogPosts: BlogPost[]; handleNav: (page: Page) => void; handleSelectPost: (post: BlogPost) => void; }> = ({ blogPosts, handleNav, handleSelectPost }) => (
    <section className="pt-28 md:pt-36 pb-16 bg-white">
        <div className="container mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-slate-800">The Digital Scribe</h1>
                <p className="mt-4 text-slate-600">A collection of articles and insights at the intersection of healthcare and data science.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post) => (
                    <div key={post._id} className="bg-white rounded-lg shadow-md overflow-hidden group border border-slate-200 flex flex-col">
                        <img src={post.img} alt={post.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                        <div className="p-6 flex flex-col flex-grow">
                            <h3 className="text-lg font-bold text-slate-900 mb-2">{post.title}</h3>
                            <p className="text-slate-600 text-sm mb-4 flex-grow">{post.excerpt}</p>
                            <a href="#" onClick={(e) => { e.preventDefault(); handleSelectPost(post); }} className="text-indigo-600 font-semibold hover:underline mt-auto">Read More &rarr;</a>
                        </div>
                    </div>
                ))}
            </div>
             <div className="text-center mt-12">
                <a href="#" onClick={(e) => { e.preventDefault(); handleNav('home'); }} className="bg-white border border-slate-300 text-slate-700 px-8 py-3 rounded-md text-lg font-semibold hover:bg-slate-100 transition-colors shadow-sm">&larr; Back to Home</a>
            </div>
        </div>
    </section>
);

const BlogPostPage: React.FC<{ post: BlogPost; handleNav: (page: Page) => void }> = ({ post, handleNav }) => (
    <section className="pt-28 md:pt-36 pb-16 bg-white">
        <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto">
                <div className="mb-8">
                    <a href="#" onClick={(e) => { e.preventDefault(); handleNav('blog'); }} className="text-indigo-600 font-semibold hover:underline flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Back to Blog
                    </a>
                </div>
                <img src={post.img} alt={post.title} className="w-full h-auto md:h-96 object-cover rounded-lg shadow-lg mb-8" />
                <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">{post.title}</h1>
                <div className="text-slate-700 text-lg leading-relaxed space-y-6 whitespace-pre-wrap">
                    {post.content}
                </div>
                 <div className="text-center mt-12 pt-8 border-t border-slate-200">
                    <a href="#" onClick={(e) => { e.preventDefault(); handleNav('contact'); }} className="bg-indigo-600 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-indigo-700 transition-colors shadow-sm">Contact Me to Learn More</a>
                </div>
            </div>
        </div>
    </section>
);

const ContactPage: React.FC<{ handleNav: (page: Page) => void }> = ({ handleNav }) => {
    
    const [status, setStatus] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setStatus('Thank you for your message! I will get back to you shortly.');
        const form = e.target as HTMLFormElement;
        form.reset();
    };

    return (
        <section className="pt-28 md:pt-36 pb-16 bg-slate-50">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-800">Get In Touch</h1>
                    <p className="mt-4 text-slate-600">Whether you have a question, a project proposal, or just want to say hello, I'd love to hear from you.</p>
                </div>

                <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 bg-white rounded-lg p-8 shadow-lg border border-slate-200">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Contact Form</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-slate-700 font-semibold mb-2">Full Name</label>
                                <input type="text" id="name" name="name" required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-slate-700 font-semibold mb-2">Email Address</label>
                                <input type="email" id="email" name="email" required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="message" className="block text-slate-700 font-semibold mb-2">Message</label>
                                <textarea id="message" name="message" rows={5} required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"></textarea>
                            </div>
                            <button type="submit" className="w-full bg-indigo-600 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-indigo-700 transition-colors shadow-sm">Send Message</button>
                            {status && <p className="mt-4 text-center text-indigo-800 bg-indigo-100 p-3 rounded-md">{status}</p>}
                        </form>
                    </div>
                    <div className="flex flex-col justify-center">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">Other Ways to Connect</h2>
                        <div className="space-y-4">
                             <a href="mailto:lavine@example.com" className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 font-bold py-3 px-6 rounded-lg flex items-center gap-4 transition-colors w-full">
                                <MailIcon className="h-6 w-6" />
                                <span>Email Me</span>
                            </a>
                            <a href="https://calendly.com/your-username" target="_blank" rel="noopener noreferrer" className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 font-bold py-3 px-6 rounded-lg flex items-center gap-4 transition-colors w-full">
                                <CalendarIcon className="h-6 w-6" />
                                <span>Book a Consultation</span>
                            </a>
                            <a href="https://stripe.com" target="_blank" rel="noopener noreferrer" className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 font-bold py-3 px-6 rounded-lg flex items-center gap-4 transition-colors w-full">
                                <CreditCardIcon className="h-6 w-6" />
                                <span>Payment Portal</span>
                            </a>
                        </div>
                    </div>
                </div>
                 <div className="text-center mt-12">
                    <a href="#" onClick={(e) => { e.preventDefault(); handleNav('home'); }} className="bg-white border border-slate-300 text-slate-700 px-8 py-3 rounded-md text-lg font-semibold hover:bg-slate-100 transition-colors shadow-sm">&larr; Back to Home</a>
                </div>
            </div>
        </section>
    );
};


const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
        try {
            const [postsData, servicesData, caseStudiesData] = await Promise.all([
                fetchBlogPosts(),
                fetchServices(),
                fetchCaseStudies()
            ]);
            setBlogPosts(postsData);
            setServices(servicesData);
            setCaseStudies(caseStudiesData);
        } catch (err) {
            console.error("Failed to fetch data from Sanity:", err);
            console.log(
              `CORS ERROR HINT: Your app's origin is "${window.location.origin}". Make sure this is added to your Sanity project's CORS origins list at https://manage.sanity.io/projects/ngkken67/api`
            );
            setError("Failed to load content. Please check the connection and Sanity project ID. (Check browser console for hints)");
        } finally {
            setIsLoading(false);
        }
    };
    fetchData();
  }, []);

  const handleNav = (page: Page, anchor?: string) => {
    setIsMenuOpen(false);
    
    if (page === 'home' && anchor) {
        if (currentPage !== 'home') {
            setCurrentPage('home');
            setTimeout(() => {
                document.querySelector(anchor)?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } else {
             document.querySelector(anchor)?.scrollIntoView({ behavior: 'smooth' });
        }
    } else {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    }
  };
  
  const handleSelectPost = (post: BlogPost) => {
    setSelectedPost(post);
    setCurrentPage('blog-post');
    window.scrollTo(0, 0);
  };

  const renderContent = () => {
    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-center p-8 bg-red-50 border border-red-200 rounded-lg">
                    <h2 className="text-2xl font-semibold text-red-700">Error</h2>
                    <p className="text-red-600">{error}</p>
                </div>
            </div>
        )
    }

    switch (currentPage) {
        case 'blog':
            return <BlogPage blogPosts={blogPosts} handleNav={handleNav} handleSelectPost={handleSelectPost} />;
        case 'blog-post':
            if (!selectedPost) {
                return <BlogPage blogPosts={blogPosts} handleNav={handleNav} handleSelectPost={handleSelectPost} />;
            }
            return <BlogPostPage post={selectedPost} handleNav={handleNav} />;
        case 'contact':
            return <ContactPage handleNav={handleNav} />;
        case 'home':
        default:
            return (
                <>
                    <Hero handleNav={handleNav} />
                    <About />
                    <Services services={services} />
                    <Portfolio caseStudies={caseStudies} />
                    <ContactCTA handleNav={handleNav} />
                </>
            );
    }
  };
  
  if (isLoading) {
    return (
        <div className="flex justify-center items-center h-screen bg-slate-50">
            <div className="text-center">
                <h2 className="text-2xl font-semibold text-slate-700 animate-pulse">Loading Content...</h2>
                <p className="text-slate-500">Connecting to the Content Management System.</p>
            </div>
        </div>
    );
  }

  return (
    <div className={`text-slate-700 font-sans ${currentPage === 'home' ? 'bg-gradient-to-b from-violet-100 via-pink-100 to-slate-50' : 'bg-slate-50'}`}>
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} handleNav={handleNav} />
      <main>
        {renderContent()}
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default App;
