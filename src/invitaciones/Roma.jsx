import { useEffect, useState } from "react";
import axios from "axios";

import PropTypes from "prop-types";

import Countdown from "../components/Countdown";
import Lugares from "../components/Lugares";
import InstagramWall from "../components/InstagramWall";
import GoogleCalendarButton from "../components/GoogleCalendarButton";
import DressCode from "../components/DressCode";
import DatosBancarios from "../components/DatosBancarios";
import Asistencia from "../components/Asistencia";
import Footer from "../components/Footer";
import TextoFinal from "../components/TextoFinal";
import Loader from "../components/Loader";
import MusicScreen from "../components/MusicScreen";
import { GalleryPraga } from "../components/GalleryPraga";


const Roma = ({ invitacionData }) => {
  const [funcionalidades, setFuncionalidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const nombrePlan = invitacionData.plan;
  const [images, setImages] = useState([]);

  const targetDate = new Date(invitacionData.fecha_cuenta_regresiva);

  useEffect(() => {
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
          `${import.meta.env.VITE_API_URL}/api/planes/${nombrePlan}/funcionalidades`
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

  const nombres = invitacionData.novios
    .replace("&", "y") 
    .split("y")
    .map((s) => s.trim()); 


  const iniciales = nombres
    .map((nombre) => nombre[0]?.toUpperCase() || "")
    .join(" ");

  return (
    <div className="w-full relative font-modernaText overflow-hidden">
      {funcionalidades.includes("musica") && (
        <div className="absolute">
          <MusicScreen cancion={invitacionData.cancion} />
        </div>
      )}

      <div className="relative flex flex-col items-center justify-center h-screen w-full text-center bg-fondo-moderna bg-cover bg-no-repeat ">
        <div
          className="absolute text-gray-500 font-eleganteTitle text-[10rem] md:text-[17rem]"
          style={{
            opacity: 0.1,
            transform: "translateY(-50%)",
            top: "50%",
          }}
        >
          {iniciales}
        </div>

        <p className="z-10 text-lg uppercase font-vintageText tracking-widest mb-20">
          ¡Nos Casamos!
        </p>

        <h1 className="z-10 text-5xl md:text-7xl font-vintageText text-gray-800 italic">
          {invitacionData.novios}
        </h1>

        <p className="z-10 mt-28 font-vintageText text-xl">{invitacionData.fecha_evento}</p>
      </div>

      <div>
        {funcionalidades.includes("cuentaRegresiva") && (
          <section
            id="contador"
            className="bg-beige w-full flex flex-col items-center justify-center gap-y-5 py-10 font-thin"
          >
            <Countdown
              targetDate={targetDate}
              containerClasses={
                "w-full flex flex-col justify-center items-center gap-y-5"
              }
            />
          </section>
        )}
        <section id="lugares" className="relative text-center">
          <Lugares
            iglesia={invitacionData.nombre_iglesia}
            hora_iglesia={invitacionData.hora_ceremonia_religiosa}
            salon={invitacionData.nombre_salon}
            hora_civil={invitacionData.hora_civil}
            hora_fiesta={invitacionData.hora_evento}
          />
          <div className="flex justify-center items-center mt-10">
            <a
              href={invitacionData.linkCeremonia}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="border-2 border-gray-600 py-3 px-8 rounded-full bg-white text-gray-700 font-bold hover:bg-transparent  transition">
                Ubicación Ceremonia
              </button>
            </a>
          </div>
          <div className="flex justify-center items-center mt-5">
            <a
              href={invitacionData.linkFiesta}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="border-2 border-gray-600 py-3 px-8 rounded-full bg-white text-gray-700 font-bold hover:bg-transparent  transition">
                Ubicación Civil y Fiesta
              </button>
            </a>
          </div>
        </section>
        {funcionalidades.includes("galeriaFotos") && (
          <GalleryPraga images={images} texto="Nosotros"/>
        )}
        {funcionalidades.includes("instagramWall") && (
          <InstagramWall user={invitacionData.ig_user} />
        )}
        {funcionalidades.includes("calendario") && (
          <div className="bg-principal-light text-center text-white relative">
            <GoogleCalendarButton
              imgClass="text-white"
              buttonClass="hover:bg-white hover:text-gray-800"
              titleCalendar={`Casamiento de ${invitacionData.novios}`}
              salon={invitacionData.nombre_salon}
              fechaComienzo={invitacionData.fecha_comienzo_calendario}
              fechaFin={invitacionData.fecha_fin_calendario}
            />
          </div>
        )}
        {funcionalidades.includes("dressCode") && (
          <div className="relative">
            <DressCode dress_code={invitacionData.dressCode} />
          </div>
        )}
        {funcionalidades.includes("datosBancarios") && (
          <DatosBancarios
            texto="¡El mejor regalo es que nos acompañen en este día! Pero si nos quieren ayudar con nuestra luna de miel pueden hacerlo acá"
            cbu={invitacionData.cbu}
            alias={invitacionData.alias}
            banco={invitacionData.banco}
            nombre={invitacionData.nombre_completo}
            claseContenedor="bg-principal-light text-white"
            claseBoton="border-2 py-3 px-6 rounded-full hover:bg-white hover:text-gray-800 transform transition-transform duration-300 ease-in-out font-semibold"
            textSize="text-lg"
            claseBotonModal="bg-principal-light border-principal-light"
            claseModal="bg-principal-light"
            borderModal="border-principal-light"
            textColor="text-principal-light"
            moneda_extranjera={invitacionData.moneda_extranjera}
            tipo_cuenta={invitacionData.tipo_cuenta}
            numero_cuenta={invitacionData.numero_cuenta}
            titular_extranjera={invitacionData.titular_extranjera}
            banco_extranjera={invitacionData.banco_extranjera}
          />
        )}
        {funcionalidades.includes("confirmacionAsistencia") && (
          <Asistencia
            linkAsistencia={invitacionData.link_asistencia}
            clase="py-10 bg-fondo-banner"
            claseButton="border-2 py-3 px-6 rounded-full border-gray-800 font-semibold hover:border-gray-700 hover:bg-white hover:text-gray:800"
          />
        )}
        <TextoFinal textoFinal={invitacionData.mensaje_personalizado} />
        <Footer />
      </div>
    </div>
  );
};

Roma.propTypes = {
  invitacionData: PropTypes.shape({
    plan:                      PropTypes.string.isRequired,
    fecha_cuenta_regresiva:    PropTypes.string.isRequired,
    imagenes:                  PropTypes.string.isRequired,
    novios:                    PropTypes.string.isRequired,
    fecha_evento:              PropTypes.string.isRequired,

    nombre_iglesia:            PropTypes.string,
    hora_ceremonia_religiosa:  PropTypes.string,
    nombre_salon:              PropTypes.string,
    hora_civil:                PropTypes.string,
    hora_evento:               PropTypes.string,
    linkCeremonia:             PropTypes.string,
    linkFiesta:                PropTypes.string,

    ig_user:                   PropTypes.string,

 
    fecha_comienzo_calendario: PropTypes.string,
    fecha_fin_calendario:      PropTypes.string,

  
    dressCode:                 PropTypes.string,

    cbu:                       PropTypes.string,
    alias:                     PropTypes.string,
    banco:                     PropTypes.string,
    nombre_completo:           PropTypes.string,

    link_asistencia:           PropTypes.string,

    cancion:                   PropTypes.string,

    mensaje_personalizado:     PropTypes.string,
  }).isRequired,
};

export default Roma;
