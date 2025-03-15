import React, { useState, useEffect, Suspense } from "react";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import PlantillasSection from "./components/PlantillasSection";
import ConfirmacionPago from "./components/ConfirmacionPago";
import PagoExitoso from "./components/PagoExitoso";
import PagoPendiente from "./components/PagoPendiente";
import PagoFallido from "./components/PagoFallido";
import AdminPage from "./components/AdminPage";
import WhatsAppFloatingButton from "./components/WhatsappFloatingButton";

import { plantillasComponentsMap } from "./components/plantillasComponentsMap";
import Loader from "./components/Loader";
import InvitacionPage from "./views/InvitacionPage";

const MainPage = React.lazy(() => import("./views/MainPage"));

function NotFound() {
  return <div className="text-center mt-20">Plantilla no encontrada</div>;
}

function PlantillaRouter() {
  const { nombrePlan, idPlantilla } = useParams();

  const ComponentePlantilla = plantillasComponentsMap[idPlantilla] || NotFound;

  return <ComponentePlantilla nombrePlan={nombrePlan} />;
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  const hideWhatsAppButton = location.pathname.startsWith("/invitacion/");

  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<MainPage />} />

          <Route path="/plantillas/:nombrePlan" element={<PlantillasSection />} />

          
          <Route path="/plantilla/:nombrePlan/:idPlantilla" element={<PlantillaRouter />} />

          <Route
            path="/confirmacion-pago/:nombrePlan/:nombrePlantilla"
            element={<ConfirmacionPago />}
          />
          <Route path="/pago-exitoso" element={<PagoExitoso />} />
          <Route path="/pago-pendiente" element={<PagoPendiente />} />
          <Route path="/pago-fallido" element={<PagoFallido />} />
          <Route path="/invitacion/:slug" element={<InvitacionPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
        {!hideWhatsAppButton && <WhatsAppFloatingButton />}
      </Suspense>
    </BrowserRouter>
  );
}

export default App;