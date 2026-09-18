const API_URL = "https://api.tvmaze.com";

export async function getMovies(page = 0) {
  try {
    const response = await fetch(`${API_URL}/shows?page=${page}`);

    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }

    const data = await response.json();
    return data.slice(0, 20);
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
}

export async function getMovieById(id) {
  try {
    const response = await fetch(`${API_URL}/shows/${id}`);

    if (!response.ok) {
      throw new Error("Failed to fetch movie details");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
}

export async function searchMovies(query) {
  try {
    const response = await fetch(
      `${API_URL}/search/shows?q=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      throw new Error("Failed to search movies");
    }

    const data = await response.json();
    return data.map((item) => item.show);
  } catch (error) {
    console.error("Error searching movies:", error);
    throw error;
  }
}
