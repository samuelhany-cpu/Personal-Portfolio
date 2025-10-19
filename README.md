# Portfolio Website

## Overview
A modern, responsive portfolio website built with Next.js 15, showcasing professional projects and skills with a sleek black theme and teal accents.

## Features
- ✨ Modern black theme with teal accents
- 📱 Fully responsive design
- ⚡ Smooth animations and transitions
- 🔥 Firebase integration for dynamic content
- 📧 Contact form with email notifications
- 🚀 Optimized for performance and SEO

## Tech Stack
- **Framework:** Next.js 15
- **Styling:** Tailwind CSS 3.4
- **Database:** Firebase Firestore
- **Email:** Firebase Cloud Functions + Nodemailer
- **Deployment:** Vercel

## Getting Started

### Prerequisites
- Node.js 18+ 
- Firebase account
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/samuelhany-cpu/Personal-Portfolio.git
   cd Personal-Portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Configure Firebase in `app/lib/firebase.js`
   - Set up environment variables for email functionality

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)** in your browser

## Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Deploy automatically on push to main branch
3. Configure environment variables in Vercel dashboard

### Firebase Functions (for email notifications)
1. Set up Gmail app password
2. Configure Firebase Functions environment variables
3. Deploy functions: `firebase deploy --only functions`

## Project Structure
```
├── app/
│   ├── components/     # React components
│   ├── lib/           # Firebase configuration
│   └── globals.css    # Global styles
├── functions/         # Firebase Cloud Functions
├── scripts/          # Database population scripts
└── docs/             # Documentation
```

## Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run populate-db` - Populate Firestore with sample data

## Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License
This project is for portfolio purposes. Feel free to use as inspiration for your own portfolio.

---

**Built with ❤️ by Samuel Ehab**
"# Personal-Portfolio" 
