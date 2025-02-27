import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

import Countdown from "./Countdown";
import { FocusCardsDemo } from "./FocusCardsDemo";
import MusicPlayer from "./MusicPlayer";
import InstagramWall from "./InstagramWall";
import GoogleCalendarButton from "./GoogleCalendarButton";
import DressCode from "./DressCode";
import DatosBancarios from "./DatosBancarios";
import Asistencia from "./Asistencia";
import Footer from "./Footer";
import TextoFinal from "./TextoFinal";
import LugaresLineal from "./LugaresLineal";
import DressCodeElegante from "./DressCodeElegante";

const ElegantePreview = () => {
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
        const response = await axios.get(
          `https://api.invitarly.com/api/planes/${nombrePlan}/funcionalidades`
        );
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

  if (loading) return <p>Cargando plantilla elegante...</p>;
  if (error) return <p>{error}</p>;

  const handleSeleccionarPlantilla = () => {
    navigate(`/confirmacion-pago/${nombrePlan}/elegante`);
  };

  const handleVolver = () => {
    navigate(`/plantillas/${nombrePlan}`);
  };

  return (
    <div className="w-full font-eleganteText relative overflow-hidden bg-[#f8f5f0]">
      {/* Botón para seleccionar plantilla */}
      <button
        onClick={handleSeleccionarPlantilla}
        className="fixed top-4 right-4 bg-[#D4AF37] text-white px-4 py-2 rounded shadow-lg hover:bg-[#B8860B] transition z-50"
      >
        Seleccionar esta plantilla
      </button>

      {/* Botón para volver */}
      <button
        onClick={handleVolver}
        className="fixed top-4 left-4 bg-[#505050] text-white px-4 py-2 rounded shadow-lg hover:bg-[#404040] transition z-50"
      >
        Volver
      </button>

      {/* Música */}
      {funcionalidades.includes("musica") && (
        <div className="absolute z-40">
          <MusicPlayer />
        </div>
      )}

      {/* Sección inicial */}
      <div className="flex flex-col justify-center items-center h-screen w-full text-center bg-fondo-elegante bg-center bg-cover font-eleganteText relative space-y-5">
        <p className="text-white text-xl">
          Estás cordialmente invitado/a <br /> al casamiento de
        </p>
        <h1 className="text-4xl md:text-8xl font-eleganteTitle text-white z-10 italic">
          Francisco & María
        </h1>
        <div className="flex items-center justify-center py-6 px-4">
      <div className="relative border-t-2 border-b-2 border-dotted border-gold w-full max-w-lg flex flex-col items-center">
        {/* Línea superior */}
        <div className="absolute top-0 left-0 right-0 border-t-2 border-dotted mb-4 border-gold"></div>

        <div className="flex justify-between items-center w-full px-4 py-2 text-gold font-semibold text-lg tracking-wider relative">
          <span className="mr-2 text-2xl">DOM</span>
          
          {/* Línea divisoria izquierda */}
          <div className="border-l-4 border-dotted border-gold h-16 mt-2 mx-5"></div>

          <span className="text-2xl font-light"><span className="text-5xl">06</span><br />ABR</span>

          {/* Línea divisoria derecha */}
          <div className="border-l-4 border-dotted border-gold h-16 mt-2 mx-5"></div>

          <span className="ml-2 text-2xl">13 HS</span>
        </div>

        {/* Línea inferior */}
        <div className="absolute bottom-0 left-0 right-0 border-t-2 border-dotted border-gold mt-4"></div>
      </div>
    </div>
      </div>

      {/* Plantilla dinámica */}
      <div>
        {/* Contador */}
        {funcionalidades.includes("cuentaRegresiva") && (
          <section
            id="contador"
            className="bg-white py-10 border-4 border-gold"
          >
            <Countdown containerClasses="w-full flex flex-col items-center justify-center gap-y-5 text-gold" />
          </section>
        )}

        {/* Lugares */}
        <section id="lugares" className="py-10 border-y-2 border-gold bg-[#171717] text-center">
          <h2 className="text-gold text-4xl">Itinerario</h2>
          <LugaresLineal />
          <div className="flex justify-center items-center">
            <a
              href="https://maps.app.goo.gl/4XyzMRjyujMSjckK7"
              data-aos="fade-up"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="border-2 border-[#D4AF37] py-3 px-8 rounded-full bg-[#F8F5F0] text-black  font-bold hover:bg-[#D4AF37] hover:text-white mt-5 md:mt-10 transition">
                Cómo llegar
              </button>
            </a>
          </div>
        </section>

        {/* Galería de Fotos */}
        {funcionalidades.includes("galeriaFotos") && (
          <div className="relative py-10 border-b-2 border-[#D4AF37] bg-white text-gold">
            <FocusCardsDemo />
          </div>
        )}
        {funcionalidades.includes("instagramWall") && (
          <div className="bg-white border-dotted border-b-4 border-gold">
            <InstagramWall userClass="text-gold" logoClass='text-gold'/>
          </div>
        )}
        {funcionalidades.includes("calendario") && (
          <div className="bg-white text-center relative">
            <GoogleCalendarButton imgClass="text-gold"/>
          </div>
        )}

        {/* Dress Code */}
        {funcionalidades.includes("dressCode") && (
          <div className="">
            <DressCodeElegante />
          </div>
        )}

        {/* Datos Bancarios */}
        {funcionalidades.includes("datosBancarios") && (
          <DatosBancarios
            claseIcon="text-gold"
            claseContenedor="bg-[#F8F5F0] text-[#1E1E1E]"
            claseBoton="hover:bg-[#D4AF37] hover:text-white transform transition-transform duration-300 ease-in-out font-semibold border-gold"
            textSize="text-lg"
          />
        )}

        {/* Confirmación de Asistencia */}
        {funcionalidades.includes("confirmacionAsistencia") && (
          <Asistencia
            clase="py-10 bg-[#171717] bg-fixed"
            claseTitle="text-gold"
            claseButton="border-2 border-[#D4AF37] font-semibold hover:bg-[#D4AF37] text-white"
          />
        )}

        {/* Texto Final */}
        <div className="font-eleganteTitle text-4xl">
          <TextoFinal />  
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default ElegantePreview;
