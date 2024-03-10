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
      const response = await fetch("https://api-learning-69ab0-default-rtdb.firebaseio.com/movies.json");
      if (!response.ok) {
        throw new Error("Something went wrong Retrying...");
      }

console.log(response);
      const data = await response.json();
      const loadedMovies = [];
      for(const key in data) {
        loadedMovies.push({
          id:key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate
        })
      }
      setMovies(loadedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLodding(false);
  }, []);

      
  useEffect(() => {
    fetchMovieHandler();
  },[fetchMovieHandler]);
  
  
    async function getMoviedetails(props) {
      try{
     const response = await fetch("https://api-learning-69ab0-default-rtdb.firebaseio.com/movies.json",{
     method: 'POST',
     body: JSON.stringify(props),
     headers: {
      'Content-Type': 'application/json'
     }
    })
     
     if(!response.ok){
            throw new Error('Something went wrong');
     }
     const data = await response.json();
     console.log(data);
    }
  
  catch(error){
 console.log(error.message);
  }
}
  return (  
    <React.Fragment>
     <MovieForm getMovie={getMoviedetails}></MovieForm>
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
