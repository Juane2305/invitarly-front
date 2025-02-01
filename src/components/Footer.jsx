import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

import logo from '../assets/logo.svg'


const Footer = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Logo y marca */}
        <div className="flex flex-col items-center mb-6 md:mb-0">
          <img
            src={logo} // Reemplaza con la ruta real de tu logo
            alt="Logo Invitarly"
            className="w-36"
          />
        </div>

        {/* Navegación */}
        <nav className="flex flex-col md:flex-row items-center">
          <a
            href="/about"
            className="mx-3 my-1 md:my-0 text-white hover:text-gray-400 transition-colors duration-300"
          >
            Sobre Nosotros
          </a>
          <a
            href="/services"
            className="mx-3 my-1 md:my-0 text-white hover:text-gray-400 transition-colors duration-300"
          >
            Servicios
          </a>
          <a
            href="/faq"
            className="mx-3 my-1 md:my-0 text-white hover:text-gray-400 transition-colors duration-300"
          >
            FAQ
          </a>
          <a
            href="/contact"
            className="mx-3 my-1 md:my-0 text-white hover:text-gray-400 transition-colors duration-300"
          >
            Contacto
          </a>
        </nav>

        {/* Redes Sociales */}
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
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-2 text-xl hover:text-gray-400 transition-colors duration-300"
          >
            <FaTwitter />
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
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-2 text-xl hover:text-gray-400 transition-colors duration-300"
          >
            <FaLinkedinIn />
          </a>
        </div>
      </div>

      {/* Línea final y copyright */}
      <div className="mt-8 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Invitarly. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;