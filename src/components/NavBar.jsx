import { useState } from "react";
import { Link, NavLink } from "react-router";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-red-500 font-semibold"
      : "text-gray-300 hover:text-white";

  return (
    <nav className="bg-gray-900 text-white px-6 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="text-2xl font-bold text-red-500"
            onClick={() => setIsMenuOpen(false)}
          >
            MovieExplorer
          </Link>
          <div className="hidden md:flex items-center gap-6">
             <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>

            <NavLink to="/movies" className={navLinkClass}>
              Movies
            </NavLink>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/movies"
              className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg font-semibold transition"
            >
              Browse Movies
            </Link>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-300 hover:text-white focus:outline-none"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-gray-700">
            <div className="flex flex-col gap-4">
              <NavLink
                to="/"
                className={navLinkClass}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </NavLink>

              <NavLink
                to="/movies"
                className={navLinkClass}
                onClick={() => setIsMenuOpen(false)}
              >
                Movies
              </NavLink>

              <Link
                to="/movies"
                onClick={() => setIsMenuOpen(false)}
                className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg font-semibold text-center transition"
              >
                Browse Movies
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
