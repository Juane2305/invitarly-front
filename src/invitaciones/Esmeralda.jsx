import { useEffect, useState } from "react";
import axios from "axios";
import AOS from 'aos';
import 'aos/dist/aos.css';
import PropTypes from "prop-types";


import dress from '../assets/esmeralda/dressCodeIcon.svg'
import CountdownCircles from "../components/CountdownCircles";
import InstagramWall from "../components/InstagramWall";
import GoogleCalendarButton from "../components/GoogleCalendarButton";
import DatosBancarios from "../components/DatosBancarios";
import Asistencia from "../components/Asistencia";
import Footer from "../components/Footer";
import TextoFinal from "../components/TextoFinal";
import LugaresXV from "../components/LugaresXV";
import Loader from "../components/Loader";
import { FocusCardsDemo } from "../components/FocusCardsDemo";
import decoracionImagenes from "../assets/esmeralda/decoracionImagenes.svg";
import decoracionDressCode from "../assets/esmeralda/decoracionDressCode.svg";

import DressCodeEsmeralda from "../components/DressCodeEsmeralda";
import MusicScreen from "../components/MusicScreen";

const Esmeralda = ({invitacionData}) => {
  const [funcionalidades, setFuncionalidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const nombrePlan = invitacionData.plan;
  const [images, setImages] = useState([]);


  const targetDate = new Date(invitacionData.fecha_cuenta_regresiva);

  useEffect(() => {
    AOS.init({
        duration: 3000, 
        easing: 'ease-in-out',
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
        <div className="absolute z-40">
          <MusicScreen cancion={invitacionData.cancion} />
        </div>

      <div className="relative flex flex-col justify-center items-center min-h-screen w-full text-center bg-fondo-esmeralda bg-center bg-cover font-eleganteText space-y-5 overflow-hidden" >
        <div data-aos="fade-in">
            <p className="text-2xl mb-5 tracking-widest">Te invito a mis 15</p>
            <h1 className="text-7xl md:text-[10rem] font-brushNames text-[#4b5147] z-10 italic">
            {invitacionData.nombreQuinceanera}
            </h1>

            <div className="flex items-center justify-center py-2 px-4 mt-5">
            <p className="font-bold text-[#4b5147] text-lg tracking-widest">
                {invitacionData.fecha_evento}
            </p>
            </div>
        </div>
      </div>

      <div>
          <section
            id="contador"
            className="bg-white py-10 border-y-4 border-[#8b908c]"
          >
            <CountdownCircles
              targetDate={targetDate}
              containerClasses="my-8"
              backgroundColor="#e5e7eb"
              progressColor="#8b908c"
              textColor="black"
              valueClassName="text-3xl font-light"
              labelClassName="text-base font-thin"
            />
          </section>

        <section id="lugares" className="relative text-center bg-white">
          <LugaresXV
            salon={invitacionData.nombre_salon}
            hora_inicio={invitacionData.hora_evento}
            hora_fin={invitacionData.hora_fin_evento}
          />
          <a href={invitacionData.linkFiesta} target="_blank" rel="noopener noreferrer">
            <button className="border-2 border-gray-700 my-5 py-3 px-8 rounded-full text-gray-800 font-semibold hover:text-gray-600 transition">
              CÓMO LLEGAR
            </button>
          </a>
        </section>

          <div className="relative bg-white">
            <img
              src={decoracionImagenes}
              alt="Decoración lateral"
              className="hidden md:block absolute -left-44 top-1/2 transform -translate-y-1/2 pointer-events-none"
              style={{
                width: "30rem",
                transform: "translateY(-50%) scaleX(-1)",

              }}
            />
            <img
              src={decoracionImagenes}
              alt="Decoración lateral invertida"
              className="hidden md:block absolute -right-44 top-1/2 transform -translate-y-1/2 pointer-events-none"
              style={{
                 width: "30rem" ,
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

          <div className="bg-white border-b border-[#4b5147]">
            <InstagramWall
              userClass="text-[#4b5147]"
              logoClass="text-[#4b5147]"
              user={invitacionData.ig_user}
            />
          </div>

          <div className="bg-white text-center relative text-[#4b5147]">
            <GoogleCalendarButton
              imgClass="text-[#4b5147]"
              buttonClass="border-[#4b5147] rounded-full"
              titleCalendar={`XV de ${invitacionData.nombreQuinceanera}`}
              salon={invitacionData.nombre_salon}
              fechaComienzo={invitacionData.fecha_comienzo_calendario}
              fechaFin={invitacionData.fecha_fin_calendario}
            />
          </div>

          <div className="relative bg-white py-10">
            <img
              src={decoracionDressCode}
              alt="Decoración DressCode Izq"
              className="hidden md:block absolute -left-40 top-1/2 transform -translate-y-1/2 pointer-events-none"
              style={{
                width: "30rem",
              }}
            />
            <img
              src={decoracionDressCode}
              alt="Decoración DressCode Der"
              className="hidden md:block absolute -right-40 top-1/2 transform -translate-y-1/2 pointer-events-none"
              style={{
                width: "30rem",
                transform: "translateY(-50%) scaleX(-1)",

              }}
            />

            <DressCodeEsmeralda dressCode={invitacionData.dressCode} icon={dress}/>
          </div>

          <DatosBancarios
            claseIcon="text-white"
            texto="Si deseas hacerme un regalo, te dejo los datos"
            claseContenedor="bg-[#4b5147] text-white"
            claseBoton="rounded-full hover:shadow-lg border-white bg-gray-100 text-gray-900"
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
            clase="py-10 bg-white bg-fixed border-b-4 border-[#4b5147]"
            claseTitle="text-[#4b5147]"
            claseButton="border-2 border-[#4b5147] font-semibold hover:bg-[#4b5147]  text-gray-700 hover:text-white rounded-full"
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

Esmeralda.propTypes = {
  invitacionData: PropTypes.shape({
    plan: PropTypes.string.isRequired,
    fecha_cuenta_regresiva: PropTypes.string.isRequired,
    imagenes: PropTypes.string.isRequired,
    cancion: PropTypes.string,
    nombreQuinceanera: PropTypes.string.isRequired,
    fecha_evento: PropTypes.string.isRequired,
    nombre_salon: PropTypes.string,
    hora_evento: PropTypes.string,
    hora_fin_evento: PropTypes.string,
    linkFiesta: PropTypes.string,
    ig_user: PropTypes.string,
    fecha_comienzo_calendario: PropTypes.string,
    fecha_fin_calendario: PropTypes.string,
    dressCode: PropTypes.string,
    cbu: PropTypes.string,
    alias: PropTypes.string,
    banco: PropTypes.string,
    nombre_completo: PropTypes.string,
    link_asistencia: PropTypes.string,
    mensaje_personalizado: PropTypes.string,
  }).isRequired,
};


export default Esmeralda;
