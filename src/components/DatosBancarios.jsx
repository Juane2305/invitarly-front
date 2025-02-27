import { Modal } from './Modal'
import gift from '../assets/gift.svg'
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { CiGift } from "react-icons/ci";


const DatosBancarios = ({claseContenedor, claseBoton, textSize, claseIcon}) => {

  useEffect(() => {
    AOS.init({
      duration: 1000, // Duración de la animación en milisegundos
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  return (
    <div className={`mt-20 flex flex-col justify-center items-center py-20 gap-y-5 ${claseContenedor}`}>
        <CiGift className={`size-32 ${claseIcon}`}/>
        <div className={`flex flex-col items-center justify-center`}>
          <p className={`text-center px-5 md:px-0 ${textSize}`} data-aos= 'fade-up'>Si deseás hacernos un regalo te dejamos nuestros datos</p>
          <Modal claseBoton={claseBoton}/>
        </div>
    </div>
  )
}

export default DatosBancarios