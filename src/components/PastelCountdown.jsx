import React, { useState, useEffect } from "react";

function PastelCountdown({ targetDate, bgColor }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const now = new Date();
    const difference = targetDate - now;
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return null;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!timeLeft) {
    return (
      <div className="flex flex-col items-center justify-center p-6">
        <p className="text-2xl font-semibold text-pink-600">¡Llegó el gran día!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-6 px-4">
      <div className="grid grid-cols-4 gap-3">
        <CountCard label="DÍAS" value={timeLeft.days} bgColor={bgColor}/>
        <CountCard label="HORAS" value={timeLeft.hours}  bgColor={bgColor}/>
        <CountCard label="MIN" value={timeLeft.minutes}  bgColor={bgColor}/>
        <CountCard label="SEG" value={timeLeft.seconds}  bgColor={bgColor}/>
      </div>
    </div>
  );
}

function CountCard({ label, value, bgColor }) {
  // Forzamos dos dígitos si quieres (opcional):
  const displayValue = value < 10 ? `0${value}` : `${value}`;

  return (
    <div className={`flex flex-col items-center justify-center ${bgColor} rounded-lg shadow-lg p-4 w-16 sm:w-20`}>
      <span className="text-3xl sm:text-4xl font-bold text-pink-600 leading-tight">
        {displayValue}
      </span>
      <span className="text-xs sm:text-sm font-semibold text-pink-700 tracking-wide mt-1 uppercase">
        {label}
      </span>
    </div>
  );
}

export default PastelCountdown;