export const ImagenPrincipal = () => {
  return (
    <div className="bg-fondo-inicio h-screen w-full bg-cover bg-no-repeat bg-bottom flex flex-col justify-center items-center">
        <h1 className="text-white text-3xl px-2 sm:text-5xl font-bold italic text-center">INVITACIONES INOLVIDABLES</h1>
        <div className="-space-y-1">
          <h2 className="text-white pt-5 text-lg font-semibold text-center px-3">Sorprende a tus invitados con invitaciones digitales únicas, fáciles de compartir y personalizadas.</h2>
          <h3 className="text-white text-lg font-semibold text-center px-3"> ¡Haz que tu evento brille desde el primer momento!</h3>
        </div>
        <button className="mt-8 py-4 px-6 rounded-full border-4 text-lg text-white hover:text-gray-900 hover:bg-slate-50 hover:transition font-bold"><a href="#planes">Ver demos</a></button>
    </div>
  )
}
