import React from "react";
import { FaWhatsapp, FaInstagram, FaFacebookF, FaEnvelope } from "react-icons/fa";
import Logo from "../assets/logo-light.svg"; // Reemplaza con la ruta real de tu logo

const ContactSection = () => {
  return (
    <section className="bg-white py-16 px-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Columna de texto e íconos */}
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            ¿Tenés alguna duda?
          </h2>
          <p className="text-gray-600 mb-6">
            Puedes contactarnos por los siguientes medios:
          </p>
          <div className="flex space-x-6">
            <a
              href="https://wa.me/your-number" // Reemplaza con tu número de WhatsApp
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 hover:text-green-600 transition"
            >
              <FaWhatsapp size={32} />
            </a>
            <a
              href="https://instagram.com/yourusername" // Reemplaza con tu usuario de Instagram
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:text-pink-600 transition"
            >
              <FaInstagram size={32} />
            </a>
            <a
              href="https://facebook.com/yourpage" // Reemplaza con la URL de tu página de Facebook
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 transition"
            >
              <FaFacebookF size={32} />
            </a>
            <a
              href="mailto:your-email@example.com" // Reemplaza con tu email
              className="text-red-500 hover:text-red-600 transition"
            >
              <FaEnvelope size={32} />
            </a>
          </div>
        </div>

        {/* Columna del logo */}
        <div className="md:w-1/2 flex justify-center">
          <img src={Logo} alt="Logo" className="w-64 h-auto" />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;