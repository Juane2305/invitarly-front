import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

import cancion from '../assets/song.mp3'
import Countdown from "./Countdown";
import Lugares from "./Lugares";
import { FocusCardsDemo } from "./FocusCardsDemo";
import InstagramWall from "./InstagramWall";
import GoogleCalendarButton from "./GoogleCalendarButton";
import DressCode from "./DressCode";
import DatosBancarios from "./DatosBancarios";
import Asistencia from "./Asistencia";
import Footer from "./Footer";
import TextoFinal from "./TextoFinal";
import Loader from "./Loader";
import MusicScreen from "./MusicScreen";

const RomaPreview = () => {
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
    navigate(`/confirmacion-pago/${nombrePlan}/roma`);
  };

  const handleVolver = () => {
    navigate(`/plantillas/${nombrePlan}`);
  };

  return (
    <div className="w-full relative font-modernaText overflow-hidden">
      {/* Botón para seleccionar plantilla */}
      <button
        onClick={handleSeleccionarPlantilla}
        className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg hover:bg-green-600 transition z-50"
      >
        Seleccionar esta plantilla
      </button>

      {/* Botón para volver */}
      <button
        onClick={handleVolver}
        className="fixed top-4 left-4 bg-blue-500 text-white px-4 py-2 rounded shadow-lg hover:bg-blue-600 transition z-50"
      >
        Volver
      </button>

      {/* Música */}
      {funcionalidades.includes("musica") && (
        <div className="absolute">
          <MusicScreen cancion={cancion}/>
        </div>
      )}

      {/* Fondo y contenido principal */}
      <div className="relative flex flex-col items-center justify-center h-screen w-full text-center bg-fondo-moderna bg-cover bg-no-repeat ">
      <div
          className="absolute text-gray-500 font-eleganteTitle text-[10rem] md:text-[17rem]"
          style={{
            opacity: 0.1,
            transform: "translateY(-50%)",
            top: "50%",
          }}
        >
          F M
        </div>

        {/* Texto superior */}
        <p className="z-10 text-xl uppercase font-vintageText tracking-widest mb-20">
          ¡Nos Casamos!
        </p>

        {/* Nombres completos */}
        <h1 className="z-10 text-5xl md:text-7xl font-vintageText text-gray-800 italic">
          Francisco & María
        </h1>

        {/* Fecha */}
        <p className="z-10 mt-28 text-xl font-vintageText">0 6 . 0 4 . 2 0 2 5</p>
        </div>
  
      {/* Plantilla dinámica */}
      <div>
        {/* Contador */}
        {funcionalidades.includes("cuentaRegresiva") && (
          <section
            id="contador"
            className="bg-beige w-full flex flex-col items-center justify-center gap-y-5 py-10 font-thin"
          >
            <Countdown
              containerClasses={
                "w-full flex flex-col justify-center items-center gap-y-5"
              }
              targetDate={targetDate}
            />
          </section>
        )}
        <section id="lugares" className="relative text-center">
          <Lugares iglesia="[Nombre iglesia]" hora_iglesia="10:00hs" salon="[Nombre salon]" hora_civil="13:00hs"/>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            
          >
            <button className="border-2 border-gray-700 my-5 py-3 px-8 rounded-full text-gray-800 font-semibold hover:text-gray-600 transition">
              CÓMO LLEGAR
            </button>
          </a>
        </section>
        <section className="mb-16">
          {funcionalidades.includes("galeriaFotos") && (
            <FocusCardsDemo
            texto="Nosotros"
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
          )}
        </section>
        {funcionalidades.includes("instagramWall") && <InstagramWall user="@fran_y_mari"/>}
        {funcionalidades.includes("calendario") && (
          <div className="bg-principal-light text-center text-white relative">
            <GoogleCalendarButton
              titleCalendar="Casamiento de Francisco y María"
              fechaComienzo="20250406T130000"
              fechaFin="20250407T000000"
              salon="Nombre del Salón"
              imgClass="text-white"
              buttonClass="hover:bg-white hover:text-gray-800"
            />
          </div>
        )}
        {funcionalidades.includes("dressCode") && (
          <div className="relative">
            <DressCode dress_code="Formal"/>
          </div>
        )}
        {funcionalidades.includes("datosBancarios") && (
          <DatosBancarios
            texto="Si deseás hacernos un regalo te dejamos nuestros datos"
            claseContenedor="bg-principal-light text-white"
            claseBoton="border-2 py-3 px-6 rounded-full hover:bg-white hover:text-gray-800 transform transition-transform duration-300 ease-in-out font-semibold"
            textSize="text-lg"
            cbu="284529529245"
            alias="francisco.mp"
            banco="Nombre Banco"
            nombre="Francisco Lopez"
            claseBotonModal="bg-principal-light border-principal-light"
            claseModal="bg-principal-light"
            borderModal="border-principal-light"
            textColor="text-principal-light"
          />
        )}
        {funcionalidades.includes("confirmacionAsistencia") && (
          <Asistencia
            clase="py-10 bg-fondo-banner"
            claseButton="border-2 py-3 px-6 rounded-full border-gray-800 font-semibold hover:border-gray-700 hover:bg-white hover:text-gray:800"
            linkAsistencia="https://docs.google.com/forms/d/e/1FAIpQLSeK0vUpx6zegOhIcQr2rRVADqcpoDD4cDYyRSEOkyALbf-Spg/viewform?usp=dialog"
          />
        )}
        <TextoFinal textoFinal="¡Gracias por venir!"/>
        <Footer />
      </div>
    </div>
  );
};

export default RomaPreview;
