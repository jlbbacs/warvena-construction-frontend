import { useEffect, useState, useRef, useMemo } from 'react'
import { client } from '../../sanityclient'
import { Link } from 'react-router-dom'

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [filter, setFilter] = useState('All')
  const [categories, setCategories] = useState(['All'])
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Fetch Data
  useEffect(() => {
    client.fetch(`*[_type == "project"] | order(order asc){
      _id, title, slug, location, type, lat, lng,
      "image": image.asset->url,
      "category": project_categories[0]->title
    }`).then(setProjects)

    client.fetch(`*[_type == "project_category"] | order(title asc){
      _id, title
    }`).then(cats => {
      setCategories(['All', ...cats.map(c => c.title)])
    })
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Memoized filter logic
  const filtered = useMemo(() => {
    return filter === 'All'
      ? projects
      : projects.filter(p => p.category === filter)
  }, [filter, projects])

  const toDMS = (deg, isLat) => {
    if (!deg) return ''
    const d = Math.floor(Math.abs(deg))
    const m = Math.floor((Math.abs(deg) - d) * 60)
    const s = ((Math.abs(deg) - d - m / 60) * 3600).toFixed(2)
    const dir = isLat ? (deg >= 0 ? 'N' : 'S') : (deg >= 0 ? 'E' : 'W')
    return `${d}°${m}'${s}"${dir}`
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-8 md:px-16 pt-32 pb-24">
        
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-12 tracking-tighter">
          Projects
        </h1>

        {/* --- DROPDOWN FILTER SECTION --- */}
        <div className="relative mb-20 z-40" ref={dropdownRef}>
          <div className="border-b border-gray-200 pb-8">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="group flex items-center justify-between w-full md:w-80 py-2 text-xs font-medium uppercase tracking-[0.3em] text-gray-900 transition-all"
            >
              <span>{filter === 'All' ? 'Select Category' : filter}</span>
              <svg 
                className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* Dropdown Menu - Absolute so it floats over content */}
          {isOpen && (
            <div className="absolute top-full left-0 w-full md:w-80 bg-white border border-t-0 border-gray-200 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => {
                    setFilter(cat)
                    setIsOpen(false)
                  }}
                  className={`block w-full text-left px-6 py-4 text-[10px] uppercase tracking-[0.2em] transition-colors
                    ${filter === cat 
                      ? 'bg-gray-900 text-white' 
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* --- PROJECTS LIST --- */}
        <div className="flex flex-col gap-32">
          {filtered.map((project) => (
            <Link
              key={project._id}
              to={`/projects/${project.slug?.current}`}
              className="group block"
            >
              {/* Info Header */}
              <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-end gap-2">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-1">
                    {project.location || 'Location TBD'}
                  </p>
                  {project.lat && project.lng && (
                    <p className="text-[10px] text-gray-300 tracking-[0.1em] font-mono">
                      {toDMS(project.lat, true)} {toDMS(project.lng, false)}
                    </p>
                  )}
                </div>
                {project.type && (
                  <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400">
                    {project.type}
                  </p>
                )}
              </div>

              {/* Image Container */}
              <div className="relative overflow-hidden bg-gray-100 aspect-[16/9] md:aspect-auto md:h-[80vh]">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition duration-1000 ease-in-out"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300 uppercase tracking-widest text-xs">
                    Image coming soon
                  </div>
                )}
                
                {/* Title Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8 md:p-12">
                  <h3 className="text-white text-3xl md:text-4xl font-light tracking-tight">
                    {project.title}
                  </h3>
                </div>
              </div>

              {/* Mobile/Default Title (Visible without hover) */}
              <div className="mt-6 md:hidden">
                <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="text-center py-40">
            <p className="text-sm uppercase tracking-[0.2em] text-gray-400">
              No projects found in this category.
            </p>
          </div>
        )}

      </div>
    </div>
  )
}