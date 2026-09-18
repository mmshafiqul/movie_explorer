import { useEffect, useState } from "react";
import { searchMovies } from "../utils/api";

export default function SearchMovie({
  onSearchResults,
  onSearchLoading,
  onSearchQueryChange,
}) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    onSearchQueryChange(query);

    if (!query.trim()) {
      onSearchResults([]);
      onSearchLoading(false);
      return;
    }

    const timeoutId = setTimeout(async () => {
      try {
        onSearchLoading(true);

        const data = await searchMovies(query.trim());

        onSearchResults(data);
      } catch (error) {
        console.error("Search error:", error);

        onSearchResults([]);
      } finally {
        onSearchLoading(false);
      }
    }, 400);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [
    query,
    onSearchResults,
    onSearchLoading,
    onSearchQueryChange,
  ]);

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const handleClear = () => {
    setQuery("");
  };

  return (
    <div className="mx-auto mb-10 max-w-7xl">
      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xl text-red-500">
          🔍
        </span>

        <input
          type="text"
          value={query}
          onChange={handleQueryChange}
          placeholder="Search for your favorite movies & TV shows..."
          className="w-full rounded-xl border border-gray-700 bg-gray-900 py-4 pl-12 pr-12 text-white outline-none transition placeholder:text-gray-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
        />

        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-white"
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
