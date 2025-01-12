export const ImagenPrincipal = () => {
  return (
    <div className="bg-fondo-inicio h-screen w-full bg-cover bg-no-repeat bg-bottom flex flex-col justify-center items-center">
        <h1 className="text-white text-3xl sm:text-5xl font-bold italic text-center">INVITACIONES INOLVIDABLES</h1>
        <div className="-space-y-1">
          <h2 className="text-white pt-5 text-lg font-semibold text-center px-3">Si quieres sorprender a todos tus invitados, nuestras invitaciones digitales son la solución perfecta.</h2>
          <h3 className="text-white text-lg font-semibold text-center px-3">Diseños únicos, personalizados y fáciles de compartir.</h3>
          <h3 className="text-white text-lg font-semibold text-center px-4">Haz que tu evento destaque desde el primer momento.</h3>
        </div>
        <a href="#invitaciones"><button className="mt-8 py-4 px-6 rounded-full border-4 text-lg text-white hover:text-gray-900 hover:bg-slate-50 hover:transition font-bold">Ver demos</button></a>
    </div>
  )
}
