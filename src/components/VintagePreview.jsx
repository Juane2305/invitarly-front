import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import nombres from "../assets/nombresInicioVintage.svg";
import CountdownVintage from "./CountdownCircles";
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
import hojasVerdes from "../assets/hojasVerdes.svg";
import hojasVerdes2 from "../assets/hojasVerdes2.svg";
import hojasVerdesIzq from "../assets/hojasVerdesIzq.svg";

const VintagePreview = () => {
  const [funcionalidades, setFuncionalidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { nombrePlan } = useParams();
  const navigate = useNavigate();

  const targetDate = new Date("2025-04-06T13:00:00-03:00");

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

  if (loading)
    return <p className="text-center py-10">Cargando plantilla vintage...</p>;
  if (error) return <p className="text-center py-10">{error}</p>;

  const handleSeleccionarPlantilla = () => {
    navigate(`/confirmacion-pago/${nombrePlan}/vintage`);
  };

  const handleVolver = () => {
    navigate(`/plantillas/${nombrePlan}`);
  };

  return (
    <div className="w-full font-vintageText relative overflow-hidden bg-[#FAF3E0]">
      {/* ✅ Fondo Fijo (Reemplazo de bg-fixed) */}
      <div className="fixed inset-0 -z-10 bg-[url('/img/fondo.jpg')] bg-cover bg-center"></div>

      {/* Botones fijos */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={handleSeleccionarPlantilla}
          className="bg-[#D4AF37] text-white px-4 py-2 rounded shadow-lg hover:bg-[#C19A35] transition"
        >
          Seleccionar esta plantilla
        </button>
      </div>
      <div className="fixed top-4 left-4 z-50">
        <button
          onClick={handleVolver}
          className="bg-[#A3B18A] text-white px-4 py-2 rounded shadow-lg hover:bg-[#8D9A78] transition"
        >
          Volver
        </button>
      </div>

      {/* Música */}
      {funcionalidades.includes("musica") && (
        <div className="absolute">
          <MusicPlayer />
        </div>
      )}

      {/* Sección inicial SIN bg-fixed, usando relative */}
      <div className="flex flex-col justify-center items-center h-screen w-full text-center bg-fondo-vintage bg-cover bg-no-repeat bg-center md:bg-fixed border-b-2 border-[#D4AF37] relative">
        <img
          src={nombres}
          alt="Nombres de los novios"
          className="w-[400px] md:w-[500px] lg:w-[700px] relative z-10"
        />
        {/* Hojas decorativas - solo en desktop */}
        <img
          src={hojasVerdes}
          alt="Decoración izquierda"
          className="hidden sm:block absolute left-[-50px] top-1/2 transform -translate-y-1/2 w-36 lg:w-48 opacity-70"
        />
        <img
          src={hojasVerdes2}
          alt="Decoración derecha"
          className="hidden sm:block absolute right-[-50px] top-1/2 transform -translate-y-1/2 w-36 lg:w-48 opacity-70"
        />
      </div>

      {/* Contenido dinámico */}
      <div className="relative z-10">
        {funcionalidades.includes("cuentaRegresiva") && (
          <section
            id="contador"
            className="bg-[#A3B18A] text-white py-10 border-b-2 border-[#D4AF37]"
          >
            <CountdownVintage targetDate={targetDate} containerClasses="my-8" />
          </section>
        )}
        <section id="lugares" className="py-10 border-b-2 border-[#D4AF37]">
          <Lugares />
          <div className="flex justify-center items-center mt-5">
            <a
              href="https://maps.app.goo.gl/4XyzMRjyujMSjckK7"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="border-2 border-[#D4AF37] py-3 px-8 rounded-full bg-[#FAF3E0] text-[#D4AF37] font-bold hover:bg-[#D4AF37] hover:text-white transition">
                CÓMO LLEGAR
              </button>
            </a>
          </div>
        </section>
        {funcionalidades.includes("galeriaFotos") && (
          <section className="relative my-10 pb-10 border-b-2 border-[#D4AF37]">
            <FocusCardsDemo />
          </section>
        )}
        {funcionalidades.includes("instagramWall") && (
          <section className="py-10 text-center">
            <InstagramWall />
          </section>
        )}
        {funcionalidades.includes("calendario") && (
          <section className="bg-[#A3B18A] py-10 text-white text-center">
            <GoogleCalendarButton />
          </section>
        )}
        {funcionalidades.includes("dressCode") && (
          <section className="relative my-10 border-b-2 border-[#D4AF37]">
            <img
              src={hojasVerdesIzq}
              alt="Decoración"
              className="absolute left-[-80px] lg:left-[-50px] top-1/2 transform -translate-y-1/2 w-40 lg:w-52 opacity-70"
            />
            <DressCode />
            <img
              src={hojasVerdes2}
              alt="Decoración"
              className="absolute right-[-80px] lg:right-[-50px] top-1/2 transform -translate-y-1/2 w-40 lg:w-52 opacity-70"
            />
          </section>
        )}
        {funcionalidades.includes("datosBancarios") && (
          <section className="my-10 border-b-2 border-[#D4AF37]">
            <DatosBancarios
              claseContenedor="bg-[#FAF3E0] py-10 text-center text-black"
              claseBoton="border-principal-dark text-white bg-principal-dark hover:bg-transparent hover:text-green-900 text-xl"
              textSize="text-xl"
            />
          </section>
        )}
        {funcionalidades.includes("confirmacionAsistencia") && (
          <section className="">
            <Asistencia
              clase="py-10 bg-[#FAF3E0]"
              claseButton="border-principal-dark text-white bg-principal-dark hover:bg-transparent hover:text-green-900 text-xl border-2 border-principal-dark"
            />
          </section>
        )}
        <TextoFinal textClass="text-xl" />
        <Footer />
      </div>
    </div>
  );
};

export default VintagePreview;
