import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const serviceData = [
  {
    id: 1,
    category: " Residential Construction & Renovations",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKz0iDc2ouCaGC-RxuLUK9Jg2RucW1zB4JeQ&s",
    description: "Tailored living spaces from modern builds to heritage restorations.",
    subCategories: [
      { name: "Bespoke Buildings", slug: "bespoke-buildings" },
      { name: "Passive House Construction", slug: "passive-house" },
      { name: "House Renovations", slug: "house-renovations" },
      { name: "House Extensions", slug: "house-extensions" },
      { name: "Luxury Renovations", slug: "luxury-renovations" },
    ]
  },
  {
    id: 2,
    category: "Commercial Construction",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
    description: "Professional delivery of business environments and hospitality venues.",
    subCategories: [
      { name: "Commercial Construction Company", slug: "commercial-company" },
      { name: "Commercial Construction Management", slug: "commercial-management" },
      { name: "Hospitality Fit Out", slug: "hospitality-fit-out" },
    ]
  },
  {
    id: 3,
    category: "Construction Specialist",
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=800&auto=format&fit=crop",
    description: "Expertise in technical building methods and marine environments.",
    subCategories: [
      { name: "Timber Frame Construction", slug: "timber-frame" },
      { name: "Sustainable Materials", slug: "sustainable-materials" },
      { name: "Coastal Construction", slug: "coastal-construction" },
      { name: "Construction Management", slug: "construction-management" },
    ]
  },
  {
    id: 4,
    category: "House Extensions",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQpD9xmPgPpAfKfKkFHdS9hdVj3eoEUJaYDw&s",
    description: "Expertise in technical building methods and marine environments.",
    subCategories: [
      { name: "House Extensions Cornwall", slug: "Extensions-Cornwall" },
      { name: "Single Storey Extension", slug: "Storey-Extension" },
      { name: "Double Storey Extension", slug: "Double-Storey-Extension" },
      { name: "Home Extension Specialist", slug: "Home-Extension-Specialist" },
    ]
  },
  {
    id: 5,
    category: "Structural Repairs",
    image: "https://warvenaconstruction.co.uk/.netlify/images?w=1200&fit=cover&url=https:%2F%2Fcdn.sanity.io%2Fimages%2Fpykxlxp8%2Fproduction%2F79d94b91b05008f69fb7b2c58fb330e90075316a-1920x1080.jpg?auto=format",
    description: "Expert in industrial and commercial infrastructure repair",
    subCategories: [
      { name: "Exterior Repairs ", slug: "Exterior-Repairs " },
      { name: "Repair Chimney Repointing Cornwal", slug: "Storey-Extension" },
      { name: "Double Storey Extension", slug: "Double-Storey-Extension" },
      { name: "Damage Repairs ", slug: "Damage-Repairs " },
      { name: "Floor Repair Cornwall", slug: "Floor-Repair-Cornwall" },
      { name: "Joinery Repairs Cornwall", slug: "Joinery-Repairs-Cornwall" },
      { name: "Home Extension Specialist", slug: "Home-Extension-Specialist" },
    ]
  },
  {
    id: 6,
    category: "Demolition",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPGcEp6dCRMw3_C8-2f0e1rS26d1srEvJZAA&s",
    description: "Specialist in high-risk commercial demolition and technical structural takedowns",
    subCategories: [
      { name: "Full Property Demolition", slug: "full-property-demolition" },
      { name: "Partial Demolition & Strip Out", slug: "partial-demolition-strip-out" },
      { name: "Structural Demolition", slug: "structural-demolition" },
      { name: "Coastal & Cliff Top Demolition", slug: "coastal-cliff-top-demolition" },
      { name: "Outbuilding & Garage Demolition", slug: "outbuilding-garage-demolition" },
      { name: "Chimney Demolition", slug: "chimney-demolition" },
      { name: "Controlled Demolition Cornwall", slug: "controlled-demolition-cornwall" },
      { name: "Soft Strip Demolition", slug: "soft-strip-demolition" },
      { name: "Demolition & Site Clearance Cornwall", slug: "demolition-site-clearance-cornwall" },
    ]
  },
  {
    id: 7,
    category: "Costing & Estimating",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800&auto=format&fit=crop",
    description: "Comprehensive financial planning and transparent cost consultancy for precise project delivery.",
    subCategories: [
      { name: "Preliminary Cost Estimates", slug: "preliminary-cost-estimates" },
      { name: "Detailed Project Cost Plans", slug: "detailed-project-cost-plans" },
      { name: "Bill of Quantities", slug: "bill-of-quantities" },
      { name: "Budget Planning & Management", slug: "budget-planning-management" },
      { name: "Value Engineering", slug: "value-engineering" },
      { name: "New Build & Extension Costing", slug: "new-build-extension-costing" },
      { name: "Pre-Construction Cost Consultancy", slug: "pre-construction-cost-consultancy" },
      { name: "Transparent Construction Pricing", slug: "transparent-construction-pricing" },
    ]
},
{
    id: 8,
    category: "Planning & Consultation",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQ9fPaTzmeLxJGETj02scyWiHZqXs4eT8m0g&s",
    description: "Expert navigation of regulatory frameworks and strategic development advice for seamless project approval.",
    subCategories: [
      { name: "Planning Permission Advice", slug: "planning-permission-advice" },
      { name: "Pre-Application Consultation", slug: "pre-application-consultation" },
      { name: "Permitted Development Advice", slug: "permitted-development-advice" },
      { name: "Building Regulations Compliance", slug: "building-regulations-compliance" },
      { name: "Coastal & Sensitive Location Planning", slug: "coastal-sensitive-location-planning" },
      { name: "Listed Building Consent Advice", slug: "listed-building-consent-advice" },
      { name: "Feasibility Consultation", slug: "feasibility-consultation" },
      { name: "Planning for New Builds & Extensions", slug: "planning-new-builds-extensions" },
    ]
}
]

export default function Services() {
  const [query, setQuery] = useState("");
  const [expandedCategories, setExpandedCategories] = useState({});

  const toggleCategory = (id) => {
    setExpandedCategories(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredData = serviceData.filter((item) => {
    const categoryMatch = item.category.toLowerCase().includes(query.toLowerCase());
    const subCategoryMatch = item.subCategories.some(sub => 
      sub.name.toLowerCase().includes(query.toLowerCase())
    );
    return categoryMatch || subCategoryMatch;
  });

  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      <header className="pt-32 pb-16 px-8 text-center border-b border-gray-100">
        <h1 className="text-4xl md:text-6xl font-light tracking-tighter mb-8 text-gray-900">Our Services</h1>
        <div className="max-w-md mx-auto mb-8">
          <input 
            type="text"
            placeholder="Search for a service..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-full py-3 px-6 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 transition-all"
          />
        </div>
        <p className="text-gray-500 uppercase tracking-[0.3em] text-[10px]">
          Warvena Construction Studio — Cornwall
        </p>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-20">
        {filteredData.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-12 gap-y-20 items-start">
            {filteredData.map((cat) => {
              const isExpanded = expandedCategories[cat.id];
              const displayLimit = 4;
              const hasMore = cat.subCategories.length > displayLimit;
              const visibleSubCategories = isExpanded 
                ? cat.subCategories 
                : cat.subCategories.slice(0, displayLimit);

              return (
                <div key={cat.id} className="flex flex-col animate-fadeIn">
                  {/* Image Container with Lazy Loading */}
                  <div className="relative h-64 overflow-hidden mb-6 rounded-sm bg-gray-100">
                    <img 
                      src={cat.image} 
                      alt={cat.category} 
                      loading="lazy" // 👈 Native Browser Lazy Load
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>

                  <h2 className="text-lg font-bold tracking-widest text-gray-900 mb-3 uppercase">
                    {cat.category}
                  </h2>
                  <p className="text-[11px] leading-relaxed text-gray-400 mb-6 italic uppercase tracking-wider">
                    {cat.description}
                  </p>

                  <div className="flex flex-col border-t border-gray-100">
                    {visibleSubCategories.map((sub) => (
                      <Link 
                        key={sub.slug}
                        to={`/services/${sub.slug}`}
                        className="group flex justify-between items-center py-4 border-b border-gray-100 hover:bg-gray-50 px-2 transition-all"
                      >
                        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-gray-600 group-hover:text-gray-900">
                          {sub.name}
                        </span>
                        <svg className="w-3 h-3 text-gray-300 group-hover:text-gray-900 transform group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    ))}
                  </div>

                  {hasMore && (
                    <button 
                      onClick={() => toggleCategory(cat.id)}
                      className="mt-4 text-[9px] font-bold uppercase tracking-[0.3em] text-gray-400 hover:text-gray-900 transition-colors self-start"
                    >
                      {isExpanded ? "— View Fewer" : `+ View ${cat.subCategories.length - displayLimit} more services`}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400 uppercase tracking-widest text-xs italic">
            No matches found.
          </div>
        )}
      </main>
    </div>
  )
}