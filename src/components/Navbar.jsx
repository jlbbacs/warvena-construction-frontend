import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { client } from "../../sanityclient";
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
      .fetch(`
        *[_type == "menu" && slug.current == "main-menu"][0]{
          navigation_items[]{
            _key,
            page_label,
            external_link,
            external_link_label,
            "pageTitle": page->title,
            "pageSlug": page->slug.current
          }
        }
      `)
      .then((data) => {
        if (data?.navigation_items) setNavItems(data.navigation_items);
      });
  }, []);

  const isTransparent = isHome && !scrolled;
  const iconColor = isTransparent ? "white" : "#111111";
  const getLabel = (item) => item.page_label || item.pageTitle;
  const getPath = (slug) => (slug === "/" ? "/" : `/${slug}`);

  // Converts full Vercel URL to relative path for React Router
  const getHref = (item) => {
    if (item.external_link) {
      return item.external_link.replace(
        'https://warvena-construction-frontend.vercel.app', ''
      )
    }
    return getPath(item.pageSlug)
  }

  const getLinkLabel = (item) => {
    return item.external_link_label || item.page_label || item.pageTitle
  }

  const linkClass = "text-sm uppercase inline-block border-b border-transparent pb-[3px] hover:border-current transition-all"

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center transition-all duration-300
        ${isTransparent
          ? "py-6 lg:py-12 bg-transparent text-white"
          : "py-4 lg:py-6 bg-white text-gray-900 shadow-[0_1px_0_rgba(0,0,0,0.1)]"
        }`}
      style={{
        paddingLeft: "clamp(2rem, 8vw, 8rem)",
        paddingRight: "clamp(2rem, 8vw, 8rem)",
      }}
    >
      {/* Logo */}
      <Link to="/" className="flex items-center" style={{ color: "inherit" }}>
        <img
          src={Logo}
          alt="Warvena Construction"
          className="h-9.5 w-auto"
          style={{ filter: isTransparent ? "none" : "invert(1)" }}
        />
      </Link>

      {/* Hamburger - mobile only */}
      <button
        className="lg:hidden bg-transparent border-none cursor-pointer p-2"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="1.5">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="24" viewBox="0 0 30 24" fill="none">
            <path
              d="M30 12C30 12.3315 29.8683 12.6495 29.6339 12.8839C29.3995 13.1183 29.0815 13.25 28.75 13.25H1.25C0.918479 13.25 0.600537 13.1183 0.366117 12.8839C0.131696 12.6495 0 12.3315 0 12C0 11.6685 0.131696 11.3505 0.366117 11.1161C0.600537 10.8817 0.918479 10.75 1.25 10.75H28.75C29.0815 10.75 29.3995 10.8817 29.6339 11.1161C29.8683 11.3505 30 11.6685 30 12ZM1.25 3.25H28.75C29.0815 3.25 29.3995 3.1183 29.6339 2.88388C29.8683 2.64946 30 2.33152 30 2C30 1.66848 29.8683 1.35054 29.6339 1.11612C29.3995 0.881696 29.0815 0.75 28.75 0.75H1.25C0.918479 0.75 0.600537 0.881696 0.366117 1.11612C0.131696 1.35054 0 1.66848 0 2C0 2.33152 0.131696 2.64946 0.366117 2.88388C0.600537 3.1183 0.918479 3.25 1.25 3.25ZM28.75 20.75H14.5833C14.2518 20.75 13.9339 20.8817 13.6995 21.1161C13.465 21.3505 13.3333 21.6685 13.3333 22C13.3333 22.3315 13.465 22.6495 13.6995 22.8839C13.9339 23.1183 14.2518 23.25 14.5833 23.25H28.75C29.0815 23.25 29.3995 23.1183 29.6339 22.8839C29.8683 22.6495 30 22.3315 30 22C30 21.6685 29.8683 21.3505 29.6339 21.1161C29.3995 20.8817 29.0815 20.75 28.75 20.75Z"
              fill={iconColor}
            />
          </svg>
        )}
      </button>

      {/* Desktop links */}
      <ul className="hidden lg:flex list-none gap-8 items-center m-0 p-0">
        <li>
          <Link
            to="/"
            className={linkClass}
            style={{ color: "inherit", fontFamily: "Space Mono, monospace" }}
          >
            Home
          </Link>
        </li>
        {navItems.map((item) => (
          <li key={item._key}>
            <Link
              to={getHref(item)}
              className={linkClass}
              style={{ color: "inherit", fontFamily: "Space Mono, monospace" }}
            >
              {getLinkLabel(item)}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile fullscreen menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-white text-gray-900 flex flex-col gap-8 px-12 pt-24 z-40">
          <button
            className="absolute top-6 right-8"
            onClick={() => setMenuOpen(false)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="text-sm uppercase inline-block border-b border-transparent pb-[3px] text-gray-900"
            style={{ fontFamily: "Space Mono, monospace" }}
          >
            Home
          </Link>

          {navItems.map((item) => (
            <Link
              key={item._key}
              to={getHref(item)}
              onClick={() => setMenuOpen(false)}
              className="text-sm uppercase inline-block border-b border-transparent pb-[3px] text-gray-900"
              style={{ fontFamily: "Space Mono, monospace" }}
            >
              {getLinkLabel(item)}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}