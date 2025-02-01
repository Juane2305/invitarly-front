import { useState } from "react";

const testimonials = [
  {
    name: "Sofía Martínez",
    role: "Novia",
    comment:
      "Invitarly nos facilitó todo. Las invitaciones digitales fueron un éxito y los formularios de confirmación nos ayudaron a organizarnos.",
    image: "https://res.cloudinary.com/dfschbyq2/image/upload/v1735861470/Dise%C3%B1o_sin_t%C3%ADtulo_9_qoetdk.png",
  },
  {
    name: "Juan Gómez",
    role: "Cumpleañero",
    comment:
      "¡Increíble experiencia! Pude personalizar las invitaciones como quería y mis invitados las amaron. Súper recomendable.",
    image: "https://res.cloudinary.com/dfschbyq2/image/upload/v1735861226/Dise%C3%B1o_sin_t%C3%ADtulo_8_y8tpzg.jpg",
  },
  {
    name: "Valeria Pérez",
    role: "Madre de quinceañera",
    comment:
      "La fiesta de mi hija fue inolvidable, y todo empezó con Invitarly. Las invitaciones digitales fueron elegantes y modernas.",
    image: "https://res.cloudinary.com/dfschbyq2/image/upload/v1735881571/Dise%C3%B1o_sin_t%C3%ADtulo_11_tqz5lf.png",
  },
  {
    name: "Mariano López",
    role: "Padre de egresado",
    comment:
      "Gracias a Invitarly, pudimos coordinar la fiesta de egresados de mi hijo sin problemas. Las invitaciones eran modernas y fáciles de compartir.",
    image: "https://res.cloudinary.com/demo/image/upload/v1693200000/mariano.jpg",
  },
  {
    name: "Luciana Fernández",
    role: "Organizadora de eventos",
    comment:
      "Usé Invitarly para varias fiestas que organicé y fue un cambio total. A mis clientes les encanta la flexibilidad y el diseño de las invitaciones.",
    image: "https://res.cloudinary.com/demo/image/upload/v1693200000/luciana.jpg",
  },
  {
    name: "Carlos Méndez",
    role: "Anfitrión de evento corporativo",
    comment:
      "Nuestro evento empresarial necesitaba invitaciones modernas y profesionales. Invitarly fue la solución perfecta, y todos quedaron impresionados.",
    image: "https://res.cloudinary.com/demo/image/upload/v1693200000/carlos.jpg",
  },
  {
    name: "Julieta Castro",
    role: "Madre de mellizos",
    comment:
      "Las invitaciones para el cumpleaños de mis mellizos fueron perfectas. Poder incluir mapas y confirmaciones online nos ahorró mucho tiempo.",
    image: "https://res.cloudinary.com/demo/image/upload/v1693200000/julieta.jpg",
  },
  {
    name: "Federico Arias",
    role: "Novio",
    comment:
      "Quería algo único para nuestras invitaciones de casamiento, y Invitarly nos dio justo eso. Todos quedaron fascinados.",
    image: "https://res.cloudinary.com/demo/image/upload/v1693200000/federico.jpg",
  },
  {
    name: "Paula Giménez",
    role: "Quinceañera",
    comment:
      "Gracias a Invitarly pude compartir mis invitaciones con mis amigos fácilmente. Los diseños eran modernos y totalmente personalizados.",
    image: "https://res.cloudinary.com/demo/image/upload/v1693200000/paula.jpg",
  }
];

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
    }, 300); // Duración de la animación
  };

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
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
              <img
                src={testimonials[currentIndex].image}
                alt={testimonials[currentIndex].name}
                className="w-20 h-20 mx-auto rounded-full mb-4 border-2 border-gray-300 shadow-md"
              />
              <h3 className="text-lg font-semibold text-gray-700 mb-1">
                {testimonials[currentIndex].name}
              </h3>
              <p className="text-sm text-gray-500 italic mb-3">
                {testimonials[currentIndex].role}
              </p>
              <p className="text-gray-600">{testimonials[currentIndex].comment}</p>
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
