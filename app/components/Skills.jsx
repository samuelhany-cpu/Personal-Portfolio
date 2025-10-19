'use client';

import { skillsData, skillCategories } from '../data/skillsData';
import { useState, useEffect } from 'react';

const Skills = () => {
  const [visibleSkills, setVisibleSkills] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const categoryName = entry.target.getAttribute('data-category');
            setVisibleSkills(prev => ({
              ...prev,
              [categoryName]: true,
            }));
          }
        });
      },
      { threshold: 0.3 }
    );

    // Observe all skill category elements
    skillCategories.forEach(category => {
      const element = document.querySelector(`[data-category="${category}"]`);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const SkillItem = ({ skill, index, isVisible }) => (
    <div
      className={`
        flex items-center space-x-3 p-3 rounded-lg bg-primary-800/50 border border-primary-700/50 
        transition-all duration-500 transform hover:bg-primary-800 hover:border-accent-500/50 
        hover:scale-105 hover:shadow-lg hover:shadow-accent-500/10
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
      `}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className='w-2 h-2 bg-accent-500 rounded-full flex-shrink-0'></div>
      <span className='text-gray-300 font-medium text-sm md:text-base'>
        {skill}
      </span>
    </div>
  );

  const CategorySection = ({ category, skills, index }) => {
    const isVisible = visibleSkills[category];

    return (
      <div
        data-category={category}
        className={`
          transition-all duration-700 transform
          ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }
        `}
        style={{ transitionDelay: `${index * 200}ms` }}
      >
        <h3 className='text-xl md:text-2xl font-heading font-semibold text-accent-500 mb-6 flex items-center'>
          <span className='text-accent-500/60 font-mono text-sm mr-3'>
            0{index + 1}.
          </span>
          {category}
        </h3>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4'>
          {skills.map((skill, skillIndex) => (
            <SkillItem
              key={skill}
              skill={skill}
              index={skillIndex}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <section id='skills' className='py-20 bg-primary-900 relative'>
      {/* Background Elements */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute top-1/4 -left-64 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl'></div>
        <div className='absolute bottom-1/4 -right-64 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl'></div>
      </div>

      <div className='container mx-auto px-6 relative z-10'>
        {/* Section Header */}
        <div className='text-center mb-16'>
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-gray-100 mb-4'>
            Technical <span className='text-accent-500'>Skills</span>
          </h2>
          <p className='text-lg md:text-xl text-gray-400 max-w-3xl mx-auto'>
            A comprehensive toolkit of modern technologies and frameworks I use
            to build scalable, efficient, and user-friendly applications.
          </p>
          <div className='w-20 h-1 bg-accent-500 mx-auto mt-6'></div>
        </div>

        {/* Skills Grid */}
        <div className='max-w-6xl mx-auto'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16'>
            {skillCategories.map((category, index) => (
              <CategorySection
                key={category}
                category={category}
                skills={skillsData[category]}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <div className='mt-20 text-center'>
          <div className='inline-flex items-center space-x-4 px-6 py-3 bg-primary-800/50 rounded-lg border border-primary-700/50'>
            <div className='w-3 h-3 bg-accent-500 rounded-full animate-pulse'></div>
            <span className='text-gray-300 font-mono text-sm'>
              Always learning and exploring new technologies
            </span>
          </div>
        </div>

        {/* Stats Section */}
        <div className='mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto'>
          {[
            { number: '3+', label: 'Years Experience' },
            { number: '25+', label: 'Projects Completed' },
            { number: '15+', label: 'Technologies' },
            { number: '100%', label: 'Client Satisfaction' },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className='text-center p-4 rounded-lg bg-primary-800/30 border border-primary-700/30'
            >
              <div className='text-2xl md:text-3xl font-bold text-accent-500 mb-2'>
                {stat.number}
              </div>
              <div className='text-gray-400 text-sm md:text-base font-medium'>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
