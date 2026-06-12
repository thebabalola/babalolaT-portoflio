import { useEffect, useRef, useState } from 'react';
import { Zap, Code, Users, Puzzle, ChevronDown } from 'lucide-react';

const WhyHireMe = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <section
      id="why-hire-me"
      ref={sectionRef}
      className="py-6 bg-dark-accent/10 animate-on-scroll border-t border-primary-green/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Accordion Toggle Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="w-full group focus:outline-none rounded-xl p-4 transition-all duration-300 hover:bg-dark-accent/30"
        >
          <div className="text-center flex flex-col items-center justify-center">
            <h2 className="text-2xl md:text-4xl font-bold text-light-grey mb-2 group-hover:text-primary-green transition-colors duration-300 flex items-center gap-3">
              Why Hire Me
              <div className={`p-2 rounded-full bg-primary-green/10 transition-colors duration-300 group-hover:bg-primary-green/20 ${isOpen ? 'bg-primary-green/20' : ''}`}>
                <ChevronDown className={`w-8 h-8 text-primary-green transform transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`} />
              </div>
            </h2>
            <p className="text-sm md:text-lg text-light-grey max-w-2xl mx-auto mt-2">What makes me the right fit for your project</p>
            <div className={`h-1 bg-primary-green mx-auto mt-6 rounded-full transition-all duration-500 ${isOpen ? 'w-32 shadow-glow' : 'w-10 group-hover:w-20'}`}></div>
          </div>
        </button>

        {/* Expandable Content */}
        <div 
          ref={contentRef}
          className="overflow-hidden transition-all duration-700 ease-in-out"
          style={{ 
            maxHeight: isOpen ? `${contentRef.current?.scrollHeight + 100}px` : '0px',
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? 'translateY(0)' : 'translateY(-10px)'
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-12 pb-4">
            
            <div className="group cursor-pointer p-6 bg-dark-accent/50 rounded-3xl text-center glass-effect border border-transparent hover:border-primary-green transition-all relative overflow-hidden hover:shadow-glow hover:-translate-y-2 duration-300">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
              </div>
              <div className="relative z-10">
                <div className="text-4xl mb-4 flex justify-center">
                  <Zap className="w-10 h-10 text-primary-green group-hover:text-deep-green transition-colors duration-300" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-light-grey mb-2 group-hover:text-primary-green transition-colors duration-300">Eager Learner</h3>
                <p className="text-sm md:text-base text-light-grey group-hover:text-primary-green/90 transition-colors duration-300">Passionate about embracing new challenges to deliver innovative solutions.</p>
              </div>
            </div>

            <div className="group cursor-pointer p-6 bg-dark-accent/50 rounded-3xl text-center glass-effect border border-transparent hover:border-primary-green transition-all relative overflow-hidden hover:shadow-glow hover:-translate-y-2 duration-300">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
              </div>
              <div className="relative z-10">
                <div className="text-4xl mb-4 flex justify-center">
                  <Code className="w-10 h-10 text-primary-green group-hover:text-deep-green transition-colors duration-300" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-light-grey mb-2 group-hover:text-primary-green transition-colors duration-300">Project Builder</h3>
                <p className="text-sm md:text-base text-light-grey group-hover:text-primary-green/90 transition-colors duration-300">Consistently deliver clean, user-focused solutions through hands-on development.</p>
              </div>
            </div>

            <div className="group cursor-pointer p-6 bg-dark-accent/50 rounded-3xl text-center glass-effect border border-transparent hover:border-primary-green transition-all relative overflow-hidden hover:shadow-glow hover:-translate-y-2 duration-300">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
              </div>
              <div className="relative z-10">
                <div className="text-4xl mb-4 flex justify-center">
                  <Users className="w-10 h-10 text-primary-green group-hover:text-deep-green transition-colors duration-300" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-light-grey mb-2 group-hover:text-primary-green transition-colors duration-300">Team Player</h3>
                <p className="text-sm md:text-base text-light-grey group-hover:text-primary-green/90 transition-colors duration-300">Thrive in collaborative settings, contributing ideas to achieve shared goals.</p>
              </div>
            </div>

            <div className="group cursor-pointer p-6 bg-dark-accent/50 rounded-3xl text-center glass-effect border border-transparent hover:border-primary-green transition-all relative overflow-hidden hover:shadow-glow hover:-translate-y-2 duration-300">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
              </div>
              <div className="relative z-10">
                <div className="text-4xl mb-4 flex justify-center">
                  <Puzzle className="w-10 h-10 text-primary-green group-hover:text-deep-green transition-colors duration-300" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-light-grey mb-2 group-hover:text-primary-green transition-colors duration-300">Problem Solver</h3>
                <p className="text-sm md:text-base text-light-grey group-hover:text-primary-green/90 transition-colors duration-300">Driven to create innovative solutions for real-world challenges.</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyHireMe;