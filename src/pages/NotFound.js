import React from 'react';
import { Container } from 'react-bootstrap';

const NotFound = () => {
  return (
    <div className='NotFoundPage'>
      <Container className='p-5'>
        <h1 className='color-primary'>The page you're looking is not found.</h1>
      </Container>
    </div>
  );
};

export default NotFound;
