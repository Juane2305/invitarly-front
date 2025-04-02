import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

import cancion from '../assets/song.mp3'
import CountdownCircles from "./CountdownCircles";
import InstagramWall from "./InstagramWall";
import GoogleCalendarButton from "./GoogleCalendarButton";
import DatosBancarios from "./DatosBancarios";
import Asistencia from "./Asistencia";
import Footer from "./Footer";
import TextoFinal from "./TextoFinal";
import LugaresLineal from "./LugaresLineal";
import Loader from "./Loader";
import GalleryElegante from "./GalleryElegante";

import hojasDecoracionIzq from "../assets/verona/hojasDecoracionIzq.svg";
import hojasDecoracionDer from "../assets/verona/hojasDecoracionDer.svg";
import decoracionBajoNombres from "../assets/verona/decoracionBajoNombres.svg";
import decoracionImagenes from "../assets/verona/decoracionImagenes.svg";
import decoracionDressCode from "../assets/verona/decoracionDressCode.svg";

import DressCodeVerona from "./dressCodeVerona";
import MusicScreen from "./MusicScreen";

const VeronaPreview = () => {
  const [funcionalidades, setFuncionalidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { nombrePlan } = useParams();
  const navigate = useNavigate();

  const targetDate = new Date("2025-04-06T13:00:00-03:00");

  useEffect(() => {
    window.scrollTo(0, 0);
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

  const handleSeleccionarPlantilla = () => {
    navigate(`/confirmacion-pago/${nombrePlan}/verona`);
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
          <MusicScreen cancion={cancion}/>
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
          Dani & Fer
        </h1>

        <img
          src={decoracionBajoNombres}
          alt="Decoración bajo nombres"
          className="w-48 sm:w-72 md:w-[21rem] h-auto"
        />

        <div className="flex items-center justify-center py-2 px-4 bg-[#c8d4c1] mt-2">
          <p className="font-bold text-[#4b5147] text-lg">
            0 6 . 0 4 . 2 0 2 5
          </p>
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
              borderColor="border-[#a2b891]"
              buttonStyle="border-[#a2b891] text-lg"
              iglesia="[Nombre Iglesia]" 
              hora_iglesia="10:00hs" 
              salon="[Nombre Salón]" 
              hora_civil="13:00hs" 
              hora_fiesta="15:00hs" 
              link_ceremonia="https://maps.app.goo.gl/LoyZKNsALqYQV3iB8" 
              link_fiesta="https://maps.app.goo.gl/LoyZKNsALqYQV3iB8"
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
            <GalleryElegante
              textStyle="text-[#4b5147]"
              buttonStyle="bg-[#9eba8a]"
              images={[
                {
                  index: 1,
                  img: "https://res.cloudinary.com/dfschbyq2/image/upload/v1735527048/Imagen_de_WhatsApp_2024-12-29_a_las_22.57.33_f9f5bf2b_ifsj5l.jpg",
                },
                {
                  index: 2,
                  img: "https://res.cloudinary.com/dfschbyq2/image/upload/v1735527113/Imagen_de_WhatsApp_2024-12-29_a_las_22.57.32_a25fd1b8_smbhnh.jpg",
                },
                {
                  index: 3,
                  img: "https://res.cloudinary.com/dfschbyq2/image/upload/v1735526968/Imagen_de_WhatsApp_2024-12-29_a_las_22.57.33_b8874616_i2bcnm.jpg",
                },
                {
                  index: 4,
                  img: "https://res.cloudinary.com/dfschbyq2/image/upload/v1735508433/Dise%C3%B1o_sin_t%C3%ADtulo_6_xy3ozy.png",
                },
                {
                  index: 5,
                  img: "https://res.cloudinary.com/dfschbyq2/image/upload/v1735526902/Imagen_de_WhatsApp_2024-12-29_a_las_22.57.33_3d376287_napqll.jpg",
                },
                {
                  index: 6,
                  img: "https://res.cloudinary.com/dfschbyq2/image/upload/v1735517155/8c881929-3182-4ac1-b38f-90aba216483f.png",
                },
              ]}
            />
          </div>
        )}

        {funcionalidades.includes("instagramWall") && (
          <div className="bg-white border border-b-4 border-[#9eba8a]">
            <InstagramWall
              userClass="text-[#4b5147]"
              logoClass="text-[#9eba8a]"
              user="@fran_y_mari"
            />
          </div>
        )}

        {funcionalidades.includes("calendario") && (
          <div className="bg-[#69795d] text-center relative text-white">
            <GoogleCalendarButton
              buttonClass="border-white rounded-full"
              titleCalendar= "Casamiento de Fran y Mari"
              salon="Nombre Salón"
              fechaComienzo= "20250406T130000"
              fechaFin="20250407T000000"
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

            <DressCodeVerona dressCode="Formal"/>
          </div>
        )}

        {funcionalidades.includes("datosBancarios") && (
          <DatosBancarios
            texto="Si deseás hacernos un regalo te dejamos nuestros datos"
            claseIcon="text-white"
            claseContenedor="bg-[#69795d] text-white"
            claseBoton="rounded-full hover:shadow-lg border-[#a2b891] bg-gray-100 text-gray-900"
            textSize="text-lg"
            cbu="284529529245"
            alias="francisco.mp"
            banco="Nombre Banco"
            nombre="Francisco Lopez"
            claseBotonModal="bg-[#9eba8a] border-[#9eba8a]"
            claseModal="bg-[#9eba8a]"
            borderModal="border-[#9eba8a]"
            textColor="text-[#9eba8a]"
          />
        )}

        {funcionalidades.includes("confirmacionAsistencia") && (
          <Asistencia
            clase="py-10 bg-white bg-fixed border-b-4 border-[#9eba8a]"
            claseTitle="text-[#9eba8a]"
            claseButton="border-2 border-[#9eba8a] font-semibold hover:bg-[#9eba8a]  text-gray-700 hover:text-white rounded-full"
            linkAsistencia="https://docs.google.com/forms/d/e/1FAIpQLSeK0vUpx6zegOhIcQr2rRVADqcpoDD4cDYyRSEOkyALbf-Spg/viewform?usp=dialog"
          />
        )}

        <div className="font-eleganteTitle text-4xl bg-white">
          <TextoFinal textoFinal="¡Gracias por venir!"/>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default VeronaPreview;
