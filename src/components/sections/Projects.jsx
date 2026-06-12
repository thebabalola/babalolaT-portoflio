import { useEffect, useRef, useState } from 'react';
import { Github, ExternalLink, ChevronDown, ChevronUp, Eye } from 'lucide-react';
import { 
  SiReact, SiNextdotjs, SiJavascript, SiTypescript, SiTailwindcss, 
  SiHtml5, SiCss3, SiVite, SiSolidity, SiEthereum,
  SiGithub, SiVercel, SiNodedotjs, SiMongodb, SiPostgresql,
  SiChartdotjs, SiD3Dotjs
} from 'react-icons/si';

const Projects = () => {
  const sectionRef = useRef(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Removed tilt effects as requested

  // Technology icon mapping
  const techIcons = {
    'React': SiReact,
    'Next.js': SiNextdotjs,
    'JavaScript': SiJavascript,
    'TypeScript': SiTypescript,
    'Tailwind CSS': SiTailwindcss,
    'HTML5': SiHtml5,
    'CSS3': SiCss3,
    'Vite': SiVite,
    'Solidity': SiSolidity,
    'Web3': SiEthereum,
    'Node.js': SiNodedotjs,
    'MongoDB': SiMongodb,
    'PostgreSQL': SiPostgresql,
    'Chart.js': SiChartdotjs,
    'D3.js': SiD3Dotjs,
    'OpenWeather API': SiReact, // Using React icon as fallback
  };

  const projects = [
    {
      title: 'StrataForge',
      description: 'A no-code platform for deploying ERC20, ERC721, and ERC1155 tokens with features like airdrops and campaign management.',
      image: '/strataforge.jpg',
      technologies: ['React', 'Solidity', 'Web3', 'Tailwind CSS'],
      github: 'https://github.com/thebabalola/strataforge-frontend',
      demo: 'https://strataforge-demo.netlify.app',
    },
    {
      title: 'Propty-Bridge',
      description: 'A dynamic real estate platform with intuitive UI/UX, optimized for performance and accessibility.',
      image: '/propty-bridge.jpg',
      technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
      github: 'https://github.com/yourusername/propty-bridge',
      demo: 'https://propty-bridge-demo.vercel.app',
    },
    {
      title: 'Interior Designer Portfolio',
      description: 'A comprehensive interior design portfolio showcasing modern aesthetics with seamless user experience.',
      image: '/Interior-portfolio.jpg',
      technologies: ['React', 'JavaScript', 'Tailwind CSS', 'Vite'],
      github: 'https://github.com/yourusername/interior-portfolio',
      demo: 'https://interior-portfolio-demo.netlify.app',
    },
    {
      title: 'E-Commerce Dashboard',
      description: 'A comprehensive admin dashboard for e-commerce management with analytics and inventory tracking.',
      image: '/ecommerce-dashboard.jpg',
      technologies: ['React', 'Node.js', 'MongoDB', 'Chart.js'],
      github: 'https://github.com/yourusername/ecommerce-dashboard',
      demo: 'https://ecommerce-dashboard-demo.netlify.app',
    },
    {
      title: 'Weather Forecast App',
      description: 'A responsive weather application with real-time data and interactive maps.',
      image: '/weather-app.jpg',
      technologies: ['React', 'OpenWeather API', 'Tailwind CSS', 'Chart.js'],
      github: 'https://github.com/yourusername/weather-app',
      demo: 'https://weather-forecast-demo.netlify.app',
    },
    {
      title: 'Social Media Analytics',
      description: 'A powerful analytics tool for social media performance tracking and insights.',
      image: '/social-analytics.jpg',
      technologies: ['React', 'D3.js', 'Node.js', 'PostgreSQL'],
      github: 'https://github.com/yourusername/social-analytics',
      demo: 'https://social-analytics-demo.vercel.app',
    },
  ];

  const displayedProjects = showAll ? projects : projects.slice(0, 3);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-12 sm:py-16 lg:py-20 relative overflow-hidden animate-on-scroll"
    >
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated Lines */}
        <div className="absolute top-20 left-4 sm:left-10 w-20 sm:w-32 h-px bg-gradient-to-r from-transparent via-primary-green/30 to-transparent animate-pulse"></div>
        <div className="absolute top-40 right-8 sm:right-20 w-16 sm:w-24 h-px bg-gradient-to-r from-transparent via-deep-green/40 to-transparent animate-pulse delay-300"></div>
        <div className="absolute bottom-32 left-1/4 w-24 sm:w-40 h-px bg-gradient-to-r from-transparent via-primary-green/25 to-transparent animate-pulse delay-700"></div>
        
        {/* Geometric Shapes */}
        <div className="absolute top-16 right-4 sm:right-10 w-3 h-3 border border-primary-green/30 rotate-45 animate-spin-slow"></div>
        <div className="absolute top-1/2 left-4 sm:left-8 w-4 h-4 border border-deep-green/40 rotate-45 animate-pulse delay-500"></div>
        <div className="absolute bottom-20 right-1/3 w-2 h-2 border border-primary-green/35 rotate-45 animate-bounce-slow"></div>
        
        {/* Abstract Circles */}
        <div className="absolute top-1/3 left-1/2 w-20 sm:w-32 h-20 sm:h-32 border border-primary-green/10 rounded-full animate-ping-slow"></div>
        <div className="absolute bottom-1/4 left-1/4 w-16 sm:w-24 h-16 sm:h-24 border border-deep-green/15 rounded-full animate-pulse delay-1000"></div>
        
        {/* Tech-inspired Grid Pattern */}
        <div className="absolute top-1/4 right-1/4 opacity-10">
          <div className="grid grid-cols-4 gap-1 sm:gap-2">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className="w-1 h-1 bg-primary-green rounded-full animate-pulse" style={{ animationDelay: `${i * 100}ms` }}></div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-12 sm:mb-16 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-light-grey mb-4">My Projects</h2>
          <p className="text-base sm:text-lg text-light-grey max-w-2xl mx-auto px-4">Explore some of my best work in web and blockchain development</p>
          <div className="w-16 sm:w-20 h-1 bg-primary-green mx-auto mt-4 sm:mt-6 rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayedProjects.map((project, index) => (
            <div
              key={project.title}
              className="bg-dark-accent/50 rounded-lg overflow-hidden shadow-card hover:shadow-glow-lg transition-all duration-500 glass-effect project-card group hover:scale-[1.02] animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 sm:h-56 lg:h-52 object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-accent/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <Eye className="w-5 h-5 text-primary-green" />
                </div>
              </div>
              
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-light-grey mb-2 group-hover:text-primary-green transition-colors duration-300">{project.title}</h3>
                <p className="text-sm sm:text-base text-light-grey mb-4 line-clamp-3">{project.description}</p>
                
                <div className="mb-4 sm:mb-6">
                  <h4 className="text-xs sm:text-sm font-medium text-primary-green mb-2">Technologies:</h4>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {project.technologies.map((tech) => {
                      const IconComponent = techIcons[tech];
                      return (
                        <div
                          key={tech}
                          className="flex items-center justify-center w-8 h-8 bg-deep-green/30 text-light-grey rounded-full border border-deep-green/50 hover:border-primary-green/50 transition-colors duration-300"
                          title={tech}
                        >
                          {IconComponent && <IconComponent className="w-4 h-4" />}
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div className="flex gap-3 sm:gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-[5] flex items-center gap-2 bg-primary-green text-darkest-bg font-semibold px-3 sm:px-4 py-2 rounded-lg hover:bg-primary-green/80 transition-colors duration-300 text-sm sm:text-base"
                    aria-label={`View ${project.title} on GitHub`}
                  >

                    <Github className="w-4 h-4" />
                    <span className="hidden sm:inline">GitHub</span>
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-[5] flex items-center gap-2 border-2 border-primary-green text-primary-green font-semibold px-3 sm:px-4 py-2 rounded-lg hover:bg-primary-green hover:text-darkest-bg transition-colors duration-300 text-sm sm:text-base"
                    aria-label={`View live demo of ${project.title}`}
                  >

                    <ExternalLink className="w-4 h-4" />
                    <span className="hidden sm:inline">Live Demo</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All / View Less Button */}
        <div className="flex justify-center mt-8 sm:mt-12">
          <button
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-2 text-primary-green font-semibold px-6 py-3 rounded-lg transition-all duration-300 group cursor-pointer"
            aria-label={showAll ? 'Show fewer projects' : 'Show all projects'}
          >

            <span>{showAll ? 'View Less' : 'View All Projects'}</span>
            {showAll ? (
              <ChevronUp className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
            ) : (
              <ChevronDown className="w-5 h-5 transition-transform duration-300 group-hover:translate-y-0.5" />
            )}
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 1; }
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        .animate-ping-slow {
          animation: ping-slow 4s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        @media (max-width: 640px) {
          .line-clamp-3 {
            -webkit-line-clamp: 2;
          }
        }
      `}</style>
    </section>
  );
};

export default Projects;