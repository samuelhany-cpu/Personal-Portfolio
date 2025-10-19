/**
 * Sample Firestore Data Structure for Projects Collection
 *
 * Use this as a reference when adding projects to your Firestore database
 * Collection name: "projects"
 */

// Sample Featured Project Document
const featuredProjectSample = {
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
  githubLink: 'https://github.com/yourusername/service-booking-platform',
  liveLink: 'https://service-booking-demo.vercel.app',
  isFeatured: true,
  order: 1,
  category: 'Full-Stack Web Application',
};

// Sample Grid Project Document
const gridProjectSample = {
  title: 'Weather Forecast App',
  description:
    'Clean weather application with location-based forecasts, interactive maps, and detailed weather data visualization.',
  techStack: ['React.js', 'OpenWeather API', 'Tailwind CSS'],
  githubLink: 'https://github.com/yourusername/weather-app',
  liveLink: 'https://weather-forecast-demo.vercel.app',
  isFeatured: false,
  order: 4,
  category: 'Frontend Application',
};

/**
 * How to add to Firestore:
 *
 * 1. Go to Firebase Console
 * 2. Navigate to Firestore Database
 * 3. Create collection: "projects"
 * 4. Add documents with the above structure
 * 5. Each document should have these fields:
 *    - title (string)
 *    - description (string)
 *    - techStack (array of strings)
 *    - githubLink (string)
 *    - liveLink (string) - optional
 *    - isFeatured (boolean)
 *    - order (number)
 *    - category (string)
 */

export { featuredProjectSample, gridProjectSample };
