import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Form, Container } from 'react-bootstrap';
import './MovieListPage.css';
import MovieCard from '../components/MovieCard';
import { useHistory, useLocation } from 'react-router-dom';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const API_URL = process.env.REACT_APP_TMDB_API_URL;

const movieLists = {
  top_rated: {
    endpoint: 'movie/top_rated',
    title: 'Top Rated Movies',
    description: `Quae aut reiciendis et. Qui ea enim est ad nihil beatae laboriosam laudantium veritatis. Quia voluptates excepturi officia.`,
  },
  now_playing: {
    endpoint: 'movie/now_playing',
    title: 'Now Playing Movies',
    description:
      'Quis dolorum sequi quo magnam. Non fugiat neque unde fuga deserunt qui. Voluptas quasi fugiat illum. Voluptas sit eius omnis.',
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
      'Qui velit ut nemo temporibus deleniti est aut esse. Et quod et quas velit voluptatem vero eum qui. Cupiditate voluptatum est qui quam.',
  },
  search: {
    endpoint: 'search/movie',
    title: 'Search for all movies',
    description:
      'Qui velit ut nemo temporibus deleniti est aut esse. Et quod et quas velit voluptatem vero eum qui. Cupiditate voluptatum est qui quam.',
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
      let newEndpoint;
      if (movieLists.hasOwnProperty(type) && type !== 'now_playing') {
        newEndpoint = movieLists[type].endpoint;
        setHasPagination(false);
      } else {
        newEndpoint = movieLists.now_playing.endpoint;
        setHasPagination(true);
        window.scrollTo(0, 0);
      }

      setIsLoading(true);

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

  const shouldShowLoadMore =
    (location.pathname !== '/now-playing' &&
      location.pathname !== '/search' &&
      movies.length === filteredMovies.length &&
      filteredMovies.length > 0) ||
    (location.pathname === '/search' &&
      ((searchTerm !== '' && totalPages > 1 && filterTerm === searchTerm) ||
        (isLoading && movies.length > 0)));

  const shouldShowPagination =
    ((movies.length === filteredMovies.length && filteredMovies.length > 0) ||
      filterTerm === '') &&
    hasPagination &&
    !isLoading &&
    totalPages > 0;

  return (
    <div className='MovieListPage page'>
      <Container fluid>
        <Row className='MovieListInfo p-5 flex-column justify-content-center align-items-center position-relative'>
          {/* <div class='darker__overlay full-stretch'></div> */}
          <Col
            lg={6}
            className='py-3 d-flex flex-column justify-content-center align-items-center'
            style={{
              maxWidth: '500px',
            }}
          >
            <h1 className='text-center text-white'>
              {movieLists[movieListType] && movieLists[movieListType].title}
            </h1>
            <p
              className='text-center'
              style={{
                color: '#c1e5ff',
              }}
            >
              {movieLists[movieListType] &&
                movieLists[movieListType].description}
            </p>
          </Col>
          <div
            className='box-shadow border-radius'
            style={{
              // backdropFilter: 'blur(8px)',
              // boxShadow: '1px 1px 16px 8px rgb(0 0 0 / 50%)',
              backgroundColor: '#FFFFFF',
              position: 'absolute',
              transform: 'translateY(50%)',
              bottom: '0',
            }}
          >
            {(location.pathname === '/search' || movieLists[movieListType]) && (
              <Form
                inline
                onSubmit={(e) => {
                  e.preventDefault();
                }}
                style={{
                  padding: '2rem',
                }}
              >
                <Form.Label htmlFor='searchForm' srOnly>
                  Movie
                </Form.Label>
                <Form.Control
                  className='mr-sm-2'
                  id='searchForm'
                  placeholder='Filter or search'
                  onChange={(e) => {
                    setFilterTerm(e.target.value);
                  }}
                  value={filterTerm}
                  style={{ backgroundColor: 'hsl(200, 10%, 94%)' }}
                />
                <Button
                  type='submit'
                  onClick={handleSearch}
                  className='bg-primary'
                >
                  🔎
                </Button>
              </Form>
            )}
          </div>
        </Row>
      </Container>
      <Container>
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
        <Row className='pb-5'>
          <Col>
            <>
              {/* LOAD MORE BUTTON */}
              <div className='LoadMore'>
                {shouldShowLoadMore && (
                  <Button
                    onClick={() => {
                      setPage((page) => page + 1);
                    }}
                    className='d-block w-100 bg-primary'
                  >
                    {isLoading ? 'Loading' : 'See More'}
                  </Button>
                )}
              </div>
            </>

            <>
              {/* PAGINATION */}
              {shouldShowPagination && (
                <div className='Pagination d-flex justify-content-between'>
                  <Button
                    id='Previous'
                    onClick={(e) => setPage((page) => page - 1)}
                    disabled={page === 1 ? true : false}
                    style={{ visibility: `${page === 1 ? 'hidden' : null}` }}
                    className='bg-primary'
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
                    className='bg-primary'
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
                    <div>
                      Click search to look for all movies in our database.
                    </div>
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
      </Container>
    </div>
  );
};

export default MovieListPage;
