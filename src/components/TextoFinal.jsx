import React from 'react'

const TextoFinal = ({textClass}) => {
  return (
    <div className="h-44" id="info">
        <div className="w-full h-full flex flex-col justify-center items-center gap-y-3">
            <h2 className={`text-gray-700 px-5 md:px-0 text-center ${textClass}`}>¡Tu presencia es muy importante para nosotros!</h2>
        </div>
    </div>
  )
}

export default TextoFinal
