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
    { number: "2+", label: "Years in Tech", icon: Briefcase },
    { number: "10+", label: "Projects Completed", icon: Users }
  ];

  return (
    <section id="about" ref={sectionRef} className="py-16 bg-dark-accent/30 animate-on-scroll relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-20 sm:px-24 lg:px-28 relative">
        <div className="mb-12 text-center">
          <p className="text-xl text-light-grey max-w-2xl mx-auto animate-fade-in">
            Get to know me better
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-blue to-deep-blue mx-auto mt-4 rounded-full animate-slide-up"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 items-center">
          {/* Left Content */}
          <div 
            ref={leftContentRef}
            className="space-y-6 opacity-0 transform translate-x-[-50px] transition-all duration-1000 ease-out"
          >
            <div className="space-y-4">
              <p className="text-base text-light-grey leading-relaxed">
                I’m a self-driven Frontend and Blockchain Developer based in Lagos, Nigeria, with over 2 years of hands-on experience building responsive web and decentralized applications. After transitioning from interior design to tech in 2023, I completed the rigorous ALX Software Engineering program (frontend focus, 2023-2024) and the Web3 Bridge bootcamp (Solidity & DeFi, Jan-May 2025).
              </p>
              <p className="text-base text-light-grey leading-relaxed">
                I specialize in crafting clean, maintainable code using React, Next.js, and Tailwind CSS, alongside integrating smart contracts with Solidity, Hardhat, and Wagmi. Passionate about solving real-world problems, such as Lagos’ real estate challenges, I’ve deployed dApps on Ethereum, Base, and Lisk testnets and am open to junior roles, internships, or remote collaborations.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="flex items-center space-x-2 p-2 bg-dark-accent/50 rounded-lg border border-primary-blue/10 hover:border-primary-blue/30 hover:bg-dark-accent/70 transition-all duration-300 group"
                >
                  <div className="w-6 h-6 border-2 border-primary-blue rounded-full flex items-center justify-center group-hover:border-deep-blue transition-colors duration-300 flex-shrink-0">
                    <stat.icon className="w-3 h-3 text-primary-blue group-hover:text-deep-blue transition-colors duration-300" />
                  </div>
                  <div className="flex-1">
                    <div className="text-lg font-bold text-primary-blue group-hover:text-deep-blue transition-colors duration-300 flex items-center gap-1">
                      <span>{stat.number}</span>
                      <span className="text-light-grey text-xs group-hover:text-white transition-colors duration-300">
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
            className="flex justify-center lg:justify-end opacity-0 transform translate-x-[50px] transition-all duration-1000 ease-out"
          >
            <div className="relative group">
              <img 
                src="/about-me-removebg.png" 
                alt="Profile" 
                className="relative w-80 h-80 object-cover shadow-2xl hover:scale-105 transition-all duration-500 animate-breathing"
                // className="relative w-80 h-80 object-cover rounded-full shadow-2xl hover:scale-105 transition-all duration-500 animate-breathing"
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