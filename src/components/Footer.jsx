import React from "react";
import {
  FaFacebookF,
  FaEnvelope,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";

import logo from '../assets/logo.svg'


const Footer = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col items-center mb-6 md:mb-0">
          <img
            src={logo} 
            alt="Logo Invitarly"
            className="w-36"
          />
        </div>
        <nav className="flex flex-col md:flex-row items-center">
          <a
            href="/"
            className="mx-3 my-1 md:my-0 text-white hover:text-gray-400 transition-colors duration-300"
          >
            Inicio
          </a>
          <a
            href="#planes"
            className="mx-3 my-1 md:my-0 text-white hover:text-gray-400 transition-colors duration-300"
          >
            Planes
          </a>
          <a
            href="#faq"
            className="mx-3 my-1 md:my-0 text-white hover:text-gray-400 transition-colors duration-300"
          >
            Preguntas Frecuentes
          </a>
          <a
            href="#contacto"
            className="mx-3 my-1 md:my-0 text-white hover:text-gray-400 transition-colors duration-300"
          >
            Contacto
          </a>
        </nav>

        <div className="flex items-center mt-6 md:mt-0">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-2 text-xl hover:text-gray-400 transition-colors duration-300"
          >
            <FaFacebookF />
          </a>
          <a
            href="mailto:invitarly@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-2 text-xl hover:text-gray-400 transition-colors duration-300"
          >
            <FaEnvelope />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-2 text-xl hover:text-gray-400 transition-colors duration-300"
          >
            <FaInstagram />
          </a>
          <a
            href="https://wa.me/542612768670?text=%C2%A1Hola!%20Tengo%20una%20duda%20sobre%20las%20invitaciones"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-2 text-xl hover:text-gray-400 transition-colors duration-300"
          >
            <FaWhatsapp />
          </a>
        </div>
      </div>

      <div className="mt-8 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Invitarly. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;