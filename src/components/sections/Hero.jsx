import { useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const nameRef = useRef(null);

  // Scroll animations
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

  // Particle system
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 50;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(141, 167, 80, ${this.opacity})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach((otherParticle) => {
          const distance = Math.sqrt(
            Math.pow(particle.x - otherParticle.x, 2) +
            Math.pow(particle.y - otherParticle.y, 2)
          );
          if (distance < 100) {
            ctx.strokeStyle = `rgba(141, 167, 80, ${0.2 * (1 - distance / 100)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Name fade-in animation
  useEffect(() => {
    const nameElement = nameRef.current;
    if (!nameElement) return;

    // Start with opacity 0 and slightly scaled down
    nameElement.style.opacity = '0';
    nameElement.style.transform = 'scale(0.95) translateY(20px)';
    
    // Animate to full opacity and normal scale
    setTimeout(() => {
      nameElement.style.transition = 'opacity 1.2s ease-out, transform 1.2s ease-out';
      nameElement.style.opacity = '1';
      nameElement.style.transform = 'scale(1) translateY(0)';
    }, 500);
  }, []);

  // Removed handleSmoothScroll since we now use Link for routing

  const socialLinks = [
    {
      href: 'https://github.com/thebabalola',
      icon: Github,
      label: 'GitHub',
      hoverColor: 'hover:text-white hover:bg-[#333]'
    },
    {
      href: 'https://linkedin.com/in/babalola-taiwo',
      icon: Linkedin,
      label: 'LinkedIn',
      hoverColor: 'hover:text-white hover:bg-[#0077b5]'
    },
    {
      href: 'mailto:t.babalolajoseph@gmail.com',
      icon: Mail,
      label: 'Email',
      hoverColor: 'hover:text-white hover:bg-[#ea4335]'
    }
  ];

  return (
    <section
      id="home"
      ref={sectionRef}
      className="h-screen flex items-center justify-center relative overflow-hidden animate-on-scroll"
    >
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
      {/* Background blur overlay - removed gradient to match skills section */}
      <div className="absolute inset-0 backdrop-blur-sm"></div>
      
      {/* Background Tech Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-primary-green/10 text-6xl animate-pulse font-mono">{'<>'}</div>
        <div className="absolute top-40 right-20 text-primary-green/10 text-4xl animate-bounce-slow font-mono">{'{ }'}</div>
        <div className="absolute bottom-40 left-20 text-primary-green/10 text-5xl animate-pulse font-mono">{'</>'}</div>
        <div className="absolute bottom-20 right-10 text-primary-green/10 text-6xl animate-bounce-slow font-mono">{'()'}</div>
        <div className="absolute top-1/2 left-1/4 text-primary-green/5 text-8xl animate-pulse font-mono">{'#'}</div>
        <div className="absolute top-1/3 right-1/4 text-primary-green/5 text-7xl animate-bounce-slow font-mono">{'[]'}</div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Side-by-side layout: Text on left, Image on right */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14">
          
          {/* Left side - Text content */}
          <div className="flex-1 text-center lg:text-left space-y-8 lg:order-1">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                <span className="block text-light-grey animate-fade-in text-xl md:text-2xl lg:text-3xl">Hi, I'm</span>
                <span 
                  ref={nameRef}
                  className="block gradient-text will-change-transform"
                  style={{ 
                    background: 'linear-gradient(135deg, #8DA750 0%, #537B2F 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  Babalola Taiwo
                </span>
              </h1>
              <p className="text-base md:text-lg text-light-grey max-w-2xl mx-auto lg:mx-0 animate-fade-in animation-delay-300">
                <span className="font-bold">Frontend & Blockchain Developer</span> crafting innovative <br></br> web and decentralized solutions
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center animate-fade-in animation-delay-700">
              <Link
                to="/projects"
                className="bg-primary-green text-darkest-bg font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-glow active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary-green focus:ring-offset-2 focus:ring-offset-darkest-bg"
              >
                View My Work
              </Link>
              <Link
                to="/contact"
                className="border-2 border-primary-green text-primary-green font-semibold px-6 py-3 rounded-lg hover:bg-primary-green hover:text-darkest-bg transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary-green focus:ring-offset-2 focus:ring-offset-darkest-bg"
              >
                Get In Touch
              </Link>
            </div>
            
            {/* Social Icons */}
            <div className="flex justify-center lg:justify-start space-x-4 pt-4 animate-fade-in animation-delay-900">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative p-3 rounded-lg border-2 border-light-grey/30 text-light-grey transition-all duration-300 hover:scale-110 hover:border-primary-green ${social.hoverColor} focus:outline-none focus:ring-2 focus:ring-primary-green focus:ring-offset-2 focus:ring-offset-darkest-bg`}
                    title={social.label}
                  >
                    <IconComponent size={20} className="transition-colors duration-300 relative z-10" />
                    
                    {/* Hover glow effect */}
                    <div className="absolute inset-0 rounded-lg bg-primary-green/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right side - Profile Picture */}
          <div className="flex-shrink-0 lg:order-2 animate-fade-in animation-delay-400">
            <div className="relative group">
              {/* Profile Picture Container - Circular */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-primary-green/30 shadow-glow transition-all duration-500 hover:border-primary-green hover:shadow-glow-lg hover:scale-105">
                {/* Replace 'your-image.jpg' with your actual image path */}
                <img 
                  src="/profile-picture3.png" 
                  alt="Babalola Taiwo - Frontend & Blockchain Developer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Overlay gradient for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-green/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              {/* Decorative elements around the image */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary-green/20 rounded-full animate-bounce-slow"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-primary-green/30 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute right-8 bottom-8 md:right-16 md:bottom-16 animate-bounce-horizontal">
        <Link
          to="/about"
          className="text-light-grey hover:text-primary-green transition-colors duration-300 group focus:outline-none focus:ring-2 focus:ring-primary-green focus:ring-offset-2 focus:ring-offset-darkest-bg rounded-full p-2 block"
        >
          <ChevronRight size={32} className="group-hover:scale-110 transition-transform duration-300" />
        </Link>
      </div>
    </section>
  );
};

export default Hero;
