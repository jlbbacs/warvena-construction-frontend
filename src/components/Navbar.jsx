import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { client } from "../sanityClient.js";
import Logo from "../assets/warvena-logo.svg";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navItems, setNavItems] = useState([]);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    setScrolled(false);
    window.scrollTo(0, 0);
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location]);

  useEffect(() => {
    client
      .fetch(
        `
      *[_type == "menu" && slug.current == "main-menu"][0]{
        navigation_items[]{
          _key,
          page_label,
          "pageTitle": page->title,
          "pageSlug": page->slug.current
        }
      }
    `,
      )
      .then((data) => {
        if (data?.navigation_items) setNavItems(data.navigation_items);
      });
  }, []);

  const isTransparent = isHome && !scrolled;

  // Get label - use page_label if exists, otherwise pageTitle
  const getLabel = (item) => item.page_label || item.pageTitle;

  // Get path from slug
  const getPath = (slug) => {
    if (slug === "/") return "/";
    return `/${slug}`;
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center py-6 transition-all duration-300
  ${
    isTransparent
      ? "bg-transparent text-white"
      : "bg-white text-gray-900 shadow-[0_1px_0_rgba(0,0,0,0.1)]"
  }`}
      style={{
        paddingLeft: "clamp(2rem, 8vw, 8rem)",
        paddingRight: "clamp(2rem, 8vw, 8rem)",
      }}
    >
      {/* SVG Logo */}
      <Link to="/" className="flex items-center" style={{ color: "inherit"}}>
        <img src={Logo} alt="Warvena Construction" className="h-10 w-auto" />
      </Link>

      {/* Hamburger */}
      <button
        className="md:hidden bg-transparent border-none text-2xl cursor-pointer"
        style={{ color: "inherit" }}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      {/* Desktop links */}
      <ul className="hidden md:flex list-none gap-10 items-center m-0 p-0">
        {/* Home link */}
        <li>
          <Link
            to="/"
            className="text-xs font-medium uppercase tracking-widest hover:opacity-50 transition-opacity"
            style={{ color: "inherit", fontFamily: "Poppins, sans-serif" }}
          >
            Home
          </Link>
        </li>

        {/* Dynamic nav items */}
        {navItems.map((item) => (
          <li key={item._key}>
            <Link
              to={getPath(item.pageSlug)}
              className={`text-xs font-medium uppercase tracking-widest transition-opacity
                ${
                  item.pageSlug === "contact"
                    ? "border-b border-current pb-0.5 hover:opacity-50"
                    : "hover:opacity-50"
                }`}
              style={{ color: "inherit", fontFamily: "Poppins, sans-serif" }}
            >
              {getLabel(item)}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile fullscreen menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-white text-gray-900 flex flex-col gap-8 px-12 pt-24 z-40">
          {/* Close button */}
          <button
            className="absolute top-6 right-8 text-2xl text-gray-900"
            onClick={() => setMenuOpen(false)}
          >
            ✕
          </button>

          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="text-base font-medium uppercase tracking-widest text-gray-900 hover:opacity-50 transition-opacity"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Home
          </Link>

          {navItems.map((item) => (
            <Link
              key={item._key}
              to={getPath(item.pageSlug)}
              onClick={() => setMenuOpen(false)}
              className="text-base font-medium uppercase tracking-widest text-gray-900 hover:opacity-50 transition-opacity"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              {getLabel(item)}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
