'use client';

import { useState } from 'react';

const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`
        group relative bg-primary-800/50 backdrop-blur-sm rounded-lg border border-primary-700/50 
        overflow-hidden transition-all duration-500 transform hover:scale-105 hover:shadow-2xl 
        hover:shadow-accent-500/20 hover:border-accent-500/50
        ${isHovered ? 'bg-primary-800/70' : ''}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        animationDelay: `${index * 150}ms`,
        transform: isHovered
          ? 'translateY(-8px) scale(1.02)'
          : 'translateY(0) scale(1)',
      }}
    >
      {/* Project Image Placeholder */}
      <div className='relative h-48 bg-gradient-to-br from-primary-700 to-primary-800 overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-br from-accent-500/20 to-transparent'></div>
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='text-accent-500/60 text-4xl'>
            <svg
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              className='w-16 h-16'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={1.5}
                d='M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z'
              />
            </svg>
          </div>
        </div>

        {/* Hover Overlay */}
        <div
          className={`
          absolute inset-0 bg-primary-900/90 flex items-center justify-center space-x-4
          transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}
        `}
        >
          <a
            href={project.githubLink}
            target='_blank'
            rel='noopener noreferrer'
            className='p-3 bg-accent-500 text-primary-900 rounded-full hover:bg-accent-400 transition-colors duration-300'
            onClick={e => e.stopPropagation()}
          >
            <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
              <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
            </svg>
          </a>

          {project.liveLink && (
            <a
              href={project.liveLink}
              target='_blank'
              rel='noopener noreferrer'
              className='p-3 bg-accent-500 text-primary-900 rounded-full hover:bg-accent-400 transition-colors duration-300'
              onClick={e => e.stopPropagation()}
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
                  d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
                />
              </svg>
            </a>
          )}
        </div>
      </div>

      {/* Project Content */}
      <div className='p-6'>
        {/* Category Badge */}
        <div className='flex items-center justify-between mb-3'>
          <span className='text-xs font-mono text-accent-500 bg-accent-500/10 px-2 py-1 rounded'>
            {project.category}
          </span>
        </div>

        {/* Project Title */}
        <h3 className='text-xl font-heading font-semibold text-gray-100 mb-3 group-hover:text-accent-500 transition-colors duration-300'>
          {project.title}
        </h3>

        {/* Project Description */}
        <p className='text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3'>
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className='flex flex-wrap gap-2 mb-4'>
          {project.techStack.map(tech => (
            <span
              key={tech}
              className='text-xs bg-primary-700/50 text-gray-300 px-2 py-1 rounded border border-primary-600/50 hover:border-accent-500/50 hover:text-accent-500 transition-all duration-300'
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Project Links */}
        <div className='flex items-center space-x-4 pt-2 border-t border-primary-700/50'>
          <a
            href={project.githubLink}
            target='_blank'
            rel='noopener noreferrer'
            className='text-gray-400 hover:text-accent-500 transition-colors duration-300 text-sm font-mono flex items-center'
          >
            <svg
              className='w-4 h-4 mr-1'
              fill='currentColor'
              viewBox='0 0 24 24'
            >
              <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
            </svg>
            Code
          </a>

          {project.liveLink && (
            <a
              href={project.liveLink}
              target='_blank'
              rel='noopener noreferrer'
              className='text-gray-400 hover:text-accent-500 transition-colors duration-300 text-sm font-mono flex items-center'
            >
              <svg
                className='w-4 h-4 mr-1'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
                />
              </svg>
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
