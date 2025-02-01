import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainPage } from "./views/MainPage";
import PlantillasSection from "./components/PlantillasSection";
import PlantillaPreview from "./components/PlantillaPreview";
import VintagePreview from "./components/VintagePreview";
import ElegantePreview from "./components/ElegantePreview";
import ConfirmacionPago from "./components/ConfirmacionPago"; 
import PagoExitoso from "./components/PagoExitoso";
import PagoPendiente from "./components/PagoPendiente";
import PagoFallido from "./components/PagoFallido";
import AdminPage from "./components/AdminPage";
import Loader from "./components/Loader";

function App() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula una carga. Reemplaza esto por la lógica real de carga de datos o de tu app.
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={loading ? <Loader /> : <MainPage />} />
        <Route path="/plantillas/:nombrePlan" element={<PlantillasSection />} />
        <Route path="/plantilla/:nombrePlan/moderna" element={<PlantillaPreview />} />
        <Route path="/plantilla/:nombrePlan/vintage" element={<VintagePreview />} />
        <Route path="/plantilla/:nombrePlan/elegante" element={<ElegantePreview />} />
        {/* Nueva ruta para la página de confirmación de pago */}
        <Route
          path="/confirmacion-pago/:nombrePlan/:nombrePlantilla"
          element={<ConfirmacionPago />}
        />
        <Route path="/pago-exitoso" element={<PagoExitoso />} />
        <Route path="/pago-pendiente" element={<PagoPendiente />} />
        <Route path="/pago-fallido" element={<PagoFallido />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;