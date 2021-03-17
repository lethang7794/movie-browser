import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Col, Row } from 'react-bootstrap';
import './style.css';
import { Link } from 'react-router-dom';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const API_URL = process.env.REACT_APP_TMDB_API_URL;
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

const Hero = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      const url = `${API_URL}/movie/now_playing?api_key=${API_KEY}`;
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        setTimeout(() => {
          setMovies(data.results);
        }, 500);
      }
    }

    fetchMovies();
  }, []);

  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    focusOnSelect: true,
    pauseOnHover: true,
    lazyLoad: true,
    infinite: true,
    // autoplay: true,
    autoplayspeed: 3000,
  };

  return (
    <div className='Hero containter-fluid position-relative'>
      <div class='darker__overlay full-stretch'></div>
      <Row>
        <Col xs={12} lg={{ span: 8, offset: 2 }}>
          <div className='SliderWrapper ratio ratio-16x9'>
            <Slider {...settings}>
              {movies &&
                movies.slice(0, 9).map((m, index) => {
                  const moviePath = m.title
                    .replace(/[\s]+|\t|\n|\r|\//g, '-') // Replace spaces, tab, newline, slash with dash.
                    .replace(/[^a-zA-Z0-9-_]/g, ''); // Remove any character that is not a word character or dash.

                  return (
                    <div key={index} className='Slider__item ratio ratio-16x9'>
                      <img
                        src={`${API_IMAGE_URL}/${backdrop_sizes[2]}${m.backdrop_path}`}
                        alt=''
                      />
                      <div className='darker__overlay'></div>
                      <div className='movie__info__wrapper'>
                        <Link
                          to={`movie/${m.id}-${moviePath}`}
                          className='movie__info movie__link'
                        >
                          <div className='movie__title'>{m.title}</div>
                          <div className='movie__overview'>{m.overview}</div>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              {}
            </Slider>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Hero;
