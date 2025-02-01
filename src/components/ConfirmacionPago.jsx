import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaSpinner } from "react-icons/fa";

const ConfirmacionPago = () => {
  const { nombrePlan, nombrePlantilla } = useParams();
  const navigate = useNavigate();

  // Funcionalidades según el plan
  const funcionalidades = {
    gold: ["musica", "galeriaFotos", "instagramWall"],
    silver: ["musica"],
    basico: [""],
  };

  const funcionalidadesPlan = funcionalidades[nombrePlan] || [];

  // Estados para los datos del cliente
  const [cliente, setCliente] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
  });

  // Estados para los datos personalizados de la plantilla
  const [datosPlantilla, setDatosPlantilla] = useState({
    novios: "",
    fechaHora: null,
    datosBancarios: "",
    dressCode: "",
    mensaje: "",
    cancion: "",
    instagramWall: "",
    linkEvento: "",
    linkCeremonia: "",
    comentariosAdicionales: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Manejar cambios en el formulario del cliente
  const handleChangeCliente = (e) => {
    const { name, value } = e.target;
    setCliente((prev) => ({ ...prev, [name]: value }));
  };

  // Manejar cambios en los datos personalizados de la plantilla
  const handleChangePlantilla = (e) => {
    const { name, value } = e.target;
    setDatosPlantilla((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setDatosPlantilla((prev) => ({ ...prev, fechaHora: date }));
  };

  // Enviar datos al servidor
  const handlePagar = async () => {
    setLoading(true);
    setError(null);

    const payload = {
      nombre: cliente.nombre,
      apellido: cliente.apellido,
      email: cliente.email,
      telefono: cliente.telefono,
      descripcion: `Invitación Digital Plan: ${nombrePlan}, Plantilla: ${nombrePlantilla}`,
      novios: datosPlantilla.novios,
      fechaHora: datosPlantilla.fechaHora,
      datosBancarios: datosPlantilla.datosBancarios,
      dressCode: datosPlantilla.dressCode,
      mensaje: datosPlantilla.mensaje,
      cancion: datosPlantilla.cancion,
      instagramWall: datosPlantilla.instagramWall,
      linkEvento: datosPlantilla.linkEvento,
      linkCeremonia: datosPlantilla.linkCeremonia,
      comentariosAdicionales: datosPlantilla.comentariosAdicionales,
    };    

    try {
      console.log("Payload a enviar:", payload);
      const response = await axios.post(
        `http://localhost:8080/api/pagos/crear-preferencia?plan=${nombrePlan}&plantilla=${nombrePlantilla}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      window.location.href = response.data;  // Redirige al init_point de Mercado Pago
    } catch (error) {
      console.error(
        "Error al generar el enlace de pago:",
        error.response?.data || error.message
      );
      setError(
        "Hubo un problema al generar el enlace de pago. Por favor, intenta de nuevo."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold my-4">
        ¡Gracias por elegir Invitarly!
      </h1>

      {/* Formulario para datos de la plantilla */}
      <form className="w-full max-w-lg mb-6">
        <h2 className="text-lg font-semibold mb-4">
          Personaliza tu invitación
        </h2>

        {/* Nombres de los novios */}
        <div className="mb-4">
          <label htmlFor="novios" className="block text-gray-700">
            Nombres de los novios:
          </label>
          <input
            type="text"
            id="novios"
            name="novios"
            value={datosPlantilla.novios}
            onChange={handleChangePlantilla}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* Fecha y hora de la boda */}
        <div className="mb-4">
          <label htmlFor="fechaHora" className="block text-gray-700">
            Fecha y hora de la boda:
          </label>
          <DatePicker
            selected={datosPlantilla.fechaHora}
            onChange={handleDateChange}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="dd/MM/yyyy h:mm aa"
            placeholderText="Fecha y Hora"
            className="w-full border border-gray-300 rounded px-4 py-2"
            id="fechaHora"
          />
        </div>

        {/* Link al evento */}
        <div className="mb-4">
          <label htmlFor="linkEvento" className="block text-gray-700">
            Link de Google Maps del evento:
          </label>
          <input
            type="text"
            id="linkEvento"
            name="linkEvento"
            value={datosPlantilla.linkEvento}
            onChange={handleChangePlantilla}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* Link a la ceremonia */}
        <div className="mb-4">
          <label htmlFor="linkCeremonia" className="block text-gray-700">
            Link de Google Maps de la ceremonia:
          </label>
          <input
            type="text"
            id="linkCeremonia"
            name="linkCeremonia"
            value={datosPlantilla.linkCeremonia}
            onChange={handleChangePlantilla}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* Datos bancarios */}
        <div className="mb-4">
          <label htmlFor="datosBancarios" className="block text-gray-700">
            Datos bancarios:
          </label>
          <textarea
            id="datosBancarios"
            name="datosBancarios"
            value={datosPlantilla.datosBancarios}
            onChange={handleChangePlantilla}
            placeholder="CBU - Alias - Banco"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* Dress Code */}
        <div className="mb-4">
          <label htmlFor="dressCode" className="block text-gray-700">
            Dress Code:
          </label>
          <input
            type="text"
            id="dressCode"
            name="dressCode"
            value={datosPlantilla.dressCode}
            onChange={handleChangePlantilla}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* Mensaje personalizado */}
        <div className="mb-4">
          <label htmlFor="mensaje" className="block text-gray-700">
            Mensaje en la invitación (opcional):
          </label>
          <textarea
            id="mensaje"
            name="mensaje"
            value={datosPlantilla.mensaje}
            onChange={handleChangePlantilla}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Un breve mensaje especial para tus invitados"
          />
        </div>

        {/* Campos condicionales según el plan */}
        {funcionalidadesPlan.includes("musica") && (
          <div className="mb-4">
            <label htmlFor="cancion" className="block text-gray-700">
              Nombre o link de la canción:
            </label>
            <input
              type="text"
              id="cancion"
              name="cancion"
              value={datosPlantilla.cancion}
              onChange={handleChangePlantilla}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
        )}

        {funcionalidadesPlan.includes("instagramWall") && (
          <div className="mb-4">
            <label htmlFor="instagramWall" className="block text-gray-700">
              Usuario para Instagram Wall (link al perfil):
            </label>
            <input
              type="text"
              id="instagramWall"
              name="instagramWall"
              value={datosPlantilla.instagramWall}
              onChange={handleChangePlantilla}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
        )}

        {/* Comentarios adicionales */}
        <div className="mb-4">
          <label htmlFor="comentariosAdicionales" className="block text-gray-700">
            Comentarios adicionales (opcional):
          </label>
          <textarea
            id="comentariosAdicionales"
            name="comentariosAdicionales"
            value={datosPlantilla.comentariosAdicionales}
            onChange={handleChangePlantilla}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Si tienes alguna solicitud especial o comentario adicional, escríbelo aquí."
          />
        </div>

        {/* Galería de fotos (solo si plan = gold) */}
        {funcionalidadesPlan.includes("galeriaFotos") && (
          <div className="my-4">
            <label className="block text-gray-700 font-bold">
              Galería de Fotos:
            </label>
            <p className="text-sm text-gray-600">
              Por favor, envía tus fotos (máximo 10) a nuestro correo:{" "}
              <a
                href="mailto:invitarly@gmail.com"
                className="text-blue-500 hover:underline"
              >
                invitarly@gmail.com
              </a>{" "}
              con el asunto "Galería de imágenes de [Nombre y apellido]" o por
              WhatsApp al número:{" "}
              <a
                href="https://wa.me/5492612404253"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                +54 9 261 240 4253
              </a>
              .
            </p>
          </div>
        )}
      </form>

      {/* Formulario para datos del cliente */}
      <form className="w-full max-w-lg mb-6">
        <h2 className="text-lg font-semibold mb-4">Tus datos</h2>
        <div className="mb-4">
          <label htmlFor="nombre" className="block text-gray-700">
            Nombre:
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={cliente.nombre}
            onChange={handleChangeCliente}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="apellido" className="block text-gray-700">
            Apellido:
          </label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            value={cliente.apellido}
            onChange={handleChangeCliente}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={cliente.email}
            onChange={handleChangeCliente}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="telefono" className="block text-gray-700">
            Teléfono:
          </label>
          <input
            type="text"
            id="telefono"
            name="telefono"
            value={cliente.telefono}
            onChange={handleChangeCliente}
            placeholder="Ej: +5492611234567"
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
      </form>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Botón de pago con loader */}
      <button
        onClick={handlePagar}
        disabled={
          loading ||
          !cliente.nombre ||
          !cliente.apellido ||
          !cliente.email ||
          !cliente.telefono
        }
        className="bg-green-500 text-white px-4 py-2 rounded shadow-lg hover:bg-green-600 transition flex items-center justify-center"
      >
        {loading ? (
          <>
            <FaSpinner className="animate-spin mr-2" />
            Generando enlace...
          </>
        ) : (
          "Pagar con Mercado Pago"
        )}
      </button>
      <button
        onClick={() => navigate(-1)}
        className="mt-4 text-blue-500 underline hover:text-blue-700 transition"
      >
        Volver
      </button>
    </div>
  );
};

export default ConfirmacionPago;