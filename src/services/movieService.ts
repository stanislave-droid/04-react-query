import axios from "axios";
import type { Movie } from "../types/movie";

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

  return { results: data.results, total_pages: data.total_pages };
}
