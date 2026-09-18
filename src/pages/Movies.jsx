import { useCallback, useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import MovieDetailModal from "../components/MovieDetailModal";
import { getMovies } from "../utils/api";
import SearchMovie from "../components/SearchMovie";

export default function Movies() {
  const [movies, setMovies] = useState([]);

  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const [error, setError] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const fetchInitialMovies = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getMovies(0);

        if (!cancelled) {
          setMovies(data);
          setPage(0);

          if (data.length < 20) {
            setHasMore(false);
          }
        }
      } catch (error) {
        console.error(error);

        if (!cancelled) {
          setError("Failed to load movies.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchInitialMovies();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleLoadMore = async () => {
    if (loadingMore || !hasMore) {
      return;
    }

    try {
      setLoadingMore(true);
      setError("");

      const nextPage = page + 1;

      const data = await getMovies(nextPage);

      setMovies((previousMovies) => {
        const existingIds = new Set(
          previousMovies.map((movie) => movie.id)
        );

        const newMovies = data.filter(
          (movie) => !existingIds.has(movie.id)
        );

        return [...previousMovies, ...newMovies];
      });

      setPage(nextPage);

      if (data.length < 20) {
        setHasMore(false);
      }
    } catch (error) {
      console.error(error);
      setError("Failed to load more movies.");
    } finally {
      setLoadingMore(false);
    }
  };

  const handleSearchResults = useCallback((results) => {
    setSearchResults(results);
  }, []);

  const handleSearchLoading = useCallback((value) => {
    setSearchLoading(value);
  }, []);

  const handleSearchQueryChange = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  const handleOpenModal = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  if (loading) {
    return (
      <section className="min-h-[calc(100vh-4rem)] bg-gray-950 px-6 py-12">
        <div className="flex min-h-100 items-center justify-center">
          <p className="text-lg text-gray-400">
            Loading movies...
          </p>
        </div>
      </section>
    );
  }

  if (error && movies.length === 0) {
    return (
      <section className="min-h-[calc(100vh-4rem)] bg-gray-950 px-6 py-12">
        <div className="flex min-h-100 items-center justify-center">
          <p className="text-lg text-red-500">
            {error}
          </p>
        </div>
      </section>
    );
  }

  const isSearching = searchQuery.trim().length > 0;

  return (
    <>
      <section className="min-h-[calc(100vh-4rem)] bg-gray-950 px-6 py-12">

        <SearchMovie
          onSearchResults={handleSearchResults}
          onSearchLoading={handleSearchLoading}
          onSearchQueryChange={handleSearchQueryChange}
        />

        <div className="mx-auto max-w-7xl">
          {isSearching ? (
            <>
              <div className="mb-10">
                <h1 className="text-4xl font-bold text-white">
                  Search Results
                </h1>

                <p className="mt-2 text-gray-400">
                  Results for{" "}
                  <span className="font-semibold text-white">
                    "{searchQuery}"
                  </span>
                </p>
              </div>

              {searchLoading && (
                <div className="flex justify-center py-16">
                  <p className="text-lg text-gray-400">
                    Searching...
                  </p>
                </div>
              )}

              {!searchLoading && searchResults.length > 0 && (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {searchResults.map((movie) => (
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                      onSeeDetails={handleOpenModal}
                    />
                  ))}
                </div>
              )}
              {!searchLoading && searchResults.length === 0 && (
                <div className="py-16 text-center">
                  <p className="text-lg text-gray-500">
                    No movies found for "{searchQuery}".
                  </p>
                </div>
              )}
            </>
          ) : (

            <>
              <div className="mb-10">
                <h1 className="text-4xl font-bold text-white">
                  All Movies
                </h1>

                <p className="mt-2 text-gray-400">
                  Explore our collection and discover your next favorite.
                </p>
              </div>

              {error && (
                <div className="mb-6 rounded-lg bg-red-500/10 p-4 text-center text-red-400">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {movies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    onSeeDetails={handleOpenModal}
                  />
                ))}
              </div>

              {hasMore && (
                <div className="mt-10 flex justify-center">
                  <button
                    type="button"
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                    className="rounded-lg bg-red-600 px-8 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {loadingMore
                      ? "Loading..."
                      : "Load More"}
                  </button>
                </div>
              )}

              {!hasMore && movies.length > 0 && (
                <p className="mt-10 text-center text-gray-500">
                  No more movies to load.
                </p>
              )}
            </>
          )}
        </div>
      </section>

      <MovieDetailModal
        movie={selectedMovie}
        onClose={handleCloseModal}
      />
    </>
  );
}
