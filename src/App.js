import React, { useState} from "react";
import MoviesList from "./components/MoviesList";

import "./App.css";

function App() {
  const [movieList, setMovies] = useState([]);

  const fetchMovieHandler = () => {
    fetch('http https://swapi.dev/api/films/1')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const transformedMovie = data.results.map((movie) => {
          return {
            id: movie.episode_id,
            title: movie.title,
            openingText: movie.opening_crawl,
            releaseDate: movie.release_date
          };
        });
        setMovies(transformedMovie);
      });
  };
  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movieList} />
      </section>
    </React.Fragment>
  );
}

export default App;
