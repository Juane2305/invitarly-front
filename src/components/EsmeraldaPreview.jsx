import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';

import dress from '../assets/esmeralda/dressCodeIcon.svg'
import CountdownCircles from "./CountdownCircles";
import InstagramWall from "./InstagramWall";
import MusicScreen from "./MusicScreen";
import GoogleCalendarButton from "./GoogleCalendarButton";
import DatosBancarios from "./DatosBancarios";
import Asistencia from "./Asistencia";
import Footer from "./Footer";
import TextoFinal from "./TextoFinal";
import LugaresXV from "./LugaresXV";
import Loader from "./Loader";
import { FocusCardsDemo } from "./FocusCardsDemo";
import decoracionImagenes from "../assets/esmeralda/decoracionImagenes.svg";
import decoracionDressCode from "../assets/esmeralda/decoracionDressCode.svg";

import DressCodeEsmeralda from "./DressCodeEsmeralda";

const EsmeraldaPreview = () => {
  const [funcionalidades, setFuncionalidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { nombrePlan } = useParams();
  const navigate = useNavigate();

  const targetDate = new Date("2025-04-06T13:00:00-03:00");

  useEffect(() => {
    AOS.init({
        duration: 3000, 
        easing: 'ease-in-out',
        once: true,
      });
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

  const handleSeleccionarPlantilla = () => {
    navigate(`/confirmacion-pago/${nombrePlan}/esmeralda`);
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
          <MusicScreen cancion="https://res.cloudinary.com/dfschbyq2/video/upload/v1742765467/Taylor_Swift_-_Wildest_Dreams_qzmkky.mp3" />
        </div>
      )}

      <div className="relative flex flex-col justify-center items-center min-h-screen w-full text-center bg-fondo-esmeralda bg-center bg-cover font-eleganteText space-y-5 overflow-hidden" >
        <div data-aos="fade-in">
            <p className="text-2xl mb-5 tracking-widest">Te invito a mis 15</p>
            <h1 className="text-7xl md:text-[10rem] font-brushNames text-[#4b5147] z-10 italic">
            Julieta
            </h1>

            <div className="flex items-center justify-center py-2 px-4 mt-5">
            <p className="font-bold text-[#4b5147] text-lg tracking-widest">
                0 6 . 0 4 . 2 0 2 5
            </p>
            </div>
        </div>
      </div>

      <div>
          <section
            id="contador"
            className="bg-white py-10 border-y-4 border-[#8b908c]"
          >
            <CountdownCircles
              targetDate={targetDate}
              containerClasses="my-8"
              backgroundColor="#e5e7eb"
              progressColor="#8b908c"
              textColor="black"
              valueClassName="text-3xl font-light"
              labelClassName="text-base font-thin"
            />
          </section>

        <section id="lugares" className="relative text-center bg-white">
          <LugaresXV
            iglesia="[Nombre iglesia]"
            hora_iglesia="10:00hs"
            salon="[Nombre salon]"
            hora_civil="21:00hs"
          />
          <a href="#" target="_blank" rel="noopener noreferrer">
            <button className="border-2 border-gray-700 my-5 py-3 px-8 rounded-full text-gray-800 font-semibold hover:text-gray-600 transition">
              CÓMO LLEGAR
            </button>
          </a>
        </section>

          <div className="relative bg-white">
            <img
              src={decoracionImagenes}
              alt="Decoración lateral"
              className="hidden md:block absolute -left-44 top-1/2 transform -translate-y-1/2 pointer-events-none"
              style={{
                width: "30rem",
                transform: "translateY(-50%) scaleX(-1)",

              }}
            />
            <img
              src={decoracionImagenes}
              alt="Decoración lateral invertida"
              className="hidden md:block absolute -right-44 top-1/2 transform -translate-y-1/2 pointer-events-none"
              style={{
                 width: "30rem" ,
                }}
            />
            <section className="pb-16">
              {funcionalidades.includes("galeriaFotos") && (
                <FocusCardsDemo
                    texto=""
                  images={[
                    {
                      index: 1,
                      img: "https://res.cloudinary.com/dfschbyq2/image/upload/v1742399786/6_vl125s.png",
                    },
                    {
                      index: 2,
                      img: "https://res.cloudinary.com/dfschbyq2/image/upload/v1742399786/8_qpejjc.png",
                    },
                    {
                      index: 3,
                      img: "https://res.cloudinary.com/dfschbyq2/image/upload/v1742399786/7_kce39x.png",
                    },
                    {
                      index: 4,
                      img: "https://res.cloudinary.com/dfschbyq2/image/upload/v1742399786/4_kpl0nm.png",
                    },
                    {
                      index: 5,
                      img: "https://res.cloudinary.com/dfschbyq2/image/upload/v1742399786/5_ekv7zt.png",
                    },
                    {
                      index: 6,
                      img: "https://res.cloudinary.com/dfschbyq2/image/upload/v1742399787/2_ojqth3.png",
                    },
                    {
                      index: 7,
                      img: "https://res.cloudinary.com/dfschbyq2/image/upload/v1742399788/3_rur5ok.png",
                    },
                    {
                      index: 8,
                      img: "https://res.cloudinary.com/dfschbyq2/image/upload/v1742399798/DESARROLLO_WEB_1200_x_1200_px_2_blvzie.png",
                    },
                    {
                      index: 9,
                      img: "https://res.cloudinary.com/dfschbyq2/image/upload/v1742399968/DESARROLLO_WEB_1200_x_1200_px_3_vts8oo.jpg",
                    },
                  ]}
                />
              )}
            </section>
          </div>

          <div className="bg-white border-b border-[#4b5147]">
            <InstagramWall
              userClass="text-[#4b5147]"
              logoClass="text-[#4b5147]"
              user="@julieta"
            />
          </div>

          <div className="bg-white text-center relative text-[#4b5147]">
            <GoogleCalendarButton
              imgClass="text-[#4b5147]"
              buttonClass="border-[#4b5147] rounded-full"
              titleCalendar="XV de Julieta"
              salon="Nombre Salón"
              fechaComienzo="20250406T130000"
              fechaFin="20250407T000000"
            />
          </div>

          <div className="relative bg-white py-10">
            <img
              src={decoracionDressCode}
              alt="Decoración DressCode Izq"
              className="hidden md:block absolute -left-40 top-1/2 transform -translate-y-1/2 pointer-events-none"
              style={{
                width: "30rem",
              }}
            />
            <img
              src={decoracionDressCode}
              alt="Decoración DressCode Der"
              className="hidden md:block absolute -right-40 top-1/2 transform -translate-y-1/2 pointer-events-none"
              style={{
                width: "30rem",
                transform: "translateY(-50%) scaleX(-1)",

              }}
            />

            <DressCodeEsmeralda dressCode="Formal" icon={dress}/>
          </div>

          <DatosBancarios
            claseIcon="text-white"
            texto="Si deseas hacerme un regalo, te dejo los datos"
            claseContenedor="bg-[#4b5147] text-white"
            claseBoton="rounded-full hover:shadow-lg border-white bg-gray-100 text-gray-900"
            textSize="text-lg"
            cbu="284529529245"
            alias="francisco.mp"
            banco="Nombre Banco"
            nombre="Francisco Lopez"
            claseBotonModal="bg-[#4b5147] border-[#4b5147]"
            claseModal="bg-[#4b5147]"
            borderModal="border-[#4b5147]"
            textColor="text-[#4b5147]"
          />

          <Asistencia
            clase="py-10 bg-white bg-fixed border-b-4 border-[#4b5147]"
            claseTitle="text-[#4b5147]"
            claseButton="border-2 border-[#4b5147] font-semibold hover:bg-[#4b5147]  text-gray-700 hover:text-white rounded-full"
            linkAsistencia="https://docs.google.com/forms/d/e/1FAIpQLSeK0vUpx6zegOhIcQr2rRVADqcpoDD4cDYyRSEOkyALbf-Spg/viewform?usp=dialog"
          />

        <div className="font-eleganteTitle text-4xl bg-white">
          <TextoFinal textoFinal="¡Gracias por venir!" />
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default EsmeraldaPreview;
