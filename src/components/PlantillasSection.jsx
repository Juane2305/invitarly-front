import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";


const PlantillasSection = () => {

  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);

  const { nombrePlan } = useParams(); 
  const navigate = useNavigate();
 

  const plantillas = [
    { nombre: "Moderna", descripcion: "Plantilla moderna y elegante", imagen: "https://res.cloudinary.com/dfschbyq2/image/upload/v1736810918/Disen%CC%83o_sin_ti%CC%81tulo_2_hlydij.png" },
    { nombre: "Vintage", descripcion: "Plantilla con estilo clásico", imagen: "https://res.cloudinary.com/dfschbyq2/image/upload/v1739397760/405d2bfd-435f-4f5c-a5df-831413b7d2e8.png" },
    { nombre: "Elegante", descripcion: "Plantilla con diseño sofisticado", imagen: "https://res.cloudinary.com/dfschbyq2/image/upload/v1739540975/3bb55ba3-51a6-4701-9927-9ce52bc3d67a_v4buja.jpg" },
  ];

  const handleNavigateToPlantilla = (nombrePlantilla) => {
    navigate(`/plantilla/${nombrePlan}/${nombrePlantilla.toLowerCase()}`);
  };

  const handleVolver = () => {
    navigate(`/`);
  };

  return (
    <section className="py-12 bg-gray-100 h-screen">
      <button
        onClick={handleVolver}
        className="fixed top-4 left-4 bg-blue-500 text-white px-4 py-2 rounded shadow-lg hover:bg-blue-600 transition z-50"
      >
        Volver
      </button>
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8">Plantillas del plan {nombrePlan}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {plantillas.map((plantilla) => (
            <div
              key={plantilla.nombre}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => handleNavigateToPlantilla(plantilla.nombre)}
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
                <p className="text-gray-600 mb-4">{plantilla.descripcion}</p>
                <button
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Ver Plantilla
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlantillasSection;