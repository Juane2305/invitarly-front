import { useState } from "react";
import {
  PiPaintBrushDuotone,
  PiSealCheckLight,
  PiShareNetworkLight,
  PiImagesLight,
  PiInstagramLogoLight,
  PiCalendarPlusLight,
  PiEnvelopeLight,
  PiGlobeSimpleLight,
  PiMusicNoteLight,
  PiDressLight
} from "react-icons/pi";
import { CiLocationOn } from "react-icons/ci";

import { BsCopy } from "react-icons/bs";


const initialFeatures = [
  {
    icon: <PiPaintBrushDuotone />,
    title: "Diseña a tu estilo",
    description: "Personaliza colores, texto y tipografía en cada invitación.",
  },
  {
    icon: <PiSealCheckLight />,
    title: "Confirmación en tiempo real",
    description:
      "Recibe confirmaciones de asistencia y organiza tu evento fácilmente.",
  },
  {
    icon: <CiLocationOn />,
    title: "Ubicación",
    description: "Integra Google Maps para que nadie se pierda.",
  },
];

const additionalFeatures = [
  {
    icon: <BsCopy />,
    title: "Plantillas exclusivas",
    description: "Elige entre más de 10 diseños únicos y profesionales.",
  },
  {
    icon: <PiShareNetworkLight />,
    title: "Enlace para compartir",
    description:
      "Envía tus invitaciones fácilmente a través de WhatsApp o email.",
  },
  {
    icon: <PiImagesLight />,
    title: "Galería de fotos",
    description: "Comparte imágenes de momentos especiales.",
  },
  {
    // Se mantiene el icono original de Instagram (imagen)
    icon: <PiInstagramLogoLight />,
    title: "Instagram Wall",
    description: "Agregamos tu perfil de Instagram a la invitación.",
  },
  {
    icon: <PiCalendarPlusLight />,
    title: "Sincronización de calendario",
    description:
      "Permite que tus invitados añadan el evento a su calendario con un clic.",
  },
  {
    icon: <PiEnvelopeLight />,
    title: "Mensajes personalizados",
    description: "Incluye notas especiales o agradecimientos personalizados.",
  },
  {
    icon: <PiGlobeSimpleLight />,
    title: "Multilenguaje",
    description:
      "Crea invitaciones en varios idiomas para tus invitados internacionales.",
  },
  {
    icon: <PiMusicNoteLight />,
    title: "Música",
    description: "Agrega tu canción favorita de fondo.",
  },
  {
    icon: <PiDressLight />,
    title: "Dress Code",
    description:
      "Especifica el código de vestimenta y más información útil para el evento.",
  },
];

const FeaturesSection = () => {
  const [showMore, setShowMore] = useState(false);

  const toggleFeatures = () => {
    setShowMore(!showMore);
  };

  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-12">
          Todo lo que necesitas para hacer tu invitación inolvidable
        </h2>

        {/* Grid de características iniciales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-20 mb-4">
          {initialFeatures.map((feature, index) => (
            <div key={index} className="cursor-default flex flex-col justify-center items-center">
              <div className="text-4xl mb-4 text-[#B8860B]">
                {typeof feature.icon === "string" ? (
                  <img
                    src={feature.icon}
                    alt={feature.title}
                    className="w-12 h-12 mx-auto "
                  />
                ) : (
                  feature.icon
                )}
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 px-14">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Contenedor animado para características adicionales */}
        <div
          className={`transition-all duration-700 overflow-hidden ${
            showMore ? "max-h-[2000px]" : "max-h-0"
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20 my-8">
            {additionalFeatures.map((feature, index) => (
              <div key={index} className="cursor-default  flex flex-col justify-center items-center">
                <div className="text-4xl mb-4 text-[#B8860B]">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 px-14">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Botón para mostrar más funciones */}
        <div className="mt-8">
          <button
            onClick={toggleFeatures}
            className="border-2 border-gray-400 hover:border-black py-3 px-6 rounded-md transition-colors duration-400"
          >
            {showMore ? "Ver menos funciones" : "Ver Todas las Funciones"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
