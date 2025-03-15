import React from 'react'
import dress from '../assets/verona/dressCode.svg'

const dressCodeVerona = ({dressCode}) => {
  return (
    <div className="p-6 text-center rounded-md max-w-md mx-auto">
        <h2 className="text-[#4b5147] font-vintageText text-4xl mb-3">Código de Vestimenta</h2>
        <p className="text-[#4b5147] mb-4 text-xl">Estilo {dressCode}</p>
        <div className="flex items-center gap-4 justify-center">
            <img src={dress} alt="Traje" className="w-56 h-56 " />   
        </div>
  </div>
  )
}

export default dressCodeVerona
