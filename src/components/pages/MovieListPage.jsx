import React, { useEffect, useState } from 'react';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const API_URL = process.env.REACT_APP_TMDB_API_URL;

const MovieListPage = ({ type }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      let endpoint;
      switch (type) {
        case 'top_rated':
          endpoint = 'top_rated';
          break;
        default:
          endpoint = 'now_playing';
          break;
      }

      const url = `${API_URL}/movie/${endpoint}?api_key=${API_KEY}`;
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        setMovies(data.results);
      }
    }

    fetchMovies();
  }, [type]);

  return (
    <div>
      <h1>MovieListPage</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default MovieListPage;
