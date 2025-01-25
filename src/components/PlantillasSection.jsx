import { useParams, useNavigate } from "react-router-dom";


const PlantillasSection = () => {
  const { nombrePlan } = useParams(); // Captura el parámetro de la URL
  const navigate = useNavigate();
 

  const plantillas = [
    { nombre: "Moderna", descripcion: "Plantilla moderna y elegante", imagen: "https://res.cloudinary.com/dfschbyq2/image/upload/v1736810918/Disen%CC%83o_sin_ti%CC%81tulo_2_hlydij.png" },
    { nombre: "Vintage", descripcion: "Plantilla con estilo clásico", imagen: "https://res.cloudinary.com/dfschbyq2/image/upload/v1736946812/0cbb8523-5c02-4114-bed2-4e26ef2b7fff.png" },
    { nombre: "Elegante", descripcion: "Plantilla con diseño sofisticado", imagen: "https://res.cloudinary.com/dfschbyq2/image/upload/v1736966053/4d0944bf-da3f-4720-9547-4d55b8b5e838.png" },
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