import React, { useState, useEffect } from "react";

const CountdownVintage = ({ targetDate, containerClasses = "" }) => {
  // Función para calcular el tiempo restante
  const calculateTimeLeft = () => {
    const now = new Date();
    const difference = targetDate - now;
    if (difference > 0) {
      return {
        total: difference,
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return null;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  // Guardamos el total de días al iniciar (para calcular el porcentaje en "Días")
  const [maxDays, setMaxDays] = useState(timeLeft ? timeLeft.days : 0);

  useEffect(() => {
    if (timeLeft) setMaxDays(timeLeft.days);
    const timer = setInterval(() => {
      const newTime = calculateTimeLeft();
      setTimeLeft(newTime);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!timeLeft) {
    return (
      <div className={`${containerClasses} text-center text-2xl font-bold`}>
        ¡Llegó el día!
      </div>
    );
  }

  // Calculamos la fracción (porcentaje) de cada unidad:
  const daysFraction = maxDays > 0 ? timeLeft.days / maxDays : 0;
  const hoursFraction = timeLeft.hours / 24;
  const minutesFraction = timeLeft.minutes / 60;
  const secondsFraction = timeLeft.seconds / 60;

  return (
    <div className={`flex flex-wrap justify-center items-center gap-8 ${containerClasses}`}>
      <CircleCountdown label="Días" value={timeLeft.days} fraction={daysFraction} />
      <CircleCountdown label="Horas" value={timeLeft.hours} fraction={hoursFraction} />
      <CircleCountdown label="Minutos" value={timeLeft.minutes} fraction={minutesFraction} />
      <CircleCountdown label="Segundos" value={timeLeft.seconds} fraction={secondsFraction} />
    </div>
  );
};

const CircleCountdown = ({ label, value, fraction }) => {
  const radius = 70; // Radio total del SVG
  const strokeWidth = 4; // Grosor del trazo
  const normalizedRadius = radius - strokeWidth;
  const circumference = 2 * Math.PI * normalizedRadius;
  // Calculamos el offset del trazo según el porcentaje completado
  const offset = circumference * (1 - fraction);

  return (
    <div className="flex flex-col items-center">
      <svg height={radius * 2} width={radius * 2}>
        {/* Círculo de fondo */}
        <circle
          stroke="#e5e7eb"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        {/* Círculo de progreso */}
        <circle
          stroke="#D4AF37"
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1s linear" }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        {/* Texto dentro del círculo */}
        <text
          x="50%"
          y="45%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-2xl font-bold"
          style={{ fill: "white", fontSize: "32px"}}
        >
          {value}
        </text>
        <text
          x="50%"
          y="65%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-sm"
          style={{ fill: "white", fontSize: "20px" }}
        >
          {label}
        </text>
      </svg>
    </div>
  );
};

export default CountdownVintage;