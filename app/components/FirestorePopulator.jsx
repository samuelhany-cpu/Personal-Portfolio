'use client';

import { useState } from 'react';
import { collection, addDoc, deleteDoc, getDocs, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';

// Project data to populate
const projectsData = [
  // Featured Projects
  {
    title: "Service Booking Platform",
    description: "A comprehensive MVP platform with real-time booking, secure payment gateway integration, business analytics, and loyalty rewards. Built for Upwork client proposal with modern UI/UX and scalable Firebase backend.",
    techStack: ["Next.js", "TypeScript", "Firebase", "Stripe", "Tailwind CSS", "Recharts"],
    githubLink: "https://github.com/samuelehab/service-booking-platform",
    liveLink: "https://service-booking-demo.vercel.app",
    isFeatured: true,
    order: 1,
    category: "Full-Stack Web Application"
  },
  {
    title: "E-Commerce Dashboard",
    description: "Advanced admin dashboard with real-time analytics, inventory management, order processing, and customer insights. Features interactive charts, data visualization, and responsive design for mobile management.",
    techStack: ["React.js", "Node.js", "MongoDB", "Express.js", "Chart.js", "Material-UI"],
    githubLink: "https://github.com/samuelehab/ecommerce-dashboard",
    liveLink: "https://ecommerce-admin-demo.vercel.app",
    isFeatured: true,
    order: 2,
    category: "Dashboard & Analytics"
  },
  {
    title: "Real-Time Chat Application",
    description: "Modern messaging platform with real-time communication, file sharing, group chats, and end-to-end encryption. Includes user authentication, message history, and mobile-responsive design.",
    techStack: ["React.js", "Socket.io", "Node.js", "PostgreSQL", "Redux", "JWT"],
    githubLink: "https://github.com/samuelehab/realtime-chat",
    liveLink: "https://chat-app-demo.vercel.app",
    isFeatured: true,
    order: 3,
    category: "Real-Time Application"
  },
  
  // Grid Projects (Non-featured)
  {
    title: "Weather Forecast App",
    description: "Clean weather application with location-based forecasts, interactive maps, and detailed weather data visualization.",
    techStack: ["React.js", "OpenWeather API", "Tailwind CSS"],
    githubLink: "https://github.com/samuelehab/weather-app",
    liveLink: "https://weather-forecast-demo.vercel.app",
    isFeatured: false,
    order: 4,
    category: "Frontend Application"
  },
  {
    title: "Task Management System",
    description: "Productivity app with drag-and-drop functionality, team collaboration, and project timeline tracking.",
    techStack: ["Next.js", "Prisma", "PostgreSQL", "Framer Motion"],
    githubLink: "https://github.com/samuelehab/task-manager",
    liveLink: "https://task-manager-demo.vercel.app",
    isFeatured: false,
    order: 5,
    category: "Productivity Tool"
  },
  {
    title: "Portfolio Website",
    description: "Responsive personal portfolio with modern animations, dark theme, and contact form integration.",
    techStack: ["Next.js", "Tailwind CSS", "Framer Motion", "Firebase"],
    githubLink: "https://github.com/samuelehab/portfolio",
    liveLink: "https://samuelehab-portfolio.vercel.app",
    isFeatured: false,
    order: 6,
    category: "Personal Project"
  },
  {
    title: "API Documentation Site",
    description: "Interactive API documentation with code examples, testing interface, and comprehensive guides.",
    techStack: ["Docusaurus", "React.js", "Markdown", "OpenAPI"],
    githubLink: "https://github.com/samuelehab/api-docs",
    liveLink: "https://api-docs-demo.vercel.app",
    isFeatured: false,
    order: 7,
    category: "Documentation"
  },
  {
    title: "Expense Tracker",
    description: "Personal finance management app with budget tracking, expense categorization, and financial insights.",
    techStack: ["React Native", "Firebase", "Chart.js", "Expo"],
    githubLink: "https://github.com/samuelehab/expense-tracker",
    liveLink: "https://expense-tracker-demo.vercel.app",
    isFeatured: false,
    order: 8,
    category: "Mobile Application"
  },
  {
    title: "Blog CMS",
    description: "Content management system with rich text editor, SEO optimization, and multi-author support.",
    techStack: ["Next.js", "Sanity.io", "TypeScript", "SEO"],
    githubLink: "https://github.com/samuelehab/blog-cms",
    liveLink: "https://blog-cms-demo.vercel.app",
    isFeatured: false,
    order: 9,
    category: "Content Management"
  }
];

const FirestorePopulator = () => {
  const [isPopulating, setIsPopulating] = useState(false);
  const [status, setStatus] = useState('');
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState([]);

  const addLog = (message, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, { message, type, timestamp }]);
  };

  const clearProjects = async () => {
    try {
      const projectsCol = collection(db, 'projects');
      const snapshot = await getDocs(projectsCol);
      
      addLog(`🗑️ Clearing ${snapshot.docs.length} existing projects...`, 'info');
      
      const deletePromises = snapshot.docs.map(docSnapshot => 
        deleteDoc(doc(db, 'projects', docSnapshot.id))
      );
      
      await Promise.all(deletePromises);
      addLog('✅ Existing projects cleared successfully', 'success');
    } catch (error) {
      addLog(`❌ Error clearing projects: ${error.message}`, 'error');
      throw error;
    }
  };

  const populateProjects = async () => {
    try {
      addLog(`📦 Adding ${projectsData.length} projects to Firestore...`, 'info');
      
      for (let i = 0; i < projectsData.length; i++) {
        const project = projectsData[i];
        try {
          await addDoc(collection(db, 'projects'), project);
          setProgress(((i + 1) / projectsData.length) * 100);
          addLog(`✅ Added project ${i + 1}/${projectsData.length}: ${project.title}`, 'success');
        } catch (error) {
          addLog(`❌ Error adding project "${project.title}": ${error.message}`, 'error');
          throw error;
        }
      }
      
      addLog('🎉 All projects added successfully!', 'success');
    } catch (error) {
      addLog(`❌ Error populating projects: ${error.message}`, 'error');
      throw error;
    }
  };

  const handlePopulate = async () => {
    setIsPopulating(true);
    setStatus('Starting...');
    setProgress(0);
    setLogs([]);
    
    try {
      addLog('🚀 Starting Firestore population...', 'info');
      addLog('📊 Target database: personal-portfolio-585b2', 'info');
      addLog('📁 Collection: projects', 'info');
      
      setStatus('Clearing existing projects...');
      await clearProjects();
      
      setStatus('Adding new projects...');
      await populateProjects();
      
      setStatus('Completed!');
      setProgress(100);
      
      addLog('🎉 Database population completed successfully!', 'success');
      addLog(`📊 Summary: ${projectsData.filter(p => p.isFeatured).length} featured, ${projectsData.filter(p => !p.isFeatured).length} grid projects`, 'info');
      addLog('✅ Your portfolio will now load projects from Firestore!', 'success');
      
    } catch (error) {
      setStatus('Failed!');
      addLog(`💥 Population failed: ${error.message}`, 'error');
    } finally {
      setIsPopulating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-primary-900 text-gray-100">
      <div className="bg-primary-800/50 rounded-lg p-6 border border-primary-700/50">
        <h2 className="text-2xl font-heading font-bold text-accent-500 mb-4">
          🔥 Firestore Database Populator
        </h2>
        
        <p className="text-gray-300 mb-6">
          This tool will automatically populate your Firestore database with sample projects. 
          It will clear existing projects and add {projectsData.length} new projects 
          ({projectsData.filter(p => p.isFeatured).length} featured, {projectsData.filter(p => !p.isFeatured).length} grid).
        </p>

        {/* Status */}
        {status && (
          <div className="mb-4 p-3 bg-primary-700/50 rounded border border-primary-600/50">
            <p className="text-accent-500 font-mono text-sm">Status: {status}</p>
            {progress > 0 && (
              <div className="mt-2">
                <div className="bg-primary-600 rounded-full h-2">
                  <div 
                    className="bg-accent-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-400 mt-1">{Math.round(progress)}% complete</p>
              </div>
            )}
          </div>
        )}

        {/* Action Button */}
        <button
          onClick={handlePopulate}
          disabled={isPopulating}
          className={`
            px-6 py-3 rounded-lg font-semibold transition-all duration-300 
            ${isPopulating 
              ? 'bg-gray-600 cursor-not-allowed text-gray-400' 
              : 'bg-accent-500 hover:bg-accent-400 text-primary-900 transform hover:scale-105'
            }
          `}
        >
          {isPopulating ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Populating Database...
            </span>
          ) : (
            '🚀 Populate Firestore Database'
          )}
        </button>

        {/* Logs */}
        {logs.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-200 mb-3">📋 Logs</h3>
            <div className="bg-primary-950 rounded p-4 max-h-64 overflow-y-auto border border-primary-700/30">
              {logs.map((log, index) => (
                <div key={index} className="flex items-start space-x-2 mb-1 text-sm font-mono">
                  <span className="text-gray-500 text-xs">[{log.timestamp}]</span>
                  <span className={`
                    ${log.type === 'success' ? 'text-green-400' : 
                      log.type === 'error' ? 'text-red-400' : 
                      'text-gray-300'}
                  `}>
                    {log.message}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Project Preview */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-200 mb-3">📦 Projects to be added</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {projectsData.slice(0, 6).map((project, index) => (
              <div key={index} className="bg-primary-700/30 rounded p-3 border border-primary-600/30">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-200 text-sm">{project.title}</h4>
                  {project.isFeatured && (
                    <span className="text-xs bg-accent-500/20 text-accent-500 px-2 py-1 rounded">Featured</span>
                  )}
                </div>
                <p className="text-xs text-gray-400 mb-2">{project.category}</p>
                <div className="flex flex-wrap gap-1">
                  {project.techStack.slice(0, 3).map((tech, techIndex) => (
                    <span key={techIndex} className="text-xs bg-primary-600/50 text-gray-300 px-1 py-0.5 rounded">
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 3 && (
                    <span className="text-xs text-gray-500">+{project.techStack.length - 3}</span>
                  )}
                </div>
              </div>
            ))}
            {projectsData.length > 6 && (
              <div className="bg-primary-700/30 rounded p-3 border border-primary-600/30 flex items-center justify-center">
                <span className="text-gray-400 text-sm">+{projectsData.length - 6} more projects...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirestorePopulator;
