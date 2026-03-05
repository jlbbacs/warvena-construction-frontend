import { useEffect, useState } from 'react'
import { client } from '../sanityClient'
import { Link } from 'react-router-dom'

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [filter, setFilter] = useState('All')
  const [categories, setCategories] = useState(['All'])

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

  const filtered = filter === 'All'
    ? projects
    : projects.filter(p => p.category === filter)

  // Convert decimal coords to DMS format
  const toDMS = (deg, isLat) => {
    const d = Math.floor(Math.abs(deg))
    const m = Math.floor((Math.abs(deg) - d) * 60)
    const s = ((Math.abs(deg) - d - m / 60) * 3600).toFixed(2)
    const dir = isLat ? (deg >= 0 ? 'N' : 'S') : (deg >= 0 ? 'E' : 'W')
    return `${d}°${m}'${s}"${dir}`
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-8 md:px-16 pt-32 pb-24">

        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-12">Projects</h1>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-16 border-b border-gray-200 pb-6">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 text-xs font-medium uppercase tracking-widest transition border
                ${filter === cat
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'text-gray-500 border-gray-300 hover:border-gray-900 hover:text-gray-900'
                }`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Projects list - stacked like real site */}
        <div className="flex flex-col gap-24">
          {filtered.map((project) => (
            <Link
              key={project._id}
              to={`/projects/${project.slug.current}`}
              className="group block">

              {/* Location + coordinates above image */}
              {project.location && (
                <div className="mb-3">
                  <p className="text-xs uppercase tracking-widest text-gray-400">
                    {project.location}
                  </p>
                  {project.lat && project.lng && (
                    <p className="text-xs text-gray-400 tracking-widest">
                      {toDMS(project.lat, true)} {toDMS(project.lng, false)}
                    </p>
                  )}
                </div>
              )}

              {/* Image with overlay */}
              <div className="relative overflow-hidden">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-[70vh] object-cover group-hover:scale-105 transition duration-700"
                  />
                ) : (
                  <div className="w-full h-[70vh] bg-gray-200" />
                )}

                {/* Bottom overlay - title left, type right */}
                <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-between items-end">
                  <div>
                    <h3 className="text-white text-2xl font-bold drop-shadow">
                      {project.title}
                    </h3>
                  </div>
                  {project.type && (
                    <p className="text-white text-xs uppercase tracking-widest drop-shadow">
                      {project.type.trim()}
                    </p>
                  )}
                </div>
              </div>

            </Link>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            No projects found in this category.
          </div>
        )}

      </div>
    </div>
  )
}