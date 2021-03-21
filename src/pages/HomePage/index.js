import React from 'react';
import Hero from './Hero';
import MovieListSection from './MovieListSection';

export const HomePage = () => {
  return (
    <div className='HomePage'>
      <Hero />
      <MovieListSection type={'upcoming'} />
      <MovieListSection type={'top_rated'} />
      <MovieListSection type={'popular'} />
    </div>
  );
};

export default HomePage;
