'use client';

import { useState, useEffect } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    const contactSection = document.getElementById('contact');
    if (contactSection) observer.observe(contactSection);

    return () => observer.disconnect();
  }, []);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      // Save to Firestore
      const docData = {
        name: formData.name,
        email: formData.email,
        subject: formData.subject || 'Portfolio Contact Form',
        message: formData.message,
        submittedAt: serverTimestamp(),
      };

      await addDoc(collection(db, 'contactSubmissions'), docData);

      // Reset form on success
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitStatus('success');
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: (
        <svg
          className='w-6 h-6'
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
      title: 'Email',
      value: 'your.email@example.com',
      href: 'mailto:your.email@example.com',
    },
    {
      icon: (
        <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 24 24'>
          <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
        </svg>
      ),
      title: 'GitHub',
      value: 'github.com/yourusername',
      href: 'https://github.com/yourusername',
    },
    {
      icon: (
        <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 24 24'>
          <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
        </svg>
      ),
      title: 'LinkedIn',
      value: 'linkedin.com/in/yourusername',
      href: 'https://linkedin.com/in/yourusername',
    },
  ];

  return (
    <section id='contact' className='py-20 bg-primary-900 relative'>
      {/* Background Elements */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl'></div>
        <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl'></div>
      </div>

      <div className='container mx-auto px-6 relative z-10'>
        {/* Section Header */}
        <div className='text-center mb-16'>
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-gray-100 mb-4'>
            Get In <span className='text-accent-500'>Touch</span>
          </h2>
          <p className='text-lg md:text-xl text-gray-400 max-w-3xl mx-auto'>
            Have a project in mind or want to collaborate? I'd love to hear from
            you. Let's create something amazing together.
          </p>
          <div className='w-20 h-1 bg-accent-500 mx-auto mt-6'></div>
        </div>

        <div className='max-w-6xl mx-auto'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16'>
            {/* Contact Info */}
            <div
              className={`
                space-y-8 transition-all duration-700 transform
                ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'}
              `}
            >
              <div>
                <h3 className='text-2xl font-heading font-semibold text-gray-100 mb-4'>
                  Let's start a conversation
                </h3>
                <p className='text-gray-300 leading-relaxed mb-8'>
                  I'm always interested in new opportunities, whether it's a
                  full-time position, freelance project, or just a chat about
                  technology. Don't hesitate to reach out!
                </p>
              </div>

              {/* Contact Methods */}
              <div className='space-y-6'>
                {contactMethods.map((method, index) => (
                  <a
                    key={method.title}
                    href={method.href}
                    target={method.href.startsWith('http') ? '_blank' : '_self'}
                    rel={
                      method.href.startsWith('http')
                        ? 'noopener noreferrer'
                        : ''
                    }
                    className={`
                      flex items-center space-x-4 p-4 rounded-lg bg-primary-800/30 border border-primary-700/30 
                      transition-all duration-500 hover:bg-primary-800/50 hover:border-accent-500/50 
                      hover:scale-105 transform hover:shadow-lg hover:shadow-accent-500/10
                      ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
                    `}
                    style={{ transitionDelay: `${index * 150}ms` }}
                  >
                    <div className='text-accent-500 flex-shrink-0'>
                      {method.icon}
                    </div>
                    <div>
                      <div className='text-gray-100 font-medium'>
                        {method.title}
                      </div>
                      <div className='text-gray-400 text-sm'>
                        {method.value}
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Call to Action */}
              <div className='pt-6 border-t border-primary-700/50'>
                <p className='text-accent-500 font-mono text-sm mb-2'>
                  Quick Response
                </p>
                <p className='text-gray-300'>
                  I typically respond within 24 hours. For urgent inquiries,
                  feel free to reach out via email directly.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div
              className={`
                transition-all duration-700 transform
                ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'}
              `}
            >
              <form onSubmit={handleSubmit} className='space-y-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div>
                    <label
                      htmlFor='name'
                      className='block text-gray-300 font-medium mb-2'
                    >
                      Name *
                    </label>
                    <input
                      type='text'
                      id='name'
                      name='name'
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className='w-full px-4 py-3 bg-primary-800/50 border border-primary-700/50 rounded-lg text-gray-100 placeholder-gray-500 focus:border-accent-500 focus:ring-1 focus:ring-accent-500 focus:outline-none transition-colors duration-300'
                      placeholder='Your name'
                    />
                  </div>

                  <div>
                    <label
                      htmlFor='email'
                      className='block text-gray-300 font-medium mb-2'
                    >
                      Email *
                    </label>
                    <input
                      type='email'
                      id='email'
                      name='email'
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className='w-full px-4 py-3 bg-primary-800/50 border border-primary-700/50 rounded-lg text-gray-100 placeholder-gray-500 focus:border-accent-500 focus:ring-1 focus:ring-accent-500 focus:outline-none transition-colors duration-300'
                      placeholder='your.email@example.com'
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor='subject'
                    className='block text-gray-300 font-medium mb-2'
                  >
                    Subject
                  </label>
                  <input
                    type='text'
                    id='subject'
                    name='subject'
                    value={formData.subject}
                    onChange={handleInputChange}
                    className='w-full px-4 py-3 bg-primary-800/50 border border-primary-700/50 rounded-lg text-gray-100 placeholder-gray-500 focus:border-accent-500 focus:ring-1 focus:ring-accent-500 focus:outline-none transition-colors duration-300'
                    placeholder='Project inquiry'
                  />
                </div>

                <div>
                  <label
                    htmlFor='message'
                    className='block text-gray-300 font-medium mb-2'
                  >
                    Message *
                  </label>
                  <textarea
                    id='message'
                    name='message'
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className='w-full px-4 py-3 bg-primary-800/50 border border-primary-700/50 rounded-lg text-gray-100 placeholder-gray-500 focus:border-accent-500 focus:ring-1 focus:ring-accent-500 focus:outline-none transition-colors duration-300 resize-vertical'
                    placeholder='Tell me about your project...'
                  />
                </div>

                {/* Submit Button */}
                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='w-full px-8 py-4 bg-accent-500 text-primary-900 rounded-lg font-semibold transition-all duration-300 hover:bg-accent-400 hover:shadow-lg hover:shadow-accent-500/25 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
                >
                  {isSubmitting ? (
                    <span className='flex items-center justify-center'>
                      <svg
                        className='animate-spin -ml-1 mr-3 h-5 w-5'
                        fill='none'
                        viewBox='0 0 24 24'
                      >
                        <circle
                          className='opacity-25'
                          cx='12'
                          cy='12'
                          r='10'
                          stroke='currentColor'
                          strokeWidth='4'
                        ></circle>
                        <path
                          className='opacity-75'
                          fill='currentColor'
                          d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                        ></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span className='flex items-center justify-center'>
                      Send Message
                      <svg
                        className='ml-2 w-5 h-5'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M12 19l9 2-9-18-9 18 9-2zm0 0v-8'
                        />
                      </svg>
                    </span>
                  )}
                </button>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className='p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-center'>
                    Thanks for your message! I'll get back to you soon.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className='p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-center'>
                    Something went wrong. Please try again or email me directly.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
