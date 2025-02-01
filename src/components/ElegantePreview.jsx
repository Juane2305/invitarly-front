import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

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
import decoracionElegante from "../assets/decoracionElegante.svg";

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
      <div className="flex flex-col justify-center items-center h-screen w-full text-center bg-gradient-to-b from-[#1E1E1E] to-[#505050] font-eleganteTitle relative space-y-5">
        {/* Decoración SVG */}
        <img
          src={decoracionElegante}
          alt="Decoración elegante"
          className="absolute top-56 left-1/2 transform -translate-x-1/2 w-[500px] opacity-90"
        />

        <h1 className="text-4xl md:text-6xl text-white z-10 italic">Francisco y María</h1>
        <div className="space-y-3">
          <h2 className="leading-3 text-white text-xl md:text-3xl">¡Nos casamos!</h2>
          <p className="leading-3 text-white text-xl md:text-3xl italic">6 de abril de 2025</p>
        </div>
      </div>

      {/* Plantilla dinámica */}
      <div>
        {/* Contador */}
        {funcionalidades.includes("cuentaRegresiva") && (
          <section id="contador" className="bg-[#2C2C2C] text-[#D4AF37] py-10 border-b-2 border-[#D4AF37]">
            <Countdown containerClasses="w-full flex flex-col items-center justify-center gap-y-5 text-[#D4AF37]" />
          </section>
        )}

        {/* Lugares */}
        <section id="lugares" className="py-10 border-b-2 border-[#D4AF37]">
          <Lugares />
          <div className="flex justify-center items-center">
            <a
              href="https://maps.app.goo.gl/4XyzMRjyujMSjckK7"
              data-aos="fade-up"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="border-2 border-[#D4AF37] py-3 px-8 rounded-full bg-[#F8F5F0] text-[#D4AF37] font-bold hover:bg-[#D4AF37] hover:text-white mt-5 md:mt-10 transition">
                Cómo llegar
              </button>
            </a>
          </div>
        </section>

        {/* Galería de Fotos */}
        {funcionalidades.includes("galeriaFotos") && (
          <div className="relative my-10 border-b-2 border-[#D4AF37]">
            <h2 className="text-2xl lg:text-3xl text-[#D4AF37] font-serif text-center mb-6">
              Nuestra Historia
            </h2>
            <FocusCardsDemo />
          </div>
        )}
        {funcionalidades.includes("instagramWall") && <InstagramWall />}
        {funcionalidades.includes("calendario") && (
          <div className="bg-principal-light text-center relative">
            <GoogleCalendarButton />
          </div>
        )}

        {/* Dress Code */}
        {funcionalidades.includes("dressCode") && (
          <div className="relative my-10 border-b-2 border-[#D4AF37]">
            <DressCode />
          </div>
        )}

        {/* Datos Bancarios */}
        {funcionalidades.includes("datosBancarios") && (
          <DatosBancarios
            claseContenedor="bg-[#F8F5F0] text-[#1E1E1E]"
            claseBoton="hover:bg-[#D4AF37] hover:text-white transform transition-transform duration-300 ease-in-out font-semibold"
            textSize="text-lg"
          />
        )}

        {/* Confirmación de Asistencia */}
        {funcionalidades.includes("confirmacionAsistencia") && (
          <Asistencia
            clase="py-10 bg-[#2C2C2C] bg-fixed"
            claseButton="border-2 border-[#D4AF37] font-semibold hover:bg-[#D4AF37] hover:text-white"
          />
        )}

        {/* Texto Final */}
        <TextoFinal />

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default ElegantePreview;