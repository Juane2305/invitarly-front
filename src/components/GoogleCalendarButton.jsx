import React from "react";
import { CiCalendar } from "react-icons/ci";


const GoogleCalendarButton = () => {
  const title = "Casamiento Vale y Juampi";
  const details = "¡No olvides asistir a nuestro evento!";
  const location = "Salón Terra Oliva";
  const startDate = "20250406T130000"; // Formato: YYYYMMDDTHHmmssZ (UTC)
  const endDate = "20250407T000000";

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    title
  )}&dates=${startDate}/${endDate}&details=${encodeURIComponent(
    details
  )}&location=${encodeURIComponent(location)}&ctz=America/Argentina/Buenos_Aires`;

  return (
    <div className='transform transition-transform duration-300 ease-in-out hover:scale-105 flex flex-col items-center gap-y-5  py-16 my-24' data-aos= 'fade-up'>
      <CiCalendar className="text-white" size={140}/>
      <h3 className="text-xl font-light text-white">Agrega el evento al calendario de Google:</h3>
      <a
        href={googleCalendarUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="border-2 border-white py-3 px-6 rounded-full hover:transition  text-white font-bold hover:bg-white hover:text-gray-700 uppercase " 
        >
        Agregar al Calendario
      </a>
    </div>
  );
};

export default GoogleCalendarButton;