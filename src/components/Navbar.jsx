import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { client } from "../../sanityclient";
import Logo from "../assets/warvena-logo.svg";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navItems, setNavItems] = useState([]);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  const services = [
    "Residential Construction & Renovations",
    "Commercial Construction",
    "Construction Specialist",
    "House Extensions",
    "Structural Repairs",
    "Demolition",
    "Costing & Estimating",
    "Planning & Consultation"
  ];

  useEffect(() => {
    setScrolled(false);
    window.scrollTo(0, 0);
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location]);

  useEffect(() => {
    client
      .fetch(`*[_type == "menu" && slug.current == "main-menu"][0]{
          navigation_items[]{
            _key,
            page_label,
            external_link,
            "pageSlug": page->slug.current
          }
        }`)
      .then((data) => {
        if (data?.navigation_items) setNavItems(data.navigation_items);
      });
  }, []);

  const isTransparent = isHome && !scrolled;
  const iconColor = isTransparent ? "#FFFFFF" : "#111111";

  const getHref = (item) => {
    if (item.external_link) return item.external_link.replace('https://warvena-construction-frontend.vercel.app', '');
    return item.pageSlug === "/" ? "/" : `/${item.pageSlug}`;
  };

  const navItemLi = "relative flex items-center h-full";
  const linkClass = "text-[12px] tracking-[0.15em] uppercase flex items-center border-b border-transparent pb-[2px] hover:border-current transition-all cursor-pointer leading-none h-[20px]";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] flex justify-between items-center transition-all duration-500
        ${isTransparent ? "py-8 lg:py-12 bg-transparent text-white" : "py-4 lg:py-6 bg-white text-gray-900 shadow-sm"}`}
      style={{ paddingLeft: "clamp(1.5rem, 6vw, 8rem)", paddingRight: "clamp(1.5rem, 6vw, 8rem)" }}
    >
      <Link to="/" className="flex items-center shrink-0 z-[110]">
        <img
          src={Logo}
          alt="Warvena"
          className="h-7 lg:h-8 w-auto transition-all"
          style={{ filter: isTransparent ? "none" : "invert(1)" }}
        />
      </Link>

      {/* Desktop Navigation */}
      <ul className="hidden lg:flex list-none gap-10 items-center m-0 p-0 h-full">
        <li className={navItemLi}><Link to="/" className={linkClass} style={{ fontFamily: "Space Mono, monospace" }}>Home</Link></li>
        
        {navItems.map((item) => {
          const isServices = item.page_label?.toLowerCase() === "services";
          return isServices ? (
            <li key={item._key} className={`${navItemLi} group`}>
              <Link to={getHref(item)} className={`${linkClass} gap-2 group-hover:opacity-60`} style={{ fontFamily: "Space Mono, monospace" }}>
                {item.page_label}
                <svg className="w-2.5 h-2.5 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeWidth="3" /></svg>
              </Link>

              {/* MEGA MENU: Changed to fixed and centered on screen */}
              <div className="fixed top-[80px] lg:top-[100px] left-1/2 -translate-x-1/2 w-[90vw] max-w-[1100px] bg-white shadow-[0_40px_80px_rgba(0,0,0,0.15)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 p-16 border-t-4 border-black text-gray-900 translate-y-2 group-hover:translate-y-0">
                <div className="grid grid-cols-12 gap-16">
                  
                  {/* Branding Column */}
                  <div className="col-span-4 flex flex-col justify-between border-r border-gray-100 pr-12">
                    <div>
                      <h3 className="text-[10px] tracking-[0.5em] uppercase font-bold text-gray-400 mb-8" style={{ fontFamily: "Space Mono, monospace" }}>
                        The Studio
                      </h3>
                      <p className="text-xl font-medium leading-snug text-black mb-6">
                        Expertise in high-end construction and structural engineering.
                      </p>
                    </div>
                    <Link to="/contact" className="text-[11px] uppercase tracking-widest font-bold border-b-2 border-black w-fit pb-1 hover:text-gray-500 hover:border-gray-500 transition-all">
                      Get a Consultation
                    </Link>
                  </div>

                  {/* Services List Column */}
                  <div className="col-span-8">
                    <h4 className="text-[10px] tracking-[0.4em] uppercase font-bold text-gray-400 mb-10" style={{ fontFamily: "Space Mono, monospace" }}>
                      Our Core Services
                    </h4>
                    <ul className="grid grid-cols-2 gap-x-12 gap-y-6">
                      {services.map((s) => (
                        <li key={s}>
                          <Link 
                            to={`/services/${s.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`} 
                            className="group/item flex items-center justify-between text-[12px] tracking-widest uppercase text-gray-600 hover:text-black transition-all" 
                            style={{ fontFamily: "Space Mono, monospace" }}
                          >
                            <span className="group-hover/item:translate-x-3 transition-transform duration-300">{s}</span>
                            <span className="opacity-0 group-hover/item:opacity-100 transition-all -translate-x-4 group-hover/item:translate-x-0">→</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </li>
          ) : (
            <li key={item._key} className={navItemLi}>
                <Link to={getHref(item)} className={linkClass} style={{ fontFamily: "Space Mono, monospace" }}>
                    {item.page_label}
                </Link>
            </li>
          );
        })}
      </ul>

      {/* Mobile Toggle */}
      <button 
        className="lg:hidden flex flex-col justify-center items-end w-8 h-8 z-[110] relative bg-transparent border-none outline-none cursor-pointer"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className={`h-[2px] transition-all duration-300 rounded-full ${menuOpen ? "w-8 rotate-45 translate-y-[2px] bg-black" : "w-8 mb-1.5 bg-current"}`} style={{ backgroundColor: !menuOpen ? iconColor : "" }}></span>
        <span className={`h-[2px] transition-all duration-300 rounded-full ${menuOpen ? "w-0 opacity-0 bg-black" : "w-5 mb-1.5 bg-current"}`} style={{ backgroundColor: !menuOpen ? iconColor : "" }}></span>
        <span className={`h-[2px] transition-all duration-300 rounded-full ${menuOpen ? "w-8 -rotate-45 -translate-y-[10px] bg-black" : "w-8 bg-current"}`} style={{ backgroundColor: !menuOpen ? iconColor : "" }}></span>
      </button>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-white z-[100] transition-all duration-500 ease-in-out ${menuOpen ? "opacity-100 visible translate-x-0" : "opacity-0 invisible translate-x-full"}`}>
        <div className="flex flex-col h-full px-8 pt-32 pb-12 overflow-y-auto">
          <Link to="/" onClick={() => setMenuOpen(false)} className="text-4xl uppercase font-black mb-8">Home</Link>
          {navItems.map((item) => {
            const isServices = item.page_label?.toLowerCase() === "services";
            return isServices ? (
              <div key={item._key} className="flex flex-col gap-4 mb-8">
                <div className="flex justify-between items-center" onClick={() => setServicesOpen(!servicesOpen)}>
                  <span className="text-4xl uppercase font-black">{item.page_label}</span>
                  <span className="text-2xl font-light">{servicesOpen ? "−" : "+"}</span>
                </div>
                {servicesOpen && (
                  <div className="flex flex-col gap-4 pl-4 border-l-2 border-black mt-2">
                    {services.map(s => (
                      <Link key={s} to={`/services/${s.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`} onClick={() => setMenuOpen(false)} className="text-xs uppercase tracking-[0.2em] text-gray-500 font-bold">{s}</Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link key={item._key} to={getHref(item)} onClick={() => setMenuOpen(false)} className="text-4xl uppercase font-black mb-8">{item.page_label}</Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}