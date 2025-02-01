import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      <div className="flex space-x-1">
        {"Invitarly".split("").map((letter, index) => (
          <span
            key={index}
            className="text-white text-4xl font-bold animate-bounce"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {letter}
          </span>
        ))}
      </div>
      <p className="text-white mt-4 text-lg">Cargando...</p>
    </div>
  );
};

export default Loader;