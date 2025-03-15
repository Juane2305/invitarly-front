import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import plantillas from "../data/plantillasData";

const categoriasDisponibles = [
  { label: "Todos", value: "todos" },
  { label: "Modernas", value: "moderna" },
  { label: "Clásicas", value: "clasica" },
  { label: "Elegantes", value: "elegante" },
];

const PlantillasSection = () => {
  const { nombrePlan } = useParams();
  const navigate = useNavigate();

  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("todos");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const plantillasFiltradas = plantillas.filter((plantilla) => {
    if (categoriaSeleccionada === "todos") return true;
    return plantilla.categoria === categoriaSeleccionada;
  });

  const handleNavigateToPlantilla = (idPlantilla) => {
    navigate(`/plantilla/${nombrePlan}/${idPlantilla}`);
  };

  const handleVolver = () => {
    navigate(`/`);
  };

  return (
    <section className="py-12 bg-gray-100 min-h-screen">
      <button
        onClick={handleVolver}
        className="fixed top-4 left-4 bg-blue-500 text-white px-4 py-2 rounded shadow-lg hover:bg-blue-600 transition z-50"
      >
        Volver
      </button>

      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center mt-8 md:mt-0 px-5 md:px-0">
          Plantillas del plan {nombrePlan}
        </h2>

        <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
          {categoriasDisponibles.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setCategoriaSeleccionada(cat.value)}
              className={`
                px-4 py-2 rounded-full font-semibold border-2 
                transition 
                ${
                  categoriaSeleccionada === cat.value
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white"
                }
              `}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid de plantillas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {plantillasFiltradas.map((plantilla) => (
            <div
              key={plantilla.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => handleNavigateToPlantilla(plantilla.id)}
            >
              <img
                src={plantilla.imagen}
                alt={plantilla.nombre}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  {plantilla.nombre}
                </h3>
                <p className="text-gray-600 mb-4">
                  {plantilla.descripcion}
                </p>
                <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                  Ver Plantilla
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center text-gray-500 text-sm">
          Estamos trabajando constantemente para agregar más plantillas y estilos. <br />
          ¡Mantente al tanto de nuestras novedades!
        </div>
      </div>
    </section>
  );
};

export default PlantillasSection;