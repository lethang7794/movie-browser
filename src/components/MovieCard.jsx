import React from 'react';
import { Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './MovieCard.css';

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

function MovieCard({ movie }) {
  const moviePath = movie.title
    .replace(/[\s]+|\t|\n|\r|\//g, '-') // Replace spaces, tab, newline, slash with dash.
    .replace(/[^a-zA-Z0-9-_]/g, ''); // Remove any character that is not a word character or dash.

  return (
    <Col
      as={Link}
      to={`movie/${movie.id}-${moviePath}`}
      xs={12}
      md={8}
      lg={6}
      xl={4}
      style={{ paddingBottom: '1.5rem' }}
      className='MovieCardWrapper text-reset'
    >
      <Card className='MovieCard' style={{ width: '-18rem', height: '100%' }}>
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
  );
}

export default MovieCard;
