import React from 'react';
import Hero from './Hero';
import TypeSection from './TypeSection';

export const HomePage = () => {
  return (
    <div className='HomePage'>
      <Hero />
      <TypeSection type={'upcoming'} />
      <TypeSection type={'top_rated'} />
      <TypeSection type={'popular'} />
    </div>
  );
};

export default HomePage;
