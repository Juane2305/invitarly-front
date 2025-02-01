import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from '../assets/logo-invitarly-dark.svg'

const PagoExitoso = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Capturamos el payment_id desde la URL (si MP lo envía así)
  const searchParams = new URLSearchParams(location.search);
  const paymentId = searchParams.get("payment_id") || "";

  const handleVolver = () => {
    // Por ejemplo, volver a la página principal
    navigate("/");
  };

  const handleWhatsApp = () => {
    // Ajusta el número y el mensaje según tu preferencia
    window.open(
      "https://wa.me/5492612404253?text=Hola%20tengo%20una%20consulta%20sobre%20mi%20compra",
      "_blank"
    );
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-white to-green-50 p-4">
        <div className="text-2xl font-bold">
          <a href="/" className="text-black"><img src={logo} alt="" className='w-36'/></a>
        </div>
      <div className="max-w-lg w-full bg-white border border-green-300 rounded p-6 text-center shadow-lg">
        <div className="flex justify-center mb-4 text-green-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-12"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-green-700 mb-2">
          ¡Pago exitoso!
        </h1>
        <p className="text-gray-700 mb-4">
          ¡Gracias por tu compra en{" "}
          <span className="font-semibold">Invitarly</span>! Tu pago ha sido
          confirmado con éxito. Pronto nos pondremos en contacto para finalizar
          los detalles de tu invitación.
        </p>

        {paymentId && (
          <div className="mb-4">
            <span className="font-semibold text-gray-700">N° de compra: </span>
            <span className="text-gray-800">{paymentId}</span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6">
          <button
            onClick={handleVolver}
            className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition"
          >
            Volver a Invitarly
          </button>
          <button
            onClick={handleWhatsApp}
            className="flex items-center gap-2 border border-green-600 text-green-600 px-5 py-2 rounded hover:bg-green-50 transition"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
              alt="WhatsApp"
              className="h-5 w-5"
            />
            Consultar por WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

export default PagoExitoso;
