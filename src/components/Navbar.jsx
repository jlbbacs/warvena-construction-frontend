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
  const getLabel = (item) => item.page_label || item.pageTitle;
  const getPath = (slug) => (slug === "/" ? "/" : `/${slug}`);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center transition-all duration-300
  ${
    isTransparent
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
          style={{
            filter: isTransparent ? "none" : "invert(1)",
          }}
        />
      </Link>

      {/* Hamburger - mobile only */}
      <button
        className="lg:hidden bg-transparent border-none cursor-pointer flex flex-col gap-[5px] p-1"
        style={{ color: "inherit" }}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? (
          <span className="text-2xl leading-none" style={{ color: "inherit" }}>
            ✕
          </span>
        ) : (
          <>
            <span className="block w-6 h-[2px] bg-current" />
            <span className="block w-6 h-[2px] bg-current" />
            <span className="block w-6 h-[2px] bg-current" />
          </>
        )}
      </button>

      {/* Desktop links - lg and above */}
      <ul className="hidden lg:flex list-none gap-8 items-center m-0 p-0">
        <li>
          <Link
            to="/"
            className="text-sm uppercase inline-block border-b border-transparent pb-[3px] hover:border-current transition-all"
            style={{ color: "inherit", fontFamily: "Space Mono, monospace" }}
          >
            Home
          </Link>
        </li>
        {navItems.map((item) => (
          <li key={item._key}>
            <Link
              to={getPath(item.pageSlug)}
              className="text-sm uppercase inline-block border-b border-transparent pb-[3px] hover:border-current transition-all"
              style={{ color: "inherit", fontFamily: "Space Mono, monospace" }}
            >
              {getLabel(item)}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile fullscreen menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-white text-gray-900 flex flex-col gap-8 px-12 pt-24 z-40">
          <button
            className="absolute top-6 right-8 text-2xl text-gray-900"
            onClick={() => setMenuOpen(false)}
          >
            ✕
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
              to={getPath(item.pageSlug)}
              onClick={() => setMenuOpen(false)}
              className="text-sm uppercase inline-block border-b border-transparent pb-[3px] text-gray-900"
              style={{ fontFamily: "Space Mono, monospace" }}
            >
              {getLabel(item)}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
