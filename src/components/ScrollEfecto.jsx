import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

const sections = [
  { texto: "Invitaciones digitales que emocionan desde el primer click", imagen: "https://res.cloudinary.com/dfschbyq2/image/upload/v1744119847/Disen%CC%83o_sin_ti%CC%81tulo_12_xm2wi5.png" },
  { texto: "Diseños únicos para bodas, cumpleaños de XV y bautismos", imagen: "https://res.cloudinary.com/dfschbyq2/image/upload/v1744122199/Disen%CC%83o_sin_ti%CC%81tulo_13_lqmogm.png" },
  { texto: "Cada invitación incluye todo lo que necesitás: galería, mapas, confirmación y mucho más", imagen: "https://res.cloudinary.com/dfschbyq2/image/upload/v1744122885/Disen%CC%83o_sin_ti%CC%81tulo_14_vdwewn.png" },
  { texto: "Invitarly: tu evento comienza con una gran presentación", imagen: "https://res.cloudinary.com/dfschbyq2/image/upload/v1744123194/Disen%CC%83o_sin_ti%CC%81tulo_15_wkzwi2.png" },
];

export default function ScrollEfecto() {
  const sectionRefs = useRef([]);
  const [imagenActual, setImagenActual] = useState(0);

  useEffect(() => {
    AOS.init({ once: true });
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionRefs.current.indexOf(entry.target);
            if (index !== -1) setImagenActual(index);
          }
        });
      },
      { threshold: 0.3 }
    );

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sección izquierda - Texto y imagen (mobile) */}
      <div className="w-full md:w-1/2 space-y-5 md:space-y-32 pt-20">
        {sections.map((section, i) => (
          <div
            key={i}
            ref={(el) => (sectionRefs.current[i] = el)}
            className="h-screen flex flex-col md:flex-row items-center px-6 md:px-10 space-y-6 md:space-y-0"
          >
            {/* Imagen arriba en mobile */}
            <div className="block md:hidden w-full">
              <img
                src={section.imagen}
                alt=""
                data-aos="fade-up"
                className="w-full h-auto object-cover transition-all duration-300"
              />
            </div>
            <p
              data-aos="fade-up"
              className="text-xl md:text-3xl font-semibold leading-snug text-center md:text-left"
            >
              {section.texto}
            </p>
          </div>
        ))}
      </div>

      <div className="hidden md:flex w-1/2 h-screen sticky top-0 items-center justify-center">
        <div className="relative w-4/5 aspect-square">
          <AnimatePresence mode="wait">
            <motion.img
              key={sections[imagenActual].imagen}
              src={sections[imagenActual].imagen}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 w-full h-full object-cover rounded-2xl"
            />
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
