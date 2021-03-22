import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { useParams } from 'react-router-dom';
import { Row, Col, Modal, Button, Image, Container } from 'react-bootstrap';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './MovieDetailPage.css';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const API_URL = process.env.REACT_APP_TMDB_API_URL;
const API_IMAGE_URL = process.env.REACT_APP_TMDB_API_IMAGE_URL;

const backdrop_sizes = ['w300', 'w780', 'w1280', 'original'];
const poster_sizes = [
  'w92',
  'w154',
  'w185',
  'w342',
  'w500',
  'w780',
  'original',
];

function MovieDetailPage() {
  const { moviePath } = useParams();
  const [movie, setMovie] = useState(null);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    async function fetchMovie() {
      const movieID = moviePath.match(/\d+/);
      const url = `${API_URL}/movie/${movieID}?api_key=${API_KEY}&append_to_response=videos,images,keywords,credits`;
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        setMovie(data);
      }
    }
    fetchMovie();
  }, [moviePath]);

  if (!movie) return null;

  // const formatter = new Intl.NumberFormat('en-US', {
  //   style: 'currency',
  //   currency: 'USD',
  //   minimumFractionDigits: 0,
  // });

  let movieReleaseYear = movie.release_date.match(/\d+/);
  // let movieBudget =
  //   movie.budget > 0 ? `${formatter.format(movie.budget)}` : null;
  // let movieRevenue =
  //   movie.revenue > 0 ? `${formatter.format(movie.revenue)}` : null;
  let movieRuntime = `${Math.floor(movie.runtime / 60)}h ${
    movie.runtime % 60
  }m`;

  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    // className: 'center',
    // centerMode: true,
    // centerPadding: '60px',
    swipeToSlide: true,
    focusOnSelect: true,
    lazyLoad: true,
    infinite: false,
    // autoplay: true,
    autoplayspeed: 2000,
    pauseOnHover: true,
    speed: 0,
    dots: true,
    dotsClass: 'slick-dots slick-thumb',
    customPaging: function (i) {
      const image_path = movie.images.backdrops.slice(0, 10)[i]['file_path'];
      return (
        <div className='Slider__thumbnail ratio ratio-16x9'>
          <img
            src={`${API_IMAGE_URL}/${backdrop_sizes[0]}${image_path}`}
            alt=''
          />
        </div>
      );
    },
  };

  return (
    <div className='MovieDetailPage page position-relative'>
      <div
        style={{
          position: 'absolute',
          backgroundColor: '#0f609b',
          backgroundImage:
            'linear-gradient( to bottom, hsl(218, 61%, 37%), hsl(207, 43%, 96%) )',
          height: '30rem',
          width: '100%',
        }}
      ></div>
      <Container className='pt-5'>
        <Row className='Banner position-relative box-shadow bg-white py-5'>
          <Col
            xs={{ span: 8, offset: 2 }}
            md={{ span: 6, offset: 3 }}
            lg={{ span: 3, offset: 1 }}
            // className='d-none d-lg-block'
          >
            <div className='ratio ratio-3x2'>
              <Image
                src={`${API_IMAGE_URL}/${poster_sizes[3]}${movie.poster_path}`}
                alt=''
              />
            </div>
          </Col>

          <Col xs={12} lg={{ span: 7 }} className='Info text-center'>
            <h2 className='mb-0'>
              {movie.title}
              <span
                className='font-weight-light'
                style={{ color: 'rgba(0,0,0,0.6)' }}
              >{` (${movieReleaseYear})`}</span>
            </h2>
            <div>
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
              >
                <path
                  fill='currentColor'
                  d='M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z'
                  stroke='black'
                  stroke-width='5'
                ></path>
              </svg>
              <strong style={{ fontSize: '25px' }}>{movie.vote_average}</strong>
              <span style={{ color: 'rgba(0,0,0,0.6)', fontSize: '16px' }}>
                /10
              </span>
            </div>
            <div style={{ color: 'rgba(0,0,0,0.6)' }}>
              <span className='genres'>
                {movie.genres &&
                  movie.genres.map((genre, index) => (
                    <span style={{ color: 'rgba(0,0,0,0.6)' }}>
                      {genre.name +
                        `${index === movie.genres.length - 1 ? '' : ', '}`}
                    </span>
                  ))}
              </span>
              <span className='mx-1' style={{ color: '#ccc' }}>
                |
              </span>
              <span className='runtime'>{movieRuntime}</span>
            </div>
            <div>
              <h3 className='font-italic mt-4'>{movie.tagline}</h3>
              <p
                className='mt-3 mx-auto text-left'
                style={{ fontSize: '1rem', maxWidth: '30rem' }}
              >
                {movie.overview}
              </p>
            </div>
            <Button
              variant='success'
              onClick={handleShow}
              className='py-3 px-4 font-bold'
            >
              Watch Trailer
            </Button>

            {/* <Row>
                    <Col sm={6}>
                      <div className='Facts'>
                        <div>Original Language: {movie.original_language}</div>
                        <div>Movie Budget: {movieBudget}</div>
                        <div>Movie Revenue: {movieRevenue}</div>

                        <p>Keyword:</p>
                      {movie.keywords &&
                      movie.keywords.keywords.map((keyword) => (
                      <p>{keyword.name}</p>
                      ))}
                      </div>
                    </Col>
                  </Row> */}
          </Col>
        </Row>

        {/* <ul className='images'>
        {movie.images &&
          movie.images.backdrops.slice(1, 6).map((image, index) => (
            <li key={index}>
              <img
                src={`${API_IMAGE_URL}/${backdrop_sizes[0]}${image.file_path}`}
                alt=''
              />
            </li>
          ))}
      </ul>
      <ul className='videos'>
        {movie.videos &&
          movie.videos.results.slice(0, 5).map((video, index) => (
            <li key={index}>
              <div className='ratio ratio-16x9'>
                <iframe
                  src={`https://www.youtube.com/embed/${video.key}?rel=0`}
                  title={video.name}
                ></iframe>
              </div>
            </li>
          ))}
        </ul>  */}

        <Row className='Banner box-shadow bg-white mt-5 py-4'>
          <Col xs={12} lg={{ span: 8, offset: 2 }}>
            <div className='SliderWrapper'>
              <Slider {...settings}>
                {movie.images &&
                  movie.images.backdrops.slice(0, 10).map((image, index) => (
                    <div key={index} className='Slider__item ratio ratio-16x9'>
                      <img
                        src={`${API_IMAGE_URL}/${backdrop_sizes[2]}${image.file_path}`}
                        alt=''
                      />
                      <div className='dark__overlay'></div>
                    </div>
                  ))}
              </Slider>
            </div>
          </Col>
        </Row>

        <Modal
          show={show}
          onHide={handleClose}
          centered
          dialogClassName='trailer-modal'
        >
          <Modal closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal>
          <Modal.Body className='p-0'>
            {movie.videos &&
              movie.videos.results.slice(0, 1).map((video, index) => (
                <div
                  className='ratio ratio-16x9'
                  key={index}
                  style={{ maxWidth: '150vh' }}
                >
                  <iframe
                    src={`https://www.youtube.com/embed/${video.key}?rel=0&autoplay=1`}
                    title={video.name}
                    frameBorder='0'
                    allowFullScreen
                  ></iframe>
                </div>
              ))}
          </Modal.Body>
          <Modal.Footer className='p-0 justify-content-center'>
            <Button
              variant='secondary'
              onClick={handleClose}
              className='position-absolute'
              style={{
                bottom: '-3rem',
              }}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}

export default MovieDetailPage;
