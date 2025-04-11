import React from 'react'
import instagram from '../assets/praga/instagram.json'
import Lottie from 'react-lottie-player';

const InstagramWall = ({userClass, textClass, logoClass, user}) => {

  const instagramUser = user.replace(/^@/, "");


  return (
    <div className='py-24'>
    {instagramUser && instagramUser.trim() !== "" && (
        <a href={`https://www.instagram.com/${instagramUser}/`} target='_blank' className='flex flex-col items-center justify-center'>
            <div style={{ width: 120, height: 120 }}>
              <Lottie
                loop
                play
                animationData={instagram}
                style={{ width: "100%", height: "100%" }}
              />
            </div>            
            <div className='flex flex-col gap-y-5 items-center text-center'>
                    <p className={`text-3xl font-light ${userClass}`}>{user}</p>
                    <p className={`mx-10 font-thin text-lg ${textClass}`}>Seguinos en nuestra cuenta de instagram para ver las novedades y etiquetarnos en tus fotos</p>
            </div>
        </a>
  )}
    </div>
  )
}

export default InstagramWall
