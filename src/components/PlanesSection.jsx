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
        const response = await axios.get("http://localhost:8080/api/planes");
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
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
              // Usa plan.nombre para redirigir
              onClick={() => handleNavigate(plan.nombre)}
            >
              <img
                src={plan.imagen}
                alt={plan.nombre}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlanesSection;