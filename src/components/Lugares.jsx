import copas from '../assets/copas.svg'
import rings from '../assets/rings.svg'
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Places = () => {

  useEffect(() => {
    AOS.init({
      duration: 1000, // Duración de la animación en milisegundos
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  return (
    <div className='w-full pt-10 flex flex-col items-center gap-y-16'>
      <section className='flex flex-col gap-y-20 md:gap-y-0 md:flex-row justify-center gap-x-36'>
        <div className=' flex flex-col justify-center items-center gap-y-3' data-aos= 'fade-right'>
          <img src={rings} alt="" className='size-40'/>
          <h2 className='text-center font-semibold text-2xl tracking-wider'>CEREMONIA</h2>
          <p className='font-extralight text-xl text-center px-5 text-gray-700'>La ceremonia se realizará en [Nombre del Lugar] <br /> a las 13:00hs.</p>
          
        </div>
        <div className=' flex flex-col justify-center items-center gap-y-3' data-aos= 'fade-left'>
          <img src={copas} alt="" className='size-40'/>
          <h2 className='text-center font-semibold text-2xl tracking-wider'>FIESTA</h2>
          <p className='font-extralight text-xl text-center px-5 text-gray-700'>Continuaremos con la fiesta en [Lugar] <br/> ¡Te esperamos para festejar juntos!</p>
          
        </div>
      </section>
        
    </div>
  )
}

export default Places