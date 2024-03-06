import React, { useState } from "react";
import MoviesList from "./components/MoviesList";

import "./App.css";

function App() {
  const [movieList, setMovies] = useState([]);
  const [isLodding, setIsLodding] = useState(false);
  const [error, setError] = useState(null);

  async function fetchMovieHandler() {
    setError(null);
    setIsLodding(true);
    try{
    const response = await fetch("https://swapi.dev/api/films/");
    if(!response.ok)
    {
      throw new Error('Something went wrong Retrying...')
    }
  
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
  }
  catch(error) {
    setError(error.message);
  }
  setIsLodding(false);
}
  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLodding && <MoviesList movies={movieList} />}
        {isLodding && !error && <p>Lodding...</p>}
        {error && <p>{error}</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
