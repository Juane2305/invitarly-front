import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import dressCodeAurora from '../assets/aurora/dressCodeAurora.svg'
import decoracionImagenes from '../assets/aurora/decoracionImagenes.svg'
import decoracionNombre from "../assets/aurora/decoracionNombre.svg";
import InstagramWall from "./InstagramWall";
import GoogleCalendarButton from "./GoogleCalendarButton";
import DatosBancarios from "./DatosBancarios";
import Asistencia from "./Asistencia";
import Footer from "./Footer";
import TextoFinal from "./TextoFinal";
import LugaresXV from "./LugaresXV";
import Loader from "./Loader";
import { FocusCardsDemo } from "./FocusCardsDemo";

import DressCodeEsmeralda from "./DressCodeEsmeralda";
import PastelCountdown from "./PastelCountdown";
import MusicScreen from "./MusicScreen";

const AuroraPreview = () => {
  const [funcionalidades, setFuncionalidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { nombrePlan } = useParams();
  const navigate = useNavigate();

  const targetDate = new Date("2025-04-06T13:00:00-03:00");

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

  const handleSeleccionarPlantilla = () => {
    navigate(`/confirmacion-pago/${nombrePlan}/esmeralda`);
  };

  const handleVolver = () => {
    navigate(`/plantillas/${nombrePlan}`);
  };

  return (
    <div className="w-full font-eleganteText relative overflow-hidden bg-[#f8f5f0]">
      <button
        onClick={handleSeleccionarPlantilla}
        className="fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded shadow-lg hover:bg-blue-700 transition z-50"
      >
        Seleccionar esta plantilla
      </button>

      <button
        onClick={handleVolver}
        className="fixed top-4 left-4 bg-blue-500 text-white px-4 py-2 rounded shadow-lg hover:bg-blue-700 transition z-50"
      >
        Volver
      </button>

      {funcionalidades.includes("musica") && (
        <div className="absolute z-40">
          <MusicScreen cancion="https://res.cloudinary.com/dfschbyq2/video/upload/v1742765467/Taylor_Swift_-_Wildest_Dreams_qzmkky.mp3" />
        </div>
      )}

      <div className="relative flex flex-col justify-center items-center min-h-screen w-full text-center bg-fondo-aurora bg-center bg-cover font-eleganteText space-y-5 overflow-hidden">
        <div data-aos="fade-in">
          {/* Imagen (flor) con posición absoluta y z-0 para estar detrás */}

          <div className="relative z-10 flex flex-col items-center text-center text-white pt-96">
            {/* Contenedor horizontal para el nombre y las decoraciones */}
            <div className="flex items-center justify-center mb-2">
              {/* SVG invertido a la izquierda */}
              <img
                src={decoracionNombre}
                alt="Decoración invertida"
                className="w-[10rem] h-auto mr-3"
                // Ajusta w-12 según el tamaño deseado
              />

                <div className="flex flex-col items-center">
                    {/* El nombre en el centro */}
                    <h1 className="text-5xl md:text-7xl font-bold tracking-wide">
                        Victoria
                    </h1>

                    {/* Texto debajo del nombre */}
                    <p className="text-xl md:text-2xl font-light tracking-wider">
                    MIS QUINCE AÑOS
                    </p>

                </div>
              {/* SVG normal a la derecha */}
              <img
                src={decoracionNombre}
                alt="Decoración normal"
                className="w-[10rem] h-auto  scale-x-[-1] transform"
              />
            </div>

          </div>
        </div>
      </div>

      <div>
        <section
          id="contador"
          className="bg-white py-10 border-y-4 border-pink-100 text-center"
        >
          <p className="text-xl tracking-wider font-light py-5">Sábado 9 de agosto de 2025</p>
          <PastelCountdown targetDate={targetDate} bgColor="bg-pink-100"/>
        </section>

        <section id="lugares" className="relative text-center bg-gradient-to-b from-white to-pink-50 border-b-4 border-pink-100 py-10">
          <LugaresXV
            iglesia="[Nombre iglesia]"
            hora_iglesia="10:00hs"
            salon="[Nombre salon]"
            hora_inicio="21:00hs"
            hora_fin="05:00hs"
          />
          <a href="#" target="_blank" rel="noopener noreferrer">
            <button className="border-2 border-pink-200 my-5 py-3 px-8 rounded-full text-gray-800 font-semibold hover:text-gray-600 transition">
              CÓMO LLEGAR
            </button>
          </a>
        </section>

        <div className="relative bg-white">
          <img
            src={decoracionImagenes}
            alt="Decoración lateral"
            className="hidden md:block absolute left-5 top-1/2 transform -translate-y-1/2 pointer-events-none"
            style={{
              width: "10rem",
              transform: "translateY(-50%) scaleX(-1)",
            }}
          />
          <img
            src={decoracionImagenes}
            alt="Decoración lateral invertida"
            className="hidden md:block absolute right-5 top-1/2 transform -translate-y-1/2 pointer-events-none"
            style={{
              width: "10rem",
            }}
          />
          <section className="pb-16">
            {funcionalidades.includes("galeriaFotos") && (
              <FocusCardsDemo
                texto=""
                images={[
                  {
                    index: 1,
                    img: "https://res.cloudinary.com/dfschbyq2/image/upload/v1742399786/6_vl125s.png",
                  },
                  {
                    index: 2,
                    img: "https://res.cloudinary.com/dfschbyq2/image/upload/v1742399786/8_qpejjc.png",
                  },
                  {
                    index: 3,
                    img: "https://res.cloudinary.com/dfschbyq2/image/upload/v1742399786/7_kce39x.png",
                  },
                  {
                    index: 4,
                    img: "https://res.cloudinary.com/dfschbyq2/image/upload/v1742399786/4_kpl0nm.png",
                  },
                  {
                    index: 5,
                    img: "https://res.cloudinary.com/dfschbyq2/image/upload/v1742399786/5_ekv7zt.png",
                  },
                  {
                    index: 6,
                    img: "https://res.cloudinary.com/dfschbyq2/image/upload/v1742399787/2_ojqth3.png",
                  },
                  {
                    index: 7,
                    img: "https://res.cloudinary.com/dfschbyq2/image/upload/v1742399788/3_rur5ok.png",
                  },
                  {
                    index: 8,
                    img: "https://res.cloudinary.com/dfschbyq2/image/upload/v1742399798/DESARROLLO_WEB_1200_x_1200_px_2_blvzie.png",
                  },
                  {
                    index: 9,
                    img: "https://res.cloudinary.com/dfschbyq2/image/upload/v1742399968/DESARROLLO_WEB_1200_x_1200_px_3_vts8oo.jpg",
                  },
                ]}
              />
            )}
          </section>
        </div>

        <div className="bg-white border-b border-pink-100">
          <InstagramWall
            userClass="text-gray-600"
            logoClass="text-pink-300"
            user="@julieta"
          />
        </div>

        <div className="bg-pink-200 text-center relative text-gray-600">
          <GoogleCalendarButton
            imgClass="text-pink-300"
            buttonClass="rounded-full hover:shadow-lg border-pink-300 bg-gray-100 text-gray-900"
            titleCalendar="XV de Victoria"
            salon="Nombre Salón"
            fechaComienzo="20250406T130000"
            fechaFin="20250407T000000"
          />
        </div>

        <div className="relative bg-white py-10">
          <DressCodeEsmeralda dressCode="Formal" icon={dressCodeAurora}/>
        </div>

        <DatosBancarios
          claseIcon="text-pink-600"
          texto="Si deseas hacerme un regalo, te dejo los datos"
          claseContenedor="bg-pink-100 text-gray-600"
          claseBoton="rounded-full hover:shadow-lg border-pink-300 bg-gray-100 text-gray-900"
          textSize="text-lg"
          cbu="284529529245"
          alias="mario.mp"
          banco="Nombre Banco"
          nombre="Mario Lopez (padre)"
          claseBotonModal="bg-pink-200 border-pink-200"
          claseModal="bg-pink-200"
          borderModal="border-pink-200"
          textColor="text-pink-300"
        />

        <Asistencia
          clase="py-10 bg-white bg-fixed border-b-4 border-pink-100"
          claseTitle="text-pink-300"
          claseButton="border-2 border-pink-200 font-semibold text-gray-700 rounded-full"
          linkAsistencia="https://docs.google.com/forms/d/e/1FAIpQLSeK0vUpx6zegOhIcQr2rRVADqcpoDD4cDYyRSEOkyALbf-Spg/viewform?usp=dialog"
        />

        <div className="font-eleganteTitle text-4xl bg-white">
          <TextoFinal textoFinal="¡Gracias por venir!" />
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default AuroraPreview;
