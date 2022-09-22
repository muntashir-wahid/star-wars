import React, { useEffect, useState, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import AddMovie from "./components/AddMovie";

function App() {
  // Slices of state
  const [movies, setMovies] = useState([]);
  const [isLoding, setIsLoding] = useState(false);
  const [error, setError] = useState(null);

  // Fetching movies upon button click
  const fetchMoviesHandler = useCallback(async function () {
    setError(null);
    setIsLoding(true);

    // Trying to Fetch data
    try {
      const res = await fetch(
        "https://star-wars-9727f-default-rtdb.firebaseio.com/movies.json"
      );

      // Handle error
      if (!res.ok) {
        throw new Error("Something went worong!");
      }

      // Response with data
      const data = await res.json();
      const loadedMoies = [];
      for (const key in data) {
        const movie = {
          id: key,
          title: data[key].title,
          releaseDate: data[key].releaseDate,
          openingText: data[key].openingText,
        };
        loadedMoies.push(movie);
      }

      // Handling No data Error

      if (!data) {
        throw new Error("No movies available");
      }

      // Set data into a state variable
      setMovies(loadedMoies);
      // console.log();
    } catch (error) {
      // Catch Errors

      setError(error.message);
    }
    setIsLoding(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  // Add new movies
  const addMovieHandler = async function (movie) {
    const res = await fetch(
      "https://star-wars-9727f-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();
    console.log(data);
  };

  // Rendered conditional contents

  let content = <p>Found no Movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }
  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoding) {
    content = <p>Loding...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
