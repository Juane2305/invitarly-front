import React, { useState, useEffect, Suspense } from "react";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import PlantillasSection from "./components/PlantillasSection";
import ConfirmacionPago from "./components/ConfirmacionPago";
import PagoExitoso from "./components/PagoExitoso";
import PagoPendiente from "./components/PagoPendiente";
import PagoFallido from "./components/PagoFallido";
import AdminPage from "./components/AdminPage";
import Spinner from "./components/Spinner";
import WhatsAppFloatingButton from "./components/WhatsappFloatingButton";

// Importa tu map de componentes
import { plantillasComponentsMap } from "./components/plantillasComponentsMap";

// Carga diferida del MainPage
const MainPage = React.lazy(() => import("./views/MainPage"));

// (Opcional) Un componente simple para cuando no exista la plantilla en el map
function NotFound() {
  return <div className="text-center mt-20">Plantilla no encontrada</div>;
}

// Este componente intermedio decide qué plantilla renderizar
function PlantillaRouter() {
  const { nombrePlan, idPlantilla } = useParams();

  const ComponentePlantilla = plantillasComponentsMap[idPlantilla] || NotFound;

  // Pasamos `nombrePlan` como prop, por si cada plantilla la necesita
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
    return <Spinner />;
  }

  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
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
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
        <WhatsAppFloatingButton />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;