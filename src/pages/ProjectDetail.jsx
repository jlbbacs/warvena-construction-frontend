import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { client } from '../sanityClient.js'

export default function ProjectDetail() {
  const { slug } = useParams()
  const [project, setProject] = useState(null)
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => {
    client.fetch(`
      *[_type == "project" && slug.current == $slug][0]{
        _id,
        title,
        slug,
        location,
        type,
        lat,
        lng,
        featured_video,
        "image": image.asset->url,
        "category": project_categories[0]->title,
        components[]{
          _type,
          _key,
          content,
          "images": new_images[]{"url": asset->url, alt},
          "modalImages": new_modal_images[]{"url": asset->url, alt}
        }
      }
    `, { slug }).then(setProject)
  }, [slug])

  // Convert decimal to DMS
  const toDMS = (deg, isLat) => {
    const d = Math.floor(Math.abs(deg))
    const m = Math.floor((Math.abs(deg) - d) * 60)
    const s = ((Math.abs(deg) - d - m / 60) * 3600).toFixed(2)
    const dir = isLat ? (deg >= 0 ? 'N' : 'S') : (deg >= 0 ? 'E' : 'W')
    return `${d}°${m}'${s}"${dir}`
  }

  if (!project) return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-gray-400 text-sm uppercase tracking-widest">Loading...</p>
    </div>
  )

  // Get all images from components
  const allImages = project.components
    ?.filter(c => c._type === 'images' && c.modalImages?.length > 0)
    ?.flatMap(c => c.modalImages)
    ?.filter(img => img?.url) || []

  const gridImages = project.components
    ?.filter(c => c._type === 'images' && c.images?.length > 0)
    ?.flatMap(c => c.images)
    ?.filter(img => img?.url) || []

  const heroText = project.components?.find(c => c._type === 'hero')?.content?.title
  const bodyTexts = project.components?.filter(c => c._type === 'content_area' && c.content?.title)

  return (
    <div className="min-h-screen">

      {/* Hero - main image or video */}
      <div className="relative h-screen w-full overflow-hidden">
        {project.featured_video ? (
          <iframe
            src={`https://player.vimeo.com/video/${project.featured_video}?autoplay=1&muted=1&loop=1&background=1&controls=0`}
            className="absolute border-none"
            style={{
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '100vw', height: '56.25vw',
              minHeight: '100vh', minWidth: '177.78vh',
            }}
            allow="autoplay; fullscreen"
          />
        ) : (
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/40" />

        {/* Hero text bottom left */}
        <div className="relative z-10 h-full flex flex-col justify-end pb-20 px-8 md:px-16 max-w-7xl mx-auto">
          {project.location && project.lat && project.lng && (
            <p className="text-white/60 text-xs uppercase tracking-widest mb-3">
              {project.location} · {toDMS(project.lat, true)} {toDMS(project.lng, false)}
            </p>
          )}
          <h1 className="text-white text-4xl md:text-6xl font-bold leading-tight max-w-3xl">
            {project.title}
          </h1>
          {project.type && (
            <p className="text-white/70 text-xs uppercase tracking-widest mt-3">
              {project.type}
            </p>
          )}
        </div>
      </div>

      {/* Hero description */}
      {heroText && (
        <div className="max-w-4xl mx-auto px-8 md:px-16 py-20">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">
            {project.category}
          </p>
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
            {heroText}
          </p>
        </div>
      )}

      {/* First image grid */}
      {gridImages.length > 0 && (
        <div className="max-w-7xl mx-auto px-8 md:px-16 pb-16">
          <div className={`grid gap-4 ${gridImages.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
            {gridImages.slice(0, 4).map((img, i) => (
              <div
                key={i}
                className="overflow-hidden cursor-pointer"
                onClick={() => setLightbox(img.url)}>
                <img
                  src={img.url}
                  alt={img.alt || project.title}
                  className="w-full h-72 object-cover hover:scale-105 transition duration-700"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Body text sections */}
      {bodyTexts?.map((section, i) => (
        <div key={i} className={`py-16 px-8 md:px-16 ${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
          <div className="max-w-3xl mx-auto">
            <p className={`leading-relaxed text-gray-700
              ${section.content.title_size === 'large'
                ? 'text-3xl md:text-4xl font-bold'
                : 'text-lg md:text-xl'}`}>
              {section.content.title}
            </p>
          </div>
        </div>
      ))}

      {/* Full image gallery */}
      {allImages.length > 0 && (
        <div className="max-w-7xl mx-auto px-8 md:px-16 py-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {allImages.map((img, i) => (
              <div
                key={i}
                className="overflow-hidden cursor-pointer"
                onClick={() => setLightbox(img.url)}>
                <img
                  src={img.url}
                  alt={img.alt || project.title}
                  className="w-full h-56 object-cover hover:scale-105 transition duration-700"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Back to projects */}
      <div className="max-w-7xl mx-auto px-8 md:px-16 py-16 border-t border-gray-200">
        <Link
          to="/projects"
          className="text-xs uppercase tracking-widest text-gray-500 hover:text-gray-900 transition">
          ← Back to Projects
        </Link>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}>
          <button
            className="absolute top-6 right-8 text-white text-3xl hover:opacity-70"
            onClick={() => setLightbox(null)}>
            ✕
          </button>
          <img
            src={lightbox}
            alt="Gallery"
            className="max-w-full max-h-full object-contain"
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}

    </div>
  )
}