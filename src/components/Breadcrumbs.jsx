import { Link, useLocation } from "react-router-dom";

export default function Breadcrumbs() {
  const location = useLocation();
  
  // Split path into segments and remove empty strings
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Don't show breadcrumbs on the home page
  if (pathnames.length === 0) return null;

  return (
    <nav aria-label="breadcrumb" className="max-w-7xl mx-auto px-8 md:px-16 pt-32 pb-4">
      <ol className="flex items-center space-x-2 list-none p-0 m-0">
        {/* Home Link */}
        <li>
          <Link 
            to="/" 
            className="text-[10px] uppercase tracking-[0.2em] text-gray-400 hover:text-gray-900 transition-colors"
          >
            Home
          </Link>
        </li>

        {/* Dynamic Path Segments */}
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;

          // Format the URL string (replace dashes with spaces and capitalize)
          const displayName = value.replace(/-/g, " ");

          return (
            <li key={to} className="flex items-center space-x-2">
              <span className="text-gray-300 text-[10px]">/</span>
              {last ? (
                <span className="text-[10px] uppercase tracking-[0.2em] text-gray-900 font-bold">
                  {displayName}
                </span>
              ) : (
                <Link 
                  to={to} 
                  className="text-[10px] uppercase tracking-[0.2em] text-gray-400 hover:text-gray-900 transition-colors"
                >
                  {displayName}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}