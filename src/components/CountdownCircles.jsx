import React, { useState, useEffect } from "react";

const CountdownCircles = ({
  targetDate,
  containerClasses = "",
  // Color del círculo de fondo
  backgroundColor = "#e5e7eb",
  // Color del círculo de progreso
  progressColor = "#D4AF37",
  // Color del texto
  textColor = "#ffffff",

  // Clases de Tailwind (o CSS) para los textos
  valueClassName = "text-2xl font-bold",
  labelClassName = "text-sm",
}) => {
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
  const [maxDays, setMaxDays] = useState(timeLeft ? timeLeft.days : 0);

  useEffect(() => {
    if (timeLeft) setMaxDays(timeLeft.days);
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!timeLeft) {
    return (
      <div className={`${containerClasses} text-center text-2xl font-bold`}>
        ¡Llegó el día!
      </div>
    );
  }

  const daysFraction = maxDays > 0 ? timeLeft.days / maxDays : 0;
  const hoursFraction = timeLeft.hours / 24;
  const minutesFraction = timeLeft.minutes / 60;
  const secondsFraction = timeLeft.seconds / 60;

  return (
    <div className={`flex flex-wrap justify-center items-center gap-8 ${containerClasses}`}>
      <CircleCountdown
        label="Días"
        value={timeLeft.days}
        fraction={daysFraction}
        backgroundColor={backgroundColor}
        progressColor={progressColor}
        textColor={textColor}
        valueClassName={valueClassName}
        labelClassName={labelClassName}
      />
      <CircleCountdown
        label="Horas"
        value={timeLeft.hours}
        fraction={hoursFraction}
        backgroundColor={backgroundColor}
        progressColor={progressColor}
        textColor={textColor}
        valueClassName={valueClassName}
        labelClassName={labelClassName}
      />
      <CircleCountdown
        label="Minutos"
        value={timeLeft.minutes}
        fraction={minutesFraction}
        backgroundColor={backgroundColor}
        progressColor={progressColor}
        textColor={textColor}
        valueClassName={valueClassName}
        labelClassName={labelClassName}
      />
      <CircleCountdown
        label="Segundos"
        value={timeLeft.seconds}
        fraction={secondsFraction}
        backgroundColor={backgroundColor}
        progressColor={progressColor}
        textColor={textColor}
        valueClassName={valueClassName}
        labelClassName={labelClassName}
      />
    </div>
  );
};

const CircleCountdown = ({
  label,
  value,
  fraction,
  backgroundColor,
  progressColor,
  textColor,
  valueClassName,
  labelClassName,
}) => {
  const radius = 70;
  const strokeWidth = 4;
  const normalizedRadius = radius - strokeWidth;
  const circumference = 2 * Math.PI * normalizedRadius;
  // Calculamos cuánto "gira" el círculo
  const offset = circumference * (1 - fraction);

  return (
    <div className="flex flex-col items-center">
      <svg height={radius * 2} width={radius * 2}>
        {/* Círculo de fondo */}
        <circle
          stroke={backgroundColor}
          fill="transparent"
          strokeWidth={strokeWidth}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        {/* Círculo de progreso */}
        <circle
          stroke={progressColor}
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
        {/* Texto principal (valor) */}
        <text
          x="50%"
          y="45%"
          textAnchor="middle"
          dominantBaseline="middle"
          style={{ fill: textColor }}
          className={valueClassName}
        >
          {value}
        </text>
        {/* Texto de la etiqueta (Días, Horas, etc.) */}
        <text
          x="50%"
          y="65%"
          textAnchor="middle"
          dominantBaseline="middle"
          style={{ fill: textColor }}
          className={labelClassName}
        >
          {label}
        </text>
      </svg>
    </div>
  );
};

export default CountdownCircles;