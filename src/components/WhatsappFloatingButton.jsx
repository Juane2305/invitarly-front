import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppFloatingButton = () => {
  const [showBubble, setShowBubble] = useState(true);

  useEffect(() => {
    // Oculta la burbuja automáticamente después de 5 segundos (ajusta el tiempo a tu gusto)
    const timer = setTimeout(() => {
      setShowBubble(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleBubbleClick = () => {
    // Si el usuario hace clic en la burbuja, la ocultamos
    setShowBubble(false);
  };

  return (
    <div className="fixed z-50 bottom-6 right-6 flex flex-col items-end space-y-2">
      {/* Burbuja o tooltip */}
      {showBubble && (
        <div
          className="relative bg-white text-gray-800 p-3 rounded-md shadow-lg w-56 cursor-pointer transition-all duration-300 transform hover:scale-105 animate-bounce"
          onClick={handleBubbleClick}
        >
          <p className="text-sm">
            ¿Tenés alguna duda?
            <br />
            ¡Contactanos por WhatsApp!
          </p>
          {/* Flecha de la burbuja */}
          <span className="absolute -bottom-3 right-4 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white" />
        </div>
      )}

      {/* Botón flotante de WhatsApp */}
      <a
        href="https://wa.me/542612404253?text=%C2%A1Hola!%20Tengo%20una%20duda%20sobre%20las%20invitaciones"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-transform duration-300 hover:scale-110 flex items-center justify-center"
        title="¡Hola! Tengo una duda sobre las invitaciones"
      >
        <FaWhatsapp size={24} />
      </a>
    </div>
  );
};

export default WhatsAppFloatingButton;