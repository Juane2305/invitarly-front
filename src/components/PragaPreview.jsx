import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

import cancion from "../assets/song.mp3";
import Countdown from "./Countdown";
import InstagramWall from "./InstagramWall";
import GoogleCalendarButton from "./GoogleCalendarButton";
import DressCode from "./DressCode";
import DatosBancarios from "./DatosBancarios";
import Asistencia from "./Asistencia";
import Footer from "./Footer";
import TextoFinal from "./TextoFinal";
import Loader from "./Loader";
import MusicScreen from "./MusicScreen";
import { GalleryPraga } from "./GalleryPraga";
import LugaresPraga from "./LugaresPraga";

const PragaPreview = () => {
  const [funcionalidades, setFuncionalidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { nombrePlan } = useParams();
  const navigate = useNavigate();

  const targetDate = new Date("2027-12-06T13:00:00-03:00");

  const colorPrincipal =  "#fdba74"
  const colorSecundario =  "#fdba74"

  useEffect(() => {
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
    <div className="w-full relative font-modernaText overflow-hidden">
      <button
        onClick={handleVolver}
        className="fixed top-4 left-4 bg-blue-500 text-white px-4 py-2 rounded shadow-lg hover:bg-blue-600 transition z-50"
      >
        Volver
      </button>
      {funcionalidades.includes("musica") && (
        <div className="absolute">
          <MusicScreen cancion={cancion} />
        </div>
      )}
      <div className="relative flex flex-col items-center justify-center h-screen w-full text-center bg-fondo-praga-mobile md:bg-fondo-praga bg-cover bg-no-repeat">
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div
          data-aos="fade-in"
          className="relative z-10 flex flex-col items-center text-center "
        >
          <p className="text-sm md:text-xl uppercase tracking-widest text-white mb-3">
            ¡Nos Casamos!
          </p>
          <h1 className="text-5xl md:text-8xl font-bold text-white mb-2 font-eleganteTitle">
            Camila &amp; Nicolás
          </h1>
          <p className="text-base md:text-xl text-white">06 / 09 / 2025</p>
        </div>
      </div>
      <div>
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
        
        <LugaresPraga
            linkCeremonia="https://maps.app.goo.gl/LoyZKNsALqYQV3iB8"
            nombreIglesia="Nombre Iglesia"
            horaIglesia="10:00hs"
            linkFiesta="https://maps.app.goo.gl/LoyZKNsALqYQV3iB8"
            nombreSalon="Nombre Salón"
            horaFiesta="13:00hs"
            horaCivil="13:00hs"
            claseContainer="flex flex-col md:flex-row items-center justify-center gap-8 my-8"
            claseTexto="text-gray-900"
        />
        <section className="mb-16">
          {funcionalidades.includes("galeriaFotos") && (
            <GalleryPraga
              text="Nosotros"
              sectionClass="bg-white text-gray-700"
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
        {funcionalidades.includes("instagramWall") && (
          <InstagramWall user="@cami_y_nico" />
        )}
        {funcionalidades.includes("calendario") && (
          <div className="bg-orange-300 text-center text-white relative">
            <GoogleCalendarButton
              titleCalendar="Casamiento de Camila y Nicolás"
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
            <DressCode dress_code="Formal" />
          </div>
        )}
        {funcionalidades.includes("datosBancarios") && (
          <DatosBancarios
            texto="Si deseás hacernos un regalo te dejamos nuestros datos"
            claseContenedor="bg-orange-300 text-white"
            claseBoton="border-2 border-orange-500 bg-white py-3 px-6 text-gray-800 rounded-full hover:bg-gray-100 hover:text-gray-800 transform transition-transform duration-300 ease-in-out font-semibold"
            textSize="text-lg"
            background={{backgroundColor: colorPrincipal}}
            styleBotonModal={{ backgroundColor: 'white',  borderColor: 'white'}}
            claseBotonModal={{backgroundColor: colorSecundario, borderColor: colorSecundario}}
            styleModal={{ backgroundColor: colorSecundario }}
            styleBorderModal={{ borderColor: colorPrincipal }}
            styleTextColor={{ color: colorPrincipal }}
            cbu="284529529245"
            alias="nico.mp"
            banco="Nombre Banco"
            nombre="Nicolas López"
            claseModal="bg-orange-300"
            borderModal="border-orange-300"
            textColor="text-orange-300"
          />
        )}
        {funcionalidades.includes("confirmacionAsistencia") && (
          <Asistencia
            clase="py-10 bg-fondo-banner"
            claseButton="border-2 py-3 px-6 rounded-full border-gray-800 font-semibold hover:border-gray-700 hover:bg-white hover:text-gray:800"
            linkAsistencia="https://docs.google.com/forms/d/e/1FAIpQLSeK0vUpx6zegOhIcQr2rRVADqcpoDD4cDYyRSEOkyALbf-Spg/viewform?usp=dialog"
          />
        )}
        <TextoFinal textoFinal="¡Gracias por venir!" />
        <Footer />
      </div>
    </div>
  );
};

export default PragaPreview;
