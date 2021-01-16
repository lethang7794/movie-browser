import React, { useEffect, useState } from 'react';
import { Col, Row, Card } from 'react-bootstrap';
import './MovieListPage.css';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const API_URL = process.env.REACT_APP_TMDB_API_URL;
const API_IMAGE_URL = process.env.REACT_APP_TMDB_API_IMAGE_URL;

const backdrop_sizes = ['w300', 'w780', 'w1280', 'original'];
// const poster_sizes = [
//   'w92',
//   'w154',
//   'w185',
//   'w342',
//   'w500',
//   'w780',
//   'original',
// ];

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
      <Row className='MovieList justify-content-center'>
        {movies.map((movie) => (
          <Col
            xs={12}
            md={8}
            lg={6}
            xl={4}
            key={movie.id}
            style={{ paddingBottom: '1.5rem' }}
          >
            <Card
              className='MovieCard'
              style={{ width: '-18rem', height: '100%' }}
            >
              <div className='ratio ratio-16x9'>
                <Card.Img
                  variant='top'
                  src={`${API_IMAGE_URL}/${backdrop_sizes[0]}${movie.backdrop_path}`}
                />
              </div>
              <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.overview.slice(0, 80) + '...'}</Card.Text>
                <Card.Text>{movie.vote_average}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default MovieListPage;
