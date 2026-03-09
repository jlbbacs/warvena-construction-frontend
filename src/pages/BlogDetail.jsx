import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { client } from '../../sanityclient'
import { PortableText } from '@portabletext/react'

export default function BlogDetail() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)

  useEffect(() => {
    client.fetch(`
      *[_type == "blog_post" && slug.current == $slug][0]{
  _id, title, excerpt, publishedAt, author,
  "category": category->title,
  "image": image.asset->url,
  body
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
    <div className="flex justify-center items-center h-screen">
      <p className="text-gray-400 text-sm uppercase tracking-widest">Loading...</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-white">

      {/* Hero image */}
      {post.image && (
        <div className="relative h-[60vh] w-full overflow-hidden">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute bottom-0 left-0 right-0 pb-16 z-10"
            style={{ paddingLeft: 'clamp(2rem, 8vw, 8rem)', paddingRight: 'clamp(2rem, 8vw, 8rem)' }}>
            {post.category && (
              <p className="text-white/70 text-xs uppercase tracking-widest mb-3">{post.category}</p>
            )}
            <h1 className="text-white font-black leading-tight max-w-3xl"
              style={{ fontSize: 'clamp(2rem, 3.5vw, 3.2rem)' }}>
              {post.title}
            </h1>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="py-16 max-w-3xl mx-auto"
        style={{ paddingLeft: 'clamp(2rem, 8vw, 8rem)', paddingRight: 'clamp(2rem, 8vw, 8rem)' }}>

        <div className="flex items-center gap-4 mb-10 text-xs text-gray-400 uppercase tracking-widest">
          {post.author && <span>{post.author}</span>}
          {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
        </div>

        {post.body && (
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            <PortableText value={post.body} />
          </div>
        )}

      </div>

      {/* Back link */}
      <div className="pb-16"
        style={{ paddingLeft: 'clamp(2rem, 8vw, 8rem)' }}>
        <Link to="/blogs" className="text-xs uppercase tracking-widest text-gray-400 hover:text-gray-900 transition">
          ← Back to Blogs
        </Link>
      </div>

    </div>
  )
}