import { useEffect, useState, useRef } from "react";
import { useInView } from "react-intersection-observer";

const LugaresLineal = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const { top, height } = sectionRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // Mantienes tu cálculo de progreso en % (aunque ya no lo uses para un fondo):
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
    { id: 1, titulo: "Ceremonia", descripcion: "Iglesia a las 17:00hs" },
    { id: 2, titulo: "Recepción", descripcion: "Salón principal a las 19:00hs" },
    { id: 3, titulo: "Fiesta", descripcion: "¡Hasta el amanecer!" },
  ];

  return (
    <div ref={sectionRef} className="relative flex flex-col items-center py-16 z-10 ">
      {/* Título o encabezado */}
      <h2 className="text-2xl font-bold mb-8 z-20 relative text-white">
        Itinerario del Evento
      </h2>

      {/* Contenedor vertical de tarjetas */}
      <div className="relative flex flex-col gap-12 z-20 w-full max-w-xl px-4 mb-10">
        {lugares.map((lugar) => {
          const { ref, inView } = useInView({ threshold: 0.5 });

          return (
            <div
              key={lugar.id}
              ref={ref}
              className={`p-6 shadow-md rounded-xl bg-white mx-auto w-full transition-all duration-300 ${
                inView
                  ? "opacity-100 scale-105 border-2 border-gold"
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
                href="https://maps.app.goo.gl/4XyzMRjyujMSjckK7"
                target="_blank"
                rel="noopener noreferrer"
                >
                <button className="z-20 border-2 border-[#D4AF37] py-3 px-8 rounded-full bg-[#F8F5F0] text-black  font-bold  mt-5 md:mt-10 transition hover:transform hover:scale-105">
                  Cómo llegar
                </button>
              </a>
          </div>
    </div>
  );
};

export default LugaresLineal;