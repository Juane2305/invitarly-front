import React from "react";
import party from "../assets/praga/party.json";
import ceremony from "../assets/praga/ceremony.json";
import Lottie from 'react-lottie-player';


const LugaresPraga = ({
  linkCeremonia = "",
  nombreIglesia = "",
  horaIglesia = "",
  linkFiesta = "",
  nombreSalon = "",
  horaFiesta = "",
  claseContainer = "flex flex-col md:flex-row items-center justify-center gap-8 my-8",
  claseTexto = "text-gray-800",
}) => {
  return (
    <div className={`w-full text-center ${claseTexto} py-10`}>
      <div className={claseContainer}>
        {/* BLOQUE CEREMONIA (solo si linkCeremonia existe) */}
        {linkCeremonia && linkCeremonia.trim() !== "" && (
          <div className="flex flex-col items-center gap-3 max-w-xs">
            <div style={{ width: 120, height: 120 }}>
              <Lottie
                loop
                play
                animationData={ceremony}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
            <h3 className="text-xl font-semibold">CEREMONIA</h3>
            <p className="font-light">
              La ceremonia se realizará en <strong>{nombreIglesia}</strong> a
              las {horaIglesia}.
            </p>
            <a
              href={linkCeremonia}
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-gray-700 px-4 py-2 rounded-full hover:bg-gray-700 hover:text-white transition"
            >
              CÓMO LLEGAR
            </a>
          </div>
        )}

        {linkFiesta && linkFiesta.trim() !== "" && (
          <div className="flex flex-col items-center gap-3 max-w-xs">
            <div style={{ width: 120, height: 120 }}>
              <Lottie
                loop
                play
                animationData={party}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
            <h3 className="text-xl font-semibold">CIVIL Y FIESTA</h3>
            <p className="font-light">
              Continuaremos con el civil y la fiesta <br />
              en <strong>{nombreSalon}</strong> a las {horaFiesta}.
            </p>
            <a
              href={linkFiesta}
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-gray-700 px-4 py-2 rounded-full hover:bg-gray-700 hover:text-white transition"
            >
              CÓMO LLEGAR
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default LugaresPraga;
