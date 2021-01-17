import React, { useEffect, useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import './MovieListPage.css';
import MovieCard from '../MovieCard';

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
  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(null);
  const [hasPagination, setHasPagination] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchMovies() {
      hasPagination && setIsLoading(true);

      let newEndpoint;
      setHasPagination(false);
      switch (type) {
        case 'top_rated':
          newEndpoint = 'top_rated';
          break;
        default:
          newEndpoint = 'now_playing';
          setHasPagination(true);
          break;
      }

      // Reset page to 1 if changed to different endpoint
      let newPage = page;
      if (newEndpoint !== endpoint) {
        newPage = 1;
        setPage(newPage);
      }

      const url = `${API_URL}/movie/${newEndpoint}?page=${newPage}&api_key=${API_KEY}`;
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();

        setTotalPages(data.total_pages);

        // Only append to old movies state if endpoint not changed
        if (newEndpoint !== endpoint || hasPagination) {
          setMovies(data.results);
        } else {
          setMovies((movie) => [...movie, ...data.results]);
        }

        setEndpoint(newEndpoint);
      }

      hasPagination &&
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
    }

    fetchMovies();
    // eslint-disable-next-line
  }, [type, page]);
  // TODO: Find better way to check for previous state.

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
      <Row className='MovieList'>
        <>
          {!hasPagination ? (
            <>
              {movies.map((movie) => (
                <MovieCard movie={movie} key={movie.id} />
              ))}
            </>
          ) : (
            <>
              {isLoading ? (
                <div className='w-100 text-center'>Loading</div>
              ) : (
                <>
                  {movies.map((movie) => (
                    <MovieCard movie={movie} key={movie.id} />
                  ))}
                </>
              )}
            </>
          )}
        </>
      </Row>
      <Row className='mb-5'>
        <Col>
          <div className='LoadMore'>
            {!hasPagination && totalPages && page !== totalPages && (
              <Button
                onClick={() => {
                  setPage((page) => page + 1);
                }}
                className='d-block w-100'
              >
                See More
              </Button>
            )}
          </div>
          <>
            {hasPagination && !isLoading && totalPages && (
              <div className='Pagination d-flex justify-content-between'>
                <Button
                  id='Previous'
                  onClick={(e) => setPage((page) => page - 1)}
                  disabled={page === 1 ? true : false}
                >
                  Previous
                </Button>
                <Button
                  id='Next'
                  onClick={(e) => setPage((page) => page + 1)}
                  disabled={page === totalPages ? true : false}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        </Col>
      </Row>
    </div>
  );
};

export default MovieListPage;
