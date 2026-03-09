import { useEffect, useState } from 'react'
import { client } from '../../sanityclient'
import { Link } from 'react-router-dom'

const CATEGORIES = ['All Articles', 'Renovations', 'Extensions', 'Design', 'Sustainability', 'Passive Homes']

export default function Blog() {
  const [posts, setPosts] = useState([])
  const [filtered, setFiltered] = useState([])
  const [activeCategory, setActiveCategory] = useState('All Articles')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    client.fetch(`
      *[_type == "blog_post"] | order(publishedAt desc) {
        _id, title, slug, category, excerpt, publishedAt,
        "image": image.asset->url
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
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div
        className="pt-40 pb-12 text-center"
        style={{ paddingLeft: 'clamp(2rem, 8vw, 8rem)', paddingRight: 'clamp(2rem, 8vw, 8rem)' }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Blogs</h1>
        <p className="text-gray-500 text-sm tracking-wide">
          Insights &amp; updates from the world of luxury construction
        </p>
      </div>

      {/* Filters + Search */}
      <div
        style={{ paddingLeft: 'clamp(2rem, 8vw, 8rem)', paddingRight: 'clamp(2rem, 8vw, 8rem)' }}
        className="mb-10 border-b border-gray-200 pb-6"
      >
        {/* Category tabs - scrollable on mobile */}
        <div className="overflow-x-auto pb-2 mb-4">
          <div className="flex gap-6 min-w-max">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-sm pb-1 whitespace-nowrap transition-all
                  ${activeCategory === cat
                    ? 'text-gray-900 font-semibold border-b-2 border-gray-900'
                    : 'text-gray-400 hover:text-gray-700'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Search - full width on mobile */}
        <div className="flex items-center border border-gray-200 bg-white px-4 py-2 gap-2 w-full md:w-64">
          <input
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="text-sm outline-none bg-transparent text-gray-700 w-full"
          />
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-gray-400 shrink-0"
          >
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
        </div>
      </div>

      {/* Posts grid */}
      <div
        style={{ paddingLeft: 'clamp(2rem, 8vw, 8rem)', paddingRight: 'clamp(2rem, 8vw, 8rem)' }}
        className="pb-24"
      >
        {loading && (
          <p className="text-gray-400 text-sm uppercase tracking-widest text-center py-20">
            Loading...
          </p>
        )}

        {!loading && filtered.length === 0 && (
          <p className="text-gray-400 text-sm text-center py-20">
            No posts found.
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map(post => (
            <div key={post._id} className="bg-white flex flex-col">

              {/* Image */}
              <div className="overflow-hidden">
                {post.image ? (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-52 object-cover hover:scale-105 transition duration-700"
                  />
                ) : (
                  <div className="w-full h-52 bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-300 text-xs uppercase tracking-widest">No image</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                {post.category && (
                  <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">
                    {post.category}
                  </p>
                )}
                <h2 className="text-lg font-bold text-gray-900 mb-3 leading-snug">
                  {post.title}
                </h2>
                {post.publishedAt && (
                  <p className="text-xs text-gray-400 mb-3">
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
                  className="flex items-center gap-2 text-sm font-medium text-amber-600 hover:gap-3 transition-all mt-auto"
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
      </div>

      {/* CTA */}
      <div className="bg-white py-20 text-center border-t border-gray-100"
        style={{ paddingLeft: 'clamp(2rem, 8vw, 8rem)', paddingRight: 'clamp(2rem, 8vw, 8rem)' }}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          Ready to Transform Your Home?
        </h2>
        <p className="text-gray-500 text-sm mb-8">
          Contact us to start your next luxury project.
        </p>
        <Link
          to="/contact"
          className="inline-block bg-amber-600 text-white px-10 py-4 text-sm font-medium hover:bg-amber-700 transition"
        >
          Get in Touch
        </Link>
      </div>

    </div>
  )
}