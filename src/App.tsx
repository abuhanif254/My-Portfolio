import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Blog from './pages/Blog';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import ProjectDetail from './pages/ProjectDetail';
import BlogPostDetail from './pages/BlogPostDetail';
import NotFound from './pages/NotFound';
import { doc, getDocFromServer } from 'firebase/firestore';
import { db } from './firebase';
import ErrorBoundary from './components/ErrorBoundary';
import { ThemeProvider } from './context/ThemeContext';
import { HelmetProvider, Helmet } from 'react-helmet-async';

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route index element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Home />
            </motion.div>
          } />
          <Route path="about" element={
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <About />
            </motion.div>
          } />
          <Route path="projects" element={
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Projects />
            </motion.div>
          } />
          <Route path="projects/:id" element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectDetail />
            </motion.div>
          } />
          <Route path="blog" element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Blog />
            </motion.div>
          } />
          <Route path="blog/:id" element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <BlogPostDetail />
            </motion.div>
          } />
          <Route path="contact" element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Contact />
            </motion.div>
          } />
          <Route path="admin" element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Admin />
            </motion.div>
          } />
          <Route path="login" element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Login />
            </motion.div>
          } />
          <Route path="privacy" element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Privacy />
            </motion.div>
          } />
          <Route path="terms" element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Terms />
            </motion.div>
          } />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  useEffect(() => {
    async function testConnection() {
      try {
        await getDocFromServer(doc(db, 'test', 'connection'));
      } catch (error) {
        if(error instanceof Error && error.message.includes('the client is offline')) {
          console.error("Please check your Firebase configuration. ");
        }
      }
    }
    testConnection();
  }, []);

  return (
    <HelmetProvider>
      <ThemeProvider>
        <Helmet>
          <title>MD Abu Hanif Mia | MERN Stack Developer</title>
          <meta name="description" content="Portfolio of MD Abu Hanif Mia, a passionate MERN Stack Developer specializing in React, Node.js, and Next.js." />
          
          {/* Open Graph / Facebook */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content={window.location.origin} />
          <meta property="og:title" content="MD Abu Hanif Mia | MERN Stack Developer" />
          <meta property="og:description" content="Portfolio of MD Abu Hanif Mia, a passionate MERN Stack Developer specializing in React, Node.js, and Next.js." />
          <meta property="og:image" content={`${window.location.origin}/og-image.jpg`} />

          {/* Twitter */}
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content={window.location.origin} />
          <meta property="twitter:title" content="MD Abu Hanif Mia | MERN Stack Developer" />
          <meta property="twitter:description" content="Portfolio of MD Abu Hanif Mia, a passionate MERN Stack Developer specializing in React, Node.js, and Next.js." />
          <meta property="twitter:image" content={`${window.location.origin}/og-image.jpg`} />
        </Helmet>
        <ErrorBoundary>
          <BrowserRouter>
            <AnimatedRoutes />
          </BrowserRouter>
        </ErrorBoundary>
    </ThemeProvider>
  </HelmetProvider>
  );
}
