import React from "react";
import { FaWhatsapp, FaInstagram, FaFacebookF, FaEnvelope } from "react-icons/fa";
import Logo from "../assets/logo-light.svg"; // Reemplaza con la ruta real de tu logo

const ContactSection = () => {
  return (
    <section className="bg-white py-16 px-4" id="contacto">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        
        {/* Columna del logo (primero en mobile, segundo en desktop) */}
        <div className="md:w-1/2 flex justify-center mb-8 md:mb-0 order-1 md:order-2">
          <img src={Logo} alt="Logo" className="w-64 h-auto" />
        </div>

        {/* Columna de texto e íconos (segundo en mobile, primero en desktop) */}
        <div className="md:w-1/2 order-2 md:order-1 text-center md:text-start">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            ¿Tenés alguna duda?
          </h2>
          <p className="text-gray-600 mb-6">
            Puedes contactarnos por los siguientes medios:
          </p>
          <div className="flex justify-center md:justify-start space-x-6">
            <a
              href="https://wa.me/542612404253?text=%C2%A1Hola!%20Tengo%20una%20duda%20sobre%20las%20invitaciones"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 hover:text-green-600 transition"
            >
              <FaWhatsapp size={32} />
            </a>
            <a
              href="https://instagram.com/invitarly"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:text-pink-600 transition"
            >
              <FaInstagram size={32} />
            </a>
            <a
              href="https://facebook.com/invitarly"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 transition"
            >
              <FaFacebookF size={32} />
            </a>
            <a
              href="mailto:invitarly@gmail.com"
              className="text-red-500 hover:text-red-600 transition"
            >
              <FaEnvelope size={32} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;