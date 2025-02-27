import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

import nombres from "../assets/nombresInicio.svg";
import Countdown from "./Countdown";
import Lugares from "./Lugares";
import { FocusCardsDemo } from "./FocusCardsDemo";
import MusicPlayer from "./MusicPlayer";
import InstagramWall from "./InstagramWall";
import GoogleCalendarButton from "./GoogleCalendarButton";
import DressCode from "./DressCode";
import DatosBancarios from "./DatosBancarios";
import Asistencia from "./Asistencia";
import Footer from "./Footer";
import TextoFinal from "./TextoFinal";

const PlantillaPreview = () => {
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
        const response = await axios.get(`https://api.invitarly.com/api/planes/${nombrePlan}/funcionalidades`);
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

  if (loading) return <p>Cargando plantilla...</p>;
  if (error) return <p>{error}</p>;

  const handleSeleccionarPlantilla = () => {
    navigate(`/confirmacion-pago/${nombrePlan}/moderna`);
  };

  const handleVolver = () => {
    navigate(`/plantillas/${nombrePlan}`);
  };

  return (
    <div className="w-full relative font-modernaText overflow-hidden">
      {/* Botón para seleccionar plantilla */}
      <button
        onClick={handleSeleccionarPlantilla}
        className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg hover:bg-green-600 transition z-50"
      >
        Seleccionar esta plantilla
      </button>

      {/* Botón para volver */}
      <button
        onClick={handleVolver}
        className="fixed top-4 left-4 bg-blue-500 text-white px-4 py-2 rounded shadow-lg hover:bg-blue-600 transition z-50"
      >
        Volver
      </button>

      {/* Música */}
      {funcionalidades.includes("musica") && (
        <div className="absolute">
          <MusicPlayer />
        </div>
      )}

      {/* Fondo y contenido principal */}
      <div className="flex flex-col justify-center items-center h-screen w-full text-center bg-fondo-moderna bg-cover bg-no-repeat bg-fixed">
        <img src={nombres} alt="Nombres de los novios" className="" />
      </div>

      {/* Plantilla dinámica */}
      <div>
        {/* Contador */}
        {funcionalidades.includes("cuentaRegresiva") && (
          <section
            id="contador"
            className="bg-beige w-full flex flex-col items-center justify-center gap-y-5 py-10 font-thin"
          >
            <Countdown
              containerClasses={
                "w-full flex flex-col justify-center items-center gap-y-5"
              }
            />
          </section>
        )}
        <section id="lugares" className="relative text-center">
          <Lugares />
          <a
              href="https://maps.app.goo.gl/4XyzMRjyujMSjckK7"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="border-2 border-gray-700 my-5 py-3 px-8 rounded-full text-gray-800 font-semibold hover:text-gray-600 transition">
                CÓMO LLEGAR
              </button>
            </a>
        </section>
        {funcionalidades.includes("galeriaFotos") && <FocusCardsDemo />}
        {funcionalidades.includes("instagramWall") && <InstagramWall />}
        {funcionalidades.includes("calendario") && (
          <div className="bg-principal-light text-center text-white relative">
            <GoogleCalendarButton imgClass="text-white" buttonClass="hover:bg-white hover:text-gray-800"/>
          </div>
        )}
        {funcionalidades.includes("dressCode") && (
          <div className="relative">
            <DressCode />
          </div>
        )}
        {funcionalidades.includes("datosBancarios") && (
          <DatosBancarios
            claseContenedor="bg-principal-light text-white"
            claseBoton="border-2 py-3 px-6 rounded-full hover:bg-white hover:text-gray-800 transform transition-transform duration-300 ease-in-out font-semibold"
            textSize="text-lg"
          />
        )}
        {funcionalidades.includes("confirmacionAsistencia") && (
          <Asistencia
            clase="py-10 bg-fondo-tela bg-fixed"
            claseButton="border-2 py-3 px-6 rounded-full border-gray-800 font-semibold hover:border-gray-700 hover:bg-white hover:text-gray:800"
          />
        )}
        <TextoFinal />
        <Footer />
      </div>
    </div>
  );
};

export default PlantillaPreview;