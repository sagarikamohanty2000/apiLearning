import React, { useState } from "react";
import MoviesList from "./components/MoviesList";

import "./App.css";

function App() {
  const [movieList, setMovies] = useState([]);
  const [isLodding, setIsLodding] = useState(false);

  async function fetchMovieHandler() {
    setIsLodding(true);
    const response = await fetch("https://swapi.dev/api/films/");
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
    setIsLodding(false);
  }
  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLodding && <MoviesList movies={movieList} />}
        {isLodding && <p>Lodding...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
