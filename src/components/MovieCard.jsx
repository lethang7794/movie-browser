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

  // Fallback for movie without backdrop
  let movieImageSrc = movie.backdrop_path
    ? `${API_IMAGE_URL}/${backdrop_sizes[0]}${movie.backdrop_path}`
    : null;

  // Format rating with 1 digit to appear after the decimal point and fallback for movie without rating
  let movieRating =
    movie.vote_average > 0 ? movie.vote_average.toFixed(1) : null;

  let movieReleaseDate = movie.release_date
    ? movie.release_date.match(/\d+/)
    : null;

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
      <Card className='MovieCard' style={{ height: '100%' }}>
        <div className='img-wrapper ratio ratio-16x9'>
          <Card.Img variant='top' src={movieImageSrc} className='backdrop' />
        </div>
        <Card.Body>
          <Card.Title>
            <span className='title'>{movie.title}</span>
            <span className='release-year' style={{ fontWeight: 'normal' }}>
              {` (${movieReleaseDate})`}
            </span>
          </Card.Title>
          <Card.Text className='rating'>{movieRating}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default MovieCard;
