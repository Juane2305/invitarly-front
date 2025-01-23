import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainPage } from "./views/MainPage";
import PlantillasSection from "./components/PlantillasSection";
import PlantillaPreview from "./components/PlantillaPreview";
import VintagePreview from "./components/VintagePreview";
import ElegantePreview from "./components/ElegantePreview";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/plantillas/:nombrePlan" element={<PlantillasSection />} />
        <Route path="/plantilla/:nombrePlan/moderna" element={<PlantillaPreview />} />
        <Route path="/plantilla/:nombrePlan/vintage" element={<VintagePreview />} />
        <Route path="/plantilla/:nombrePlan/elegante" element={<ElegantePreview />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;