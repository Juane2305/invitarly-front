import { useEffect, useState } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";

import decoracion from '../assets/rayitodeluz/decoracionCostados.svg'
import imagenesDeco from "../assets/rayitodeluz/decoracionImagenes.svg";

import hojasDecoracionIzq from "../assets/rayitodeluz/hojasDecoracionIzq.svg";
import hojasDecoracionDer from "../assets/rayitodeluz/hojasDecoracionDer.svg";
import Countdown from "../components/Countdown";
import MusicScreen from "../components/MusicScreen";
import GoogleCalendarButton from "../components/GoogleCalendarButton";
import Asistencia from "../components/Asistencia";
import Footer from "../components/Footer";
import TextoFinal from "../components/TextoFinal";
import Loader from "../components/Loader";
import { FocusCardsDemo } from "../components/FocusCardsDemo";
import CeremoniaBautismo from "../components/CeremoniaBautismo";
import PadresPadrinos from "../components/PadresPadrinos";

const RayitoDeLuz = ({invitacionData}) => {
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
    <div className="w-full font-eleganteText relative overflow-hidden">
        <div className="absolute z-40">
        <MusicScreen cancion={invitacionData.cancion}/>
        </div>
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
                {invitacionData.nombreBebe}
            </h2>
          </div>
          <img
            src="https://res.cloudinary.com/dfschbyq2/image/upload/v1742503045/Copia_de_Beige_Simple_Abstract_Aesthetic_Desktop_Wallpaper_1200_x_1200_px_kxmkn0.jpg"
            alt=""
            className="w-[15rem] h-[15rem] md:w-[25rem] md:h-[25rem] rounded-[50%] border-[15px] my-5 border-white"
          />

          <div className="flex items-center justify-center py-2 px-4">
            <p className="font-bold text-gray-900 text-xl md:text-2xl tracking-widest">
                {invitacionData.fecha_evento}
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
        padres={invitacionData.nombrePadres}
        padrinos={invitacionData.padrinos}
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
            iglesia={invitacionData.nombre_iglesia}
            hora_iglesia={invitacionData.hora_iglesia}
          color="gray-900"
        />
        <a href={invitacionData.linkCeremonia} target="_blank" rel="noopener noreferrer">
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
              images={images}
            />
          )}
        </section>
      </div>
      <div className="bg-white text-center relative text-gray-900">
        <GoogleCalendarButton
          imgClass="text-pink-300"
          buttonClass="border-[#4b5147] rounded-full"
          titleCalendar={`Bautismo de ${invitacionData.nombreBebe}`}
          salon={invitacionData.nombre_iglesia}
          fechaComienzo={invitacionData.fecha_comienzo_calendario}
          fechaFin={invitacionData.fecha_fin_calendario}
        />
      </div>
      <section className="flex flex-col justify-center items-center bg-white pt-20">
        <img
          src="https://res.cloudinary.com/dfschbyq2/image/upload/v1742425600/Disen%CC%83o_sin_ti%CC%81tulo_6_ldxbud.png"
          alt=""
          className="w-32 h-32"
          data-aos="fade-up"
        />
        <Asistencia
          clase="w-full pb-10 bg-white bg-fixed border-b-2 border-pink-300"
          claseTitle="text-gray-900"
          claseButton="border-2 border-gray-900 font-semibold hover:bg-[#4b5147] text-gray-900 hover:text-white rounded-full"
          linkAsistencia={invitacionData.link_asistencia}
        />
      </section>
      <div className="font-eleganteTitle text-4xl bg-white">
        <TextoFinal textoFinal={invitacionData.mensaje_personalizado} />
      </div>
      <Footer />
    </div>
  );
};

export default RayitoDeLuz;
