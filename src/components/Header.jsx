import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo-light.svg";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className="fixed w-full z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-5 flex items-center justify-between lg:h-24">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Logo" className="w-32" />
          </Link>
        </div>

        {/* Menú Desktop */}
        <nav className="hidden lg:flex space-x-8">
          <a
            href="/"
            className="text-lg text-gray-800 hover:text-principal-dark transition-colors duration-300 font-serif font-light"
          >
            Inicio
          </a>
          <a
            href="#invitaciones"
            className="text-lg text-gray-800 hover:text-principal-dark transition-colors duration-300 font-serif font-light"
          >
            Invitaciones
          </a>
          <a
            href="#faq"
            className="text-lg text-gray-800 hover:text-principal-dark transition-colors duration-300 font-serif font-light"
          >
            Preguntas frecuentes
          </a>
          <a
            href="#contacto"
            className="text-lg text-gray-800 hover:text-principal-dark transition-colors duration-300 font-serif font-light"
          >
            Contacto
          </a>
        </nav>

        {/* Botón de menú móvil */}
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="relative w-10 h-10 flex flex-col justify-center items-center focus:outline-none"
          >
            <span
              className={`block absolute h-0.5 w-6 bg-gray-800 transform transition duration-300 ease-in-out ${
                isMenuOpen ? "rotate-45 translate-y-0" : "-translate-y-1.5"
              }`}
            ></span>
            <span
              className={`block absolute h-0.5 w-6 bg-gray-800 transition duration-300 ease-in-out ${
                isMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            ></span>
            <span
              className={`block absolute h-0.5 w-6 bg-gray-800 transform transition duration-300 ease-in-out ${
                isMenuOpen ? "-rotate-45 translate-y-0" : "translate-y-1.5"
              }`}
            ></span>
          </button>
        </div>
      </div>

      {/* Menú Móvil: Panel que ocupa toda la pantalla y se desliza desde la izquierda */}
      <div
        className={`fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="bg-white w-full h-full p-8 relative">
          {/* Botón para cerrar el menú (X) */}
          <button
            onClick={toggleMenu}
            className="absolute top-6 right-6 text-3xl focus:outline-none"
          >
            &times;
          </button>

          {/* Menú de navegación (Mobile) */}
          <nav className="mt-16 flex flex-col divide-y divide-gray-200">
            <a
              onClick={toggleMenu}
              href="/"
              className="py-4 text-2xl font-serif font-light italic transition-colors duration-300"
            >
              Inicio
            </a>
            <a
              onClick={toggleMenu}
              href="#invitaciones"
              className="py-4 text-2xl font-serif font-light italic transition-colors duration-300"
            >
              Invitaciones
            </a>
            <a
              onClick={toggleMenu}
              href="#planes"
              className="py-4 text-2xl font-serif font-light italic transition-colors duration-300"
            >
              Planes
            </a>
            <a
              onClick={toggleMenu}
              href="#faq"
              className="py-4 text-2xl font-serif font-light italic transition-colors duration-300"
            >
              Preguntas Frecuentes
            </a>
            <a
              onClick={toggleMenu}
              href="#contacto"
              className="py-4 text-2xl font-serif font-light italic transition-colors duration-300"
            >
              Contacto
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;