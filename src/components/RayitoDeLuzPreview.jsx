import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import decoracion from '../assets/rayitodeluz/decoracionCostados.svg'
import imagenesDeco from "../assets/rayitodeluz/decoracionImagenes.svg";

import hojasDecoracionIzq from "../assets/rayitodeluz/hojasDecoracionIzq.svg";
import hojasDecoracionDer from "../assets/rayitodeluz/hojasDecoracionDer.svg";
import Countdown from "./Countdown";
import MusicScreen from "./MusicScreen";
import GoogleCalendarButton from "./GoogleCalendarButton";
import Asistencia from "./Asistencia";
import Footer from "./Footer";
import TextoFinal from "./TextoFinal";
import Loader from "./Loader";
import { FocusCardsDemo } from "./FocusCardsDemo";
import CeremoniaBautismo from "./CeremoniaBautismo";
import PadresPadrinos from "./PadresPadrinos";

const RayitoDeLuzPreview = () => {
  const [funcionalidades, setFuncionalidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { nombrePlan } = useParams();
  const navigate = useNavigate();

  const targetDate = new Date("2025-12-10T13:00:00-03:00");

  useEffect(() => {
    AOS.init({
      duration: 3000,
      easing: "ease-in-out",
      once: true,
    });
    window.scrollTo(0, 0);

    const fetchFuncionalidades = async () => {
      if (!nombrePlan) {
        console.error("El nombre del plan no está definido.");
        return;
      }
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/api/planes/${nombrePlan}/funcionalidades`
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

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  const handleVolver = () => {
    navigate(`/plantillas/${nombrePlan}`);
  };

  return (
    <div className="w-full font-eleganteText relative overflow-hidden bg-[#f8f5f0]">
      <button
        onClick={handleVolver}
        className="fixed top-4 left-4 bg-[#69795d] text-white px-4 py-2 rounded shadow-lg hover:bg-[#404040] transition z-40"
      >
        Volver
      </button>
      {funcionalidades.includes("musica") && (
        <div className="absolute z-40">
        <MusicScreen cancion="https://res.cloudinary.com/dfschbyq2/video/upload/v1742765775/Ciro_y_Los_Persas_-_Cancio%CC%81n_De_Cuna_-_Encuentro_en_el_Estudio_HD_fhfg4g.mp3"/>
        </div>
      )}
      <div className="relative flex flex-col justify-center md:justify-start items-center min-h-screen w-full text-center bg-fondo-rayitodeluz bg-center bg-cover font-eleganteText space-y-5 overflow-hidden">
      <img
          src={hojasDecoracionIzq}
          alt="Decoración Izquierda"
          className="
            absolute 
            top-0 
            -left-24
            pointer-events-none 
            w-[29rem]  
            md:w-[34rem]       
            lg:w-[52rem] 
            lg:-left-48  
            transition-all
            duration-300
          "
        />

        <img
          src={hojasDecoracionDer}
          alt="Decoración Derecha"
          className="
            absolute 
            bottom-0 
            -right-24
            pointer-events-none 
            w-[29rem] 
            md:w-[34rem]
            lg:w-[52rem]
            lg:-right-56
            transition-all
            duration-300
          "
        />
        <div data-aos="fade-in">
          <div className="md:mt-36">
            <h3 className="md:text-[2rem] tracking-widest text-gray-700">
              Mi bautismo
            </h3>
            <h2 className="text-7xl md:text-[6rem] mb-2 text-gray-700 z-10">
              Isabella
            </h2>
          </div>
          <img
            src="https://res.cloudinary.com/dfschbyq2/image/upload/v1742503045/Copia_de_Beige_Simple_Abstract_Aesthetic_Desktop_Wallpaper_1200_x_1200_px_kxmkn0.jpg"
            alt=""
            className="w-[15rem] h-[15rem] md:w-[25rem] md:h-[25rem] rounded-[50%] border-[15px] my-5 border-white"
          />

          <div className="flex items-center justify-center py-2 px-4">
            <p className="font-bold text-gray-900 text-xl md:text-2xl tracking-widest">
              1 0 . 1 2 . 2 0 2 5
            </p>
          </div>
        </div>
      </div>
      <section
        id="contador"
        className="bg-white w-full flex flex-col items-center justify-center gap-y-5 py-10 font-thin"
      >
        <Countdown
          targetDate={targetDate}
          containerClasses={
            "w-full flex flex-col justify-center items-center gap-y-5 text-gray-900"
          }
        />
      </section>
      <PadresPadrinos
        padres="María & José"
        padrinos="Laura & Pedro"
        textColor="text-gray-700"
        bgColor="bg-white"
        containerClasses="pt-10"
      />
      <section id="lugares" className="relative text-center bg-white">
      <img
          src={decoracion}
          alt="Decoración lateral"
          className="hidden md:block absolute top-1/2 -left-32 transform -translate-y-1/2 pointer-events-none"
          style={{
            width: "25rem",
          }}
        />
        <img
          src={decoracion}
          alt="Decoración lateral"
          className="hidden md:block absolute top-1/2 -right-32 transform -translate-y-1/2 pointer-events-none"
          style={{
            width: "25rem",
            transform: "translateY(-50%) scaleX(-1)",
          }}
        />
        <CeremoniaBautismo
            imagen= "https://res.cloudinary.com/dfschbyq2/image/upload/v1742506859/Disen%CC%83o_sin_ti%CC%81tulo_7_gapxvi.png"
          iglesia="[Nombre iglesia]"
          hora_iglesia="10:00hs"
          color="gray-900"
        />
        <a href="#" target="_blank" rel="noopener noreferrer">
          <button className="border-2 border-gray-900 my-5 py-3 px-8 rounded-full text-gray-900 font-semibold hover:text-gray-600 transition">
            CÓMO LLEGAR
          </button>
        </a>
      </section>
      <div className="relative bg-white">
        <img
          src={imagenesDeco}
          alt="Decoración lateral"
          className="hidden md:block absolute top-1/2 transform -translate-y-1/2 pointer-events-none"
          style={{
            width: "10rem",
            left: 20,
          }}
        />
        <img
          src={imagenesDeco}
          alt="Decoración lateral"
          className="hidden md:block absolute top-1/2 transform -translate-y-1/2 pointer-events-none"
          style={{
            width: "10rem",
            right: 20,
            transform: "translateY(-50%) scaleX(-1)",
          }}
        />
        <section className="pb-16">
          {funcionalidades.includes("galeriaFotos") && (
            <FocusCardsDemo
              texto=""
              images={[
                {
                  index: 1,
                  img: "https://res.cloudinary.com/dfschbyq2/image/upload/v1742415731/Copia_de_Beige_Simple_Abstract_Aesthetic_Desktop_Wallpaper_1_ggcu7g.jpg",
                },
                {
                  index: 2,
                  img: "https://res.cloudinary.com/dfschbyq2/image/upload/v1742425217/Copia_de_Beige_Simple_Abstract_Aesthetic_Desktop_Wallpaper_5_aikvej.png",
                },
                {
                  index: 3,
                  img: "https://res.cloudinary.com/dfschbyq2/image/upload/v1742425258/Copia_de_Beige_Simple_Abstract_Aesthetic_Desktop_Wallpaper_6_qdnp79.png",
                },
                {
                  index: 4,
                  img: "https://res.cloudinary.com/dfschbyq2/image/upload/v1742425307/Copia_de_Beige_Simple_Abstract_Aesthetic_Desktop_Wallpaper_7_eg1kcu.png",
                },
                {
                  index: 5,
                  img: "https://res.cloudinary.com/dfschbyq2/image/upload/v1742425372/Copia_de_Beige_Simple_Abstract_Aesthetic_Desktop_Wallpaper_8_ink7xb.jpg",
                },
                {
                  index: 6,
                  img: "https://res.cloudinary.com/dfschbyq2/image/upload/v1742425433/Copia_de_Beige_Simple_Abstract_Aesthetic_Desktop_Wallpaper_9_m8o54i.jpg",
                },
              ]}
            />
          )}
        </section>
      </div>
      <div className="bg-white text-center relative text-gray-900">
        <GoogleCalendarButton
          imgClass="text-pink-300"
          buttonClass="border-[#4b5147] rounded-full"
          titleCalendar="Bautismo de Isabella"
          salon="Nombre Iglesia"
          fechaComienzo="20250406T130000"
          fechaFin="20250407T000000"
        />
      </div>
      <section className="flex flex-col justify-center items-center bg-white pt-20">
        <img
          src="https://res.cloudinary.com/dfschbyq2/image/upload/v1742425600/Disen%CC%83o_sin_ti%CC%81tulo_6_ldxbud.png"
          alt=""
          className="w-32 h-32"
        />
        <Asistencia
          clase="w-full pb-10 bg-white bg-fixed border-b-2 border-pink-300"
          claseTitle="text-gray-900"
          claseButton="border-2 border-gray-900 font-semibold hover:bg-[#4b5147] text-gray-900 hover:text-white rounded-full"
          linkAsistencia="https://docs.google.com/forms/d/e/1FAIpQLSeK0vUpx6zegOhIcQr2rRVADqcpoDD4cDYyRSEOkyALbf-Spg/viewform?usp=dialog"
        />
      </section>
      <div className="font-eleganteTitle text-4xl bg-white">
        <TextoFinal textoFinal="¡Gracias por venir!" />
      </div>
      <Footer />
    </div>
  );
};

export default RayitoDeLuzPreview;
