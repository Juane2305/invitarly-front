import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

import cancion from '../assets/song.mp3'
import Countdown from "./Countdown";
import MusicPlayer from "./MusicPlayer";
import InstagramWall from "./InstagramWall";
import GoogleCalendarButton from "./GoogleCalendarButton";
import DatosBancarios from "./DatosBancarios";
import Asistencia from "./Asistencia";
import Footer from "./Footer";
import TextoFinal from "./TextoFinal";
import LugaresLineal from "./LugaresLineal";
import DressCodeElegante from "./DressCodeElegante";
import Loader from './Loader'
import GalleryElegante from "./GalleryElegante";

const TokyoPreview = () => {
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
          `https://api.invitarly.com/api/planes/${nombrePlan}/funcionalidades`
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

  if (loading) return <Loader/>;
  if (error) return <p>{error}</p>;

  const handleSeleccionarPlantilla = () => {
    navigate(`/confirmacion-pago/${nombrePlan}/tokyo`);
  };

  const handleVolver = () => {
    navigate(`/plantillas/${nombrePlan}`);
  };

  return (
    <div className="w-full font-eleganteText relative overflow-hidden bg-[#f8f5f0]">
      {/* Botón para seleccionar plantilla */}
      <button
        onClick={handleSeleccionarPlantilla}
        className="fixed top-4 right-4 bg-[#D4AF37] text-white px-4 py-2 rounded shadow-lg hover:bg-[#B8860B] transition z-50"
      >
        Seleccionar esta plantilla
      </button>

      {/* Botón para volver */}
      <button
        onClick={handleVolver}
        className="fixed top-4 left-4 bg-[#505050] text-white px-4 py-2 rounded shadow-lg hover:bg-[#404040] transition z-50"
      >
        Volver
      </button>

      {/* Música */}
      {funcionalidades.includes("musica") && (
        <div className="absolute z-40">
          <MusicPlayer cancion={cancion}/>
        </div>
      )}

      {/* Sección inicial */}
      <div className="flex flex-col justify-center items-center h-screen w-full text-center bg-fondo-elegante bg-center bg-cover font-eleganteText relative space-y-5">
        <p className="text-white text-xl">
          Estás cordialmente invitado/a <br /> al casamiento de
        </p>
        <h1 className="text-6xl md:text-8xl font-eleganteTitle text-white z-10 italic">
          Francisco & María
        </h1>
        <div className="flex items-center justify-center py-6 px-4 border-y-2 border-dashed border-gold">
        <p className="text-gold italic text-2xl">Domingo, 6 de abril de 2025</p>
    </div>
      </div>

      {/* Plantilla dinámica */}
      <div>
        {/* Contador */}
        {funcionalidades.includes("cuentaRegresiva") && (
          <section
            id="contador"
            className="bg-white py-10 border-4 border-gold"
          >
            <Countdown containerClasses="w-full flex flex-col items-center justify-center gap-y-5 text-gold" targetDate={targetDate}/>
          </section>
        )}

        {/* Lugares */}
          <div className="bg-[#171717]">
            <div data-aos="fade-up">
              <LugaresLineal  borderColor="border-gold" buttonStyle="border-gold text-lg" iglesia="[Nombre Iglesia]" hora_iglesia="10:00hs" salon="[Nombre Salón]" hora_civil="13:00hs" hora_fiesta="15:00hs" link_ceremonia="https://maps.app.goo.gl/LoyZKNsALqYQV3iB8" link_fiesta="https://maps.app.goo.gl/LoyZKNsALqYQV3iB8"/>
            </div>
          </div>
        

        {/* Galería de Fotos */}
        {funcionalidades.includes("galeriaFotos") && (
          <div className="relative py-10 bg-white text-black">
            <GalleryElegante textStyle="text-[#D4AF37]" buttonStyle="bg-[#D4AF37]" images={[
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
              ]}/>
          </div>
        )}
        {funcionalidades.includes("instagramWall") && (
          <div className="bg-white border-dotted border-b-4 border-gold">
            <InstagramWall userClass="text-gold" logoClass='text-gold' user="@fran_y_mari"/>
          </div>
        )}
        {funcionalidades.includes("calendario") && (
          <div className="bg-white text-center relative">
            <GoogleCalendarButton imgClass="text-gold" buttonClass="border-gold" titleCalendar="Francisco y María"
              fechaComienzo="20250406T130000"
              fechaFin="20250407T000000"
              salon="Nombre del Salón"/>
          </div>
        )}

        {/* Dress Code */}
        {funcionalidades.includes("dressCode") && (
          <div className="">
            <DressCodeElegante dressCodeText="Formal"/>
          </div>
        )}

        {/* Datos Bancarios */}
        {funcionalidades.includes("datosBancarios") && (
          <DatosBancarios
            claseIcon="text-gold"
            claseContenedor="bg-[#F8F5F0] text-[#1E1E1E]"
            claseBoton="hover:bg-[#D4AF37] hover:text-white transform transition-transform duration-300 ease-in-out font-semibold border-gold"
            textSize="text-lg"
            cbu="284529529245"
            alias="francisco.mp"
            banco="Nombre Banco"
            nombre="Francisco Lopez"
          />
        )}

        {/* Confirmación de Asistencia */}
        {funcionalidades.includes("confirmacionAsistencia") && (
          <Asistencia
            clase="py-10 bg-[#171717] bg-fixed"
            claseTitle="text-gold"
            claseButton="border-2 border-[#D4AF37] font-semibold hover:bg-[#D4AF37] text-white"
            linkAsistencia="https://docs.google.com/forms/d/e/1FAIpQLSeK0vUpx6zegOhIcQr2rRVADqcpoDD4cDYyRSEOkyALbf-Spg/viewform?usp=dialog"
          />
        )}

        {/* Texto Final */}
        <div className="font-eleganteTitle text-4xl">
          <TextoFinal textoFinal="¡Gracias por venir!"/>  
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default TokyoPreview;
