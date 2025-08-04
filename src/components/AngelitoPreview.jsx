import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import MusicScreen from "./MusicScreen";
import Countdown from "./Countdown";
import GoogleCalendarButton from "./GoogleCalendarButton";
import Asistencia from "./Asistencia";
import Footer from "./Footer";
import TextoFinal from "./TextoFinal";
import Loader from "./Loader";
import { FocusCardsDemo } from "./FocusCardsDemo";
import pies from "../assets/angelito/pies.svg";
import PadresPadrinos from "./PadresPadrinos";
import CeremoniaBautismo from "./CeremoniaBautismo";

const AngelitoPreview = () => {
  const [funcionalidades, setFuncionalidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { nombrePlan } = useParams();
  const navigate = useNavigate();

  const targetDate = new Date("2025-07-06T13:00:00-03:00");

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
        className="fixed top-4 left-4 bg-[#69795d] text-white px-4 py-2 rounded shadow-lg hover:bg-[#404040] transition z-50"
      >
        Volver
      </button>

      {funcionalidades.includes("musica") && (
        <div className="absolute z-40">
          <MusicScreen cancion="https://res.cloudinary.com/dfschbyq2/video/upload/v1742765775/Ciro_y_Los_Persas_-_Cancio%CC%81n_De_Cuna_-_Encuentro_en_el_Estudio_HD_fhfg4g.mp3" />
        </div>
      )}

      <div className="relative flex flex-col justify-center md:justify-start items-center min-h-screen w-full text-center bg-fondo-angelito-mobile md:bg-fondo-angelito bg-center bg-cover font-eleganteText space-y-5 overflow-hidden">
        <div data-aos="fade-in">
          <div className="md:mt-36">
            <h3 className="md:text-[2rem] tracking-widest text-[#63412a]">
              Mi bautismo
            </h3>
            <h2 className="text-7xl md:text-[6rem]  mb-5  text-[#63412a] z-10">
              Felipe
            </h2>
          </div>
          <img
            src="https://res.cloudinary.com/dfschbyq2/image/upload/v1742420571/Copia_de_Beige_Simple_Abstract_Aesthetic_Desktop_Wallpaper_3_aeunhu.png"
            alt=""
            className="w-[37rem] p-5 border-2 border-dashed border-[#97572B]"
          />

          <div className="flex items-center justify-center py-2 px-4 mt-5">
            <p className="font-bold text-[#63412a] text-2xl tracking-widest">
              0 6 . 0 7 . 2 0 2 5
            </p>
          </div>
        </div>
      </div>

      <div>
        <section
          id="contador"
          className="bg-[#63412a] w-full flex flex-col items-center justify-center gap-y-5 py-10 font-thin"
        >
          <Countdown
            targetDate={targetDate}
            containerClasses={
              "w-full flex flex-col justify-center items-center gap-y-5 text-white"
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
          <CeremoniaBautismo
            imagen="https://res.cloudinary.com/dfschbyq2/image/upload/v1742506877/Disen%CC%83o_sin_ti%CC%81tulo_8_msysfn.png"
            iglesia="[Nombre iglesia]"
            hora_iglesia="10:00hs"
            color="[#63412a]"
          />
          <a href="#" target="_blank" rel="noopener noreferrer">
            <button className="border-2 border-[#63412a] my-5 py-3 px-8 rounded-full text-[#63412a] font-semibold hover:text-gray-600 transition">
              CÓMO LLEGAR
            </button>
          </a>
        </section>

        <div className="relative bg-white">
          <img
            src={pies}
            alt="Decoración lateral"
            className="hidden md:block absolute top-1/2 transform -translate-y-1/2 pointer-events-none"
            style={{
              width: "10rem",
              left: 20,
            }}
          />
          <img
            src={pies}
            alt="Decoración lateral"
            className="hidden md:block absolute  top-1/2 transform -translate-y-1/2 pointer-events-none"
            style={{
              width: "10rem",
              right: 20,
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

        <div className="bg-white text-center relative text-[#63412a]">
          <GoogleCalendarButton
            imgClass="text-[#63412a]"
            buttonClass="border-[#4b5147] rounded-full"
            titleCalendar="Bautismo de Felipe"
            salon="Nombre Iglesia"
            fechaComienzo="20250406T130000"
            fechaFin="20250407T000000"
          />
        </div>

        <section
          className="flex flex-col justify-center items-center bg-white pt-20"
          data-aos="fade-up"
        >
          <img
            src="https://res.cloudinary.com/dfschbyq2/image/upload/v1742425600/Disen%CC%83o_sin_ti%CC%81tulo_6_ldxbud.png"
            alt=""
            className="w-32 h-32"
          />
          <Asistencia
            clase="w-full pb-10 bg-white bg-fixed border-b-2 border-[#4b5147]"
            claseTitle="text-[#63412a]"
            claseButton="border-2 border-[#63412a] font-semibold hover:bg-[#4b5147]  text-[#63412a] hover:text-white rounded-full"
            linkAsistencia="https://docs.google.com/forms/d/e/1FAIpQLSeK0vUpx6zegOhIcQr2rRVADqcpoDD4cDYyRSEOkyALbf-Spg/viewform?usp=dialog"
          />
        </section>

        <div className="font-eleganteTitle text-4xl bg-white">
          <TextoFinal textoFinal="¡Gracias por venir!" />
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default AngelitoPreview;
