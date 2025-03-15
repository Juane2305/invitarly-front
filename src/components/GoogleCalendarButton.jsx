import React from "react";
import { CiCalendar } from "react-icons/ci";


const GoogleCalendarButton = ({imgClass, titleClass, buttonClass, titleCalendar, fechaComienzo, fechaFin, salon}) => {
  const title = `Casamiento de ${titleCalendar}`;
  const details = "¡No olvides asistir a nuestro evento!";
  

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    title
  )}&dates=${fechaComienzo}/${fechaFin}&details=${encodeURIComponent(
    details
  )}&location=${encodeURIComponent(salon)}&ctz=America/Argentina/Buenos_Aires`;

  return (
    <div className='transform transition-transform duration-300 ease-in-out hover:scale-105 flex flex-col items-center gap-y-5  py-16' data-aos= 'fade-up'>
      <CiCalendar className={`${imgClass}`} size={140}/>
      <h3 className={`text-lg font-light ${titleClass}`}>Agrega el evento al calendario de Google:</h3>
      <a
        href={googleCalendarUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`border-2 py-3 px-6 transition hover:transform hover:scale-105 ${buttonClass}`}
        >
        Agregar al Calendario
      </a>
    </div>
  );
};

export default GoogleCalendarButton;