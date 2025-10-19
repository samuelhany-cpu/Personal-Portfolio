'use client';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com/yourusername',
      icon: (
        <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
          <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/yourusername',
      icon: (
        <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
          <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
        </svg>
      ),
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/yourusername',
      icon: (
        <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
          <path d='M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' />
        </svg>
      ),
    },
    {
      name: 'Email',
      href: 'mailto:your.email@example.com',
      icon: (
        <svg
          className='w-5 h-5'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
          />
        </svg>
      ),
    },
  ];

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

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
  };

  return (
    <footer className='bg-black border-t-2 border-white relative'>
      {/* Background Pattern */}
      <div className='absolute inset-0 opacity-5'>
        <div
          className='absolute inset-0'
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2364FFDA' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className='container mx-auto px-6 py-12 relative z-10'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8'>
          {/* Brand Section */}
          <div className='lg:col-span-2'>
            <div className='mb-4'>
              <h3 className='text-xl font-heading font-bold text-accent-500 mb-2'>
                &lt;Developer /&gt;
              </h3>
              <p className='text-white leading-relaxed max-w-md'>
                Full-Stack Developer passionate about creating exceptional
                digital experiences with modern technologies and clean, scalable
                code.
              </p>
            </div>

            {/* Social Links */}
            <div className='flex space-x-4'>
              {socialLinks.map(social => (
                <a
                  key={social.name}
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : '_self'}
                  rel={
                    social.href.startsWith('http') ? 'noopener noreferrer' : ''
                  }
                  className='p-3 bg-black border-2 border-white rounded-lg text-white hover:text-accent-500 hover:border-accent-500 hover:bg-black transition-all duration-300 transform hover:scale-110'
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className='text-lg font-heading font-semibold text-white mb-4'>
              Quick Links
            </h4>
            <ul className='space-y-2'>
              {quickLinks.map(link => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={e => handleNavClick(e, link.href)}
                    className='text-white hover:text-accent-500 transition-colors duration-300 text-sm'
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className='text-lg font-heading font-semibold text-white mb-4'>
              Resources
            </h4>
            <ul className='space-y-2'>
              <li>
                <a
                  href='/resume.pdf'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-white hover:text-accent-500 transition-colors duration-300 text-sm'
                >
                  Resume
                </a>
              </li>
              <li>
                <a
                  href='https://github.com/yourusername'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-white hover:text-accent-500 transition-colors duration-300 text-sm'
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href='https://linkedin.com/in/yourusername'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-white hover:text-accent-500 transition-colors duration-300 text-sm'
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className='pt-8 border-t-2 border-white'>
          <div className='flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0'>
            <div className='flex items-center space-x-4 text-sm text-white'>
              <span>© {currentYear} John Developer. All rights reserved.</span>
            </div>

            <div className='flex items-center space-x-6 text-sm text-white'>
              <span className='flex items-center'>
                Built with
                <span className='text-accent-500 mx-1'>❤️</span>
                using Next.js & Tailwind CSS
              </span>
            </div>
          </div>
        </div>

        {/* Back to Top Button */}
        <div className='absolute bottom-8 right-8'>
          <button
            onClick={() => smoothScrollTo('hero')}
            className='p-3 bg-accent-500 text-primary-900 rounded-full hover:bg-accent-400 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-accent-500/25'
            aria-label='Back to top'
          >
            <svg
              className='w-5 h-5'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M5 10l7-7m0 0l7 7m-7-7v18'
              />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
