import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import dressCode from '../assets/dressCodeElegante.svg';

const DressCodeElegante = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  return (
    <section className="bg-[#171717] py-16 flex flex-col items-center justify-center border-y-4 border-y-gold">
      <h3
        className="text-gold text-4xl font-serif tracking-widest mb-6"
        data-aos="fade-up"
      >
        Dress Code
      </h3>
      <img
        src={dressCode}
        alt="Dress Code"
        className="w-48 h-auto mb-6"
        data-aos="fade-up"
      />
      <p
        className="text-white text-6xl font-light tracking-wide font-eleganteTitle"
        data-aos="fade-up"
      >
        Elegante
      </p>
    </section>
  );
};

export default DressCodeElegante;