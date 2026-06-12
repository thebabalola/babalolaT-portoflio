import { useEffect, useRef, useState } from 'react';
import { Mail, Phone, Github, Linkedin, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { FaDiscord } from 'react-icons/fa6';

const Contact = () => {
  const sectionRef = useRef(null);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  // Submission States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    // Replace with actual Web3Forms Access Key or import from .env
    const accessKey = import.meta.env.VITE_WEB3FORMS_KEY || "YOUR_ACCESS_KEY_HERE";
    
    const dataToSubmit = new FormData();
    dataToSubmit.append("access_key", accessKey);
    dataToSubmit.append("name", formData.name);
    dataToSubmit.append("email", formData.email);
    dataToSubmit.append("message", formData.message);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: dataToSubmit
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitStatus(null), 5000); // Clear success message after 5s
      } else {
        setSubmitStatus('error');
        console.error("Web3Forms Error:", data);
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error("Fetch Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="py-10 animate-on-scroll relative overflow-hidden">
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
            <form onSubmit={onSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-light-grey mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2.5 bg-dark-accent/50 text-light-grey rounded-lg border border-medium-grey focus:ring-2 focus:ring-primary-green outline-none transition-all duration-300"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-light-grey mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2.5 bg-dark-accent/50 text-light-grey rounded-lg border border-medium-grey focus:ring-2 focus:ring-primary-green outline-none transition-all duration-300"
                  placeholder="Your Email"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-light-grey mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-2.5 bg-dark-accent/50 text-light-grey rounded-lg border border-medium-grey focus:ring-2 focus:ring-primary-green outline-none transition-all duration-300"
                  placeholder="Your Message"
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center space-x-2 bg-primary-green text-darkest-bg font-semibold px-6 py-3 rounded-lg glow-effect hover:bg-primary-green/80 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="flex items-center text-primary-green bg-primary-green/10 p-3 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  <span>Message sent successfully! I'll get back to you soon.</span>
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="flex items-center text-red-400 bg-red-400/10 p-3 rounded-lg">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  <span>Failed to send message. Please try again or email me directly.</span>
                </div>
              )}
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
                <a href="tel:+2348182599609" className="text-light-grey hover:text-primary-green">
                  +2348182599609
                </a>
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
                href="https://discordapp.com/users/thereborns"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light-grey hover:text-primary-green transition-all hover:scale-110"
                title="Discord"
              >
                <FaDiscord className="w-6 h-6" />
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