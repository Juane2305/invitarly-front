import React from 'react'
import { IoLogoInstagram } from "react-icons/io";

const InstagramWall = () => {
  return (
    <div className='my-24'>
        <a href="#" className='flex flex-col items-center justify-center'>
            <IoLogoInstagram size={140}/>
            <div className='flex flex-col gap-y-5 items-center text-center'>
                    <p className='text-3xl font-light'>@franymari</p>
                    <p className='text-gray-700 mx-10 font-thin'>Seguinos en nuestra cuenta de instagram para ver las novedades y etiquetarnos en tus fotos</p>
            </div>
        </a>
    </div>
  )
}

export default InstagramWall
