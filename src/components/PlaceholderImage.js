import React from 'react';
import { Image } from 'react-bootstrap';

const PlaceholderImage = () => {
  return (
    <div className='PlaceholderImageWrapper'>
      <Image
        className='PlaceholderImage'
        src={'/logo-white.png'}
        alt=''
        height={50}
        width={50}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </div>
  );
};

export default PlaceholderImage;
