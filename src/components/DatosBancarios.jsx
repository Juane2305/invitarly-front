import { Modal } from './Modal'
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import MiIconoGift from './DatosBancariosIcon';


const DatosBancarios = ({texto, claseContenedor, claseBoton, borderModal, textColor, textSize, claseIcon, cbu, alias, banco, nombre, claseBotonModal, claseModal, moneda_extranjera, tipo_cuenta, numero_cuenta, titular_extranjera, banco_extranjera, styleBotonModal, styleModal, styleBorderModal, styleTextColor, background}) => {

  useEffect(() => {
    AOS.init({
      duration: 1000, 
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  return (
    <div className={`pt-20 flex flex-col justify-center items-center py-20 gap-y-5 ${claseContenedor}`} style={background} >
      <div data-aos= 'fade-up'>
        <MiIconoGift/>
      </div>
        <div className={`flex flex-col items-center justify-center`}>
          <p className={`text-center px-5 md:px-0 ${textSize}`} data-aos= 'fade-up'>{texto}</p>
          <Modal 
            claseBoton={claseBoton} 
            claseBotonModal={claseBotonModal} 
            claseModal={claseModal} 
            borderModal={borderModal} 
            textColor={textColor} 
            styleBotonModal={styleBotonModal} 
            styleModal={styleModal} 
            styleBorderModal={styleBorderModal} 
            styleTextColor={styleTextColor} 
            cbu={cbu} 
            alias={alias} 
            banco={banco} 
            nombre={nombre} 
            moneda_extranjera={moneda_extranjera} 
            tipo_cuenta={tipo_cuenta} 
            numero_cuenta={numero_cuenta} 
            titular_extranjera={titular_extranjera} 
            banco_extranjera={banco_extranjera}/>
        </div>
    </div>
  )
}

export default DatosBancarios