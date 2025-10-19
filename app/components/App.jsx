'use client';

import { useEffect } from 'react';
import Header from './Header';
import Hero from './Hero';
import About from './About';
import Skills from './Skills';
import Projects from './Projects';
import Contact from './Contact';
import Footer from './Footer';

const App = () => {
  useEffect(() => {
    // Smooth scrolling for the entire document
    document.documentElement.style.scrollBehavior = 'smooth';

    // Add scroll listener for animations and effects
    const handleScroll = () => {
      // You can add global scroll effects here if needed
      const scrollTop = window.pageYOffset;
      const windowHeight = window.innerHeight;

      // Example: Parallax effect for background elements
      const parallaxElements = document.querySelectorAll('.parallax');
      parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrollTop * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll);

    // Intersection Observer for fade-in animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    }, observerOptions);

    // Observe all sections for animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      observer.observe(section);
    });

    // Cleanup
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div className='min-h-screen bg-primary-900 text-gray-100 overflow-x-hidden'>
      {/* Global Loading Overlay - you can add this if needed */}
      {/* <div id="loading-overlay" className="fixed inset-0 bg-primary-900 z-50 flex items-center justify-center">
        <div className="text-accent-500 text-2xl font-mono">Loading...</div>
      </div> */}

      {/* Fixed Header */}
      <Header />

      {/* Main Content */}
      <main className='relative'>
        {/* Hero Section */}
        <Hero />

        {/* About Section */}
        <About />

        {/* Skills Section */}
        <Skills />

        {/* Projects Section */}
        <Projects />

        {/* Contact Section */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Styles for Animations */}
      <style jsx global>{`
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #0a192f;
        }

        ::-webkit-scrollbar-thumb {
          background: #64ffda;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #4fd1c7;
        }

        /* Selection color */
        ::selection {
          background: #64ffda;
          color: #0a192f;
        }

        ::-moz-selection {
          background: #64ffda;
          color: #0a192f;
        }

        /* Focus styles for accessibility */
        *:focus {
          outline: 2px solid #64ffda;
          outline-offset: 2px;
        }

        /* Smooth focus transitions */
        button:focus,
        a:focus,
        input:focus,
        textarea:focus {
          transition: outline 0.2s ease;
        }

        /* Hide scrollbar for mobile devices */
        @media (max-width: 768px) {
          ::-webkit-scrollbar {
            display: none;
          }

          body {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        }

        /* Text selection improvements */
        .no-select {
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }

        /* Loading animation */
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        /* Gradient text effect */
        .gradient-text {
          background: linear-gradient(135deg, #64ffda 0%, #4fd1c7 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Glass morphism effect */
        .glass {
          background: rgba(10, 25, 47, 0.7);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(100, 255, 218, 0.1);
        }

        /* Hover glow effect */
        .hover-glow:hover {
          box-shadow: 0 0 20px rgba(100, 255, 218, 0.3);
        }

        /* Image loading placeholder */
        .image-placeholder {
          background: linear-gradient(45deg, #1e293b, #334155);
          background-size: 400% 400%;
          animation: gradientShift 3s ease infinite;
        }

        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
};

export default App;
