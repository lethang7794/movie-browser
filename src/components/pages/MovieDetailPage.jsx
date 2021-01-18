import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Badge, Card, Modal, Button } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";


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
      <img src={`${API_IMAGE_URL}/${backdrop_sizes[4]}${movie.backdrop_path}`} alt='' />
      
      <Card>
        <Card.Body>
        <div className='Info'>
        <Row>
          <Col sm={4}>
          <img
            src={`${API_IMAGE_URL}/${poster_sizes[3]}${movie.poster_path}`}
            alt=''
              />
          </Col>
        
        
          <Col sm={8}>
            <h1>{movie.title}</h1>
            <h3>{movie.tagline}</h3>
            
            {movie.genres && movie.genres.map((genre) => (
              <Badge variant="warning" className="p-2 mr-1">
                {genre.name}
              </Badge>
            ))}
          <hr/>   
          <p><strong>Overview:</strong><br/>
              {movie.overview}</p>
                  <hr />
                  
          <Row>  
              <Col sm={3}>
                <p>Release on: {movieReleaseYear}<br />
                  Runtime: {movieRuntime}<br/>
                  Rating: {movie.vote_average}</p>
              </Col>
              
              <Col sm={5}>              
                <div className='Facts'>
                <p>Original Language: {movie.original_language}<br/>
                Movie Budget: {movieBudget} <br/>
                Movie Revenue: {movieRevenue}</p>
                  
                {/* <p>Keyword:</p>
                {movie.keywords &&
                    movie.keywords.keywords.map((keyword) => (
                    <p>{keyword.name}</p>
                    ))} */}
                </div>
              </Col>    
                </Row>
                <Button variant="warning" data-toggle="modal" data-target="#trailer">Watch Trailer</Button>
                <Modal.Dialog id="trailer">
                  <Modal.Header closeButton>
                  <Modal.Title>Trailers</Modal.Title>
                  </Modal.Header>

                  <Modal.Body>
                  {movie.videos &&
                  movie.videos.results.slice(0, 5).map((video, index) => (
                      <iframe
                        src={`https://www.youtube.com/embed/${video.key}?rel=0`}
                        title={video.name}
                      ></iframe>
                  ))}
                  </Modal.Body>
                </Modal.Dialog>
                
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
    </div>

  );
}

export default MovieDetailPage;
