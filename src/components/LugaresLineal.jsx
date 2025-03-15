import { useEffect, useState, useRef } from "react";
import { useInView } from "react-intersection-observer";

const LugaresLineal = ({borderColor, buttonStyle, iglesia, hora_iglesia, salon, hora_civil, hora_fiesta, link_ceremonia, link_fiesta}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const { top, height } = sectionRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const progress = Math.min(
          100,
          Math.max(
            0,
            ((viewportHeight - top) / (viewportHeight + height * 0.5)) * 120
          )
        );
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Ejemplo de datos:
  const lugares = [
    { id: 1, titulo: "Ceremonia Religiosa", descripcion: `${iglesia} a las ${hora_iglesia}` },
    { id: 2, titulo: "Ceremonia Civil", descripcion: `${salon} a las ${hora_civil}` },
    { id: 3, titulo: "Fiesta", descripcion: `${salon} a las ${hora_fiesta}` },
  ];

  return (
    <div ref={sectionRef} className="relative flex flex-col items-center py-16 z-10 ">
      <h2 className="text-2xl font-bold mb-8 z-20 relative text-white">
        Itinerario del Evento
      </h2>

      <div className="relative flex flex-col gap-12 z-20 w-full max-w-xl px-4 mb-10">
        {lugares.map((lugar) => {
          const { ref, inView } = useInView({ threshold: 0.5 });

          return (
            <div
              key={lugar.id}
              ref={ref}
              className={`p-6 shadow-md rounded-xl bg-white mx-auto w-full text-center transition-all duration-300 ${
                inView
                  ? `opacity-100 scale-105 border-2 ${borderColor} `
                  : "opacity-70 scale-100 border border-transparent"
              }`}
            >
              <h3 className="text-lg font-bold mb-1">{lugar.titulo}</h3>
              <p className="text-gray-700">{lugar.descripcion}</p>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center items-center z-30">
              <a
                href={link_ceremonia}
                target="_blank"
                rel="noopener noreferrer"
                >
                <button className={`z-20 border-2 ${buttonStyle} py-3 px-8 rounded-full bg-[#F8F5F0] text-black  mt-5 md:mt-10 transition hover:transform hover:scale-105`}>
                  Ubicación ceremonia
                </button>
              </a>
          </div>
          <div className="flex justify-center items-center z-30">
              <a
                href={link_fiesta}
                target="_blank"
                rel="noopener noreferrer"
                >
                <button className={`z-20 border-2 ${buttonStyle} py-3 px-8 rounded-full bg-[#F8F5F0] text-black  mt-5 md:mt-10 transition hover:transform hover:scale-105`}>
                  Ubicación evento
                </button>
              </a>
          </div>
    </div>
    
  );
};

export default LugaresLineal;