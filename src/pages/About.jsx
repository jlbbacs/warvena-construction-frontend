import { Link } from 'react-router-dom'
import { client } from '../../sanityclient'

const HERO_IMAGE = 'https://cdn.sanity.io/images/pykxlxp8/production/175e934b0e0a408eef794e29449d0848135c3fb0-1800x1201.jpg'

const rows = [
  {
    project: {
      image: 'https://cdn.sanity.io/images/pykxlxp8/production/fb2410ae8562d936bda75ba089c1b3115b153fb1-1920x1080.jpg',
      title: 'Crackington Haven',
      slug: 'crackington-haven'
    },
    content: {
      label: 'Process',
      title: 'Setting you up for success',
      text: [
        'We begin every project with a thorough consultation to understand your vision, requirements, and budget.',
        'Our team provides accurate costings from the outset, ensuring complete transparency throughout the build.',
        'With a detailed project roadmap, you\'ll always know exactly where your project stands.'
      ]
    }
  },
  {
    project: {
      image: 'https://cdn.sanity.io/images/pykxlxp8/production/6be8785ceb6bca0454519808393ccf5b1ee70956-2500x1670.jpg',
      title: 'Wheal Quoit',
      slug: 'wheal-quoit'
    },
    content: {
      label: 'Our difference',
      title: 'We like to think that we are different',
      text: [
        'We are a team of passionate individuals with exceptional competence and skill.',
        'Our dedication to craftsmanship and attention to detail ensures that each project is a true reflection of our commitment to excellence.',
        'We empower you to make informed decisions every step of the way.',
        'We believe that a well-informed client is key to a successful partnership.'
      ]
    }
  },
  {
    project: null,
    content: {
      label: 'Team',
      title: 'Dedication, passion and integrity.',
      text: [
        'Our team brings together decades of experience in high-end construction across Cornwall.',
        'We are proud of the relationships we\'ve built with our clients, founded on mutual respect and transparency.',
        'Every member of the Warvena team shares the same commitment to quality and excellence.',
        'Together, we\'ve built more than just structures — we\'ve built enduring stories on solid foundations.'
      ]
    }
  }
]

export default function About() {
  return (
    <div className="min-h-screen">

      {/* Hero */}
      <div className="relative h-screen w-full overflow-hidden">
        <img
          src={HERO_IMAGE}
          alt="About Warvena"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 h-full flex flex-col justify-end pb-20 px-8 md:px-16 max-w-7xl mx-auto items-end text-right">
          <h1 className="text-white text-4xl md:text-6xl font-bold leading-tight max-w-2xl">
            We carefully choose projects that inspire us, bringing passion and dedication to each build.
          </h1>
          <p className="text-white/70 text-sm mt-4">Your success is our success</p>
        </div>
      </div>

      {/* Rows - image + content */}
      <div className="max-w-7xl mx-auto px-8 md:px-16 py-24">
        <div className="flex flex-col gap-32">

          {rows.map((row, i) => (
            <div key={i} className={`grid md:grid-cols-2 gap-16 items-center ${i % 2 !== 0 ? 'md:[&>*:first-child]:order-2' : ''}`}>

              {/* Project image */}
              {row.project ? (
                <Link to={`/projects/${row.project.slug}`} className="group block overflow-hidden">
                  <img
                    src={row.project.image}
                    alt={row.project.title}
                    className="w-full h-[50vh] object-cover group-hover:scale-105 transition duration-700"
                  />
                  <p className="text-sm text-gray-500 mt-3">{row.project.title}</p>
                </Link>
              ) : (
                <div className="bg-gray-100 h-[50vh] flex items-center justify-center">
                  <span className="text-gray-300 text-sm uppercase tracking-widest">Warvena Construction</span>
                </div>
              )}

              {/* Content */}
              <div>
                {row.content.label && (
                  <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">
                    {row.content.label}
                  </p>
                )}
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-snug">
                  {row.content.title}
                </h2>
                <div className="flex flex-col gap-4">
                  {row.content.text.map((para, j) => (
                    <p key={j} className="text-gray-600 leading-relaxed">{para}</p>
                  ))}
                </div>
              </div>

            </div>
          ))}

        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-gray-50 py-24 px-8 md:px-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 max-w-xl leading-snug">
            We carefully choose projects that inspire us, bringing passion and dedication to each build.
          </h2>
          <Link
            to="/projects"
            className="shrink-0 border border-gray-900 text-gray-900 px-8 py-3 text-sm font-semibold uppercase tracking-widest hover:bg-gray-900 hover:text-white transition">
            All projects
          </Link>
        </div>
      </div>

    </div>
  )
}