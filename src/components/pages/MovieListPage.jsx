import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import './MovieListPage.css';
import MovieCard from '../MovieCard';
import { useHistory, useLocation } from 'react-router-dom';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const API_URL = process.env.REACT_APP_TMDB_API_URL;

const movieLists = {
  top_rated: {
    endpoint: 'movie/top_rated',
    title: 'Top Rated Movies',
    description: `Quae aut reiciendis et. Qui ea enim est ad nihil beatae laboriosam laudantium veritatis. Quia voluptates excepturi officia. Sit necessitatibus nihil ratione odio a incidunt dolores fugiat.`,
  },
  now_playing: {
    endpoint: 'movie/now_playing',
    title: 'Now Playing Movies',
    description:
      'Quis dolorum sequi quo magnam. Non fugiat neque unde fuga deserunt qui. Voluptas quasi fugiat illum est voluptatem harum voluptas fugit. Voluptas sit eius omnis.',
  },
  popular: {
    endpoint: 'movie/popular',
    title: 'Popular Movies',
    description:
      'Est animi dolore dignissimos. Quaerat sapiente ut modi quam. Veritatis adipisci earum pariatur excepturi.',
  },
  upcoming: {
    endpoint: 'movie/upcoming',
    title: 'Upcoming Movies',
    description:
      'Qui velit ut nemo temporibus deleniti est aut esse. Et quod et quas velit voluptatem vero eum qui. Cupiditate voluptatum est qui quam. Voluptatum doloremque aut accusantium voluptatem doloribus quisquam nisi at sit.',
  },
  search: {
    endpoint: 'search/movie',
    title: 'Search for all movies',
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

  const [filterTerm, setFilterTerm] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const history = useHistory();
  const location = useLocation();

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

      // Reset total pages
      setTotalPages(0);

      let url = `${API_URL}/${newEndpoint}?page=${newPage}&api_key=${API_KEY}`;

      if (newEndpoint === 'search/movie') {
        if (filterTerm === '') {
          setMovies([]);
          setFilteredMovies([]);
          setEndpoint(newEndpoint);
          return null;
        }
        url += `&query=${searchTerm}`;
      }

      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();

        setTotalPages(data.total_pages);

        // Only append to old movies state if endpoint not changed
        if (newEndpoint !== endpoint || hasPagination) {
          setMovies(data.results);
          setFilteredMovies(data.results);
        } else {
          setMovies((movie) => [...movie, ...data.results]);
          setFilteredMovies((movie) => [...movie, ...data.results]);
        }

        if (newEndpoint !== endpoint && newEndpoint !== 'search/movie') {
          setFilterTerm('');
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
  }, [type, page, searchTerm]);
  // TODO: Find better way to check for previous state.

  useEffect(() => {
    let newMovies = movies.filter((movie) =>
      movie.title.toLowerCase().includes(filterTerm.toLowerCase())
    );
    setFilteredMovies(newMovies);
  }, [filterTerm, movies]);

  const showMovies = (movies) =>
    movies.map((movie) => <MovieCard movie={movie} key={movie.id} />);

  let movieListType;
  if (endpoint === 'search/movie') {
    movieListType = 'search';
  } else {
    movieListType = endpoint.replace(/movie\//, '');
  }

  const handleSearch = () => {
    history.push(`/search?q=${filterTerm}`);
    setSearchTerm(filterTerm);
    setPage(1);
  };

  return (
    <div className='MovieListPage'>
      <Row className='MovieListInfo p-2 flex-column justify-content-center align-items-center'>
        <Col lg={6}>
          <h1 className='text-center'>
            {movieLists[movieListType] && movieLists[movieListType].title}
          </h1>
          <p className='text-center'>
            {movieLists[movieListType] && movieLists[movieListType].description}
          </p>
        </Col>
        <>
          {(location.pathname === '/search' || !isLoading) && (
            <Form
              inline
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <Form.Label htmlFor='searchForm' srOnly>
                Movie
              </Form.Label>
              <Form.Control
                className='mb-2 mr-sm-2'
                id='searchForm'
                placeholder=''
                onChange={(e) => {
                  setFilterTerm(e.target.value);
                }}
                value={filterTerm}
              />
              <Button type='submit' className='mb-2' onClick={handleSearch}>
                Search 🔎
              </Button>
            </Form>
          )}
        </>
      </Row>
      <Row className='MovieList'>
        <>
          {!hasPagination ? (
            <>{showMovies(filteredMovies)}</>
          ) : (
            <>
              {isLoading ? (
                <h1 className='w-100 mt-5 text-center'>Loading</h1>
              ) : (
                <>{showMovies(filteredMovies)}</>
              )}
            </>
          )}
        </>
      </Row>
      <Row className='mb-5'>
        <Col>
          <>
            {/* LOAD MORE BUTTON */}
            {((location.pathname !== '/now-playing' &&
              location.pathname !== '/search') ||
              (location.pathname === '/search' &&
                searchTerm !== '' &&
                totalPages > 1 &&
                filterTerm === searchTerm) ||
              (movies.length > 0 && filterTerm === '' && !hasPagination)) && (
              <div className='LoadMore'>
                {totalPages > 0 && page !== totalPages && (
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
            {/* PAGINATION */}
            {(movies.length > 0 || filterTerm === '') &&
              hasPagination &&
              !isLoading &&
              totalPages && (
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

          <>
            {/* SEARCH ALL */}
            {location.pathname !== '/search' &&
              filterTerm !== '' &&
              filteredMovies.length === 0 && (
                <h2 className='text-center font-weight-normal mt-5'>
                  <span>There is no movie whose title includes</span>
                  <strong> {filterTerm} </strong>
                  <span>here.</span>
                </h2>
              )}
          </>
          <>
            {location.pathname === '/search' && filteredMovies.length === 0 && (
              <h2 className='text-center font-weight-normal mt-5'>
                <span>Whatever movie you wanna.</span>
              </h2>
            )}
          </>
        </Col>
      </Row>
    </div>
  );
};

export default MovieListPage;
