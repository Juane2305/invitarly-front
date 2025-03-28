import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function PadresPadrinos({
  padres = "",
  padrinos = "",
  textColor = "text-gray-900",
  bgColor = "bg-white",
  containerClasses = "",
}) {
  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  return (
    <section
      className={`w-full py-10 px-4 flex flex-col items-center justify-center ${bgColor} ${containerClasses}`}
      data-aos="fade-up"
    >
      <h2 className={`text-3xl md:text-4xl font-semibold mb-6 ${textColor}`}>
        Padres &amp; Padrinos
      </h2>

      <div className="max-w-2xl mx-auto text-center">
        <p className={`text-lg md:text-xl font-light mb-2 ${textColor}`}>
          <span className="font-semibold">Papás:</span> {padres}
        </p>
        <p className={`text-lg md:text-xl font-light ${textColor}`}>
          <span className="font-semibold">Padrinos:</span> {padrinos}
        </p>
      </div>
    </section>
  );
}