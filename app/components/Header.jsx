'use client';

import { useState, useEffect } from 'react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'about', label: '01. About', href: '#about' },
    { id: 'skills', label: '02. Skills', href: '#skills' },
    { id: 'projects', label: '03. Projects', href: '#projects' },
    { id: 'contact', label: '04. Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);

      // Update active section based on scroll position
      const sections = navItems.map(item => item.id);
      const sectionElements = sections.map(id => document.getElementById(id));

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i];
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    const handleClickOutside = (event) => {
      const header = document.querySelector('header');
      if (header && !header.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const elementId = href.substring(1); // Remove the '#'
    smoothScrollTo(elementId);
    setIsMobileMenuOpen(false); // Close mobile menu when a link is clicked
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/95 backdrop-blur-md shadow-lg border-b-2 border-white'
          : 'bg-transparent'
      }`}
    >
      <nav className='container mx-auto px-6 py-4'>
        <div className='flex items-center justify-between'>
          {/* Logo/Brand */}
          <div
            className='text-xl font-heading font-bold text-accent-500 cursor-pointer'
            onClick={() => smoothScrollTo('hero')}
          >
            &lt;Developer /&gt;
          </div>

          {/* Desktop Navigation */}
          <ul className='hidden md:flex items-center space-x-8'>
            {navItems.map(item => (
              <li key={item.id}>
                <a
                  href={item.href}
                  onClick={e => handleNavClick(e, item.href)}
                  className={`text-sm font-mono transition-colors duration-300 hover:text-accent-500 ${
                    activeSection === item.id
                      ? 'text-accent-500'
                      : 'text-white'
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href='/resume.pdf'
                target='_blank'
                rel='noopener noreferrer'
                className='ml-4 px-4 py-2 border border-accent-500 text-accent-500 rounded text-sm font-mono transition-all duration-300 hover:bg-accent-500 hover:text-primary-900'
              >
                Resume
              </a>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            className='md:hidden text-white hover:text-accent-500 transition-colors duration-300'
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              ) : (
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 6h16M4 12h16M4 18h16'
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen 
            ? 'max-h-96 opacity-100 mt-4' 
            : 'max-h-0 opacity-0'
        }`}>
          <div className='space-y-2 py-4 bg-black/95 rounded-lg border-2 border-white mt-4'>
            {navItems.map(item => (
              <a
                key={item.id}
                href={item.href}
                onClick={e => handleNavClick(e, item.href)}
                className={`block text-sm font-mono py-2 px-4 transition-colors duration-300 hover:text-accent-500 hover:bg-white/10 rounded ${
                  activeSection === item.id ? 'text-accent-500' : 'text-white'
                }`}
              >
                {item.label}
              </a>
            ))}
            <a
              href='/resume.pdf'
              target='_blank'
              rel='noopener noreferrer'
              className='inline-block mt-4 mx-4 px-4 py-2 border-2 border-accent-500 text-accent-500 rounded text-sm font-mono transition-all duration-300 hover:bg-accent-500 hover:text-black'
            >
              Resume
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
