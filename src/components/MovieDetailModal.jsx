import { useEffect } from "react";

export default function MovieModal({ movie, onClose }) {
  useEffect(() => {
    if (!movie) {
      return;
    }

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [movie, onClose]);

  if (!movie) {
    return null;
  }

  const image =
    movie.image?.original ||
    movie.image?.medium ;

  const rating = movie.rating?.average || "N/A";

  const releaseDate = movie.premiered
    ? new Date(movie.premiered).toLocaleDateString()
    : "N/A";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-gray-900 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="movie-modal-title"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close movie details"
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-xl text-white transition hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-white"
        >
          ✕
        </button>

        <div className="relative h-56 overflow-hidden sm:h-72 md:h-96">
          <img
            src={image}
            alt={movie.name}
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-linear-to-t from-gray-900 via-gray-900/40 to-transparent" />
        </div>

        <div className="p-5 sm:p-8">
          <h2
            id="movie-modal-title"
            className="text-2xl font-bold text-white sm:text-3xl"
          >
            {movie.name}
          </h2>

          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-gray-300 sm:gap-5 sm:text-base">
            <span>⭐ Rating: {rating}</span>

            <span className="hidden sm:inline">|</span>

            <span>📅 Release: {releaseDate}</span>
          </div>

          {movie.genres?.length > 0 && (
            <div className="mt-5">
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <span
                    key={genre}
                    className="rounded-full bg-blue-600/20 px-3 py-1 text-sm text-blue-400"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6">
            <h3 className="mb-2 text-lg font-semibold text-white">
              Overview
            </h3>

            {movie.summary ? (
              <div
                className="leading-7 text-gray-400"
                dangerouslySetInnerHTML={{
                  __html: movie.summary,
                }}
              />
            ) : (
              <p className="leading-7 text-gray-400">
                No description available.
              </p>
            )}
          </div>

          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {movie.status && (
              <div>
                <p className="text-sm text-gray-500">
                  Status
                </p>

                <p className="mt-1 text-gray-200">
                  {movie.status}
                </p>
              </div>
            )}

            {movie.language && (
              <div>
                <p className="text-sm text-gray-500">
                  Language
                </p>

                <p className="mt-1 text-gray-200">
                  {movie.language}
                </p>
              </div>
            )}

            {movie.network?.name && (
              <div>
                <p className="text-sm text-gray-500">
                  Network
                </p>

                <p className="mt-1 text-gray-200">
                  {movie.network.name}
                </p>
              </div>
            )}

            {movie.runtime && (
              <div>
                <p className="text-sm text-gray-500">
                  Runtime
                </p>

                <p className="mt-1 text-gray-200">
                  {movie.runtime} minutes
                </p>
              </div>
            )}
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg bg-gray-700 px-5 py-2.5 font-medium text-white transition hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              ❌ Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
