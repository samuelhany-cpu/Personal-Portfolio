'use client';

import { useEffect, useState } from 'react';

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const titles = [
    'Full-Stack Developer',
    'React Specialist',
    'Backend Engineer',
    'Problem Solver',
  ];

  useEffect(() => {
    const currentTitle = titles[currentIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < currentTitle.length) {
            setDisplayText(currentTitle.slice(0, displayText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentIndex(prev => (prev + 1) % titles.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );

    return () => clearTimeout(timeout);
  }, [displayText, currentIndex, isDeleting, titles]);

  const smoothScrollTo = elementId => {
    const element = document.getElementById(elementId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id='hero'
      className='min-h-screen flex items-center justify-center bg-primary-900 relative overflow-hidden'
    >
      {/* Background Pattern */}
      <div className='absolute inset-0 opacity-5'>
        <div className='absolute inset-0 bg-gradient-to-br from-accent-500/20 to-transparent'></div>
        <div
          className='absolute inset-0'
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2364FFDA' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className='container mx-auto px-6 text-center relative z-10'>
        {/* Greeting */}
        <p className='text-accent-500 font-mono text-lg md:text-xl mb-6 animate-fade-in'>
          Hi, my name is
        </p>

        {/* Main Heading */}
        <h1 className='text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-gray-100 mb-4 leading-tight'>
          Samuel <span className='text-accent-500'>Ehab</span>
        </h1>

        {/* Animated Subtitle */}
        <h2 className='text-3xl md:text-5xl lg:text-6xl font-heading font-semibold text-gray-400 mb-8 h-16 md:h-20'>
          I'm a <span className='text-accent-500'>{displayText}</span>
          <span className='animate-pulse text-accent-500'>|</span>
        </h2>

        {/* Description */}
        <p className='text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed'>
          I specialize in building exceptional digital experiences with modern
          technologies. Currently focused on creating scalable web applications
          with <span className='text-accent-500 font-semibold'>React</span>,{' '}
          <span className='text-accent-500 font-semibold'>Node.js</span>, and{' '}
          <span className='text-accent-500 font-semibold'>
            cloud technologies
          </span>
          .
        </p>

        {/* CTA Buttons */}
        <div className='flex flex-col sm:flex-row gap-6 justify-center items-center'>
          <button
            onClick={() => smoothScrollTo('projects')}
            className='group px-8 py-4 bg-transparent border-2 border-accent-500 text-accent-500 rounded text-lg font-mono transition-all duration-300 hover:bg-accent-500 hover:text-black transform hover:scale-105 hover:shadow-lg hover:shadow-accent-500/25'
          >
            <span className='flex items-center group-hover:text-black'>
              View My Projects
              <svg
                className='ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M17 8l4 4m0 0l-4 4m4-4H3'
                />
              </svg>
            </span>
          </button>

          <button
            onClick={() => smoothScrollTo('contact')}
            className='group px-8 py-4 bg-accent-500 text-black rounded text-lg font-mono font-semibold transition-all duration-300 hover:bg-accent-400 hover:shadow-lg hover:shadow-accent-500/25 transform hover:scale-105'
          >
            <span className='flex items-center text-black group-hover:text-black'>
              Get In Touch
              <svg
                className='ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-y-[-2px]'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
                />
              </svg>
            </span>
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce'>
          <div className='w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center'>
            <div className='w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse'></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
