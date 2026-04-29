import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';

// Ensure your serviceData is here or imported
const serviceData = [ /* ... your data ... */ ];

export default function ServiceDetail() {
  const { slug } = useParams();
  
  const service = serviceData.find(cat => 
    cat.subCategories.some(sub => sub.slug === slug)
  );

  // Styled "Construction Ahead" state
  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-8">
        <div className="max-w-xl text-center">
          <span className="text-[10px] font-mono text-gray-400 uppercase tracking-[0.5em] block mb-6">
            Status: Under Development
          </span>
          <h2 className="text-4xl md:text-5xl font-light tracking-tighter text-gray-900 mb-6">
            Construction Ahead
          </h2>
          <div className="w-12 h-[1px] bg-gray-900 mx-auto mb-8" />
          <p className="text-sm text-gray-500 leading-relaxed uppercase tracking-widest mb-12">
           FYI: These routes are still pending development in Sanity. They will auto-populate here once the schemas are deployed
          </p>
          <Link 
            to="/services" 
            className="text-[10px] uppercase tracking-[0.4em] text-gray-900 border-b border-gray-900 pb-1 hover:text-gray-400 hover:border-gray-400 transition-all"
          >
            Return to Services
          </Link>
        </div>
      </div>
    );
  }

  const subCategory = service.subCategories.find(sub => sub.slug === slug);

  return (
    <HelmetProvider>
      <div className="min-h-screen bg-white">
        <Helmet>
          <title>{subCategory.name} | Warvena Construction</title>
          <meta name="description" content={`Specialist ${subCategory.name} services in Cornwall.`} />
        </Helmet>
        
        {/* Simple Header for existing services */}
        <div className="pt-48 pb-24 px-8 md:px-16 max-w-7xl mx-auto">
          <span className="text-[10px] font-mono text-gray-400 uppercase tracking-[0.3em] block mb-4">
            {service.category}
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-gray-900 mb-8">
            {subCategory.name}
          </h1>
          <div className="grid md:grid-cols-2 gap-12 border-t border-gray-100 pt-12">
            <p className="text-lg text-gray-600 leading-relaxed italic">
              {service.description}
            </p>
            <div className="flex flex-col justify-end">
                <Link to="/contact" className="text-[10px] uppercase tracking-[0.4em] bg-gray-900 text-white px-8 py-4 self-start hover:bg-gray-700 transition-all">
                    Enquire about this service
                </Link>
            </div>
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
}