import { useEffect, useState } from "react";
import { client } from "../sanityClient.js";
import { Link } from "react-router-dom";

const UNIQUE_TABS = [
  {
    title: "Reliability",
    sub: "Accurate costing from the outset",
    text: [
      "Consistent, dependable, top-quality results are important to you, and we fully understand that. With extensive experience working with clients who have entrusted us with their property investments, we confidently deliver our services with honesty, integrity, and a grounded, realistic approach.",
      "Our track record reflects our commitment to excellence, ensuring that every project is handled with the utmost care and professionalism. We take pride in building trust through transparency and consistently meeting the high standards our clients expect.",
    ],
  },
  {
    title: "Reputation",
    sub: "Trusted partners throughout every stage",
    text: [
      "Our clients consistently view us as trusted partners throughout every stage of the construction process. Their continued confidence in our abilities is evident as they repeatedly entrust us with new projects, knowing that our dedication to quality and excellence remains unwavering.",
      "We take pride in the strong relationships we have built with our clients, which are founded on mutual respect, transparency, and a shared vision for success. Together, we have built more than just structures — we have built enduring stories on solid foundations.",
    ],
  },
  {
    title: "Quality",
    sub: "Maintaining the highest standards",
    text: [
      "Maintaining the highest standards is our way of showing respect to you and your property. We believe that excellence is not just a goal, but a commitment we uphold in every project. By setting our own benchmarks and continuously exceeding them, we pursue perfection with every detail.",
      "We understand that each project is unique, which is why we take pride in finding tailored solutions that work best for you. Our dedication to quality goes beyond the surface, ensuring that what we build not only meets but surpasses expectations.",
    ],
  },
  {
    title: "Professionalism",
    sub: "Passionate individuals with exceptional skill",
    text: [
      "We are a team of passionate individuals with exceptional competence and skill in delivering high-end bespoke projects. Our dedication to craftsmanship and attention to detail ensures that each project we undertake is a true reflection of our commitment to excellence.",
      "With our extensive knowledge and experience, we empower you to make informed decisions every step of the way. We believe that a well-informed client is key to a successful partnership.",
    ],
  },
  {
    title: "Communication",
    sub: "Continuous and efficient communication",
    text: [
      "We strongly believe that the key to a successful collaboration lies in continuous and efficient communication. Keeping you informed at every step of the process is our commitment, ensuring that you always feel connected and confident in the progress of your project.",
      "Your feedback and queries are our top priority. We make it a point to return calls within two hours and reply to emails by the next business day. Our goal is to provide you with the clarity and support you need to make informed decisions.",
    ],
  },
  {
    title: "Deadlines & budget",
    sub: "Honest, realistic pricing and project roadmap",
    text: [
      "Your requirements will be met with honest, realistic pricing and a detailed project roadmap that clearly outlines every phase of your project. We believe that transparency is essential to building trust.",
      "This is achieved through thorough preparation, effective hands-on project management, and our ability to adapt swiftly to the ever-changing building environment. By anticipating challenges and finding immediate solutions, we ensure that your project stays on track.",
    ],
  },
];

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "page" && slug.current == "/"][0].components[2].projects[]->{
          _id, title, slug, location, type,
          "image": image.asset->url,
          "category": project_categories[0]->title
        }`
      )
      .then((data) => {
        if (data) setProjects(data);
      });
  }, []);

  return (
    <div>
      {/* Hero - Vimeo video background */}
      <div className="relative h-screen w-full overflow-hidden">
        <iframe
          src="https://player.vimeo.com/video/1026164224?autoplay=1&muted=1&loop=1&background=1&controls=0"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100vw",
            height: "56.25vw",
            minHeight: "100vh",
            minWidth: "177.78vh",
            border: "none",
          }}
          allow="autoplay; fullscreen"
          frameBorder="0"
        />
        <div className="absolute inset-0 bg-black/40" />

        {/* Hero text - vertically centered, left aligned */}
        <div className="absolute inset-0 z-10 flex flex-col justify-center"
          style={{ paddingLeft: 'clamp(2rem, 8vw, 8rem)' }}>
          <div className="max-w-lg">
            <h1
  className="text-white font-black leading-tight mb-6"
  style={{ fontSize: 'clamp(2rem, 3.5vw, 3.2rem)' }}>
  Exciting buildings that stand the test of time
</h1>
            <p className="text-white/70 text-xs uppercase tracking-[0.3em]">
              Your success is our success
            </p>
          </div>
        </div>

        {/* Coordinates - bottom right */}
        <div className="absolute bottom-16 right-16 z-10 text-right hidden md:block">
          <p className="text-white/70 text-xs uppercase tracking-widest mb-1">
            Gwithian Bay
          </p>
          <p className="text-white/60 text-xs tracking-widest">
            50°13&apos;20.5&quot;N 6°36&apos;57.8&quot;W
          </p>
        </div>

        {/* Scroll arrow - bottom center */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </div>

      {/* Unique story */}
      <div style={{ paddingLeft: 'clamp(2rem, 8vw, 8rem)', paddingRight: 'clamp(2rem, 8vw, 8rem)' }}
        className="py-24 ml-auto max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-snug text-right">
          Each home has a unique story and each project requires an individual approach. Yours does too.
        </h2>
      </div>

      {/* Featured project */}
      <div style={{ paddingLeft: 'clamp(2rem, 8vw, 8rem)', paddingRight: 'clamp(2rem, 8vw, 8rem)' }}
        className="pb-24">
        {projects[0] && (
          <Link to={`/projects/${projects[0].slug.current}`} className="group block">
            <div className="overflow-hidden">
              <img
                src={projects[0].image}
                alt={projects[0].title}
                className="w-full h-[65vh] object-cover group-hover:scale-105 transition duration-700"
              />
            </div>
            <div className="mt-5 flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {projects[0].title}
                </h3>
              </div>
              <span className="text-xs text-gray-400 uppercase tracking-widest mt-2 shrink-0 ml-8">
                {projects[0].type}
              </span>
            </div>
          </Link>
        )}
      </div>

      {/* About teaser */}
      <div style={{ paddingLeft: 'clamp(2rem, 8vw, 8rem)', paddingRight: 'clamp(2rem, 8vw, 8rem)' }}
        className="py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 max-w-xl leading-snug mb-8">
          Our focus is on fostering strong, long-lasting relationships.
        </h2>
        <Link
          to="/about"
          className="inline-block border border-gray-900 text-gray-900 px-8 py-3 text-xs font-medium uppercase tracking-widest hover:bg-gray-900 hover:text-white transition">
          About Warvena
        </Link>
      </div>

      {/* What makes us unique - tabs */}
      <div style={{ paddingLeft: 'clamp(2rem, 8vw, 8rem)', paddingRight: 'clamp(2rem, 8vw, 8rem)' }}
        className="py-24 border-t border-gray-100">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
          What makes us unique?
        </h2>

        {/* Tab buttons */}
        <div className="flex flex-wrap gap-2 mb-12 border-b border-gray-200 pb-6">
          {UNIQUE_TABS.map((tab, i) => (
            <button
              key={tab.title}
              onClick={() => setActiveTab(i)}
              className={`px-4 py-2 text-xs font-medium uppercase tracking-widest transition border
                ${activeTab === i
                  ? "bg-gray-900 text-white border-gray-900"
                  : "text-gray-500 border-gray-300 hover:border-gray-900 hover:text-gray-900"
                }`}>
              {tab.title}
            </button>
          ))}
        </div>

        {/* Active tab content */}
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">
              {UNIQUE_TABS[activeTab].sub}
            </p>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {UNIQUE_TABS[activeTab].title}
            </h3>
            {UNIQUE_TABS[activeTab].text.map((para, i) => (
              <p key={i} className="text-gray-600 leading-relaxed mb-4">{para}</p>
            ))}
          </div>
          <div />
        </div>
      </div>

      {/* CTA banner */}
      <div className="bg-gray-900 text-white py-20 text-center"
        style={{ paddingLeft: 'clamp(2rem, 8vw, 8rem)', paddingRight: 'clamp(2rem, 8vw, 8rem)' }}>
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to start your project?
        </h2>
        <Link
          to="/contact"
          className="inline-block bg-white text-gray-900 px-10 py-4 font-semibold uppercase tracking-widest hover:bg-gray-100 transition">
          Get in touch
        </Link>
        <p className="mt-6 text-gray-400 text-sm">
          or call us on{" "}
          <a href="tel:01872300856" className="text-white font-semibold hover:underline">
            01872 300856
          </a>
        </p>
      </div>
    </div>
  );
}