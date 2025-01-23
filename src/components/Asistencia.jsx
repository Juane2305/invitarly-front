import React from 'react'
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Asistencia = ({clase, claseButton}) => {

  useEffect(() => {
    AOS.init({
      duration: 1000, // Duración de la animación en milisegundos
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  return (
    <div className={`py-20 ${clase} `}>
        <div className='h-full flex flex-col justify-center items-center space-y-2'>
            <h2 className='text-4xl font-light text-center text-gray-700' data-aos= 'fade-up'>Confirmación de Asistencia</h2>   
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSeK0vUpx6zegOhIcQr2rRVADqcpoDD4cDYyRSEOkyALbf-Spg/viewform?usp=dialog" target='__blank' data-aos= 'fade-up'><button className={` py-4 px-6 rounded-lg mt-5 transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg ${claseButton}`}>Confirmar asistencia</button></a>
        </div>
    </div>
  )
}

export default Asistencia