import { useEffect, useRef, useState } from 'react';
import { Home, User, Zap, Rocket, Mail, Sun, Moon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

const Header = () => {
  const headerRef = useRef(null);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [activeLabel, setActiveLabel] = useState(null);

  // Header scroll behavior
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateHeader = () => {
      const currentScrollY = window.scrollY;
      const header = headerRef.current;
      
      if (currentScrollY > 50) {
        header.classList.add('backdrop-blur-xl', 'bg-dark-accent/95', 'shadow-glow', 'border-b', 'border-primary-green/20');
        header.classList.remove('bg-dark-accent/80');
        header.style.transform = currentScrollY > lastScrollY && currentScrollY > 200 ? 'translateY(-100%)' : 'translateY(0)';
      } else {
        header.classList.remove('backdrop-blur-xl', 'bg-dark-accent/95', 'shadow-glow', 'border-b', 'border-primary-green/20');
        header.classList.add('bg-dark-accent/80');
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

  const navLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'About', href: '/about', icon: User },
    { name: 'Skills', href: '/skills', icon: Zap },
    { name: 'Projects', href: '/projects', icon: Rocket },
    { name: 'Contact', href: '/contact', icon: Mail },
  ];

  return (
    <>
      {/* Spacer to prevent content from hiding behind fixed header */}
      <div className="h-4"></div>

      {/* ── TOP HEADER ─────────────────────────────────────────── */}
      <header
        id="header"
        ref={headerRef}
        className="fixed top-4 left-4 right-4 z-50 transition-all duration-500 ease-out bg-dark-accent/80 backdrop-blur-md rounded-2xl border border-dark-accent/50 shadow-card hover:shadow-glow"
        style={{ animation: 'slideDown 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards' }}
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-green/5 via-transparent to-primary-green/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
          <div className="absolute w-2 h-2 bg-primary-green/30 rounded-full animate-float" style={{ top: '20%', left: '10%', animationDelay: '0s', animationDuration: '6s' }}></div>
          <div className="absolute w-1 h-1 bg-light-grey/40 rounded-full animate-float" style={{ top: '60%', right: '15%', animationDelay: '2s', animationDuration: '8s' }}></div>
          <div className="absolute w-1.5 h-1.5 bg-primary-green/20 rounded-full animate-float" style={{ bottom: '30%', left: '80%', animationDelay: '4s', animationDuration: '7s' }}></div>
        </div>

        <nav className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link
                to="/"
                className="text-2xl font-bold text-light-grey hover:scale-105 transition-transform duration-300"
              >
                Babalola T
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex ml-10 items-center space-x-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`group relative px-4 py-2 rounded-xl transition-all duration-300 ${
                    location.pathname === link.href
                      ? 'text-primary-green'
                      : 'text-light-grey hover:text-primary-green'
                  }`}
                >
                  <span className="relative z-10 font-medium text-sm flex items-center gap-2">
                    <link.icon size={16} />
                    {link.name}
                  </span>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-green/10 to-primary-green/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  {location.pathname === link.href && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-green rounded-full animate-pulse"></div>
                  )}
                </Link>
              ))}

              {/* Desktop Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="group relative ml-4 p-2 rounded-xl transition-all duration-300 text-light-grey hover:text-primary-green hover:bg-primary-green/10"
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 transition-transform duration-500 group-hover:rotate-180" />
                ) : (
                  <Moon className="w-5 h-5 transition-transform duration-500 group-hover:rotate-180" />
                )}
              </button>
            </div>

            {/* Mobile: Theme Toggle (replaces burger) */}
            <div className="md:hidden">
              <button
                onClick={toggleTheme}
                className="group relative p-3 rounded-xl text-light-grey hover:text-primary-green hover:bg-primary-green/10 transition-all duration-300"
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 transition-transform duration-500 group-hover:rotate-180" />
                ) : (
                  <Moon className="w-5 h-5 transition-transform duration-500 group-hover:rotate-180" />
                )}
                <div className="absolute inset-0 rounded-xl bg-primary-green/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
        </nav>

        <style>{`
          @keyframes slideDown {
            from { opacity: 0; transform: translateY(-20px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            33%       { transform: translateY(-10px) rotate(120deg); }
            66%       { transform: translateY(5px) rotate(240deg); }
          }
          .animate-float { animation: float 6s ease-in-out infinite; }
        `}</style>
      </header>

      {/* ── MOBILE BOTTOM NAV ──────────────────────────────────── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-dark-accent/95 backdrop-blur-xl border-t border-primary-green/20 flex justify-around items-center h-16 px-2">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.href;
          return (
            <Link
              key={link.name}
              to={link.href}
              className="relative flex flex-col items-center justify-center flex-1 h-full group"
              onMouseEnter={() => setActiveLabel(link.name)}
              onMouseLeave={() => setActiveLabel(null)}
              onClick={() => setActiveLabel(null)}
            >
              {/* Label tooltip above icon */}
              <span
                className={`absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-semibold px-2 py-0.5 rounded-md bg-dark-accent border border-primary-green/30 text-primary-green whitespace-nowrap transition-all duration-200 pointer-events-none ${
                  activeLabel === link.name ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
                }`}
              >
                {link.name}
              </span>

              {/* Icon */}
              <link.icon
                size={22}
                className={`transition-all duration-300 ${
                  isActive
                    ? 'text-primary-green scale-110'
                    : 'text-light-grey group-hover:text-primary-green group-hover:scale-110'
                }`}
              />

              {/* Active dot */}
              {isActive && (
                <span className="mt-1 w-1 h-1 rounded-full bg-primary-green animate-pulse"></span>
              )}
            </Link>
          );
        })}
      </nav>
    </>
  );
};

export default Header;