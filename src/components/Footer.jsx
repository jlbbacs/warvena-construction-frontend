export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-16">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">

        {/* Brand */}
        <div>
          <p className="text-white font-bold tracking-widest uppercase mb-3">
            Warvena Construction
          </p>
          <p className="text-sm leading-relaxed">
            Unit 2, Cornwall Business Park West,<br />
            Space to Work, Scorrier,<br />
            Redruth, TR16 5FG
          </p>
        </div>

        {/* Links */}
        <div>
          <p className="text-white font-semibold mb-3">Navigation</p>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-white transition">Home</a></li>
            <li><a href="/projects" className="hover:text-white transition">Projects</a></li>
            <li><a href="/about" className="hover:text-white transition">About</a></li>
            <li><a href="/faq" className="hover:text-white transition">FAQ</a></li>
            <li><a href="/contact" className="hover:text-white transition">Get in touch</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="text-white font-semibold mb-3">Contact</p>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="tel:01872300856" className="hover:text-white transition">
                📞 01872 300856
              </a>
            </li>
            <li>
              <a href="mailto:info@warvenaconstruction.co.uk" className="hover:text-white transition">
                ✉️ info@warvenaconstruction.co.uk
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/warvena_construction/"
                target="_blank" rel="noreferrer" className="hover:text-white transition">
                📸 Instagram
              </a>
            </li>
            <li>Monday to Friday · 9am to 5pm</li>
          </ul>
        </div>

      </div>
      <div className="max-w-7xl mx-auto px-6 mt-10 pt-6 border-t border-gray-700 text-sm text-center">
        © {new Date().getFullYear()} Warvena Construction. All rights reserved.
      </div>
    </footer>
  )
}