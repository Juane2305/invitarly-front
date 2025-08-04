import { useState } from "react";

const faqs = [
  {
    question: "¿Cómo puedo personalizar mi invitación?",
    answer:
      "Una vez que elijas tu plantilla, nos enviás por WhatsApp los datos del evento (nombres, fecha, lugar, frases especiales) y los colores que querés usar. Nuestro equipo diseña la invitación y te enviamos una vista previa para que puedas solicitar pequeños ajustes (en los textos, colores o tipografía).",
  },
  {
    question: "¿Puedo integrar mapas a mi invitación?",
    answer:
      "¡Claro! Nuestra integración con Google Maps permite que tus invitados encuentren el lugar sin complicaciones.",
  },
  {
    question: "¿Es posible cambiar la plantilla después de elegirla?",
    answer:
      "Podés cambiarla antes de que comencemos el diseño. Una vez iniciada la personalización, el cambio de plantilla tendrá un costo adicional.",
  },
  {
    question: "¿Cómo gestiono la lista de invitados?",
    answer:
      "La lista de invitados se actualiza en tiempo real y se puede exportar a excel, facilitando el seguimiento.",
  },
];

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-100" id="faq">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Preguntas Frecuentes
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-md overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left px-4 py-3 bg-gray-100 hover:bg-gray-200 focus:outline-none flex justify-between items-center transition-colors duration-300"
              >
                <span className="text-lg font-medium text-gray-800">
                  {faq.question}
                </span>
                <span className="text-gray-600 text-2xl">
                  {activeIndex === index ? "−" : "+"}
                </span>
              </button>
              <div
                className={`px-4 overflow-hidden transition-all duration-500 ${
                  activeIndex === index ? "max-h-40 py-3" : "max-h-0"
                }`}
              >
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;