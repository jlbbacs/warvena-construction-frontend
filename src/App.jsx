import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Breadcrumbs from "./components/Breadcrumbs"

// Lazy Load pages for better performance (Best for SEO & Speed)
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const FAQ = lazy(() => import('./pages/Faq'))
const Projects = lazy(() => import('./pages/Projects'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))
const Services = lazy(() => import('./pages/Services'))
const ServiceDetail = lazy(() => import('./pages/ServiceDetail')) // 👈 The new dynamic template
const Blog = lazy(() => import('./pages/Blog'))
const BlogDetail = lazy(() => import('./pages/BlogDetail'))
const Contact = lazy(() => import('./pages/Contact'))

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        
        <Breadcrumbs />

        <main className="flex-grow">
          {/* Suspense handles the loading state while lazy components are fetched */}
          <Suspense fallback={
            <div className="h-screen flex items-center justify-center uppercase tracking-[0.5em] text-[10px] text-gray-400">
              Loading Warvena...
            </div>
          }>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:slug" element={<ProjectDetail />} />
              
              {/* SERVICES ROUTES */}
              <Route path="/services" element={<Services/>} />
              {/* 👈 This single line loops logic for all subcategories (Demolition, Repairs, etc.) */}
              <Route path="/services/:slug" element={<ServiceDetail />} />
              
              <Route path="/blogs" element={<Blog />} />
              <Route path="/blogs/:slug" element={<BlogDetail />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Suspense>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  )
}