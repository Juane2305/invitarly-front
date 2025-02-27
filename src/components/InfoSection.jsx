import React, { useRef, useState, useEffect } from "react";
import mockup from "../assets/mockupdos.svg";

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
  // Referencia y estado de visibilidad para el bloque de texto
  const [textRef, textInView] = useInView({ threshold: 0.2 });
  // Referencia y estado de visibilidad para la imagen de escritorio
  const [imgRef, imgInView] = useInView({ threshold: 0.2 });
  // Referencia y estado de visibilidad para la imagen de móvil
  const [imgMobileRef, imgMobileInView] = useInView({ threshold: 0.2 });

  return (
    <section className="bg-white text-black py-16 px-4 sm:px-6 lg:px-8" id="invitaciones">
      <div className="max-w-6xl mx-auto md:grid md:grid-cols-2 gap-8 items-center">
        {/* Columna de texto (ocupa toda la primera columna en desktop) */}
        <div
          ref={textRef}
          className={`
            space-y-6
            transition-all duration-700
            ${textInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
          `}
        >
          <h2 className="text-4xl font-bold text-center md:text-start">
            Invitaciones digitales con estilo
          </h2>

          {/* Imagen que se muestra SOLO en móvil, debajo del heading y antes de los párrafos */}
          <div
            ref={imgMobileRef}
            className={`
              flex md:hidden
              justify-center
              transition-all duration-700
              ${imgMobileInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
            `}
          >
            <img
              src={mockup}
              alt="Mockup de invitaciones digitales (versión móvil)"
              className="w-64 h-auto mt-4"
            />
          </div>

          <p className="text-lg font-vintageTitle text-gray-700">
            En Invitarly transformamos tus eventos creando invitaciones digitales
            únicas, con diseños elegantes que llevarán tu evento a otro nivel. Cada invitación es
            personalizable, interactiva y se adapta a cualquier dispositivo.
          </p>
          <p className="text-lg font-vintageTitle text-gray-700 ">
            Innovamos la forma de comunicar tus momentos especiales, llevando la elegancia
            y la simplicidad al siguiente nivel.
          </p>
          <div className="flex justify-center md:justify-start">
            <a
              href="#contacto"
              className="inline-block border border-black py-3 px-8 rounded-full transition duration-300 ease-in-out hover:bg-black hover:text-white"
            >
              Conocer más
            </a>
          </div>
        </div>

        {/* Imagen que se muestra SOLO en escritorio, en la segunda columna */}
        <div
          ref={imgRef}
          className={`
            hidden md:block
            justify-center
            transition-all duration-700 pl-10
            ${imgInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
          `}
        >
          <img
            src={mockup}
            alt="Mockup de invitaciones digitales (versión escritorio)"
            className=""
          />
        </div>
      </div>
    </section>
  );
};

export default InfoSection;