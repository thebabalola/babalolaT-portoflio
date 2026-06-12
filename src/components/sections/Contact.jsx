import { useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Send } from 'lucide-react';

const Contact = () => {
  const sectionRef = useRef(null);
  const formRef = useRef(null);

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

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    const inputs = form.querySelectorAll('input, textarea');

    const validateInput = (input) => {
      const isValid = input.checkValidity();
      const parent = input.parentElement;
      parent.classList.remove('input-valid', 'input-invalid');
      if (input.value.trim()) {
        parent.classList.add(isValid ? 'input-valid' : 'input-invalid');
      }
    };

    inputs.forEach((input) => {
      input.addEventListener('focus', () => {
        input.parentElement.classList.add('input-focused');
      });
      input.addEventListener('blur', () => {
        input.parentElement.classList.remove('input-focused');
        validateInput(input);
      });
      input.addEventListener('input', () => validateInput(input));
    });

    return () => {
      inputs.forEach((input) => {
        input.removeEventListener('focus', () => {});
        input.removeEventListener('blur', () => {});
        input.removeEventListener('input', () => {});
      });
    };
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="py-20 animate-on-scroll relative overflow-hidden">
      {/* Tech Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">

        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1"/>
            </pattern>
            <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1" fill="currentColor"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" className="text-primary-green"/>
          <rect width="100%" height="100%" fill="url(#dots)" className="text-light-grey"/>
        </svg>
        
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-16 h-16 border border-primary-green transform rotate-45 opacity-30"></div>
        <div className="absolute top-40 right-20 w-12 h-12 border border-light-grey rounded-full opacity-20"></div>
        <div className="absolute bottom-32 left-1/4 w-8 h-8 bg-primary-green opacity-10 transform rotate-12"></div>
        <div className="absolute bottom-20 right-1/3 w-20 h-20 border border-primary-green transform rotate-12 opacity-20"></div>
        <div className="absolute top-1/2 left-20 w-6 h-6 bg-light-grey opacity-15 rounded-full"></div>
        <div className="absolute top-1/3 right-10 w-10 h-10 border border-primary-green transform rotate-45 opacity-25"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-light-grey mb-4">Get In Touch</h2>
          <p className="text-lg text-light-grey max-w-2xl mx-auto">Let's collaborate on your next project</p>
          <div className="w-20 h-1 bg-primary-green mx-auto mt-6 rounded-full"></div>
        </div>
        <div className="flex flex-col lg:grid lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-24 max-w-6xl mx-auto items-center lg:items-start">
          <div className="bg-dark-accent/50 p-6 rounded-lg glass-effect w-[65%] lg:w-full max-w-lg lg:max-w-none">
            <form ref={formRef} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-light-grey mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full p-2.5 bg-dark-accent/50 text-light-grey rounded-lg border border-medium-grey focus:ring-2 focus:ring-primary-green"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-light-grey mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-2.5 bg-dark-accent/50 text-light-grey rounded-lg border border-medium-grey focus:ring-2 focus:ring-primary-green"
                  placeholder="Your Email"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-light-grey mb-2">Message</label>
                <textarea
                  id="message"
                  rows="4"
                  className="w-full p-2.5 bg-dark-accent/50 text-light-grey rounded-lg border border-medium-grey focus:ring-2 focus:ring-primary-green"
                  placeholder="Your Message"
                ></textarea>
              </div>
              <a
                href="#"
                className="inline-flex items-center space-x-2 bg-primary-green text-darkest-bg font-semibold px-6 py-3 rounded-lg glow-effect hover:bg-primary-green/80"
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </a>
            </form>
          </div>
          <div className="space-y-6 text-center lg:text-left w-full lg:w-auto">
            <h3 className="text-xl font-semibold text-light-grey">Contact Details</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-center lg:justify-start space-x-3">
                <Mail className="w-5 h-5 text-primary-green" />
                <a href="mailto:t.babalolajoseph@gmail.com" className="text-light-grey hover:text-primary-green">
                  t.babalolajoseph@gmail.com
                </a>
              </div>
              <div className="flex items-center justify-center lg:justify-start space-x-3">
                <Phone className="w-5 h-5 text-primary-green" />
                <a href="tel:+2348121223631" className="text-light-grey hover:text-primary-green">
                  +2348121223631
                </a>
              </div>
              <div className="flex items-center justify-center lg:justify-start space-x-3">
                <MapPin className="w-5 h-5 text-primary-green" />
                <span className="text-light-grey">Lagos, Nigeria</span>
              </div>
            </div>
            <div className="flex space-x-6 pt-4 justify-center lg:justify-start">
              <a
                href="https://github.com/thebabalola"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light-grey hover:text-primary-green transition-all hover:scale-110"
                title="GitHub"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://linkedin.com/in/babalola-taiwo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light-grey hover:text-primary-green transition-all hover:scale-110"
                title="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="mailto:t.babalolajoseph@gmail.com"
                className="text-light-grey hover:text-primary-green transition-all hover:scale-110"
                title="Email"
              >
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>


    </section>
  );
};

export default Contact;