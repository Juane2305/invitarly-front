import { useState } from 'react';
import logo from '../assets/logo-invitarly-dark.svg'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full bg-white shadow-md fixed">
      <div className="max-w-7xl mx-auto p-5 flex justify-between items-center h-24">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <a href="/" className="text-black"><img src={logo} alt="" className='w-28'/></a>
        </div>

        {/* Menu Button (Hamburguesa) */}
        <button
          onClick={toggleMenu}
          className="lg:hidden p-2 text-black focus:outline-none"
        >
          <div className={`w-6 h-0.5 bg-black mb-1 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
          <div className={`w-6 h-0.5 bg-black mb-1 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
          <div className={`w-6 h-0.5 bg-black mb-1 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
        </button>

        {/* Menu items */}
        <nav className={`lg:flex lg:items-center lg:space-x-8 absolute lg:static bg-white w-full lg:w-auto lg:bg-transparent transition-all duration-300 text-center ${isMenuOpen ? 'top-28 left-0 right-0' : '-top-48'}`}>
          <a href="#invitaciones" className="block py-2 text-lg text-black hover:text-gray-600">Invitaciones</a>
          <a href="#nosotros" className="block py-2 text-lg text-black hover:text-gray-600">Nosotros</a>
          <a href="#contacto" className="block py-2 text-lg text-black hover:text-gray-600">Contacto</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
