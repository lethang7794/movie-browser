import React, { useEffect, useState } from 'react';
import { Container, Image } from 'react-bootstrap';
import { ScrollingCarousel } from '@trendyol-js/react-carousel';
import { Link } from 'react-router-dom';
import './style.css';

import PlaceholderImage from '../../../components/PlaceholderImage';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const API_URL = process.env.REACT_APP_TMDB_API_URL;
const API_IMAGE_URL = process.env.REACT_APP_TMDB_API_IMAGE_URL;

const poster_sizes = [
  'w92',
  'w154',
  'w185',
  'w342',
  'w500',
  'w780',
  'original',
];

const movieLists = {
  top_rated: {
    endpoint: 'movie/top_rated',
    title: 'Top Rated',
    seeMorePath: '/top-rated',
  },
  now_playing: {
    endpoint: 'movie/now_playing',
    title: 'Now Playing',
    seeMorePath: '/now-playing',
  },
  popular: {
    endpoint: 'movie/popular',
    title: 'Popular',
    seeMorePath: '/popular',
  },
  upcoming: {
    endpoint: 'movie/upcoming',
    title: 'Upcoming',
    seeMorePath: '/upcoming',
  },
};

const MovieListSection = ({ type }) => {
  const placeholderMovie = new Array(5).fill({
    poster_path: '',
  });
  const [movies, setMovies] = useState(placeholderMovie);

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

  const listTitle = movieLists[type].title;
  const seeMorePath = movieLists[type].seeMorePath;

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <Container className='MovieTypeList py-5'>
      <div className='mb-3 d-flex justify-content-between'>
        <h1 className='color-primary'>{listTitle}</h1>
        <div className='d-flex justify-content-center align-items-center'>
          <Link
            to={seeMorePath}
            onClick={scrollToTop}
            className='color-primary'
          >
            See all
          </Link>
        </div>
      </div>

      <ScrollingCarousel className='scrolling-carousel'>
        {movies.map((m, idx) => {
          let poster_path =
            m?.poster_path &&
            `${API_IMAGE_URL}/${poster_sizes[3]}${m.poster_path}`;

          return (
            <div key={idx} className='PosterCard'>
              <div className='ratio ratio-3x2' style={{ maxWidth: '200px' }}>
                {!poster_path && <PlaceholderImage />}
                {poster_path && <Image src={poster_path} alt='' />}
              </div>
            </div>
          );
        })}
        <div className='PlaceholderPosterCard PosterCard'>
          <div
            className='ratio ratio-3x2'
            style={{ maxWidth: '200px', background: 'transparent' }}
          >
            <div className='d-flex justify-content-center align-items-center'>
              <Link
                to={seeMorePath}
                className='text-reset color-primary'
                style={{
                  display: 'inline',
                  padding: 0,
                }}
                onClick={scrollToTop}
              >
                <div
                  className='d-flex justify-content-center align-items-center color-primary'
                  style={{
                    height: '100px',
                    width: '100px',
                    background: 'white',
                    borderRadius: '9999px',
                    border: '2px solid hsl(217, 59%, 38%)',
                    fontWeight: 'bold',
                  }}
                >
                  More
                </div>
              </Link>
            </div>
          </div>
        </div>
      </ScrollingCarousel>
    </Container>
  );
};

export default MovieListSection;
