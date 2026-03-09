import { useEffect, useState } from 'react'
import { client } from '../../sanityclient'
import { Link } from 'react-router-dom'

function SkeletonCard() {
  return (
    <div className="bg-white flex flex-col border border-stone-100">
      {/* Skeleton image */}
      <div className="w-full h-52 bg-stone-200 relative overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-stone-200 via-white to-stone-200" />
      </div>
      {/* Skeleton content */}
      <div className="p-6 flex flex-col gap-3">
        <div className="h-3 bg-stone-200 w-1/4 relative overflow-hidden rounded">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-stone-200 via-white to-stone-200" />
        </div>
        <div className="h-5 bg-stone-200 w-3/4 relative overflow-hidden rounded">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-stone-200 via-white to-stone-200" />
        </div>
        <div className="h-4 bg-stone-200 w-full relative overflow-hidden rounded">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-stone-200 via-white to-stone-200" />
        </div>
        <div className="h-4 bg-stone-200 w-2/3 relative overflow-hidden rounded">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-stone-200 via-white to-stone-200" />
        </div>
      </div>
    </div>
  )
}

function LazyImage({ src, alt, className }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="relative w-full h-52">
      {/* Skeleton shown until image loads */}
      {!loaded && (
        <div className="absolute inset-0 bg-stone-200 overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-stone-200 via-white to-stone-200" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`${className} transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  )
}

export default function Blog() {
  const [posts, setPosts] = useState([])
  const [filtered, setFiltered] = useState([])
  const [categories, setCategories] = useState([])
  const [activeCategory, setActiveCategory] = useState('All Articles')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    client.fetch(`*[_type == "blog_category"] | order(title asc) { _id, title, slug }`)
      .then(data => setCategories(data || []))
  }, [])

  useEffect(() => {
    client.fetch(`
      *[_type == "blog_post"] | order(publishedAt desc) {
        _id, title, slug, excerpt, publishedAt,
        "image": image.asset->url,
        "category": category->title
      }
    `).then(data => {
      setPosts(data || [])
      setFiltered(data || [])
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    let result = posts
    if (activeCategory !== 'All Articles') {
      result = result.filter(p => p.category === activeCategory)
    }
    if (search) {
      result = result.filter(p =>
        p.title?.toLowerCase().includes(search.toLowerCase()) ||
        p.excerpt?.toLowerCase().includes(search.toLowerCase())
      )
    }
    setFiltered(result)
  }, [activeCategory, search, posts])

  const formatDate = (date) => {
    if (!date) return ''
    return new Date(date).toLocaleDateString('en-GB', {
      day: 'numeric', month: 'long', year: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-stone-50">

      {/* Header */}
      <div
        className="bg-gray-900 pt-40 pb-16 text-left"
        style={{ paddingLeft: 'clamp(2rem, 8vw, 8rem)', paddingRight: 'clamp(2rem, 8vw, 8rem)' }}
      >
        {/* <p
          className="text-xs uppercase tracking-[0.4em] text-yellow-600 mb-4"
          style={{ fontFamily: 'Space Mono, monospace' }}
        >
          Warvena Journal
        </p> */}
        <h1
          className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight"
          style={{ fontFamily: 'Poppins, sans-serif', letterSpacing: '-0.02em' }}
        >
          Blogs
        </h1>
        <p
          className="text-gray-400 text-sm tracking-wide"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          Insights &amp; updates from the world of luxury construction
        </p>
      </div>

      {/* Filters + Search */}
      <div
        style={{ paddingLeft: 'clamp(2rem, 8vw, 8rem)', paddingRight: 'clamp(2rem, 8vw, 8rem)' }}
        className="mb-10 border-b border-gray-200 pb-6 pt-8 bg-white"
      >
        {/* Category tabs */}
        <div className="overflow-x-auto pb-2 mb-4">
          <div className="flex gap-6 min-w-max">
            <button
              onClick={() => setActiveCategory('All Articles')}
              className={`text-sm pb-1 whitespace-nowrap transition-all
                ${activeCategory === 'All Articles'
                  ? 'text-gray-900 font-semibold border-b-2 border-gray-900'
                  : 'text-gray-400 hover:text-gray-700'
                }`}
              style={{ fontFamily: 'Space Mono, monospace' }}
            >
              All Articles
            </button>
            {categories.map(cat => (
              <button
                key={cat._id}
                onClick={() => setActiveCategory(cat.title)}
                className={`text-sm pb-1 whitespace-nowrap transition-all
                  ${activeCategory === cat.title
                    ? 'text-gray-900 font-semibold border-b-2 border-gray-900'
                    : 'text-gray-400 hover:text-gray-700'
                  }`}
                style={{ fontFamily: 'Space Mono, monospace' }}
              >
                {cat.title}
              </button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="flex items-center border border-gray-200 bg-stone-50 px-4 py-2 gap-2 w-full md:w-64">
          <input
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="text-sm outline-none bg-transparent text-gray-700 w-full placeholder-gray-400"
            style={{ fontFamily: 'Space Mono, monospace' }}
          />
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400 shrink-0">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
        </div>
      </div>

      {/* Posts grid */}
      <div
        style={{ paddingLeft: 'clamp(2rem, 8vw, 8rem)', paddingRight: 'clamp(2rem, 8vw, 8rem)' }}
        className="pb-24"
      >
        {/* Skeleton loading state */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <p
            className="text-gray-400 text-sm text-center py-20"
            style={{ fontFamily: 'Space Mono, monospace' }}
          >
            No posts found.
          </p>
        )}

        {!loading && filtered.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((post) => (
              <div
                key={post._id}
                className="bg-white flex flex-col group border border-stone-100 hover:border-stone-200 hover:shadow-md transition-all duration-300"
              >
                {/* Image with lazy load + skeleton */}
                <div className="overflow-hidden relative">
                  {post.image ? (
                    <LazyImage
                      src={post.image}
                      alt={post.title}
                      className="w-full h-52 object-cover group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-52 bg-stone-100 flex items-center justify-center">
                      <span className="text-gray-300 text-xs uppercase tracking-widest">No image</span>
                    </div>
                  )}
                  {/* Category badge */}
                  {post.category && (
                    <span
                      className="absolute top-3 left-3 bg-gray-900 text-white text-xs uppercase tracking-widest px-3 py-1 z-10"
                      style={{ fontFamily: 'Space Mono, monospace' }}
                    >
                      {post.category}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1 border-t-2 border-transparent group-hover:border-yellow-600 transition-all duration-300">
                  <h2
                    className="text-lg font-bold text-gray-900 mb-3 leading-snug"
                    style={{ fontFamily: 'Poppins, sans-serif', letterSpacing: '-0.01em' }}
                  >
                    {post.title}
                  </h2>

                  {post.publishedAt && (
                    <p
                      className="text-xs text-gray-400 mb-3"
                      style={{ fontFamily: 'Space Mono, monospace' }}
                    >
                      {formatDate(post.publishedAt)}
                    </p>
                  )}

                  {post.excerpt && (
                    <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1">
                      {post.excerpt}
                    </p>
                  )}

                  <Link
                    to={`/blogs/${post.slug.current}`}
                    className="flex items-center gap-2 text-xs font-medium text-gray-900 uppercase tracking-widest hover:gap-4 transition-all mt-auto"
                    style={{ fontFamily: 'Space Mono, monospace' }}
                  >
                    Read More
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CTA */}
      <div
        className="bg-gray-900 py-20 text-center"
        style={{ paddingLeft: 'clamp(2rem, 8vw, 8rem)', paddingRight: 'clamp(2rem, 8vw, 8rem)' }}
      >
        <p
          className="text-xs uppercase tracking-[0.4em] text-yellow-600 mb-4"
          style={{ fontFamily: 'Space Mono, monospace' }}
        >
          Start Your Project
        </p>
        <h2
          className="text-2xl md:text-3xl font-bold text-white mb-3"
          style={{ fontFamily: 'Poppins, sans-serif', letterSpacing: '-0.02em' }}
        >
          Ready to Transform Your Home?
        </h2>
        <p className="text-gray-400 text-sm mb-8">
          Contact us to start your next luxury project.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-3 bg-white text-gray-900 px-10 py-4 text-xs font-medium uppercase tracking-widest hover:bg-stone-100 transition hover:gap-5"
          style={{ fontFamily: 'Space Mono, monospace' }}
        >
          Get in Touch
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </Link>
      </div>

    </div>
  )
}