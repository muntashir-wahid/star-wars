import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoding, setIsLoding] = useState(false);
  const fetchMoviesHandler = async function () {
    setIsLoding(true);
    const res = await fetch("https://swapi.dev/api/films");
    const data = await res.json();
    const transformedMovies = data.results.map((movieData) => {
      return {
        id: movieData.episode_id,
        title: movieData.title,
        releaseDate: movieData.release_date,
        openingText: movieData.opening_crawl,
      };
    });
    setMovies(transformedMovies);
    setIsLoding(false);
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoding && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoding && movies.length === 0 && <p>No movies found.</p>}
        {isLoding && <p>Loding...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
