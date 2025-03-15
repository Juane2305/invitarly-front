import { Modal } from './Modal'
import gift from '../assets/gift.svg'
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { CiGift } from "react-icons/ci";


const DatosBancarios = ({claseContenedor, claseBoton, textSize, claseIcon, cbu, alias, banco, nombre}) => {

  useEffect(() => {
    AOS.init({
      duration: 1000, 
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  return (
    <div className={`pt-20 flex flex-col justify-center items-center py-20 gap-y-5 ${claseContenedor}`}>
        <CiGift className={`size-32 ${claseIcon}`}/>
        <div className={`flex flex-col items-center justify-center`}>
          <p className={`text-center px-5 md:px-0 ${textSize}`} data-aos= 'fade-up'>Si deseás hacernos un regalo te dejamos nuestros datos</p>
          <Modal claseBoton={claseBoton} cbu={cbu} alias={alias} banco={banco} nombre={nombre}/>
        </div>
    </div>
  )
}

export default DatosBancarios