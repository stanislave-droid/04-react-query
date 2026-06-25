import axios from "axios";
import type { Movie } from "../types/movie";
import toast from "react-hot-toast";

interface fetchMoviesProps {
  page: number;
  query: string;
}

interface MovieHTTPResponse {
  results: Movie[];
  total_pages: number;
}

export default async function fetchMovies(props: fetchMoviesProps) {
  const { data } = await axios.get<MovieHTTPResponse>(
    "https://api.themoviedb.org/3/search/movie",
    {
      params: {
        page: props.page,
        query: props.query,
      },
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      },
    },
  );

  if (data.results.length === 0) {
    toast.error("No movies found for your request.");
  }

  return { results: data.results, totalPages: data.total_pages };
}
