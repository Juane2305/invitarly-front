import { useEffect, useState } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import PropTypes from "prop-types";


import dressCodeAurora from '../assets/aurora/dressCodeAurora.svg'
import decoracionImagenes from '../assets/aurora/decoracionImagenes.svg'
import decoracionNombre from "../assets/aurora/decoracionNombre.svg";
import InstagramWall from "../components/InstagramWall";
import GoogleCalendarButton from "../components/GoogleCalendarButton";
import DatosBancarios from "../components/DatosBancarios";
import Asistencia from "../components/Asistencia";
import Footer from "../components/Footer";
import TextoFinal from "../components/TextoFinal";
import LugaresXV from "../components/LugaresXV";
import Loader from "../components/Loader";
import { FocusCardsDemo } from "../components/FocusCardsDemo";

import DressCodeEsmeralda from "../components/DressCodeEsmeralda";
import PastelCountdown from "../components/PastelCountdown";
import MusicScreen from "../components/MusicScreen";

const Aurora = ({invitacionData}) => {
  const [funcionalidades, setFuncionalidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const nombrePlan = invitacionData.plan;
  const [images, setImages] = useState([]);

  const targetDate = new Date(invitacionData.fecha_cuenta_regresiva);

  useEffect(() => {
    AOS.init({
      duration: 3000,
      easing: "ease-in-out",
      once: true,
    });
    window.scrollTo(0, 0);
    const parsedImages = JSON.parse(invitacionData.imagenes);
    setImages(parsedImages);
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


  return (
    <div className="w-full font-eleganteText relative overflow-hidden bg-[#f8f5f0]">
      {funcionalidades.includes("musica") && (
        <div className="absolute z-40">
          <MusicScreen cancion={invitacionData.cancion} />
        </div>
      )}

      <div className={`relative flex flex-col justify-center items-center min-h-screen w-full text-center bg-center bg-cover font-eleganteText space-y-5 overflow-hidden`}
        style={{
          backgroundImage: `url(${
            window.innerWidth < 768
              ? invitacionData.fondoMobile
              : invitacionData.fondo
          })`,
        }}
      >
        <div data-aos="fade-in">
          <div className="relative z-10 flex flex-col items-center text-center text-white pt-96">
            <div className="flex items-center justify-center mb-2">
              <img
                src={decoracionNombre}
                alt="Decoración invertida"
                className="w-[10rem] h-auto mr-3"
              />
                <div className="flex flex-col items-center">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-wide">
                        {invitacionData.nombreQuinceanera}
                    </h1>
                    <p className="text-xl md:text-2xl font-light tracking-wider">
                    MIS QUINCE AÑOS
                    </p>
                </div>
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
          <p className="text-xl tracking-wider font-light py-5">{invitacionData.fecha_tokyo}</p>
          <PastelCountdown targetDate={targetDate} bgColor="bg-pink-100"/>
        </section>

        <section id="lugares" className="relative text-center bg-gradient-to-b from-white to-pink-50 border-b-4 border-pink-100 py-10">
          <LugaresXV
            salon={invitacionData.nombre_salon}
            hora_inicio={invitacionData.hora_evento}
            hora_fin={invitacionData.hora_fin_evento}
          />
          <a href={invitacionData.linkFiesta} target="_blank" rel="noopener noreferrer">
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
                images={images}
              />
            )}
          </section>
        </div>

        <div className="bg-white border-b border-pink-100">
          <InstagramWall
            userClass="text-gray-600"
            logoClass="text-pink-300"
            user={invitacionData.ig_user}          
            />
        </div>

        <div className="bg-white text-center relative text-gray-600">
          <GoogleCalendarButton
            imgClass="text-pink-300"
            buttonClass="border-pink-200 rounded-full"
            titleCalendar={`XV de ${invitacionData.nombreQuinceanera}`}
            salon={invitacionData.nombre_salon}
            fechaComienzo={invitacionData.fecha_comienzo_calendario}
            fechaFin={invitacionData.fecha_fin_calendario}
          />
        </div>

        <div className="relative bg-white py-10">
          <DressCodeEsmeralda dressCode={invitacionData.dressCode} icon={dressCodeAurora}/>
        </div>

        <DatosBancarios
          claseIcon="text-pink-600"
          texto="Si deseas hacerme un regalo, te dejo los datos"
          claseContenedor="bg-pink-100 text-gray-600"
          claseBoton="rounded-full hover:shadow-lg border-pink-300 bg-gray-100 text-gray-900"
          textSize="text-lg"
          cbu={invitacionData.cbu}
          alias={invitacionData.alias}
          banco={invitacionData.banco}
          nombre={invitacionData.nombre_completo}
          claseBotonModal="bg-[#4b5147] border-[#4b5147]"
          claseModal="bg-[#4b5147]"
          borderModal="border-[#4b5147]"
          textColor="text-[#4b5147]"
        />

        <Asistencia
          clase="py-10 bg-white bg-fixed border-b-4 border-pink-100"
          claseTitle="text-pink-300"
          claseButton="border-2 border-pink-200 font-semibold text-gray-700 rounded-full"
          linkAsistencia={invitacionData.link_asistencia}
          />

        <div className="font-eleganteTitle text-4xl bg-white">
          <TextoFinal textoFinal={invitacionData.mensaje_personalizado} />
        </div>

        <Footer />
      </div>
    </div>
  );
};


Aurora.propTypes = {
  invitacionData: PropTypes.shape({

    plan:                     PropTypes.string.isRequired,
    fecha_cuenta_regresiva:   PropTypes.string.isRequired,
    imagenes:                 PropTypes.string.isRequired,
    cancion:                  PropTypes.string,
    fondoMobile:              PropTypes.string,
    fondo:                    PropTypes.string,


    nombreQuinceanera:        PropTypes.string.isRequired,


    fecha_tokyo:              PropTypes.string,          // texto que se muestra arriba del contador


    nombre_salon:             PropTypes.string,
    hora_evento:              PropTypes.string,
    hora_fin_evento:          PropTypes.string,
    linkFiesta:               PropTypes.string,

    ig_user:                  PropTypes.string,


    fecha_comienzo_calendario: PropTypes.string,
    fecha_fin_calendario:      PropTypes.string,


    dressCode:                PropTypes.string,


    cbu:                      PropTypes.string,
    alias:                    PropTypes.string,
    banco:                    PropTypes.string,
    nombre_completo:          PropTypes.string,


    link_asistencia:          PropTypes.string,


    mensaje_personalizado:    PropTypes.string,
  }).isRequired,
};

export default Aurora;
