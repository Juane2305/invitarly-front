import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import cancion from '../assets/song.mp3'
import CountdownCircles from "./CountdownCircles";
import Lugares from "./Lugares";
import InstagramWall from "./InstagramWall";
import GoogleCalendarButton from "./GoogleCalendarButton";
import DressCodeVintage from "./DressCodeVintage";
import DatosBancarios from "./DatosBancarios";
import Asistencia from "../components/Asistencia";
import Footer from "./Footer";
import TextoFinal from "./TextoFinal";
import hojasVerdes2 from "../assets/hojasVerdes2.svg";
import hojasVerdesIzq from "../assets/hojasVerdesIzq.svg";
import Loader from "./Loader";
import GalleryVintage from "./GalleryVintage";
import MusicScreen from "./MusicScreen";

const BerlinPreview = () => {
  const [funcionalidades, setFuncionalidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { nombrePlan } = useParams();
  const navigate = useNavigate();

  const targetDate = new Date("2027-12-06T13:00:00-03:00");

  const colorPrincipal =  "#faf3e0"
  const colorSecundario =  "#faf3e0"

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
  if (error) return <p className="text-center py-10">{error}</p>;


  const handleVolver = () => {
    navigate(`/plantillas/${nombrePlan}`);
  };

  return (
    <div className="w-full font-vintageText relative overflow-hidden bg-[#FAF3E0]">
      <div className="fixed inset-0 -z-10 bg-[url('/img/fondo.jpg')] bg-cover bg-center"></div>
      <div className="fixed top-4 right-4 z-50">
      </div>
      <div className="fixed top-4 left-4 z-50">
        <button
          onClick={handleVolver}
          className="bg-[#A3B18A] text-white px-4 py-2 rounded shadow-lg hover:bg-[#8D9A78] transition"
        >
          Volver
        </button>
      </div>

      {funcionalidades.includes("musica") && (
        <div className="absolute">
          <MusicScreen cancion={cancion}/>
        </div>
      )}

      <div className="flex flex-col justify-center items-center h-screen w-full text-center bg-fondo-vintage bg-cover bg-no-repeat bg-center md:bg-fixed border-b-2 border-[#D4AF37] relative">
      <h1 className="text-4xl md:text-8xl  text-gold z-10 italic">
          Francisco & María
        </h1>
        <p className="mt-8 text-2xl text-lime-900">06 . 12 . 2025</p>
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
          iglesia= "[Nombre Iglesia]"
          hora_iglesia = "10:00hs"
          salon= "[Nombre Salón]"
          hora_civil= "13:00hs"
          hora_fiesta= "15:00hs"
          />
          <div className="flex justify-center items-center mt-5">
            <a
              href="https://maps.app.goo.gl/4XyzMRjyujMSjckK7"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="border-2 border-[#D4AF37] py-3 px-8 rounded-full bg-[#FAF3E0] text-[#D4AF37] font-bold hover:bg-[#D4AF37] hover:text-white transition">
                CÓMO LLEGAR
              </button>
            </a>
          </div>
        </section>
        {funcionalidades.includes("galeriaFotos") && (
          <section className="relative my-10 pb-10 border-b-2 border-[#D4AF37]">
            <GalleryVintage
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
          </section>
        )}
        {funcionalidades.includes("instagramWall") && (
          <section className="py-10 text-center">
            <InstagramWall user="@fran_y_maria"/>
          </section>
        )}
        {funcionalidades.includes("calendario") && (
          <section className="bg-[#A3B18A] py-10 text-white text-center">
            <GoogleCalendarButton 
            titleCalendar="Casamiento de Francisco y María"
            salon="Nombre Salón"
            fechaComienzo="20250407T130000"
            fechaFin="20250406T000000"
            />
          </section>
        )}
        {funcionalidades.includes("dressCode") && (
          <section className="relative my-10 border-b-2 border-[#D4AF37]">
            <img
              src={hojasVerdesIzq}
              alt="Decoración"
              className="absolute left-[-80px] lg:left-[-50px] top-1/2 transform -translate-y-1/2 w-40 lg:w-52 opacity-70"
            />
            <DressCodeVintage dress_code="Formal"/>
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
              cbu="235252395902"
              alias="francisco.mp"
              banco="Nombre Banco"
              nombre="Francisco Lopez"           
              claseContenedor="bg-[#FAF3E0] py-10 text-center text-black"
              claseBoton="border-principal-dark text-white bg-principal-dark hover:bg-transparent hover:text-green-900 text-xl"
              textSize="text-xl"
              background={{backgroundColor: colorPrincipal}}
              styleBotonModal={{ backgroundColor: '#A3B18A',  borderColor: '#A3B18A'}}
              claseBotonModal={{backgroundColor: "#d4af37", borderColor: "#d4af37"}}
              styleModal={{ backgroundColor: colorSecundario }}
              styleBorderModal={{ borderColor: colorPrincipal }}
              styleTextColor={{ color: colorPrincipal }}
              claseModal="bg-black"
              borderModal="border-gold"
              textColor="text-gold"
            />
          </section>
        )}
        {funcionalidades.includes("confirmacionAsistencia") && (
          <section className="">
            <Asistencia
              linkAsistencia="https://docs.google.com/forms/d/e/1FAIpQLSeK0vUpx6zegOhIcQr2rRVADqcpoDD4cDYyRSEOkyALbf-Spg/viewform?usp=dialog"
              clase="py-10 bg-[#FAF3E0]"
              claseButton="border-principal-dark text-white bg-principal-dark hover:bg-transparent hover:text-green-900 text-xl border-2 border-principal-dark"
            />
          </section>
        )}
        <TextoFinal textClass="text-xl italic" textoFinal="¡Gracias por venir!"/>
        <Footer />
      </div>
    </div>
  );
};

export default BerlinPreview;
