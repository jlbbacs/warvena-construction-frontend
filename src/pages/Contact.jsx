export default function Contact() {
  const HERO_IMAGE =
    "https://cdn.sanity.io/images/pykxlxp8/production/175e934b0e0a408eef794e29449d0848135c3fb0-1800x1201.jpg";

  return (
    <div className="min-h-screen">
      {/* Hero */}
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

      {/* Content */}
      <div className="max-w-7xl mx-auto px-8 md:px-16 py-24 grid md:grid-cols-2 gap-16">
        {/* Contact info */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Get in touch</h2>

          <div className="flex flex-col gap-8">
            {/* Phone */}
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">
                Phone
              </p>
              <a
                href="tel:01872300856"
                className="text-gray-900 font-medium hover:opacity-60 transition"
              >
                01872 300856
              </a>
            </div>

            {/* Email */}
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">
                Email
              </p>
              <a
                href="mailto:info@warvenaconstruction.co.uk"
                className="text-gray-900 font-medium hover:opacity-60 transition"
              >
                info@warvenaconstruction.co.uk
              </a>
            </div>

            {/* Address */}
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">
                Address
              </p>
              <p className="text-gray-900 leading-relaxed">
                Warvena Construction
                <br />
                Unit 2, Cornwall Business Park West
                <br />
                Space to Work, Scorrier
                <br />
                Redruth, TR16 5FG
              </p>
            </div>

            {/* Hours */}
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">
                Office Hours
              </p>
              <p className="text-gray-900">Monday to Friday · 9am to 5pm</p>
            </div>

            {/* Social */}
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">
                Social
              </p>
              <a
                href="https://www.instagram.com/warvena_construction/"
                target="_blank"
                rel="noreferrer"
                aria-label="Warvena Construction on Instagram"
                className="text-gray-900 font-medium hover:opacity-60 transition"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>

        {/* Contact form */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Send a message</h2>

          <form
            className="flex flex-col gap-5"
            onSubmit={(e) => {
              e.preventDefault();
              // TODO: hook up your submit handler (email service / API route / form provider)
            }}
          >
            <div>
              <label className="text-xs uppercase tracking-widest text-gray-400 block mb-2">
                Name
              </label>
              <input
                name="name"
                type="text"
                placeholder="Your name"
                required
                className="w-full border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none focus:border-gray-900 transition"
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-widest text-gray-400 block mb-2">
                Email
              </label>
              <input
                name="email"
                type="email"
                placeholder="your@email.com"
                required
                className="w-full border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none focus:border-gray-900 transition"
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-widest text-gray-400 block mb-2">
                Phone
              </label>
              <input
                name="phone"
                type="tel"
                placeholder="Your phone number"
                className="w-full border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none focus:border-gray-900 transition"
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-widest text-gray-400 block mb-2">
                Message
              </label>
              <textarea
                name="message"
                rows={5}
                placeholder="Tell us about your project"
                required
                className="w-full border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none focus:border-gray-900 transition resize-none"
              />
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