import React from 'react';

const Banner = () => {
  return (
    <div className="relative h-60 bg-fondo-banner bg-fixed bg-cover bg-center">
      {/* Overlay oscuro para mejorar la legibilidad */}
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="relative flex flex-col justify-center items-center h-full px-4">
        <h2 className="text-white text-2xl md:text-2xl font-bold text-center italic">
          La invitación soñada para tu evento la encontrás en Invitarly
        </h2>
      </div>
    </div>
  );
};

export default Banner;
