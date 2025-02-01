import React, { useRef, useState, useEffect } from 'react';
import mockup from '../assets/mockup.svg'


// Custom hook para detectar cuando un elemento está visible en el viewport
const useInView = (options) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        // Si solo queremos disparar la animación una vez:
        observer.unobserve(entry.target);
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (observer && observer.disconnect) observer.disconnect();
    };
  }, [ref, options]);

  return [ref, inView];
};

const InfoSection = () => {
  // Se crean dos referencias para detectar la visibilidad de cada columna
  const [textRef, textInView] = useInView({ threshold: 0.2 });
  const [imgRef, imgInView] = useInView({ threshold: 0.2 });

  return (
    <section className="bg-white text-black py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        {/* Columna de texto explicativo */}
        <div
          ref={textRef}
          className={`
            space-y-6
            transition-all duration-700
            ${textInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
          `}
        >
          <h2 className="text-4xl font-bold">
            Invitaciones digitales con estilo
          </h2>
          <p className="text-lg">
            En Invitarly transformamos tus eventos creando invitaciones digitales
            únicas, con diseños elegantes que llevarán tu evento a otro nivel. Cada invitación es
            personalizable, interactiva y se adapta a cualquier dispositivo.
          </p>
          <p className="text-lg">
            Innovamos la forma de comunicar tus momentos especiales, llevando la elegancia
            y la simplicidad al siguiente nivel.
          </p>
          <a
            href="#contacto"
            className="inline-block border border-black py-3 px-8 rounded-full transition duration-300 ease-in-out hover:bg-black hover:text-white"
          >
            Conocer más
          </a>
        </div>
        {/* Columna con mockup de las invitaciones */}
        <div
          ref={imgRef}
          className={`
            flex justify-center
            transition-all duration-700
            ${imgInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
          `}
        >
          <img
            src={mockup} // Reemplaza esta URL con el mockup real
            alt="Mockup de invitaciones digitales"
            className=""
          />
        </div>
      </div>
    </section>
  );
};

export default InfoSection;