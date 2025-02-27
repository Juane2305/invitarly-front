import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const PlanesSection = () => {
  const navigate = useNavigate();
  const [planes, setPlanes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlanes = async () => {
      try {
        const response = await axios.get("https://api.invitarly.com/api/planes");
        setPlanes(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Hubo un error al cargar los planes.");
        setLoading(false);
      }
    };

    fetchPlanes();
  }, []);

  const handleNavigate = (nombrePlan) => {
    // Navega a la ruta de plantillas para ese plan
    navigate(`/plantillas/${nombrePlan.toLowerCase()}`);
  };

  if (loading) {
    return <p className="text-center">Cargando planes...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <section className="py-12 bg-gray-100" id="planes">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8">Nuestros Planes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {planes.map((plan) => (
            <div
              key={plan.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow flex flex-col"
            >
              <img
                src={plan.imagen}
                alt={plan.nombre}
                className="w-full h-48 object-cover"
              />
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  {plan.nombre}
                </h3>
                <p className="text-gray-600">{plan.descripcion}</p>
                <ul className="text-gray-600 mt-4 list-disc list-inside text-left">
                  {Array.isArray(plan.funcionalidades) &&
                    plan.funcionalidades.map((funcionalidad, index) => (
                      <li key={index} className="capitalize">
                        {funcionalidad.replace(/([A-Z])/g, " $1").toLowerCase()}
                      </li>
                    ))}
                </ul>
                {/* Contenedor para precio y botón, empujado hacia abajo */}
                <div className="mt-auto">
                  <p className="mt-4 text-xl font-bold text-gray-800">
                    ARS {plan.precio.toLocaleString('es-AR')}
                  </p>
                  <button
                    onClick={() => handleNavigate(plan.nombre)}
                    className="mt-4 bg-gold border-2 border-gold text-white px-5 py-3 rounded-full hover:bg-transparent hover:text-gray-800 transition"
                  >
                    Ver Plantillas
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlanesSection;