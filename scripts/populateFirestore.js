/**
 * Firestore Database Population Script
 *
 * This script automatically populates your Firestore database with project data
 * Run this script once to set up your projects collection
 */

import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  deleteDoc,
  getDocs,
  doc,
} from 'firebase/firestore';

// Firebase configuration (same as your main config)
const firebaseConfig = {
  apiKey: 'AIzaSyCIGcEBsK8gwf-R6CnMSFpJgZB_x5IhWbg',
  authDomain: 'personal-portfolio-585b2.firebaseapp.com',
  projectId: 'personal-portfolio-585b2',
  storageBucket: 'personal-portfolio-585b2.firebasestorage.app',
  messagingSenderId: '1025341263547',
  appId: '1:1025341263547:web:cfe27f1db36a673b32e39e',
  measurementId: 'G-KP3DW1GV4T',
};

// Initialize Firebase for this script
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Project data to populate
const projectsData = [
  // Featured Projects
  {
    title: 'Service Booking Platform',
    description:
      'A comprehensive MVP platform with real-time booking, secure payment gateway integration, business analytics, and loyalty rewards. Built for Upwork client proposal with modern UI/UX and scalable Firebase backend.',
    techStack: [
      'Next.js',
      'TypeScript',
      'Firebase',
      'Stripe',
      'Tailwind CSS',
      'Recharts',
    ],
    githubLink: 'https://github.com/samuelehab/service-booking-platform',
    liveLink: 'https://service-booking-demo.vercel.app',
    isFeatured: true,
    order: 1,
    category: 'Full-Stack Web Application',
  },
  {
    title: 'E-Commerce Dashboard',
    description:
      'Advanced admin dashboard with real-time analytics, inventory management, order processing, and customer insights. Features interactive charts, data visualization, and responsive design for mobile management.',
    techStack: [
      'React.js',
      'Node.js',
      'MongoDB',
      'Express.js',
      'Chart.js',
      'Material-UI',
    ],
    githubLink: 'https://github.com/samuelehab/ecommerce-dashboard',
    liveLink: 'https://ecommerce-admin-demo.vercel.app',
    isFeatured: true,
    order: 2,
    category: 'Dashboard & Analytics',
  },
  {
    title: 'Real-Time Chat Application',
    description:
      'Modern messaging platform with real-time communication, file sharing, group chats, and end-to-end encryption. Includes user authentication, message history, and mobile-responsive design.',
    techStack: [
      'React.js',
      'Socket.io',
      'Node.js',
      'PostgreSQL',
      'Redux',
      'JWT',
    ],
    githubLink: 'https://github.com/samuelehab/realtime-chat',
    liveLink: 'https://chat-app-demo.vercel.app',
    isFeatured: true,
    order: 3,
    category: 'Real-Time Application',
  },

  // Grid Projects (Non-featured)
  {
    title: 'Weather Forecast App',
    description:
      'Clean weather application with location-based forecasts, interactive maps, and detailed weather data visualization.',
    techStack: ['React.js', 'OpenWeather API', 'Tailwind CSS'],
    githubLink: 'https://github.com/samuelehab/weather-app',
    liveLink: 'https://weather-forecast-demo.vercel.app',
    isFeatured: false,
    order: 4,
    category: 'Frontend Application',
  },
  {
    title: 'Task Management System',
    description:
      'Productivity app with drag-and-drop functionality, team collaboration, and project timeline tracking.',
    techStack: ['Next.js', 'Prisma', 'PostgreSQL', 'Framer Motion'],
    githubLink: 'https://github.com/samuelehab/task-manager',
    liveLink: 'https://task-manager-demo.vercel.app',
    isFeatured: false,
    order: 5,
    category: 'Productivity Tool',
  },
  {
    title: 'Portfolio Website',
    description:
      'Responsive personal portfolio with modern animations, dark theme, and contact form integration.',
    techStack: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'Firebase'],
    githubLink: 'https://github.com/samuelehab/portfolio',
    liveLink: 'https://samuelehab-portfolio.vercel.app',
    isFeatured: false,
    order: 6,
    category: 'Personal Project',
  },
  {
    title: 'API Documentation Site',
    description:
      'Interactive API documentation with code examples, testing interface, and comprehensive guides.',
    techStack: ['Docusaurus', 'React.js', 'Markdown', 'OpenAPI'],
    githubLink: 'https://github.com/samuelehab/api-docs',
    liveLink: 'https://api-docs-demo.vercel.app',
    isFeatured: false,
    order: 7,
    category: 'Documentation',
  },
  {
    title: 'Expense Tracker',
    description:
      'Personal finance management app with budget tracking, expense categorization, and financial insights.',
    techStack: ['React Native', 'Firebase', 'Chart.js', 'Expo'],
    githubLink: 'https://github.com/samuelehab/expense-tracker',
    liveLink: 'https://expense-tracker-demo.vercel.app',
    isFeatured: false,
    order: 8,
    category: 'Mobile Application',
  },
  {
    title: 'Blog CMS',
    description:
      'Content management system with rich text editor, SEO optimization, and multi-author support.',
    techStack: ['Next.js', 'Sanity.io', 'TypeScript', 'SEO'],
    githubLink: 'https://github.com/samuelehab/blog-cms',
    liveLink: 'https://blog-cms-demo.vercel.app',
    isFeatured: false,
    order: 9,
    category: 'Content Management',
  },
];

// Function to clear existing projects
async function clearProjects() {
  try {
    const projectsCol = collection(db, 'projects');
    const snapshot = await getDocs(projectsCol);

    console.log(`🗑️  Clearing ${snapshot.docs.length} existing projects...`);

    const deletePromises = snapshot.docs.map(docSnapshot =>
      deleteDoc(doc(db, 'projects', docSnapshot.id))
    );

    await Promise.all(deletePromises);
    console.log('✅ Existing projects cleared successfully');
  } catch (error) {
    console.error('❌ Error clearing projects:', error);
  }
}

// Function to populate projects
async function populateProjects() {
  try {
    console.log(`📦 Adding ${projectsData.length} projects to Firestore...`);

    const addPromises = projectsData.map(async (project, index) => {
      try {
        const docRef = await addDoc(collection(db, 'projects'), project);
        console.log(
          `✅ Added project ${index + 1}/${projectsData.length}: ${project.title}`
        );
        return docRef;
      } catch (error) {
        console.error(`❌ Error adding project "${project.title}":`, error);
        throw error;
      }
    });

    await Promise.all(addPromises);
    console.log('🎉 All projects added successfully!');
  } catch (error) {
    console.error('❌ Error populating projects:', error);
  }
}

// Main function
async function main() {
  console.log('🚀 Starting Firestore population script...');
  console.log('📊 Target database: personal-portfolio-585b2');
  console.log('📁 Collection: projects');
  console.log('');

  try {
    // Clear existing projects
    await clearProjects();
    console.log('');

    // Add new projects
    await populateProjects();
    console.log('');

    console.log('🎉 Database population completed successfully!');
    console.log('');
    console.log('📊 Summary:');
    console.log(
      `   • Featured projects: ${projectsData.filter(p => p.isFeatured).length}`
    );
    console.log(
      `   • Grid projects: ${projectsData.filter(p => !p.isFeatured).length}`
    );
    console.log(`   • Total projects: ${projectsData.length}`);
    console.log('');
    console.log('✅ Your portfolio will now load projects from Firestore!');
  } catch (error) {
    console.error('💥 Script failed:', error);
    console.log('');
    console.log('🔧 Troubleshooting:');
    console.log('   1. Check your internet connection');
    console.log('   2. Verify Firebase configuration');
    console.log('   3. Ensure Firestore rules allow writes');
  }
}

// Run the script
if (typeof window === 'undefined') {
  // Only run in Node.js environment
  main();
} else {
  console.log('This script should be run in Node.js, not in the browser');
}

export { main as populateFirestore };
