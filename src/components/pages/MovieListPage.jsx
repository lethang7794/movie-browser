import React, { useEffect, useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import './MovieListPage.css';
import MovieCard from '../MovieCard';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const API_URL = process.env.REACT_APP_TMDB_API_URL;

const movieLists = {
  top_rated: {
    endpoint: 'top_rated',
    title: 'Top Rated Movies',
    description: `Quae aut reiciendis et. Qui ea enim est ad nihil beatae laboriosam laudantium veritatis. Quia voluptates excepturi officia. Sit necessitatibus nihil ratione odio a incidunt dolores fugiat.`,
  },
  now_playing: {
    endpoint: 'now_playing',
    title: 'Now Playing Movies',
    description:
      'Quis dolorum sequi quo magnam. Non fugiat neque unde fuga deserunt qui. Voluptas quasi fugiat illum est voluptatem harum voluptas fugit. Voluptas sit eius omnis.',
  },
  popular: {
    endpoint: 'popular',
    title: 'Popular Movies',
    description:
      'Est animi dolore dignissimos. Quaerat sapiente ut modi quam. Veritatis adipisci earum pariatur excepturi.',
  },
  upcoming: {
    endpoint: 'upcoming',
    title: 'Upcoming Movies',
    description:
      'Qui velit ut nemo temporibus deleniti est aut esse. Et quod et quas velit voluptatem vero eum qui. Cupiditate voluptatum est qui quam. Voluptatum doloremque aut accusantium voluptatem doloribus quisquam nisi at sit.',
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
      if (movieLists.hasOwnProperty(type) && type !== 'now_playing') {
        newEndpoint = movieLists[type].endpoint;
        setHasPagination(false);
      } else {
        newEndpoint = movieLists.now_playing.endpoint;
        setHasPagination(true);
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
    <div className='MovieListPage'>
      <Row className='MovieListInfo p-2 flex-column justify-content-center align-items-center'>
        <Col lg={6}>
          <h1 className='text-center'>
            {movieLists[endpoint] && movieLists[endpoint].title}
          </h1>
          <p className='text-center'>
            {movieLists[endpoint] && movieLists[endpoint].description}
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
                <h1 className='w-100 mt-5 text-center'>Loading</h1>
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
          <>
            {!hasPagination && (
              <div className='LoadMore'>
                {totalPages && page !== totalPages && (
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
            )}
          </>
          <>
            {hasPagination && !isLoading && totalPages && (
              <div className='Pagination d-flex justify-content-between'>
                <Button
                  id='Previous'
                  onClick={(e) => setPage((page) => page - 1)}
                  disabled={page === 1 ? true : false}
                  style={{ visibility: `${page === 1 ? 'hidden' : null}` }}
                >
                  Previous
                </Button>
                <Button
                  id='Next'
                  onClick={(e) => setPage((page) => page + 1)}
                  disabled={page === totalPages ? true : false}
                  style={{
                    visibility: `${page === totalPages ? 'hidden' : null}`,
                  }}
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
