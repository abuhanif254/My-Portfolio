🚀 Professional Portfolio & CMS Dashboard
A high-performance, full-stack portfolio application built with React 18, Vite, TypeScript, and Firebase. This project features a custom-built Admin Dashboard (CMS) for managing blog posts, projects, and messages in real-time, along with an integrated AI Assistant powered by Google Gemini.
![alt text](https://picsum.photos/seed/dashboard/1200/600)
✨ Key Features
💎 Modern UI/UX: Crafted with Tailwind CSS and Motion for fluid, high-end animations.
🔐 Secure Admin Dashboard: A private CMS accessible only via authenticated Google login for:
Writing and publishing Blog Posts with Markdown support.
Managing Portfolio Projects (Challenges, Solutions, Hurdles).
Real-time Message Tracking for contact form submissions.
🤖 AI Assistant: Integrated Gemini AI bot trained on your portfolio context to answer visitor questions.
📰 Dynamic Blog: Full Markdown rendering for technical articles, including syntax highlighting.
📁 Project Showcase: Categorized portfolio with deep-dive detail pages for each project.
📱 Fully Responsive: Optimized for every device, from ultra-wide monitors to mobile phones.
🔥 Real-time Database: Powered by Firebase Firestore for instant content updates.
🛠️ Tech Stack
Frontend: React 18, TypeScript, Vite
Styling: Tailwind CSS, Lucide Icons
Animations: Motion (formerly Framer Motion)
Backend/BaaS: Firebase (Firestore, Auth, Hosting)
AI Engine: Google Gemini API (@google/genai)
Utilities: React Markdown, Prism Syntax Highlighter, React Helmet Async (SEO)
🏁 Getting Started
1. Prerequisite
Node.js (v18 or higher)
A Firebase Project
A Gemini API Key from Google AI Studio
2. Installation
code
Bash
# Clone the repository
git clone https://github.com/your-username/your-repo-name.git

# Navigate to the project directory
cd your-repo-name

# Install dependencies
npm install
3. Environment Setup
Create a .env file in the root directory and add your credentials:
code
Env
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Backend/Server-side keys (if using Express/AI routes)
GEMINI_API_KEY=your_gemini_key
4. Direct Deployment
To run the development server:
code
Bash
npm run dev
📂 Project Structure
code
Text
src/
├── components/     # Reusable UI components (AI Assistant, Layout, etc.)
├── firebase/       # Configuration and helper functions
├── lib/            # Utility functions (cn, reading time, etc.)
├── pages/          # Main application views (Admin, Blog, Projects, etc.)
├── styles/         # Global CSS and Tailwind configuration
└── types/          # TypeScript interfaces
🔒 Security Rules
The project uses strictly defined Firestore Security Rules to ensure that only the verified administrator (mohammadbitullah@gmail.com) can perform write/delete operations on the database.
📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
Built with ❤️ by MD Abu Hanif Mia
💡 How to use this:
Copy the text above.
In your GitHub repository, click "Add file" -> "Create new file".
Name it README.md.
Paste the content and click "Commit changes".
