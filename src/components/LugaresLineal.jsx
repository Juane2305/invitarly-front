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
        
        // Ajuste para que la línea avance más rápido
        const progress = Math.min(
          100,
          Math.max(0, ((viewportHeight - top) / (viewportHeight + height * 0.5)) * 120) // Antes era 100, ahora 120 para más rapidez
        );
        
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Datos de los lugares
  const lugares = [
    { id: 1, titulo: "Lugar 1", descripcion: "Descripción del lugar" },
    { id: 2, titulo: "Lugar 2", descripcion: "Otra descripción" },
    { id: 3, titulo: "Lugar 3", descripcion: "Información adicional" },
  ];

  return (
    <div ref={sectionRef} className="relative flex flex-col items-center py-16">
      {/* Línea de progreso - detrás del contenido */}
      <div className="absolute left-1/2 -translate-x-1/2 w-1 h-full bg-gray-300 z-0">
        <div
          className="absolute left-0 w-full bg-gold transition-all duration-300 ease-out"
          style={{
            height: `${scrollProgress}%`,
          }}
        ></div>
      </div>

      {/* Contenido de los lugares */}
      <div className="relative flex flex-col gap-12 z-10">
        {lugares.map((lugar) => {
          const { ref, inView } = useInView({
            threshold: 0.5, // Detecta cuando el 50% del div está visible
          });

          return (
            <div
              key={lugar.id}
              ref={ref}
              className={`p-6 shadow-lg rounded-xl w-64 text-center transition-all duration-300 bg-white ${
                inView ? "border-4 border-gold" : "border-4 border-transparent"
              }`}
            >
              <h3 className="text-xl font-bold">{lugar.titulo}</h3>
              <p>{lugar.descripcion}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LugaresLineal;