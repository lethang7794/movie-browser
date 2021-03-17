import React, { useEffect, useState } from 'react';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const API_URL = process.env.REACT_APP_TMDB_API_URL;

const movieLists = {
  top_rated: {
    endpoint: 'movie/top_rated',
    title: 'Top Rated',
  },
  now_playing: {
    endpoint: 'movie/now_playing',
    title: 'Now Playing',
  },
  popular: {
    endpoint: 'movie/popular',
    title: 'Popular',
  },
  upcoming: {
    endpoint: 'movie/upcoming',
    title: 'Upcoming',
  },
};

const TypeSection = ({ type }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      const endpoint = movieLists[type].endpoint;

      const url = `${API_URL}/${endpoint}?api_key=${API_KEY}`;
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
      List for {type}:
      <ul>
        {movies.map((m) => (
          <li>{m.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default TypeSection;
