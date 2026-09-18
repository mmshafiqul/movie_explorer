export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-red-500">
              MovieExplorer
            </h2>
            <p className="text-sm mt-1">
              Discover your next favorite movie.
            </p>
          </div>
          <div className="flex items-center gap-5">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              GitHub
            </a>

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              Facebook
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              Twitter
            </a>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-800 text-center text-sm">
          © 2026 MovieExplorer. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
