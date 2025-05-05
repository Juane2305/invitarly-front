import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";


import CountdownCircles from "../components/CountdownCircles";
import InstagramWall from "../components/InstagramWall";
import GoogleCalendarButton from "../components/GoogleCalendarButton";
import DatosBancarios from "../components/DatosBancarios";
import Asistencia from "../components/Asistencia";
import Footer from "../components/Footer";
import TextoFinal from "../components/TextoFinal";
import LugaresLineal from "../components/LugaresLineal";
import Loader from "../components/Loader";
import GalleryElegante from "../components/GalleryElegante";
import DressCodeVerona from "../components/dressCodeVerona";

import hojasDecoracionIzq from "../assets/verona/hojasDecoracionIzq.svg";
import hojasDecoracionDer from "../assets/verona/hojasDecoracionDer.svg";
import decoracionBajoNombres from "../assets/verona/decoracionBajoNombres.svg";
import decoracionImagenes from "../assets/verona/decoracionImagenes.svg";
import decoracionDressCode from "../assets/verona/decoracionDressCode.svg";
import MusicScreen from "../components/MusicScreen";


const Verona = ({invitacionData}) => {
  const [funcionalidades, setFuncionalidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);

  const nombrePlan  = invitacionData.plan;

  
  

  const targetDate = new Date(invitacionData.fecha_cuenta_regresiva);

  const colorPrincipal = "#69795d";
  const colorSecundario = "#69795d";

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


  return (
    <div className="w-full font-eleganteText relative overflow-hidden bg-[#f8f5f0]">
      {funcionalidades.includes("musica") && (
        <div className="absolute z-40">
          <MusicScreen cancion={invitacionData.cancion}/>
        </div>
      )}

      <div className="relative flex flex-col justify-center items-center min-h-screen w-full text-center bg-fondo-verona bg-center bg-cover font-eleganteText space-y-5 overflow-hidden">
        <img
          src={hojasDecoracionIzq}
          alt="Decoración Izquierda"
          className="
            absolute 
            top-0 
            -left-28
            pointer-events-none 
            w-[29rem]  
            md:w-[34rem]       
            lg:w-[52rem] 
            lg:-left-60  
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
            -right-28
            pointer-events-none 
            w-[29rem] 
            md:w-[34rem]
            lg:w-[52rem]
            lg:-right-60
            transition-all
            duration-300
          "
        />

        <h1 className="text-6xl md:text-8xl font-brushNames text-[#4b5147] z-10 italic">
          {invitacionData.novios}
        </h1>

        <img
          src={decoracionBajoNombres}
          alt="Decoración bajo nombres"
          className="w-48 sm:w-72 md:w-[21rem] h-auto"
        />

        <div className="flex items-center justify-center py-2 px-4 bg-[#c8d4c1] mt-2">
          <p className="font-bold text-[#4b5147] text-lg">{invitacionData.fecha_evento}</p>
        </div>
      </div>

      <div>
        {funcionalidades.includes("cuentaRegresiva") && (
          <section
            id="contador"
            className="bg-white py-10 border-y-4 border-[#9eba8a]"
          >
            <CountdownCircles
              targetDate={targetDate}
              containerClasses="my-8"
              backgroundColor="#e5e7eb"
              progressColor="#9eba8a"
              textColor="black"
              valueClassName="text-3xl font-light"
              labelClassName="text-base font-thin"
            />
          </section>
        )}

        <div className="bg-[#69795d]">
          <div data-aos="fade-up">
            <LugaresLineal
              iglesia= {invitacionData.nombre_iglesia}
              hora_iglesia = {invitacionData.hora_ceremonia_religiosa}
              salon= {invitacionData.nombre_salon}
              hora_civil= {invitacionData.hora_civil}
              hora_fiesta= {invitacionData.hora_evento}
              link_ceremonia = {invitacionData.linkCeremonia}
              link_fiesta = {invitacionData.linkFiesta}
              borderColor="border-[#a2b891]"
              buttonStyle="border-[#a2b891] text-lg"
            />
          </div>
        </div>

        {funcionalidades.includes("galeriaFotos") && (
          <div className="relative py-10 border-b-4 border-[#9eba8a] bg-white">
            <img
              src={decoracionImagenes}
              alt="Decoración lateral"
              className="hidden md:block absolute -left-36 top-1/2 transform -translate-y-1/2 pointer-events-none"
              style={{
                width: "30rem",
                transform: "translateY(-50%) scaleX(-1)",
              }}
            />
            <img
              src={decoracionImagenes}
              alt="Decoración lateral invertida"
              className="hidden md:block absolute -right-36 top-1/2 transform -translate-y-1/2 pointer-events-none"
              style={{ width: "30rem" }}
            />
            <GalleryElegante textStyle="text-[#4b5147]" buttonStyle="bg-[#9eba8a]" images= {images}/>
          </div>
        )}

        {funcionalidades.includes("instagramWall") && (
          <div className="bg-white border border-b-4 border-[#9eba8a]">
            <InstagramWall
              user={invitacionData.ig_user}
              userClass="text-[#4b5147]"
              logoClass="text-[#9eba8a]"
            />
          </div>
        )}

        {funcionalidades.includes("calendario") && (
          <div className="bg-[#69795d] text-center relative text-white">
            <GoogleCalendarButton
              imgClass="text-[#9eba8a]"
              buttonClass="border-[#9eba8a] rounded-full"
              titleCalendar={`Casamiento de ${invitacionData.novios}`}
              salon={invitacionData.nombre_salon}
              fechaComienzo={invitacionData.fecha_comienzo_calendario}
              fechaFin={invitacionData.fecha_fin_calendario}
            />
          </div>
        )}

        {funcionalidades.includes("dressCode") && (
          <div className="relative bg-white py-10">
            <img
              src={decoracionDressCode}
              alt="Decoración DressCode Izq"
              className="hidden md:block absolute -left-20 top-1/2 transform -translate-y-1/2 pointer-events-none"
              style={{
                width: "20rem",
                transform: "translateY(-50%)",
              }}
            />
            <img
              src={decoracionDressCode}
              alt="Decoración DressCode Der"
              className="hidden md:block absolute -right-20 top-1/2 transform -translate-y-1/2 pointer-events-none"
              style={{
                width: "20rem",
                transform: "translateY(-50%) scaleX(-1)",
              }}
            />

            <DressCodeVerona dressCode={invitacionData.dressCode}/>
          </div>
        )}

        {funcionalidades.includes("datosBancarios") && (
          <DatosBancarios
            texto="Si deseás hacernos un regalo te dejamos nuestros datos"
            cbu={invitacionData.cbu}
            alias={invitacionData.alias}
            banco={invitacionData.banco}
            nombre={invitacionData.nombre_completo}
            claseIcon="text-white"
            claseContenedor="bg-[#69795d] text-white"
            claseBoton="rounded-full hover:shadow-lg border-[#a2b891] bg-gray-100 text-gray-900"
            textSize="text-lg"
            background={{ backgroundColor: colorPrincipal }}
            styleBotonModal={{
              backgroundColor: "white",
              borderColor: "#9eba8a",
            }}
            claseBotonModal={{
              backgroundColor: "#9eba8a",
              borderColor: "#9eba8a",
            }}
            styleModal={{ backgroundColor: colorSecundario }}
            styleBorderModal={{ borderColor: colorPrincipal }}
            styleTextColor={{ color: colorPrincipal }}
            claseModal="bg-[#9eba8a]"
            borderModal="border-[#9eba8a]"
            textColor="text-[#9eba8a]"
          />
        )}

        {funcionalidades.includes("confirmacionAsistencia") && (
          <Asistencia
            linkAsistencia={invitacionData.link_asistencia}
            clase="py-10 bg-white bg-fixed border-b-4 border-[#9eba8a]"
            claseTitle="text-[#9eba8a]"
            claseButton="border-2 border-[#9eba8a] font-semibold hover:bg-[#9eba8a]  text-gray-700 hover:text-white rounded-full"
          />
        )}

        <div className="font-eleganteTitle text-4xl bg-white">
          <TextoFinal textoFinal={invitacionData.mensaje_personalizado}/>
        </div>

        <Footer />
      </div>
    </div>
  );
};

Verona.propTypes = {
  invitacionData: PropTypes.shape({
    plan: PropTypes.string.isRequired,
    fecha_cuenta_regresiva: PropTypes.string.isRequired,
    imagenes: PropTypes.string.isRequired,
    cancion: PropTypes.string,
    novios: PropTypes.string.isRequired,
    fecha_evento: PropTypes.string.isRequired,
    nombre_iglesia: PropTypes.string,
    hora_ceremonia_religiosa: PropTypes.string,
    nombre_salon: PropTypes.string,
    hora_civil: PropTypes.string,
    hora_evento: PropTypes.string,
    linkCeremonia: PropTypes.string,
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


export default Verona;