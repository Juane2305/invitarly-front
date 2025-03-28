import { useEffect, useState } from "react";
import axios from "axios";

import CountdownCircles from "../components/CountdownCircles";
import Lugares from "../components/Lugares";
import InstagramWall from "../components/InstagramWall";
import GoogleCalendarButton from "../components/GoogleCalendarButton";
import DressCodeVintage from "../components/DressCodeVintage";
import DatosBancarios from "../components/DatosBancarios";
import Asistencia from "../components/Asistencia";
import Footer from "../components/Footer";
import TextoFinal from "../components/TextoFinal";
import hojasVerdes2 from "../assets/hojasVerdes2.svg";
import hojasVerdesIzq from "../assets/hojasVerdesIzq.svg";
import Loader from "../components/Loader";
import GalleryVintage from "../components/GalleryVintage";
import MusicScreen from "../components/MusicScreen";

const Berlin = ({invitacionData}) => {
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
  if (error) return <p className="text-center py-10">{error}</p>;


  return (
    <div className="w-full font-vintageText relative overflow-hidden bg-[#FAF3E0]">
      <div className="fixed inset-0 -z-10 bg-[url('/img/fondo.jpg')] bg-cover bg-center"></div>

      {funcionalidades.includes("musica") && (
        <div className="absolute">
          <MusicScreen cancion={invitacionData.cancion}/>
        </div>
      )}

      <div className="flex flex-col justify-center items-center h-screen w-full text-center bg-fondo-vintage bg-cover bg-no-repeat bg-center md:bg-fixed border-b-2 border-[#D4AF37] relative">
        <h1 className="text-5xl md:text-8xl  text-gold z-10 italic">
          {invitacionData.novios}
        </h1>
        <p className="mt-8 text-2xl text-lime-900">{invitacionData.fecha_evento}</p>
      </div>

      <div className="relative z-10">
        {funcionalidades.includes("cuentaRegresiva") && (
          <section
            id="contador"
            className="bg-[#A3B18A] text-white py-10 border-b-2 border-[#D4AF37]"
          >
            <CountdownCircles
              targetDate={targetDate}
              containerClasses="my-8 font-thin"
              backgroundColor="#e5e7eb" 
              progressColor="#D4AF37" 
              textColor="#ffffff" 
              valueClassName="text-3xl font-bold"
              labelClassName="text-base font-light"
            />
          </section>
        )}
        <section id="lugares" className="py-10 border-b-2 border-[#D4AF37]">
          <Lugares 
            iglesia= {invitacionData.nombre_iglesia}
            hora_iglesia = {invitacionData.hora_ceremonia_religiosa}
            salon= {invitacionData.nombre_salon}
            hora_civil= {invitacionData.hora_civil}
            hora_fiesta= {invitacionData.hora_evento}
          />
          <div className="flex justify-center items-center mt-10">
            <a
              href={invitacionData.linkCeremonia}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="border-2 border-[#D4AF37] py-3 px-8 rounded-full bg-[#FAF3E0] text-[#D4AF37] font-bold hover:bg-[#D4AF37] hover:text-white transition">
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
              <button className="border-2 border-[#D4AF37] py-3 px-8 rounded-full bg-[#FAF3E0] text-[#D4AF37] font-bold hover:bg-[#D4AF37] hover:text-white transition">
                Ubicación Civil
              </button>
            </a>
          </div>
        </section>
        {funcionalidades.includes("galeriaFotos") && (
          <section className="relative my-10 pb-10 border-b-2 border-[#D4AF37]">
            <GalleryVintage images={images}/>
          </section>
        )}
        {funcionalidades.includes("instagramWall") && (
          <section className="py-10 text-center">
            <InstagramWall userClass="text-gold" logoClass='text-gold' user={invitacionData.ig_user}/>
          </section>
        )}
        {funcionalidades.includes("calendario") && (
          <section className="bg-[#A3B18A] py-10 text-white text-center">
            <GoogleCalendarButton 
            titleCalendar={`Casamiento de ${invitacionData.novios}`}
            salon={invitacionData.nombre_salon}
            fechaComienzo={invitacionData.fecha_comienzo_calendario}
            fechaFin={invitacionData.fecha_fin_calendario}/>
          </section>
        )}
        {funcionalidades.includes("dressCode") && (
          <section className="relative my-10 border-b-2 border-[#D4AF37]">
            <img
              src={hojasVerdesIzq}
              alt="Decoración"
              className="absolute left-[-80px] lg:left-[-50px] top-1/2 transform -translate-y-1/2 w-40 lg:w-52 opacity-70"
            />
            <DressCodeVintage dress_code={invitacionData.dressCode}/>
            <img
              src={hojasVerdes2}
              alt="Decoración"
              className="absolute right-[-80px] lg:right-[-50px] top-1/2 transform -translate-y-1/2 w-40 lg:w-52 opacity-70"
            />
          </section>
        )}
        {funcionalidades.includes("datosBancarios") && (
          <section className="my-10 border-b-2 border-[#D4AF37]">
            <DatosBancarios
              texto="Si deseás hacernos un regalo te dejamos nuestros datos"
              cbu={invitacionData.cbu}
              alias={invitacionData.alias}
              banco={invitacionData.banco}
              nombre={invitacionData.nombre_completo}
              claseContenedor="bg-[#FAF3E0] py-10 text-center text-black"
              claseBoton="border-principal-dark text-white bg-principal-dark hover:bg-transparent hover:text-green-900 text-xl"
              textSize="text-xl"
              claseBotonModal="bg-gold border-gold"
              claseModal="bg-black"
              borderModal="border-gold"
              textColor="text-gold"
            />
          </section>
        )}
        {funcionalidades.includes("confirmacionAsistencia") && (
          <section className="">
            <Asistencia
              linkAsistencia={invitacionData.link_asistencia}
              clase="py-10 bg-[#FAF3E0]"
              claseButton="border-principal-dark text-white bg-principal-dark hover:bg-transparent hover:text-green-900 text-xl border-2 border-principal-dark"
            />
          </section>
        )}
        <TextoFinal textClass="text-xl italic" textoFinal={invitacionData.mensaje_personalizado}/>
        <Footer />
      </div>
    </div>
  );
};

export default Berlin;
