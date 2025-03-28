import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Lottie from "react-lottie-player";
import stars from '../assets/aurora/stars.json'

const Places = ({ salon, hora_inicio, hora_fin }) => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Duración de la animación
      easing: "ease-in-out",
      once: true,     // Ejecuta la animación solo la primera vez
    });
  }, []);

  return (
    <section className={`relative w-full py-12 flex flex-col items-center`}>
      <div style={{ width: 190, height: 190 }}>
        <Lottie
          loop
          play
          animationData={stars}
          style={{ width: "100%", height: "100%"}}
        />
      </div>{" "}

      {/* Contenedor principal (card) */}
      <div
        className="max-w-xl mx-auto p-8 flex flex-col items-center"
        data-aos="fade-left"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 uppercase tracking-wider mb-4">
          Fiesta
        </h2>
        <p className="text-base sm:text-lg text-gray-600 leading-relaxed text-center">
          ¡Te esperamos en <span className="font-semibold">{salon}</span>!<br />
          Daremos inicio a la fiesta desde las{" "}
          <span className="font-semibold">{hora_inicio}</span> hasta las <span className="font-semibold">{hora_fin}</span>.
        </p>
      </div>
    </section>
  );
};

export default Places;