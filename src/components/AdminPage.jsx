import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminPage() {
  // Si /api/ventas requiere token, ponlo en "necesitaToken = true"
  const necesitaToken = false; 
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const [ventas, setVentas] = useState([]);
  const [error, setError] = useState(null);

  // Para crear nueva venta
  const [nuevoCliente, setNuevoCliente] = useState("");
  const [nuevoEstado, setNuevoEstado] = useState("EN_PROCESO");

  useEffect(() => {
    cargarVentas();
  }, []);

  // Config para axios si se requiere token
  const getAxiosConfig = () => {
    if (!necesitaToken) return {};
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  };

  const cargarVentas = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/ventas",
        getAxiosConfig()
      );
      setVentas(response.data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Error al cargar ventas");
    }
  };

  const crearVenta = async () => {
    try {
      await axios.post(
        "http://localhost:8080/api/ventas",
        {
          clienteNombre: nuevoCliente,
          estado: nuevoEstado
        },
        getAxiosConfig()
      );
      // Luego refrescamos la tabla
      cargarVentas();
      setNuevoCliente("");
      setNuevoEstado("EN_PROCESO");
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Error al crear la venta");
    }
  };

  const cambiarEstado = async (ventaId, estado) => {
    try {
      await axios.put(
        `http://localhost:8080/api/ventas/${ventaId}/estado`,
        { estado },
        getAxiosConfig()
      );
      cargarVentas();
    } catch (err) {
      console.error(err);
      setError("Error al actualizar estado");
    }
  };

  // NUEVO: Eliminar venta
  const eliminarVenta = async (ventaId) => {
    try {
      // DELETE /api/ventas/{id}
      await axios.delete(
        `http://localhost:8080/api/ventas/${ventaId}`,
        getAxiosConfig()
      );
      // Actualizamos la lista
      cargarVentas();
    } catch (err) {
      console.error(err);
      setError("Error al eliminar la venta");
    }
  };

  if (necesitaToken && !token) {
    return <div>Necesitas iniciar sesión para ver esta página</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Panel de Administración</h1>
      {error && <div className="text-red-500 mb-2">{error}</div>}

      {/* Formulario para crear nueva venta */}
      <div className="mb-6 border p-4 rounded">
        <h2 className="text-lg font-semibold mb-2">Crear nueva venta</h2>
        <div className="mb-2">
          <label className="mr-2">Cliente:</label>
          <input
            className="border px-2 py-1"
            type="text"
            value={nuevoCliente}
            onChange={(e) => setNuevoCliente(e.target.value)}
          />
        </div>
        <div className="mb-2">
          <label className="mr-2">Estado inicial:</label>
          <select
            className="border px-2 py-1"
            value={nuevoEstado}
            onChange={(e) => setNuevoEstado(e.target.value)}
          >
            <option value="EN_PROCESO">EN_PROCESO</option>
            <option value="ENTREGADO">ENTREGADO</option>
            <option value="CANCELADO">CANCELADO</option>
          </select>
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={crearVenta}
        >
          Crear
        </button>
      </div>

      {/* Tabla de ventas */}
      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Cliente</th>
            <th className="border p-2">Estado</th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map((venta) => (
            <tr key={venta.id}>
              <td className="border p-2">{venta.id}</td>
              <td className="border p-2">{venta.clienteNombre}</td>
              <td className="border p-2">{venta.estado}</td>
              <td className="border p-2">
                {/* Botones para cambiar estado */}
                <button
                  className="bg-blue-500 text-white px-2 py-1 mr-2 rounded"
                  onClick={() => cambiarEstado(venta.id, "EN_PROCESO")}
                >
                  En Proceso
                </button>
                <button
                  className="bg-green-500 text-white px-2 py-1 mr-2 rounded"
                  onClick={() => cambiarEstado(venta.id, "ENTREGADO")}
                >
                  Entregado
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 mr-2 rounded"
                  onClick={() => cambiarEstado(venta.id, "CANCELADO")}
                >
                  Cancelar
                </button>
                {/* Nuevo: Botón eliminar */}
                <button
                  className="bg-red-700 text-white px-2 py-1 rounded"
                  onClick={() => eliminarVenta(venta.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPage;