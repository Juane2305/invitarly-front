import React from "react";
import { useNavigate } from "react-router-dom";

const PagoPendiente = () => {
  const navigate = useNavigate();

  const handleVolver = () => {
    // Por ejemplo, volver a la página principal
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white p-4">
      <div className="max-w-lg w-full bg-yellow-100 border border-yellow-300 rounded p-6 text-center shadow-lg">
        <h1 className="text-2xl font-bold text-yellow-700 mb-4">
          Pago en proceso
        </h1>
        <p className="text-gray-700 mb-4">
          Tu pago se encuentra <strong>pendiente</strong>. En cuanto Mercado Pago
          confirme la transacción, podrás continuar con la personalización de tu
          invitación.
        </p>
        <button
          onClick={handleVolver}
          className="bg-yellow-600 text-white px-5 py-2 rounded hover:bg-yellow-700 transition"
        >
          Volver a Invitarly
        </button>
      </div>
    </div>
  );
};

export default PagoPendiente;