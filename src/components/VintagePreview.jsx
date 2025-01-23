import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import nombres from "../assets/nombresInicioVintage.svg";
import Countdown from "./Countdown";
import Lugares from "./Lugares";
import { FocusCardsDemo } from "./FocusCardsDemo";
import MusicPlayer from "./MusicPlayer";
import InstagramWall from "./InstagramWall";
import GoogleCalendarButton from "./GoogleCalendarButton";
import DressCode from "./DressCode";
import DatosBancarios from "./DatosBancarios";
import Asistencia from "../components/Asistencia";
import Footer from "./Footer";
import TextoFinal from "./TextoFinal";
import hojasVerdes from '../assets/hojasVerdes.svg'
import hojasVerdes2 from '../assets/hojasVerdes2.svg'
import hojasVerdesIzq from '../assets/hojasVerdesIzq.svg'

const VintagePreview = () => {
    const [funcionalidades, setFuncionalidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { nombrePlan } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFuncionalidades = async () => {
      if (!nombrePlan) {
        console.error("El nombre del plan no está definido.");
        return;
      }
  
      try {
        const response = await axios.get(`http://localhost:8080/api/planes/${nombrePlan}/funcionalidades`);
        setFuncionalidades(response.data);
      } catch (err) {
        console.error("Error al cargar las funcionalidades:", err);
        setError("Hubo un error al cargar las funcionalidades.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchFuncionalidades();
  }, [nombrePlan]);

  if (loading) return <p>Cargando plantilla vintage...</p>;
  if (error) return <p>{error}</p>;

  const handleSeleccionarPlantilla = () => {
    console.log("Plantilla seleccionada!");
    // Aquí puedes implementar la lógica para guardar la selección
  };

  const handleVolver = () => {
    navigate(`/plantillas/${nombrePlan}`);
  };



  return (
    <div className="w-full font-vintageText relative overflow-hidden bg-[#FAF3E0]">
      {/* Botón para seleccionar plantilla */}
      <button
        onClick={handleSeleccionarPlantilla}
        className="fixed top-4 right-4 bg-[#D4AF37] text-white px-4 py-2 rounded shadow-lg hover:bg-[#C19A35] transition z-50"
      >
        Seleccionar esta plantilla
      </button>
  
      {/* Botón para volver */}
      <button
        onClick={handleVolver}
        className="fixed top-4 left-4 bg-[#A3B18A] text-white px-4 py-2 rounded shadow-lg hover:bg-[#8D9A78] transition z-50"
      >
        Volver
      </button>
  
      {/* Música */}
      {funcionalidades.includes("musica") && (
        <div className="absolute">
          <MusicPlayer />
        </div>
      )}
  
      {/* Sección inicial */}
      <div className="flex flex-col justify-center items-center h-screen w-full text-center bg-fondo-elegante bg-fixed bg-cover bg-no-repeat bg-center border-b-2 border-[#D4AF37]">
        <img src={nombres} alt="Nombres de los novios" className="w-[1200px] lg:w-[700px]" />
      </div>
  
      {/* Plantilla dinámica */}
      <div>
        {/* Contador */}
        {funcionalidades.includes("cuentaRegresiva") && (
          <section id="contador" className="bg-[#A3B18A] text-white py-10 border-b-2 border-[#D4AF37]">
            <Countdown containerClasses="w-full flex flex-col items-center justify-center gap-y-5 text-white" />
          </section>
        )}
  
        {/* Lugares */}
        <section id="lugares" className="font-vintageText py-10 border-b-2 border-[#D4AF37]">
          <Lugares />
          <div className="flex justify-center items-center">
            <a
              href="https://maps.app.goo.gl/4XyzMRjyujMSjckK7"
              data-aos="fade-up"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="border-2 border-[#D4AF37] py-3 px-8 rounded-full bg-[#FAF3E0] text-[#D4AF37] font-bold hover:bg-[#D4AF37] hover:text-white mt-5 md:mt-10 transition">
                CÓMO LLEGAR
              </button>
            </a>
          </div>
        </section>
  
        {/* Galería de Fotos */}
        {funcionalidades.includes("galeriaFotos") && (
          <div className="relative my-10 pb-10 border-b-2 border-[#D4AF37]">
            <img
              src={hojasVerdes}
              alt="Decoración de hojas"
              className="hidden lg:block absolute left-[-50px] top-1/2 transform -translate-y-1/2 w-36 lg:w-48 opacity-70"
            />
            <FocusCardsDemo />
            <img
              src={hojasVerdes2}
              alt="Decoración de hojas"
              className="hidden lg:block absolute right-[-50px] top-1/2 transform -translate-y-1/2 w-36 lg:w-48 opacity-70"
            />
          </div>
        )}
  
        {/* Instagram Wall */}
        {funcionalidades.includes("instagramWall") && (
          <div className="py-10 text-center">
            <InstagramWall />
          </div>
        )}
  
        {/* Calendario */}
        {funcionalidades.includes("calendario") && (
          <div className="bg-[#A3B18A] py-10 text-white text-center">
            <GoogleCalendarButton />
          </div>
        )}
  
        {/* Dress Code */}
        {funcionalidades.includes("dressCode") && (
          <div className="relative">
            <img
              src={hojasVerdesIzq}
              alt="Decoración de hojas"
              className="absolute left-[-80px] lg:left-[-50px] top-1/2 transform -translate-y-1/2 w-40 lg:w-52 opacity-70"
            />
            <DressCode />
            <img
              src={hojasVerdes2}
              alt="Decoración de hojas"
              className="absolute right-[-80px] lg:right-[-50px] top-1/2 transform -translate-y-1/2 w-40 lg:w-52 opacity-70"
            />
          </div>
        )}
  
        {/* Datos Bancarios */}
        {funcionalidades.includes("datosBancarios") && (
          <div className="my-10 border-b-2 border-[#D4AF37]">
            <DatosBancarios 
              claseContenedor="bg-[#FAF3E0] py-10 text-center text-black"
              claseBoton="border-principal-dark text-white bg-principal-dark hover:bg-transparent hover:text-green-900 text-xl"
              textSize="text-xl"
            />
          </div>
        )}
  
        {/* Confirmación de Asistencia */}
        {funcionalidades.includes("confirmacionAsistencia") && (
          <div className="">
            <Asistencia clase="py-10 bg-[#FAF3E0]" claseButton="border-principal-dark text-white bg-principal-dark hover:bg-transparent hover:text-green-900 text-xl border-2 border-principal-dark"/>
          </div>
        )}
  
        {/* Texto Final */}
        <TextoFinal textClass="text-xl"/>
  
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default VintagePreview;