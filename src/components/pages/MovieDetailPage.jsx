import React from 'react';
import { useParams } from 'react-router-dom';

function MovieDetailPage() {
  const { id } = useParams();

  return (
    <div>
      <div>Hello from MovieDetailPage component</div>
      <div>{`We're at /movies/${id}`}</div>
    </div>
  );
}

export default MovieDetailPage;
