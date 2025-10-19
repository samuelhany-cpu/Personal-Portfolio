export const projectsData = {
  featured: [
    {
      id: 1,
      title: "Service Booking Platform",
      description: "A comprehensive MVP platform with real-time booking, secure payment gateway integration, business analytics, and loyalty rewards. Built for Upwork client proposal with modern UI/UX and scalable Firebase backend.",
      techStack: ["Next.js", "TypeScript", "Firebase", "Stripe", "Tailwind CSS", "Recharts"],
      githubLink: "https://github.com/yourusername/service-booking-platform",
      liveLink: "https://service-booking-demo.vercel.app",
      imageURL: "/images/service-booking-platform.jpg",
      featured: true,
      category: "Full-Stack Web Application"
    },
    {
      id: 2,
      title: "E-Commerce Dashboard",
      description: "Advanced admin dashboard with real-time analytics, inventory management, order processing, and customer insights. Features interactive charts, data visualization, and responsive design for mobile management.",
      techStack: ["React.js", "Node.js", "MongoDB", "Express.js", "Chart.js", "Material-UI"],
      githubLink: "https://github.com/yourusername/ecommerce-dashboard",
      liveLink: "https://ecommerce-admin-demo.vercel.app",
      imageURL: "/images/ecommerce-dashboard.jpg",
      featured: true,
      category: "Dashboard & Analytics"
    },
    {
      id: 3,
      title: "Real-Time Chat Application",
      description: "Modern messaging platform with real-time communication, file sharing, group chats, and end-to-end encryption. Includes user authentication, message history, and mobile-responsive design.",
      techStack: ["React.js", "Socket.io", "Node.js", "PostgreSQL", "Redux", "JWT"],
      githubLink: "https://github.com/yourusername/realtime-chat",
      liveLink: "https://chat-app-demo.vercel.app",
      imageURL: "/images/chat-application.jpg",
      featured: true,
      category: "Real-Time Application"
    }
  ],
  grid: [
    {
      id: 4,
      title: "Weather Forecast App",
      description: "Clean weather application with location-based forecasts, interactive maps, and detailed weather data visualization.",
      techStack: ["React.js", "OpenWeather API", "Tailwind CSS"],
      githubLink: "https://github.com/yourusername/weather-app",
      liveLink: "https://weather-forecast-demo.vercel.app",
      imageURL: "/images/weather-app.jpg",
      category: "Frontend Application"
    },
    {
      id: 5,
      title: "Task Management System",
      description: "Productivity app with drag-and-drop functionality, team collaboration, and project timeline tracking.",
      techStack: ["Next.js", "Prisma", "PostgreSQL", "Framer Motion"],
      githubLink: "https://github.com/yourusername/task-manager",
      liveLink: "https://task-manager-demo.vercel.app",
      imageURL: "/images/task-manager.jpg",
      category: "Productivity Tool"
    },
    {
      id: 6,
      title: "Portfolio Website",
      description: "Responsive personal portfolio with modern animations, dark theme, and contact form integration.",
      techStack: ["Next.js", "Tailwind CSS", "Framer Motion", "Nodemailer"],
      githubLink: "https://github.com/yourusername/portfolio",
      liveLink: "https://your-portfolio.vercel.app",
      imageURL: "/images/portfolio.jpg",
      category: "Personal Project"
    },
    {
      id: 7,
      title: "API Documentation Site",
      description: "Interactive API documentation with code examples, testing interface, and comprehensive guides.",
      techStack: ["Docusaurus", "React.js", "Markdown", "OpenAPI"],
      githubLink: "https://github.com/yourusername/api-docs",
      liveLink: "https://api-docs-demo.vercel.app",
      imageURL: "/images/api-docs.jpg",
      category: "Documentation"
    },
    {
      id: 8,
      title: "Expense Tracker",
      description: "Personal finance management app with budget tracking, expense categorization, and financial insights.",
      techStack: ["React Native", "Firebase", "Chart.js", "Expo"],
      githubLink: "https://github.com/yourusername/expense-tracker",
      liveLink: "https://expense-tracker-demo.vercel.app",
      imageURL: "/images/expense-tracker.jpg",
      category: "Mobile Application"
    },
    {
      id: 9,
      title: "Blog CMS",
      description: "Content management system with rich text editor, SEO optimization, and multi-author support.",
      techStack: ["Next.js", "Sanity.io", "TypeScript", "SEO"],
      githubLink: "https://github.com/yourusername/blog-cms",
      liveLink: "https://blog-cms-demo.vercel.app",
      imageURL: "/images/blog-cms.jpg",
      category: "Content Management"
    }
  ]
};

export const allProjects = [...projectsData.featured, ...projectsData.grid];
export const projectCategories = [...new Set(allProjects.map(project => project.category))];
