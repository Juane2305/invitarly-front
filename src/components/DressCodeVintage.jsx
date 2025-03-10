import dress from '../assets/dress.svg'


const DressCodeVintage = () => {
    return (
      <div className="bg-[#FAF3E0] p-6 text-center rounded-md max-w-md mx-auto">
        <h2 className="font-vintageText text-4xl mb-3">Código de Vestimenta</h2>
        <p className="mb-4 text-xl">Estilo Formal</p>
        <div className="flex items-center gap-4 justify-center">
          <img src={dress} alt="Traje" className="w-44 h-4w-44 " />
        </div>
        <p className="text-xl mt-4 italic">“Flores, encajes y tonos pastel son bienvenidos.”</p>
      </div>
    );
  };

  export default DressCodeVintage;