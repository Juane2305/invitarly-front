import React, { useState, useEffect } from "react";
import MusicPlayer from "./MusicPlayer";

/**
 * Pregunta al usuario si quiere entrar con música o no.
 * Guarda la elección en localStorage para no volver a preguntar en la misma plantilla.
 * Sin embargo, el <MusicPlayer /> se renderiza siempre, 
 * permitiendo que el usuario active/desactive la música más tarde.
 *
 * @param {string} templateId  - Identificador de la plantilla (ej: "verona", "esmeralda")
 * @param {string} cancion     - Ruta o URL de la canción
 */
export default function MusicScreen({ templateId, cancion }) {
  const localStorageKey = `musicChoice-${templateId}`;

  // Controla si mostramos el modal y si se activa la música al inicio
  const [showModal, setShowModal] = useState(false);
  const [initialPlay, setInitialPlay] = useState(false);

  useEffect(() => {
      setShowModal(true);
  }, []);

  const handleChoice = (choice) => {
    if (choice === "withMusic") {
      setInitialPlay(true);
      localStorage.setItem(localStorageKey, "withMusic");
    } else {
      setInitialPlay(false);
      localStorage.setItem(localStorageKey, "withoutMusic");
    }
    setShowModal(false);
  };

  return (
    <>
      <MusicPlayer cancion={cancion} initialPlay={initialPlay} />

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center">
          <div className="bg-white w-80 p-6 rounded-md text-center">
            <h2 className="text-2xl font-semibold mb-4">
              ¿Deseas ingresar con música?
            </h2>
            <div className="flex flex-col gap-4">
              <button
                className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                onClick={() => handleChoice("withMusic")}
              >
                Con música
              </button>
              <button
                className="bg-gray-400 text-white py-2 rounded hover:bg-gray-500 transition"
                onClick={() => handleChoice("withoutMusic")}
              >
                Sin música
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}