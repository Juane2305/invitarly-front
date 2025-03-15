import { useEffect, useState } from "react";
import axios from "axios";

import Countdown from "../components/Countdown";
import MusicPlayer from "../components/MusicPlayer";
import InstagramWall from "../components/InstagramWall";
import GoogleCalendarButton from "../components/GoogleCalendarButton";
import DatosBancarios from "../components/DatosBancarios";
import Asistencia from "../components/Asistencia";
import Footer from "../components/Footer";
import TextoFinal from "../components/TextoFinal";
import LugaresLineal from "../components/LugaresLineal";
import DressCodeElegante from "../components/DressCodeElegante";
import Loader from '../components/Loader'
import GalleryElegante from "../components/GalleryElegante";

const Tokyo = ({invitacionData}) => {
  const [funcionalidades, setFuncionalidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const nombrePlan  = invitacionData.plan;
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

  return (
    <div className="w-full font-eleganteText relative overflow-hidden bg-[#f8f5f0]">
      {/* Música */}
      {funcionalidades.includes("musica") && (
        <div className="absolute z-40">
          <MusicPlayer cancion={invitacionData.cancion}/>
        </div>
      )}

      {/* Sección inicial */}
      <div className="flex flex-col justify-center items-center h-screen w-full text-center bg-fondo-elegante bg-center bg-cover font-eleganteText relative space-y-5">
        <p className="text-white text-xl">
          Estás cordialmente invitado/a <br /> al casamiento de
        </p>
        <h1 className="text-4xl md:text-8xl font-eleganteTitle text-white z-10 italic">
          {invitacionData.novios}
        </h1>
        <div className="flex items-center justify-center py-6 px-4 border-y-2 border-dashed border-gold">
            <p className="text-gold italic text-2xl">{invitacionData.fecha_tokyo}</p>
        </div>
      </div>

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
              <LugaresLineal  borderColor="border-gold" buttonStyle="border-gold text-lg" iglesia= {invitacionData.nombre_iglesia}
              hora_iglesia = {invitacionData.hora_ceremonia_religiosa}
              salon= {invitacionData.nombre_salon}
              hora_civil= {invitacionData.hora_civil}
              hora_fiesta= {invitacionData.hora_evento}
              link_ceremonia = {invitacionData.linkCeremonia}
              link_fiesta = {invitacionData.linkFiesta}/>
            </div>
          </div>
        

        {/* Galería de Fotos */}
        {funcionalidades.includes("galeriaFotos") && (
          <div className="relative py-10 bg-white text-black">
            <GalleryElegante textStyle="text-[#D4AF37]" buttonStyle="bg-[#D4AF37]" images= {images}/>
          </div>
        )}
        {funcionalidades.includes("instagramWall") && (
          <div className="bg-white border-dotted border-b-4 border-gold">
            <InstagramWall userClass="text-gold" logoClass='text-gold' user={invitacionData.ig_user}/>
          </div>
        )}
        {funcionalidades.includes("calendario") && (
          <div className="bg-white text-center relative">
            <GoogleCalendarButton imgClass="text-gold" buttonClass="border-gold"
            titleCalendar={invitacionData.novios}
            salon={invitacionData.nombre_salon}
            fechaComienzo={invitacionData.fecha_comienzo_calendario}
            fechaFin={invitacionData.fecha_fin_calendario}
            />
          </div>
        )}

        {/* Dress Code */}
        {funcionalidades.includes("dressCode") && (
          <div className="">
            <DressCodeElegante dressCodeText={invitacionData.dressCode}/>
          </div>
        )}

        {/* Datos Bancarios */}
        {funcionalidades.includes("datosBancarios") && (
          <DatosBancarios
            cbu={invitacionData.cbu}
            alias={invitacionData.alias}
            banco={invitacionData.banco}
            nombre={invitacionData.nombre_completo}
            claseIcon="text-gold"
            claseContenedor="bg-[#F8F5F0] text-[#1E1E1E]"
            claseBoton="hover:bg-[#D4AF37] hover:text-white transform transition-transform duration-300 ease-in-out font-semibold border-gold"
            textSize="text-lg"
          />
        )}

        {/* Confirmación de Asistencia */}
        {funcionalidades.includes("confirmacionAsistencia") && (
          <Asistencia
            linkAsistencia={invitacionData.link_asistencia}
            clase="py-10 bg-[#171717] bg-fixed"
            claseTitle="text-gold"
            claseButton="border-2 border-[#D4AF37] font-semibold hover:bg-[#D4AF37] text-white"
          />
        )}

        {/* Texto Final */}
        <div className="font-eleganteTitle text-4xl">
          <TextoFinal textoFinal={invitacionData.mensaje_personalizado}/>  
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Tokyo;
