import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { client } from '../../sanityclient'
import { PortableText } from '@portabletext/react'

const portableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-4 leading-tight"
        style={{ fontFamily: 'Poppins, sans-serif', letterSpacing: '-0.01em' }}>
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mt-10 mb-3 leading-tight"
        style={{ fontFamily: 'Poppins, sans-serif' }}>
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-semibold text-gray-800 mt-8 mb-2"
        style={{ fontFamily: 'Poppins, sans-serif' }}>
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-6"
        style={{ fontFamily: 'Poppins, sans-serif' }}>
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-yellow-600 pl-6 my-8 italic text-gray-500 text-lg leading-relaxed">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 mb-6 space-y-2">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-6 space-y-2">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="text-base md:text-lg text-gray-600 leading-relaxed"
        style={{ fontFamily: 'Poppins, sans-serif' }}>
        {children}
      </li>
    ),
    number: ({ children }) => (
      <li className="text-base md:text-lg text-gray-600 leading-relaxed"
        style={{ fontFamily: 'Poppins, sans-serif' }}>
        {children}
      </li>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-gray-900">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-gray-500">{children}</em>
    ),
    link: ({ value, children }) => (
      <a 
        href={value?.href}
        target={value?.blank ? '_blank' : '_self'}
        rel="noopener noreferrer"
        className="text-yellow-600 underline underline-offset-2 hover:text-yellow-700 transition"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => (
      <figure className="my-10">
        <img
          src={value?.asset?.url || ''}
          alt={value?.alt || ''}
          loading="lazy"
          className="w-full h-auto object-cover"
          style={{ opacity: 0, transition: 'opacity 0.5s ease' }}
          onLoad={e => { e.target.style.opacity = 1 }}
        />
        {value?.caption && (
          <figcaption
            className="text-center text-xs text-gray-400 mt-3 tracking-widest uppercase"
            style={{ fontFamily: 'Space Mono, monospace' }}
          >
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
  },
}; // Added missing closing brace here

export default function BlogDetail() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)

  useEffect(() => {
    client.fetch(`
      *[_type == "blog_post" && slug.current == $slug][0]{
        _id, title, excerpt, publishedAt, author, readingTime,
        "category": category->title,
        "image": image.asset->url,
        body[]{
          ...,
          _type == "image" => {
            ...,
            "asset": asset->,   
            alt                  
          }
        }
      }
    `, { slug }).then(setPost)
  }, [slug])

  const formatDate = (date) => {
    if (!date) return ''
    return new Date(date).toLocaleDateString('en-GB', {
      day: 'numeric', month: 'long', year: 'numeric'
    })
  }

  if (!post) return (
    <div className="min-h-screen bg-stone-50">
      <div className="w-full h-[60vh] bg-stone-200 relative overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-pulse bg-gradient-to-r from-stone-200 via-white to-stone-200" />
      </div>
      <div
        className="max-w-3xl mx-auto py-16 space-y-4 px-8"
      >
        {[...Array(4)].map((_, i) => (
          <div key={i} className={`h-4 bg-stone-200 rounded relative overflow-hidden ${i === 1 ? 'w-3/4' : i === 2 ? 'w-full' : 'w-1/4'}`}>
            <div className="absolute inset-0 -translate-x-full animate-pulse bg-gradient-to-r from-stone-200 via-white to-stone-200" />
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero image */}
      {post.image && (
        <div className="relative w-full overflow-hidden h-[70vh]">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
            loading="lazy"
            style={{ opacity: 0, transition: 'opacity 0.6s ease' }}
            onLoad={e => { e.target.style.opacity = 1 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-transparent via-yellow-600 to-transparent" />
          <div
            className="absolute bottom-0 left-0 right-0 pb-16 z-10"
            style={{ paddingLeft: 'clamp(2rem, 8vw, 8rem)', paddingRight: 'clamp(2rem, 8vw, 8rem)' }}
          >
            <Link
              to="/blogs"
              className="inline-flex items-center gap-2 text-white/60 text-xs uppercase tracking-widest mb-6 hover:text-white transition-all"
              style={{ fontFamily: 'Space Mono, monospace' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Back to Blogs
            </Link>
            {post.category && (
              <p className="text-yellow-500 text-xs uppercase tracking-[0.3em] mb-4" style={{ fontFamily: 'Space Mono, monospace' }}>
                {post.category}
              </p>
            )}
            <h1
              className="text-white font-bold leading-tight max-w-3xl mb-6"
              style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(1.8rem, 4vw, 3.2rem)', letterSpacing: '-0.02em' }}
            >
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3">
              {post.author && (
                <span className="text-white/70 text-xs uppercase tracking-widest" style={{ fontFamily: 'Space Mono, monospace' }}>
                  {post.author}
                </span>
              )}
              {post.publishedAt && (
                <>
                  <span className="text-white/30 text-xs">·</span>
                  <span className="text-white/70 text-xs uppercase tracking-widest" style={{ fontFamily: 'Space Mono, monospace' }}>
                    {formatDate(post.publishedAt)}
                  </span>
                </>
              )}
              {post.readingTime && (
                <>
                  <span className="text-white/30 text-xs">·</span>
                  <span className="text-white/70 text-xs uppercase tracking-widest" style={{ fontFamily: 'Space Mono, monospace' }}>
                    {post.readingTime} min read
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Article body */}
      <div className="bg-white py-16" style={{ paddingLeft: 'clamp(2rem, 8vw, 8rem)', paddingRight: 'clamp(2rem, 8vw, 8rem)' }}>
        <div className="max-w-3xl mx-auto">
          {post.excerpt && (
            <p className="text-lg md:text-xl text-gray-500 leading-relaxed mb-12 pb-12 border-b border-stone-100" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {post.excerpt}
            </p>
          )}
          {post.body && (
            <PortableText value={post.body} components={portableTextComponents} />
          )}
          <div className="mt-16 pt-8 border-t border-stone-100">
            <Link
              to="/blogs"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-all hover:gap-3"
              style={{ fontFamily: 'Space Mono, monospace' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Back to Blogs
            </Link>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gray-900 py-20 text-center" style={{ paddingLeft: 'clamp(2rem, 8vw, 8rem)', paddingRight: 'clamp(2rem, 8vw, 8rem)' }}>
        <p className="text-xs uppercase tracking-[0.4em] text-yellow-600 mb-4" style={{ fontFamily: 'Space Mono, monospace' }}>
          Start Your Project
        </p>
        <h2
          className="font-bold text-white mb-4"
          style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', letterSpacing: '-0.02em' }}
        >
          Ready to Transform Your Home?
        </h2>
        <p className="text-gray-400 text-sm mb-10">Contact us to start your next luxury project.</p>
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