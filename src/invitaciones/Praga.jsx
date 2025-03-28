import { useEffect, useState } from "react";
import axios from "axios";

import Countdown from "../components/Countdown";
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
import LugaresPraga from "../components/LugaresPraga";

const Praga = ({invitacionData}) => {
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
    <div className="w-full relative font-modernaText overflow-hidden">
      {funcionalidades.includes("musica") && (
        <div className="absolute">
          <MusicScreen cancion={invitacionData.cancion} />
        </div>
      )}
      <div className={`relative flex flex-col items-center justify-center h-screen w-full text-center ${invitacionData.fondo_mobile} md:${invitacionData.fondo} bg-cover bg-no-repeat`}>
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div
          data-aos="fade-in"
          className="relative z-10 flex flex-col items-center text-center "
        >
          <p className="text-sm md:text-xl uppercase tracking-widest text-white mb-3">
            ¡Nos Casamos!
          </p>
          <h1 className="text-5xl md:text-8xl font-bold text-white mb-2 font-eleganteTitle">
            {invitacionData.novios}
          </h1>
          <p className="text-base md:text-xl text-white">{invitacionData.fecha_evento}</p>
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
            linkCeremonia={invitacionData.linkCeremonia}
            nombreIglesia={invitacionData.nombre_iglesia}
            horaIglesia={invitacionData.hora_ceremonia_religiosa}
            linkFiesta={invitacionData.linkFiesta}
            nombreSalon={invitacionData.nombre_salon}
            horaFiesta={invitacionData.hora_evento}
            claseContainer="flex flex-col md:flex-row items-center justify-center gap-8 my-8"
            claseTexto="text-gray-900"
        />
        <section className="mb-16">
          {funcionalidades.includes("galeriaFotos") && (
            <GalleryPraga
              text="Nosotros"
              sectionClass="bg-white text-gray-700"
              images={images}
            />
          )}
        </section>
        {funcionalidades.includes("instagramWall") && (
          <InstagramWall user={invitacionData.ig_user} />
        )}
        {funcionalidades.includes("calendario") && (
          <div className="bg-orange-300 text-center text-white relative">
            <GoogleCalendarButton
              titleCalendar={`Casamiento de ${invitacionData.novios}`}
              salon={invitacionData.nombre_salon}
              fechaComienzo={invitacionData.fecha_comienzo_calendario}
              fechaFin={invitacionData.fecha_fin_calendario}
              imgClass="text-white"
              buttonClass="hover:bg-white hover:text-gray-800"
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
            texto="Si deseás hacernos un regalo te dejamos nuestros datos"
            claseContenedor="bg-orange-300 text-white"
            claseBoton="border-2 border-orange-500 bg-white py-3 px-6 text-gray-800 rounded-full hover:bg-gray-100 hover:text-gray-800 transform transition-transform duration-300 ease-in-out font-semibold"
            textSize="text-lg"
            cbu={invitacionData.cbu}
            alias={invitacionData.alias}
            banco={invitacionData.banco}
            nombre={invitacionData.nombre_completo}
            claseBotonModal="bg-orange-300 border-orange-300"
            claseModal="bg-orange-300"
            borderModal="border-orange-300"
            textColor="text-orange-300"
          />
        )}
        {funcionalidades.includes("confirmacionAsistencia") && (
          <Asistencia
            clase="py-10 bg-fondo-banner"
            claseButton="border-2 py-3 px-6 rounded-full border-gray-800 font-semibold hover:border-gray-700 hover:bg-white hover:text-gray:800"
            linkAsistencia={invitacionData.link_asistencia}
          />
        )}
        <TextoFinal textoFinal={invitacionData.mensaje_personalizado} />
        <Footer />
      </div>
    </div>
  );
};

export default Praga;
