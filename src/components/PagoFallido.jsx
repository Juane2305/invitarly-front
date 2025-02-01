import React from "react";
import { useNavigate } from "react-router-dom";

const PagoFallido = () => {
  const navigate = useNavigate();

  const handleVolver = () => {
    // Por ejemplo, volver a la página principal o reintentar
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white p-4">
      <div className="max-w-lg w-full bg-red-100 border border-red-300 rounded p-6 text-center shadow-lg">
        <h1 className="text-2xl font-bold text-red-700 mb-4">
          Pago no realizado
        </h1>
        <p className="text-gray-700 mb-4">
          Lo sentimos, tu pago <strong>no se ha podido completar</strong>. Por
          favor, revisa tu método de pago o inténtalo nuevamente más tarde.
        </p>
        <button
          onClick={handleVolver}
          className="bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700 transition"
        >
          Volver a Invitarly
        </button>
      </div>
    </div>
  );
};

export default PagoFallido;