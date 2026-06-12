import { useEffect, useRef } from 'react';
import { Briefcase, Users } from 'lucide-react';

const About = () => {
  const sectionRef = useRef(null);
  const leftContentRef = useRef(null);
  const rightContentRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          // Trigger animations for content
          if (leftContentRef.current) {
            leftContentRef.current.classList.add('slide-in-left');
          }
          if (rightContentRef.current) {
            rightContentRef.current.classList.add('slide-in-right');
          }
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { number: "3+", label: "Years in Tech", icon: Briefcase },
    { number: "10+", label: "Projects Completed", icon: Users }
  ];

  return (
    <section id="about" ref={sectionRef} className="py-8 animate-on-scroll relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-20 sm:px-24 lg:px-28 relative">
        <div className="mb-12 text-center">
          <p className="text-xl text-light-grey max-w-2xl mx-auto animate-fade-in">
            Get to know me better
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-green to-deep-green mx-auto mt-4 rounded-full animate-slide-up"></div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Left Content */}
          <div 
            ref={leftContentRef}
            className="lg:col-span-6 xl:col-span-6 space-y-6 opacity-0 transform translate-x-[-50px] transition-all duration-1000 ease-out"
          >
            <div className="space-y-4">
              <p className="text-base text-light-grey leading-relaxed">
                I'm a software engineer with a frontend background and a growing focus on backend systems, Rust, and protocol engineering. I started my tech journey in 2023 after transitioning from interior design and have since built web applications with React, Next.js, TypeScript, and JavaScript while exploring blockchain and distributed systems.
              </p>
              <p className="text-base text-light-grey leading-relaxed">
                Beyond personal projects, I've contributed to open-source projects including the Rust compiler, Servo browser engine, and the Rust Interop Initiative, where I've worked on bug fixes, debugging, Rust/C++ interoperability, and systems-level code. These experiences pushed me beyond building interfaces and sparked my interest in understanding how software works beneath the surface.
              </p>
              <p className="text-base text-light-grey leading-relaxed">
                Today, I'm focused on growing into systems and protocol engineering while continuing to contribute to open source and build software that solves real-world problems.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="flex items-center space-x-2 p-2 bg-dark-accent/50 rounded-lg border border-primary-green/10 hover:border-primary-green/30 hover:bg-dark-accent/70 transition-all duration-300 group"
                >
                  <div className="w-6 h-6 border-2 border-primary-green rounded-full flex items-center justify-center group-hover:border-deep-green transition-colors duration-300 flex-shrink-0">
                    <stat.icon className="w-3 h-3 text-primary-green group-hover:text-deep-green transition-colors duration-300" />
                  </div>
                  <div className="flex-1">
                    <div className="text-lg font-bold text-primary-green group-hover:text-deep-green transition-colors duration-300 flex items-center gap-1">
                      <span>{stat.number}</span>
                      <span className="text-light-grey text-xs group-hover:text-primary-green transition-colors duration-300">
                        {stat.label}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Profile Image */}
          <div 
            ref={rightContentRef}
            className="lg:col-span-6 xl:col-span-6 flex justify-center lg:justify-end opacity-0 transform translate-x-[50px] transition-all duration-1000 ease-out"
          >
            <div className="relative group">
              <img 
                src="/about-me-removebg.png" 
                alt="Profile" 
                className="relative w-80 h-80 object-cover shadow-2xl hover:scale-105 transition-all duration-500 animate-breathing"
                style={{ filter: 'hue-rotate(200deg) saturate(1.5)' }}
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slide-in-left {
          opacity: 1 !important;
          transform: translateX(0) !important;
        }
        
        .slide-in-right {
          opacity: 1 !important;
          transform: translateX(0) !important;
        }

        @keyframes breathing {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        .animate-breathing {
          animation: breathing 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default About;