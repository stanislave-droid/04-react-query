import { useEffect, useState } from "react";
import css from "./App.module.css";
import "modern-normalize";
import fetchMovies from "../../services/movieService";
import type { Movie } from "../../types/movie";
import SearchBar from "../SearchBar/SearchBar";
import toast, { Toaster } from "react-hot-toast";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Pagination from "../Pagination/Pagination";

function App() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchedName, setSearchedName] = useState<string>("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["movies", searchedName, currentPage],
    queryFn: () => fetchMovies({ query: searchedName, page: currentPage }),
    enabled: searchedName !== "",
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (data?.results.length === 0) {
      toast.error("No movies found for your request.");
    }
  }, [searchedName]);

  const handleSubmit = (input: string) => {
    setSearchedName(input);
    setCurrentPage(1);
  };

  const handleSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleModalClose = () => {
    setSelectedMovie(null);
  };

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected + 1);
  };

  return (
    <div className={css.app}>
      <Toaster />
      <SearchBar onSubmit={handleSubmit}></SearchBar>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {data && data.total_pages > 1 && (
        <Pagination
          onPageChange={handlePageChange}
          totalPages={data.total_pages}
          currentPage={currentPage}
        />
      )}
      {data && data.results.length > 0 && (
        <MovieGrid onSelect={handleSelect} movies={data.results} />
      )}
      {selectedMovie !== null && (
        <MovieModal movie={selectedMovie} onClose={handleModalClose} />
      )}
    </div>
  );
}

export default App;
