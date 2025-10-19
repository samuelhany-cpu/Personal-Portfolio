'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import ProjectCard from './ProjectCard';

const Projects = () => {
  const [visibleProjects, setVisibleProjects] = useState(new Set());
  const [projects, setProjects] = useState({ featured: [], grid: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const projectsCol = collection(db, 'projects');
        const q = query(projectsCol, orderBy('order', 'asc'));
        const projectSnapshot = await getDocs(q);
        const projectList = projectSnapshot.docs.map(doc => ({ 
          id: doc.id, 
          ...doc.data() 
        }));

        // Separate featured and grid projects
        const featuredProjects = projectList.filter(project => project.isFeatured);
        const gridProjects = projectList.filter(project => !project.isFeatured);

        setProjects({
          featured: featuredProjects,
          grid: gridProjects
        });
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects. Please try again later.');
        
        // Fallback to static data if Firebase fails
        try {
          const { projectsData } = await import('../data/projectsData');
          setProjects(projectsData);
        } catch (fallbackErr) {
          console.error('Failed to load fallback data:', fallbackErr);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const projectId = entry.target.getAttribute('data-project-id');
            setVisibleProjects(prev => new Set([...prev, projectId]));
          }
        });
      },
      { threshold: 0.2 }
    );

    // Observe all project elements
    const projectElements = document.querySelectorAll('[data-project-id]');
    projectElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [projects]); // Re-run when projects load

  const FeaturedProject = ({ project, index, isReverse = false }) => {
    const isVisible = visibleProjects.has(`featured-${project.id}`);
    
    return (
      <div
        data-project-id={`featured-${project.id}`}
        className={`
          grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-20
          transition-all duration-700 transform
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}
          ${isReverse ? 'lg:grid-flow-col-dense' : ''}
        `}
        style={{ transitionDelay: `${index * 200}ms` }}
      >
        {/* Project Image */}
        <div className={`relative group ${isReverse ? 'lg:col-start-2' : ''}`}>
          <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-primary-700 to-primary-800 shadow-2xl">
            {/* Image Placeholder */}
            <div className="aspect-video bg-gradient-to-br from-accent-500/20 to-transparent flex items-center justify-center">
              <div className="text-accent-500/40 text-6xl">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-24 h-24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                </svg>
              </div>
            </div>
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-accent-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          
          {/* Floating Action Buttons */}
          <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-primary-900/90 backdrop-blur-sm text-accent-500 rounded-full hover:bg-accent-500 hover:text-primary-900 transition-all duration-300 transform hover:scale-110"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-primary-900/90 backdrop-blur-sm text-accent-500 rounded-full hover:bg-accent-500 hover:text-primary-900 transition-all duration-300 transform hover:scale-110"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* Project Content */}
        <div className={`space-y-6 ${isReverse ? 'lg:col-start-1 lg:text-right' : ''}`}>
          <div>
            <p className="text-accent-500 font-mono text-sm mb-2">Featured Project</p>
            <h3 className="text-2xl lg:text-3xl font-heading font-bold text-gray-100 mb-4">
              {project.title}
            </h3>
          </div>
          
          <div className="bg-primary-800/50 backdrop-blur-sm p-6 rounded-lg border border-primary-700/50 shadow-lg">
            <p className="text-gray-300 leading-relaxed">
              {project.description}
            </p>
          </div>
          
          <div className={`flex flex-wrap gap-3 ${isReverse ? 'lg:justify-end' : ''}`}>
            {project.techStack && project.techStack.map((tech) => (
              <span
                key={tech}
                className="text-sm font-mono text-gray-300 hover:text-accent-500 transition-colors duration-300"
              >
                {tech}
              </span>
            ))}
          </div>
          
          <div className={`flex space-x-6 ${isReverse ? 'lg:justify-end' : ''}`}>
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-accent-500 transition-colors duration-300"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-accent-500 transition-colors duration-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="projects" className="py-20 bg-primary-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-gray-100 mb-4">
            Featured <span className="text-accent-500">Projects</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
            A showcase of my recent work, demonstrating expertise in full-stack development,
            modern frameworks, and scalable architecture.
          </p>
          <div className="w-20 h-1 bg-accent-500 mx-auto mt-6"></div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <div className="inline-flex items-center space-x-4 px-6 py-3 bg-primary-800/50 rounded-lg border border-primary-700/50">
              <div className="w-6 h-6 border-2 border-accent-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-gray-300 font-mono">Loading projects from Firebase...</span>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-20">
            <div className="inline-flex items-center space-x-4 px-6 py-3 bg-red-500/10 rounded-lg border border-red-500/20">
              <span className="text-red-400 font-mono">{error}</span>
            </div>
          </div>
        )}

        {/* Projects Content */}
        {!loading && !error && (
          <>
            {/* Featured Projects */}
            {projects.featured.length > 0 && (
              <div className="max-w-6xl mx-auto mb-20">
                {projects.featured.map((project, index) => (
                  <FeaturedProject
                    key={project.id}
                    project={project}
                    index={index}
                    isReverse={index % 2 === 1}
                  />
                ))}
              </div>
            )}

            {/* Other Projects Grid */}
            {projects.grid.length > 0 && (
              <div className="max-w-6xl mx-auto">
                <h3 className="text-2xl md:text-3xl font-heading font-bold text-gray-100 text-center mb-12">
                  Other <span className="text-accent-500">Projects</span>
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {projects.grid.map((project, index) => (
                    <div
                      key={project.id}
                      data-project-id={`grid-${project.id}`}
                      className={`
                        transition-all duration-700 transform
                        ${visibleProjects.has(`grid-${project.id}`) 
                          ? 'translate-y-0 opacity-100' 
                          : 'translate-y-12 opacity-0'
                        }
                      `}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <ProjectCard project={project} index={index} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* View More Section */}
            <div className="text-center mt-16">
              <p className="text-gray-400 mb-6">
                Want to see more? Check out my GitHub for additional projects and contributions.
              </p>
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-transparent border-2 border-accent-500 text-accent-500 rounded-lg font-mono transition-all duration-300 hover:bg-accent-500 hover:text-primary-900 transform hover:scale-105"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                View GitHub Profile
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Projects;
