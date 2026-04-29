export default function Contact() {
  const HERO_IMAGE =
    "https://cdn.sanity.io/images/pykxlxp8/production/175e934b0e0a408eef794e29449d0848135c3fb0-1800x1201.jpg";

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-screen w-full overflow-hidden">
        <img
          src={HERO_IMAGE}
          alt="Contact"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 h-full flex flex-col justify-end pb-16 px-8 md:px-16 max-w-7xl mx-auto">
          <h1 className="text-white text-5xl md:text-7xl font-bold">Contact</h1>
          <p className="text-white/70 text-sm mt-3 max-w-lg">
            Whether you are seeking a serene getaway or a distinctive custom
            project, we are here to bring your vision to life.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-8 md:px-16 py-24 grid md:grid-cols-2 gap-16">
        {/* Contact info */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Get in touch</h2>

          <div className="flex flex-col gap-8">
            {/* Phone */}
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">Phone</p>
              <a href="tel:01872300856" className="text-gray-900 font-medium hover:opacity-60 transition">
                01872 300856
              </a>
            </div>

            {/* Email */}
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">Email</p>
              <a href="mailto:info@warvenaconstruction.co.uk" className="text-gray-900 font-medium hover:opacity-60 transition">
                info@warvenaconstruction.co.uk
              </a>
            </div>

            {/* Social Section with SVG Logos */}
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">Social</p>
              <div className="flex gap-6">
                {/* Instagram */}
                <a
                  href="https://www.instagram.com/warvena_construction/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-900 hover:opacity-60 transition"
                  aria-label="Instagram"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>

                {/* Facebook */}
                <a
                  href="https://www.facebook.com/warvenaconstruction/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-900 hover:opacity-60 transition"
                  aria-label="Facebook"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://uk.linkedin.com/company/warvena-construction"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-900 hover:opacity-60 transition"
                  aria-label="LinkedIn"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Send a message</h2>
          <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="text-xs uppercase tracking-widest text-gray-400 block mb-2">Name</label>
              <input type="text" placeholder="Your name" required className="w-full border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none focus:border-gray-900 transition" />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-gray-400 block mb-2">Email</label>
              <input type="email" placeholder="your@email.com" required className="w-full border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none focus:border-gray-900 transition" />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-gray-400 block mb-2">Message</label>
              <textarea rows={5} placeholder="Tell us about your project" required className="w-full border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none focus:border-gray-900 transition resize-none" />
            </div>
            <button className="bg-gray-900 text-white px-8 py-4 text-xs uppercase tracking-widest font-medium hover:bg-gray-700 transition w-full">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}