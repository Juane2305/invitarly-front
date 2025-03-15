import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

import nombres from "../assets/nombresInicio.svg";
import Countdown from "../components/Countdown";
import Lugares from "../components/Lugares";
import { FocusCardsDemo } from "../components/FocusCardsDemo";
import MusicPlayer from "../components/MusicPlayer";
import InstagramWall from "../components/InstagramWall";
import GoogleCalendarButton from "../components/GoogleCalendarButton";
import DressCode from "../components/DressCode";
import DatosBancarios from "../components/DatosBancarios";
import Asistencia from "../components/Asistencia";
import Footer from "../components/Footer";
import TextoFinal from "../components/TextoFinal";
import Loader from "../components/Loader";

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

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  const nombres = invitacionData.novios
    .replace("&", "y") // reemplaza '&' por 'y', si quieres unificar
    .split("y") // separa por 'y'
    .map((s) => s.trim()); // quita espacios extra

  // Ejemplo: ["Francisco", "María"]
  // Tomamos la primera letra en mayúscula
  const iniciales = nombres
    .map((nombre) => nombre[0]?.toUpperCase() || "")
    .join(" ");

  return (
    <div className="w-full relative font-modernaText overflow-hidden">
      {funcionalidades.includes("musica") && (
        <div className="absolute">
          <MusicPlayer cancion={invitacionData.cancion} />
        </div>
      )}

      <div className="relative flex flex-col items-center justify-center h-screen w-full text-center bg-fondo-moderna bg-cover bg-no-repeat ">
        {/* Texto gigante de fondo (iniciales) */}
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

        {/* Texto superior */}
        <p className="z-10 text-lg uppercase tracking-widest mb-2">
          ¡Nos Casamos!
        </p>

        {/* Nombres completos */}
        <h1 className="z-10 text-5xl md:text-7xl font-vintageText text-gray-800 italic">
          {invitacionData.novios}
        </h1>

        {/* Fecha */}
        <p className="z-10 mt-10 text-xl">{invitacionData.fecha_evento}</p>
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
                Ubicación Civil
              </button>
            </a>
          </div>
        </section>
        {funcionalidades.includes("galeriaFotos") && (
          <FocusCardsDemo images={images} />
        )}
        {funcionalidades.includes("instagramWall") && (
          <InstagramWall user={invitacionData.ig_user} />
        )}
        {funcionalidades.includes("calendario") && (
          <div className="bg-principal-light text-center text-white relative">
            <GoogleCalendarButton
              imgClass="text-white"
              buttonClass="hover:bg-white hover:text-gray-800"
              titleCalendar={invitacionData.novios}
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
            cbu={invitacionData.cbu}
            alias={invitacionData.alias}
            banco={invitacionData.banco}
            nombre={invitacionData.nombre_completo}
            claseContenedor="bg-principal-light text-white"
            claseBoton="border-2 py-3 px-6 rounded-full hover:bg-white hover:text-gray-800 transform transition-transform duration-300 ease-in-out font-semibold"
            textSize="text-lg"
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

export default Roma;
