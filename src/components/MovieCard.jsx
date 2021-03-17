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
      <Card className='MovieCard border-radius' style={{ height: '100%' }}>
        <div className='img-wrapper ratio ratio-16x9 border-radius'>
          <Card.Img
            variant='top'
            src={movieImageSrc}
            className='backdrop border-radius'
            style={{
              borderBottomLeftRadius: '0',
              borderBottomRightRadius: '0',
            }}
          />
          <div className='dark__overlay border-radius'></div>
        </div>
        <Card.Body>
          <Card.Title className='rating'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              aria-hidden='true'
              focusable='false'
              data-prefix='fas'
              data-icon='star'
              className='svg-inline--fa fa-star fa-w-18'
              role='img'
              viewBox='0 0 576 512'
              color='gold'
              style={{ verticalAlign: 'bottom', marginRight: '0.25rem' }}
            >
              <path
                fill='currentColor'
                d='M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z'
              ></path>
            </svg>
            {movieRating}
          </Card.Title>
          <Card.Title>
            <span className='title'>{movie.title}</span>
            <span className='release-year' style={{ fontWeight: 'normal' }}>
              {` (${movieReleaseDate})`}
            </span>
          </Card.Title>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default MovieCard;
