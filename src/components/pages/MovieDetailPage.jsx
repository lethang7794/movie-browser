import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { useParams } from 'react-router-dom';
import { Row, Col, Badge, Card, Modal, Button, Image } from 'react-bootstrap';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './MovieDetailPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';

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

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  });

  let movieReleaseYear = movie.release_date.match(/\d+/);
  let movieBudget =
    movie.budget > 0 ? `${formatter.format(movie.budget)}` : null;
  let movieRevenue =
    movie.revenue > 0 ? `${formatter.format(movie.revenue)}` : null;
  let movieRuntime = `${Math.floor(movie.runtime / 60)}h ${
    movie.runtime % 60
  }m`;

  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    className: 'center',
    centerMode: true,
    centerPadding: '60px',
    swipeToSlide: true,
    focusOnSelect: true,
    lazyLoad: true,
    infinite: false,
    // autoplay: true,
    // autoplayspeed: 3000,
    // pauseOnHover: true,
    speed: 1000,
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
    <>
      <div className='MovieDetail'>
        <Card style={{ border: '0px' }}>
          <Card.Body className='px-0'>
            <div className='Info'>
              <Row>
                <Col
                  xs={12}
                  lg={{ span: 3, offset: 2 }}
                  className='d-none d-lg-block'
                >
                  <div className='ratio ratio-3x2'>
                    <Image
                      src={`${API_IMAGE_URL}/${poster_sizes[3]}${movie.poster_path}`}
                      alt=''
                    />
                  </div>
                </Col>

                <Col xs={12} lg={5}>
                  <h1>{movie.title}</h1>
                  <h3>{movie.tagline}</h3>

                  {movie.genres &&
                    movie.genres.map((genre, index) => (
                      <Badge
                        variant='secondary'
                        className='p-2 mr-1'
                        key={index}
                      >
                        {genre.name}
                      </Badge>
                    ))}
                  <hr />
                  <p>
                    <strong>Overview:</strong>
                    <br />
                    {movie.overview}
                  </p>
                  <Button variant='primary' onClick={handleShow} className=''>
                    Watch Trailer
                  </Button>
                  <hr />

                  <Row>
                    <Col sm={6}>
                      <div>Release on: {movieReleaseYear}</div>
                      <div>Runtime: {movieRuntime}</div>
                      <div>Rating: {movie.vote_average}</div>
                    </Col>

                    <Col sm={6}>
                      <div className='Facts'>
                        <div>Original Language: {movie.original_language}</div>
                        <div>Movie Budget: {movieBudget}</div>
                        <div>Movie Revenue: {movieRevenue}</div>

                        {/* <p>Keyword:</p>
                      {movie.keywords &&
                      movie.keywords.keywords.map((keyword) => (
                      <p>{keyword.name}</p>
                      ))} */}
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </Card.Body>
        </Card>

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

        <Row>
          <Col xs={12} md={{ span: 8, offset: 2 }}>
            <div className='SliderWrapper'>
              <Slider {...settings}>
                {movie.images &&
                  movie.images.backdrops.slice(0, 10).map((image, index) => (
                    <div key={index} className='Slider__item ratio ratio-16x9'>
                      <img
                        src={`${API_IMAGE_URL}/${backdrop_sizes[2]}${image.file_path}`}
                        alt=''
                      />
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
      </div>
    </>
  );
}

export default MovieDetailPage;
