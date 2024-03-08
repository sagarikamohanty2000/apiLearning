import React, { useState, useEffect, useCallback } from "react";
import MoviesList from "./components/MoviesList";
import MovieForm from "./components/MovieForm";
import "./App.css";

function App() {
  const [movieList, setMovies] = useState([]);
  const [isLodding, setIsLodding] = useState(false);
  const [error, setError] = useState(null);
  const [movie, setMovie] = useState([]);

  const fetchMovieHandler = useCallback(async () => {
    setError(null);
    setIsLodding(true);


    try {
      const response = await fetch("https://swapi.dev/api/films/");
      if (!response.ok) {
        throw new Error("Something went wrong Retrying...");
      }

console.log(response);
      const data = await response.json();
      const transformedMovie = data.results.map((movie) => {
        return {
          id: movie.episode_id,
          title: movie.title,
          openingText: movie.opening_crawl,
          releaseDate: movie.release_date,
        };
      });
      setMovies(transformedMovie);
    } catch (error) {
      setError(error.message);
    }
    setIsLodding(false);
  }, []);

      
  useEffect(() => {
    fetchMovieHandler();
  },[fetchMovieHandler]);
  
    const getMoviedetails = (props) => {
      setMovie( (prevMovie) => {
        return [...prevMovie,props];
      })
    }
  return (
    <React.Fragment>
     <MovieForm getMovie={getMoviedetails}></MovieForm>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLodding && <MoviesList movies={movie} />}
        {isLodding && !error && <p>Lodding...</p>}
        {error && <p>{error}</p>}
      </section>
    </React.Fragment>
  );
}
export default App;
