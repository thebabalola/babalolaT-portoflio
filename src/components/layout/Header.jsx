import { useEffect, useRef, useState } from 'react';
import { Home, User, Zap, Rocket, Mail } from 'lucide-react';

const Header = () => {
  const headerRef = useRef(null);
  const mobileMenuButtonRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Smooth scrolling
  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerHeight = headerRef.current.offsetHeight;
      const targetPosition = targetElement.offsetTop - headerHeight;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  // Header behavior with enhanced animations
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateHeader = () => {
      const currentScrollY = window.scrollY;
      const header = headerRef.current;
      
      if (currentScrollY > 50) {
        header.classList.add('backdrop-blur-xl', 'bg-darkest-bg/95', 'shadow-glow', 'border-b', 'border-primary-green/20');
        header.classList.remove('bg-darkest-bg/80');
        header.style.transform = currentScrollY > lastScrollY && currentScrollY > 200 ? 'translateY(-100%)' : 'translateY(0)';
      } else {
        header.classList.remove('backdrop-blur-xl', 'bg-darkest-bg/95', 'shadow-glow', 'border-b', 'border-primary-green/20');
        header.classList.add('bg-darkest-bg/80');
        header.style.transform = 'translateY(0)';
      }
      lastScrollY = currentScrollY;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active section detection
  useEffect(() => {
    const sections = ['home', 'about', 'skills', 'projects', 'contact'];
    const observerOptions = {
      rootMargin: '-20% 0px -80% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Mobile menu animation
  useEffect(() => {
    const mobileMenu = mobileMenuRef.current;
    if (isMobileMenuOpen) {
      mobileMenu.style.display = 'block';
      mobileMenu.style.maxHeight = mobileMenu.scrollHeight + 'px';
      mobileMenu.style.opacity = '1';
      mobileMenu.style.transform = 'translateY(0)';
    } else {
      mobileMenu.style.maxHeight = '0';
      mobileMenu.style.opacity = '0';
      mobileMenu.style.transform = 'translateY(-10px)';
      setTimeout(() => {
        if (!isMobileMenuOpen) {
          mobileMenu.style.display = 'none';
        }
      }, 300);
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Home', href: '#home', icon: Home },
    { name: 'About', href: '#about', icon: User },
    { name: 'Skills', href: '#skills', icon: Zap },
    { name: 'Projects', href: '#projects', icon: Rocket },
    { name: 'Contact', href: '#contact', icon: Mail },
  ];

  return (
    <>
      {/* Spacer to prevent content from hiding behind fixed header */}
      <div className="h-4"></div>
      
      <header
        id="header"
        ref={headerRef}
        className="fixed top-4 left-4 right-4 z-50 transition-all duration-500 ease-out bg-darkest-bg/80 backdrop-blur-md rounded-2xl border border-dark-accent/50 shadow-card"
        style={{
          animation: 'slideDown 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards'
        }}
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-green/5 via-transparent to-primary-green/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
        
        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
          <div className="absolute w-2 h-2 bg-primary-green/30 rounded-full animate-float" style={{
            top: '20%',
            left: '10%',
            animationDelay: '0s',
            animationDuration: '6s'
          }}></div>
          <div className="absolute w-1 h-1 bg-light-grey/40 rounded-full animate-float" style={{
            top: '60%',
            right: '15%',
            animationDelay: '2s',
            animationDuration: '8s'
          }}></div>
          <div className="absolute w-1.5 h-1.5 bg-primary-green/20 rounded-full animate-float" style={{
            bottom: '30%',
            left: '80%',
            animationDelay: '4s',
            animationDuration: '7s'
          }}></div>
        </div>

        <nav className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex justify-between items-center h-16">
            {/* Simple logo name */}
            <div className="flex-shrink-0">
              <button
                onClick={(e) => handleSmoothScroll(e, '#home')}
                className="text-2xl font-bold text-white hover:scale-105 transition-transform duration-300"
              >
                Babalola
              </button>
            </div>

            {/* Desktop Navigation with enhanced styling */}
            <div className="hidden md:flex ml-10 items-center space-x-2">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className={`group relative px-4 py-2 rounded-xl transition-all duration-300 ${
                    activeSection === link.href.substring(1) 
                      ? 'text-primary-green' 
                      : 'text-light-grey hover:text-primary-green'
                  }`}
                >
                  <span className="relative z-10 font-medium text-sm flex items-center gap-2">
                    <link.icon size={16} />
                    {link.name}
                  </span>
                  
                  {/* Hover effect background */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-green/10 to-primary-green/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  
                  {/* Active indicator */}
                  {activeSection === link.href.substring(1) && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-green rounded-full animate-pulse"></div>
                  )}
                </button>
              ))}
            </div>

            {/* Enhanced Mobile Menu Button */}
            <div className="md:hidden">
              <button
                ref={mobileMenuButtonRef}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="relative group p-3 rounded-xl text-light-grey hover:text-primary-green hover:bg-primary-green/10 transition-all duration-300"
              >
                {/* Animated hamburger icon */}
                <div className="relative w-6 h-6 flex flex-col justify-center items-center">
                  <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? 'rotate-45 translate-y-0.5' : ''
                  }`}></span>
                  <span className={`block w-6 h-0.5 bg-current transition-all duration-300 mt-1 ${
                    isMobileMenuOpen ? 'opacity-0' : ''
                  }`}></span>
                  <span className={`block w-6 h-0.5 bg-current transition-all duration-300 mt-1 ${
                    isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                  }`}></span>
                </div>
                
                {/* Hover effect */}
                <div className="absolute inset-0 rounded-xl bg-primary-green/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>

          {/* Enhanced Mobile Menu */}
          <div
            ref={mobileMenuRef}
            className="md:hidden overflow-hidden transition-all duration-300 ease-out"
            style={{ 
              maxHeight: '0', 
              opacity: '0',
              transform: 'translateY(-10px)',
              display: 'none'
            }}
          >
            <div className="px-2 pt-4 pb-6 space-y-2 bg-dark-accent/50 backdrop-blur-md rounded-2xl mt-4 border border-primary-green/20">
              {navLinks.map((link, index) => (
                <button
                  key={link.name}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className={`group relative w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center gap-3 ${
                    activeSection === link.href.substring(1) 
                      ? 'text-primary-green' 
                      : 'text-light-grey hover:text-primary-green'
                  }`}
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animation: isMobileMenuOpen ? 'slideInLeft 0.3s ease-out forwards' : ''
                  }}
                >
                  <link.icon size={18} />
                  <span className="font-medium">{link.name}</span>
                  
                  {/* Hover effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-green/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  
                  {/* Active indicator for mobile */}
                  {activeSection === link.href.substring(1) && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-primary-green rounded-full animate-pulse"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </nav>

        <style jsx>{`
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translateX(-20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes float {
            0%, 100% {
              transform: translateY(0px) rotate(0deg);
            }
            33% {
              transform: translateY(-10px) rotate(120deg);
            }
            66% {
              transform: translateY(5px) rotate(240deg);
            }
          }

          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
        `}</style>
      </header>
    </>
  );
};

export default Header;