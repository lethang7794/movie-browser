import React from 'react';
import { useParams } from 'react-router-dom';

function MovieDetailPage() {
  const { moviePath } = useParams();
  const movieID = moviePath.match(/\d+/);

  return (
    <div>
      <div>Hello from MovieDetailPage component</div>
      <div>{`We're at /movie/${movieID}`}</div>
    </div>
  );
}

export default MovieDetailPage;
