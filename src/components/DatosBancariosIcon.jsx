import React from 'react';
import Lottie from 'react-lottie-player';

import miAnimacion from '../assets/praga/gift.json';

const MiIconoGift = () => {
  return (
    <div style={{ width: 150, height: 150 }}>
      <Lottie
        loop
        play
        animationData={miAnimacion}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default MiIconoGift;