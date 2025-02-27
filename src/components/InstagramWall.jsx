import React from 'react'
import { IoLogoInstagram } from "react-icons/io";

const InstagramWall = ({userClass, textClass, logoClass}) => {
  return (
    <div className='py-24'>
        <a href="#" className='flex flex-col items-center justify-center'>
            <IoLogoInstagram size={140} className={`${logoClass}`}/>
            <div className='flex flex-col gap-y-5 items-center text-center'>
                    <p className={`text-3xl font-light ${userClass}`}>@franymari</p>
                    <p className={`mx-10 font-thin text-lg ${textClass}`}>Seguinos en nuestra cuenta de instagram para ver las novedades y etiquetarnos en tus fotos</p>
            </div>
        </a>
    </div>
  )
}

export default InstagramWall
