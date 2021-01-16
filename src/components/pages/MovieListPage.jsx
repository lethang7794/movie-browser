import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const API_URL = process.env.REACT_APP_TMDB_API_URL;

const pages = {
  top_rated: {
    title: 'Top Rated Movies',
    description: `Quae aut reiciendis et. Qui ea enim est ad nihil beatae laboriosam laudantium veritatis. Quia voluptates excepturi officia. Sit necessitatibus nihil ratione odio a incidunt dolores fugiat.`,
  },
  now_playing: {
    title: 'Now Playing Movies',
    description:
      'Quis dolorum sequi quo magnam. Non fugiat neque unde fuga deserunt qui. Voluptas quasi fugiat illum est voluptatem harum voluptas fugit. Voluptas sit eius omnis.',
  },
};

const MovieListPage = ({ type }) => {
  const [movies, setMovies] = useState([]);
  const [endpoint, setEndpoint] = useState('');

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
        setEndpoint(endpoint);
      }
    }

    fetchMovies();
  }, [type]);

  return (
    <div>
      <Row className='MovieListInfo p-2 flex-column justify-content-center align-items-center'>
        <Col lg={6}>
          <h1 className='text-center'>
            {pages[endpoint] && pages[endpoint].title}
          </h1>
          <p className='text-center'>
            {pages[endpoint] && pages[endpoint].description}
          </p>
        </Col>
      </Row>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default MovieListPage;
