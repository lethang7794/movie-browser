import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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

  return (
    <div className='MovieDetail'>
      <div className='Info'>
        <div>
          <img
            src={`${API_IMAGE_URL}/${backdrop_sizes[0]}${movie.backdrop_path}`}
            alt=''
          />
          <img
            src={`${API_IMAGE_URL}/${poster_sizes[2]}${movie.poster_path}`}
            alt=''
          />
        </div>
        <div className='title'>{movie.title}</div>
        <div className='release-year'>{movieReleaseYear}</div>
        <ul className='genres'>
          {movie.genres &&
            movie.genres.map((genre) => (
              <li key={genre.id} className='genre'>
                {genre.name}
              </li>
            ))}
        </ul>
        <div className='runtime'>{movieRuntime}</div>
        <div className='rating'>{movie.vote_average}</div>
        <div className='tagline'>{movie.tagline}</div>
        <div className='overview'>{movie.overview}</div>
      </div>
      <div className='Facts'>
        <div>{movie.original_language}</div>
        <div>{movieBudget}</div>
        <div>{movieRevenue}</div>
        <div>
          <ul>
            {movie.keywords &&
              movie.keywords.keywords.map((keyword) => (
                <li key={keyword.id}>{keyword.name}</li>
              ))}
          </ul>
        </div>
      </div>
      <ul className='images'>
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
      </ul>
    </div>
  );
}

export default MovieDetailPage;
