export default function MovieCard({ movie, onSeeDetails }) {
  const poster =
    movie.image?.medium ||
    movie.image?.original ;

  const rating = movie.rating?.average || "N/A";

  const year = movie.premiered
    ? new Date(movie.premiered).getFullYear()
    : "N/A";

  return (
    <article className="overflow-hidden rounded-xl bg-gray-900 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="h-64 overflow-hidden bg-gray-800">
        <img
          src={poster}
          alt={movie.name}
          className="h-full w-full object-cover transition duration-300 hover:scale-105"
        />
      </div>

      <div className="p-4">
        <h2 className="truncate text-lg font-bold text-white">
          {movie.name}
        </h2>

        <div className="mt-2 flex justify-between items-center gap-2 text-sm text-gray-400 ">
          <span>⭐ {rating}</span>

          <span>•</span>

          <span>📅 {year}</span>
        </div>

        <button
          type="button"
          onClick={() => onSeeDetails(movie)}
          className="mt-4 w-full rounded-lg bg-red-600 px-4 py-2.5 font-medium text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          See Details
        </button>
      </div>
    </article>
  );
}
