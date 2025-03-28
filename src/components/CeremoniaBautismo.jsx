import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const CeremoniaBautismo = ({iglesia, hora_iglesia, imagen, color}) => {

  useEffect(() => {
    AOS.init({
      duration: 1000, 
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  return (
    <div className='w-full pt-10 flex flex-col items-center gap-y-16 bg-white'>
        <div className=' flex flex-col justify-center items-center gap-y-3' data-aos= 'fade-left'>
            <img src={imagen} alt="Cruz" className='size-28 my-10'/>
          <h2 className={`text-center text-${color} font-semibold text-3xl tracking-wider mb-6`}>Ceremonia</h2>
          <p className='font-extralight text-xl text-center px-5 text-gray-700'>La ceremonia será en {iglesia} <br /> desde las {hora_iglesia}.</p>
          
        </div>
        
    </div>
  )
}

export default CeremoniaBautismo