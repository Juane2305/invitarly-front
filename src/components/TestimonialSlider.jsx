import { useState } from "react";
import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "Sofía M.",
    comment:
      "Invitarly nos facilitó todo. Las invitaciones de casamiento fueron un éxito y el formulario de confirmación nos ayudó a organizarnos.",
    stars: 5,
  },
  {
    name: "Juan G.",
    comment:
      "¡Increíble experiencia! Pude personalizar las invitaciones de casamiento como quería y mis invitados las amaron. Súper recomendable.",
    stars: 5,
  },
  {
    name: "Valeria P.",
    comment:
      "Nuestra boda fue inolvidable, y todo empezó con Invitarly. Las invitaciones de casamiento fueron elegantes y modernas.",
    stars: 5,
  },
  {
    name: "Mariano L.",
    comment:
      "Gracias a Invitarly, pudimos coordinar la boda de mi hijo sin problemas. Las invitaciones de casamiento eran fáciles de compartir y lucían geniales.",
    stars: 4,
  },
  {
    name: "Luciana F.",
    comment:
      "Usé Invitarly para nuestras invitaciones de casamiento y fue un gran acierto. La flexibilidad y el diseño conquistaron a todos.",
    stars: 5,
  },
  {
    name: "Carlos M.",
    comment:
      "Necesitaba invitaciones de casamiento modernas y profesionales. Invitarly fue la solución perfecta, y todos quedaron impresionados.",
    stars: 4,
  },
  {
    name: "Julieta E.",
    comment:
      "Las invitaciones de casamiento fueron perfectas. Poder incluir mapas y confirmaciones online nos ahorró mucho tiempo.",
    stars: 5,
  },
  {
    name: "Federico A.",
    comment:
      "Quería algo único para nuestras invitaciones de casamiento, y Invitarly nos dio justo eso. Todos quedaron fascinados.",
    stars: 5,
  },
  {
    name: "Paula G.",
    comment:
      "Gracias a Invitarly pude compartir mis invitaciones de casamiento con amigos y familia de forma fácil. Los diseños eran modernos y personalizados.",
    stars: 5,
  },
];

// Componente auxiliar para mostrar las estrellas
function StarRating({ rating }) {
  // Creamos un array de 5 posiciones, y según el rating mostramos estrellas llenas o vacías
  const totalStars = 5;
  return (
    <div className="flex justify-center mb-4">
      {Array.from({ length: totalStars }, (_, i) => (
        <FaStar
          key={i}
          className={`mx-1 ${
            i < rating ? "text-yellow-400" : "text-gray-300"
          }`}
          size={20}
        />
      ))}
    </div>
  );
}

const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  const handleNext = () => {
    setFadeIn(false); // Inicia animación de salida
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
      setFadeIn(true); // Inicia animación de entrada
    }, 300); // Duración de la animación
  };

  const handlePrev = () => {
    setFadeIn(false); // Inicia animación de salida
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
      );
      setFadeIn(true); // Inicia animación de entrada
    }, 300);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">
          Lo que dicen nuestros clientes
        </h2>
        <div className="relative flex items-center justify-center">
          {/* Slider Content */}
          <div className="w-full max-w-xl">
            <div
              className={`text-center transition-opacity duration-300 ease-in-out ${
                fadeIn ? "opacity-100" : "opacity-0"
              }`}
            >
              {/* Reemplazamos la imagen por las estrellas */}
              <StarRating rating={currentTestimonial.stars} />

              <h3 className="text-lg font-semibold text-gray-700 mb-1">
                {currentTestimonial.name}
              </h3>
              <p className="text-gray-600 px-9 md:px-0">{currentTestimonial.comment}</p>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-0 transform -translate-y-1/2 bg-gray-200 text-gray-600 p-2 rounded-full shadow-lg hover:bg-gray-300 focus:outline-none focus:ring focus:ring-gray-400 top-1/2"
          >
            ❮
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 transform -translate-y-1/2 bg-gray-200 text-gray-600 p-2 rounded-full shadow-lg hover:bg-gray-300 focus:outline-none focus:ring focus:ring-gray-400 top-1/2"
          >
            ❯
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;