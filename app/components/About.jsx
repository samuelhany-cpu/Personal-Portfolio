'use client';

import { useState, useEffect } from 'react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    const aboutSection = document.getElementById('about');
    if (aboutSection) observer.observe(aboutSection);

    return () => observer.disconnect();
  }, []);

  const highlights = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Fast Development",
      description: "Rapid prototyping and efficient development cycles"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Quality Assured",
      description: "Clean, scalable code with best practices"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
        </svg>
      ),
      title: "Modern Tech",
      description: "Latest frameworks and cutting-edge technologies"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Team Player",
      description: "Excellent communication and collaboration skills"
    }
  ];

  return (
    <section id="about" className="py-20 bg-primary-900 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 -left-48 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 -right-48 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-gray-100 mb-4">
            About <span className="text-accent-500">Me</span>
          </h2>
          <div className="w-20 h-1 bg-accent-500 mx-auto"></div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content Side */}
            <div
              className={`
                space-y-6 transition-all duration-700 transform
                ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'}
              `}
            >
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p className="text-lg">
                  Hello! I'm a passionate <span className="text-accent-500 font-semibold">Full-Stack Developer</span> with 
                  over 3 years of experience creating digital solutions that make a difference. 
                  My journey in web development started with curiosity and has evolved into a 
                  love for crafting efficient, scalable applications.
                </p>
                
                <p>
                  I specialize in modern JavaScript frameworks, particularly <span className="text-accent-500">React</span> and 
                  <span className="text-accent-500"> Next.js</span>, combined with robust backend technologies like 
                  <span className="text-accent-500"> Node.js</span> and various databases. I'm passionate about 
                  writing clean, maintainable code and staying updated with the latest industry trends.
                </p>
                
                <p>
                  When I'm not coding, you'll find me exploring new technologies, contributing to open-source 
                  projects, or sharing knowledge with the developer community. I believe in continuous learning 
                  and the power of collaboration to solve complex problems.
                </p>
              </div>

              {/* Quick Facts */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="space-y-2">
                  <p className="text-accent-500 font-mono text-sm">Location</p>
                  <p className="text-gray-300">Remote / Global</p>
                </div>
                <div className="space-y-2">
                  <p className="text-accent-500 font-mono text-sm">Experience</p>
                  <p className="text-gray-300">3+ Years</p>
                </div>
                <div className="space-y-2">
                  <p className="text-accent-500 font-mono text-sm">Focus</p>
                  <p className="text-gray-300">Full-Stack Development</p>
                </div>
                <div className="space-y-2">
                  <p className="text-accent-500 font-mono text-sm">Availability</p>
                  <p className="text-gray-300">Open to Projects</p>
                </div>
              </div>
            </div>

            {/* Image/Visual Side */}
            <div
              className={`
                relative transition-all duration-700 transform
                ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'}
              `}
            >
              {/* Profile Image Placeholder */}
              <div className="relative w-80 h-80 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-accent-500/20 to-primary-800 rounded-lg transform rotate-6"></div>
                <div className="relative bg-primary-800 rounded-lg p-8 flex items-center justify-center border border-primary-700/50">
                  <div className="text-accent-500/60 text-6xl">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-32 h-32">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Highlights Grid */}
          <div className="mt-20">
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-gray-100 text-center mb-12">
              What I Bring to <span className="text-accent-500">Your Project</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {highlights.map((highlight, index) => (
                <div
                  key={highlight.title}
                  className={`
                    text-center p-6 rounded-lg bg-primary-800/30 border border-primary-700/30 
                    transition-all duration-700 transform hover:bg-primary-800/50 hover:border-accent-500/50 
                    hover:scale-105 hover:shadow-lg hover:shadow-accent-500/10
                    ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
                  `}
                  style={{ transitionDelay: `${600 + index * 150}ms` }}
                >
                  <div className="text-accent-500 mb-4 flex justify-center">
                    {highlight.icon}
                  </div>
                  <h4 className="text-lg font-heading font-semibold text-gray-100 mb-2">
                    {highlight.title}
                  </h4>
                  <p className="text-gray-400 text-sm">
                    {highlight.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;