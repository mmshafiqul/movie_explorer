import { Link } from "react-router";
import heroImage from "../assets/hero.jpg";

export default function Hero() {
  return (
    <section
      className="relative min-h-96 md:min-h-[calc(100vh-4rem)] flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          `url(${heroImage})`,
      }}
    >
      <div className="absolute inset-0 bg-black/70"></div>
      <div className="relative z-10 max-w-4xl px-6 text-center text-white">
        <p className="mt-4 mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-red-500">
          Welcome to MovieExplorer
        </p>

        <h1 className="text-3xl md:text-7xl font-extrabold tracking-tight">
          Discover Movies
        </h1>

        <p className="mx-auto  mt-6 max-w-2xl text-md md:text-xl leading-relaxed text-gray-300">
          Explore amazing movies from around the world. Find your next favorite
          film and discover stories worth watching.
        </p>

        <div className="m-8">
          <Link
            to="/movies"
            className="inline-flex items-center rounded-lg bg-red-600 px-8 py-3 text-md font-semibold text-white transition hover:bg-red-700 hover:scale-105"
          >
            Explore Now
          </Link>
        </div>
      </div>
    </section>
  );
}
