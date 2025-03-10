import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaSpinner } from "react-icons/fa";
import logoMP from "../assets/logoMP.svg";

// Función auxiliar para validar emails
const isValidEmail = (email) => {
  // Patrón simple de validación de correo (puedes mejorarlo si lo deseas)
  return /^\S+@\S+\.\S+$/.test(email);
};

// Función auxiliar para validar URLs
const isValidURL = (str) => {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
};

const ConfirmacionPago = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  // Errores específicos de cada campo
  const [fieldErrors, setFieldErrors] = useState({});

  // Manejar cambios en el formulario del cliente
  const handleChangeCliente = (e) => {
    const { name, value } = e.target;
    setCliente((prev) => ({ ...prev, [name]: value }));

    setFieldErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (newErrors[name]) {
        delete newErrors[name];
      }
      return newErrors;
    });
  };

  // Manejar cambios en los datos personalizados de la plantilla
  const handleChangePlantilla = (e) => {
    const { name, value } = e.target;
    setDatosPlantilla((prev) => ({ ...prev, [name]: value }));
  
    setFieldErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (newErrors[name]) {
        delete newErrors[name];
      }
      return newErrors;
    });
  };

  const handleDateChange = (date) => {
    setDatosPlantilla((prev) => ({ ...prev, fechaHora: date }));
  };

  // Función para validar campos antes de enviar
  const validateFields = () => {
    const errors = {};

    // Validación novios (requerido)
    if (!datosPlantilla.novios.trim()) {
      errors.novios = "Debes ingresar los nombres de los novios.";
    }

    // Validación fechaHora (requerido)
    if (!datosPlantilla.fechaHora) {
      errors.fechaHora = "Debes seleccionar la fecha y hora de la boda.";
    }

    // Validación linkEvento (opcional, pero si se llena debe ser URL válida)
    if (datosPlantilla.linkEvento.trim()) {
      if (!isValidURL(datosPlantilla.linkEvento)) {
        errors.linkEvento = "El link del evento no es una URL válida.";
      }
    }

    // Validación linkCeremonia (opcional, pero si se llena debe ser URL válida)
    if (datosPlantilla.linkCeremonia.trim()) {
      if (!isValidURL(datosPlantilla.linkCeremonia)) {
        errors.linkCeremonia = "El link de la ceremonia no es una URL válida.";
      }
    }

    // Datos bancarios (opcional, pero si plan=gold, sugerimos que no esté vacío)
    // Ejemplo: si plan es "gold" y datosBancarios está vacío, advertimos.
    if (nombrePlan === "gold" && !datosPlantilla.datosBancarios.trim()) {
      errors.datosBancarios =
        "En el plan Gold, te sugerimos indicar datos bancarios para tus invitados.";
    }

    if (!datosPlantilla.linkEvento) {
      errors.linkEvento = "El link del evento es obligatorio.";
    }

    // Ejemplo: Validar Link de Google Maps de la ceremonia
    if (!datosPlantilla.linkCeremonia) {
      errors.linkCeremonia = "El link de la ceremonia es obligatorio.";
    }

    if (!datosPlantilla.dressCode) {
      errors.dressCode = "El Dress Code es obligatorio.";
    }

    // Ejemplo: Canción obligatoria solo si el plan incluye música
    if (funcionalidadesPlan.includes("musica") && !datosPlantilla.cancion) {
      errors.cancion = "La canción es obligatoria para este plan.";
    }

    // Validación de datos del comprador
    if (!cliente.nombre.trim()) {
      errors.nombre = "Debes ingresar tu nombre.";
    }
    if (!cliente.apellido.trim()) {
      errors.apellido = "Debes ingresar tu apellido.";
    }
    if (!cliente.email.trim()) {
      errors.email = "Debes ingresar tu email.";
    } else if (!isValidEmail(cliente.email)) {
      errors.email = "El email no es válido.";
    }
    if (!cliente.telefono.trim()) {
      errors.telefono = "Debes ingresar tu teléfono.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Enviar datos al servidor
  const handlePagar = async () => {
    setLoading(true);
    setError(null);

    // Primero validamos los campos
    const isValid = validateFields();
    if (!isValid) {
      setLoading(false);
      return;
    }

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
        `https://api.invitarly.com/api/pagos/crear-preferencia?plan=${nombrePlan}&plantilla=${nombrePlantilla}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Redirige al init_point de Mercado Pago
      window.location.href = response.data;
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
    <div className="w-full flex flex-col justify-center items-center px-4 sm:px-6 md:px-10 my-10">
      <button
        onClick={() => navigate(-1)}
        className="fixed top-4 left-10 border-2 border-gray-950 px-2 py-2 rounded-md hover:text-white hover:bg-gray-950 transition"
      >
        Volver
      </button>
      <h2 className="text-2xl font-bold my-6 text-center sm:text-left">
        ¡Gracias por elegir Invitarly!
      </h2>

      {/* Formulario para datos de la plantilla */}
      <form className="w-full max-w-lg mb-6 flex flex-col">
        <h2 className="text-lg font-semibold mb-4 text-center sm:text-left">
          Personaliza tu invitación
        </h2>

        {/* Nombres de los novios */}
        <div className="mb-2">
          <label htmlFor="novios" className="block text-gray-700">
            Nombres de los novios:
          </label>
          <input
            type="text"
            id="novios"
            name="novios"
            value={datosPlantilla.novios}
            onChange={handleChangePlantilla}
            className="w-full border border-gray-300 rounded px-3 py-2 mb-1"
          />
          {fieldErrors.novios && (
            <p className="text-red-500 text-sm">{fieldErrors.novios}</p>
          )}
        </div>

        {/* Fecha y hora de la boda */}
        <div className="mb-2">
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
            className="w-full border border-gray-300 rounded px-4 py-2 mb-1"
            id="fechaHora"
          />
          {fieldErrors.fechaHora && (
            <p className="text-red-500 text-sm">{fieldErrors.fechaHora}</p>
          )}
        </div>

        {/* Link al evento */}
        <div className="mb-2">
          <label htmlFor="linkEvento" className="block text-gray-700">
            Link de Google Maps del evento:
          </label>
          <input
            type="text"
            id="linkEvento"
            name="linkEvento"
            value={datosPlantilla.linkEvento}
            onChange={handleChangePlantilla}
            className="w-full border border-gray-300 rounded px-3 py-2 mb-1"
          />
          {fieldErrors.linkEvento && (
            <p className="text-red-500 text-sm">{fieldErrors.linkEvento}</p>
          )}
        </div>

        {/* Link a la ceremonia */}
        <div className="mb-2">
          <label htmlFor="linkCeremonia" className="block text-gray-700">
            Link de Google Maps de la ceremonia:
          </label>
          <input
            type="text"
            id="linkCeremonia"
            name="linkCeremonia"
            value={datosPlantilla.linkCeremonia}
            onChange={handleChangePlantilla}
            className="w-full border border-gray-300 rounded px-3 py-2 mb-1"
          />
          {fieldErrors.linkCeremonia && (
            <p className="text-red-500 text-sm">{fieldErrors.linkCeremonia}</p>
          )}
        </div>

        {/* Datos bancarios */}
        <div className="mb-2">
          <label htmlFor="datosBancarios" className="block text-gray-700">
            Datos bancarios:
          </label>
          <textarea
            id="datosBancarios"
            name="datosBancarios"
            value={datosPlantilla.datosBancarios}
            onChange={handleChangePlantilla}
            placeholder="CBU - Alias - Banco"
            className="w-full border border-gray-300 rounded px-3 py-2 mb-1"
          />
          {fieldErrors.datosBancarios && (
            <p className="text-red-500 text-sm">{fieldErrors.datosBancarios}</p>
          )}
        </div>

        {/* Dress Code */}
        <div className="mb-2">
          <label htmlFor="dressCode" className="block text-gray-700">
            Código de Vestimenta:
          </label>
          <input
            type="text"
            id="dressCode"
            name="dressCode"
            value={datosPlantilla.dressCode}
            onChange={handleChangePlantilla}
            placeholder="Formal / Informal / Casual"
            className="w-full border border-gray-300 rounded px-3 py-2 mb-1"
          />
          {fieldErrors.dressCode && (
            <p className="text-red-500 text-sm">{fieldErrors.dressCode}</p>
          )}
        </div>

        {/* Mensaje personalizado */}
        <div className="mb-2">
          <label htmlFor="mensaje" className="block text-gray-700">
            Mensaje en la invitación (opcional):
          </label>
          <textarea
            id="mensaje"
            name="mensaje"
            value={datosPlantilla.mensaje}
            onChange={handleChangePlantilla}
            className="w-full border border-gray-300 rounded px-3 py-2 mb-1"
            placeholder="¡Gracias por venir!"
          />
        </div>

        {/* Campos condicionales según el plan */}
        {funcionalidadesPlan.includes("musica") && (
          <div className="mb-2">
            <label htmlFor="cancion" className="block text-gray-700">
              Nombre o link de la canción:
            </label>
            <input
              type="text"
              id="cancion"
              name="cancion"
              value={datosPlantilla.cancion}
              onChange={handleChangePlantilla}
              className="w-full border border-gray-300 rounded px-3 py-2 mb-1"
            />
          </div>
        )}

        {funcionalidadesPlan.includes("instagramWall") && (
          <div className="mb-2">
            <label htmlFor="instagramWall" className="block text-gray-700">
              Usuario para Instagram Wall (opcional):
            </label>
            <input
              type="text"
              id="instagramWall"
              name="instagramWall"
              value={datosPlantilla.instagramWall}
              onChange={handleChangePlantilla}
              placeholder="@usuario"
              className="w-full border border-gray-300 rounded px-3 py-2 mb-1"
            />
          </div>
        )}

        {/* Comentarios adicionales */}
        <div className="mb-2">
          <label
            htmlFor="comentariosAdicionales"
            className="block text-gray-700"
          >
            Comentarios adicionales (opcional):
          </label>
          <textarea
            id="comentariosAdicionales"
            name="comentariosAdicionales"
            value={datosPlantilla.comentariosAdicionales}
            onChange={handleChangePlantilla}
            className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
            placeholder="Si tienes alguna solicitud especial o comentario adicional, escríbelo aquí."
          />
        </div>

        {/* Galería de fotos (solo si plan = gold) */}
        {funcionalidadesPlan.includes("galeriaFotos") && (
          <div className="my-2">
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
      <form className="w-full max-w-lg mb-6 flex flex-col ">
        <h2 className="text-lg font-semibold mb-4 text-center sm:text-left">
          Tus datos
        </h2>
        <div className="mb-2">
          <label htmlFor="nombre" className="block text-gray-700">
            Nombre:
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={cliente.nombre}
            onChange={handleChangeCliente}
            className="w-full border border-gray-300 rounded px-3 py-2 mb-1"
            required
          />
          {fieldErrors.nombre && (
            <p className="text-red-500 text-sm">{fieldErrors.nombre}</p>
          )}
        </div>
        <div className="mb-2">
          <label htmlFor="apellido" className="block text-gray-700">
            Apellido:
          </label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            value={cliente.apellido}
            onChange={handleChangeCliente}
            className="w-full border border-gray-300 rounded px-3 py-2 mb-1"
            required
          />
          {fieldErrors.apellido && (
            <p className="text-red-500 text-sm">{fieldErrors.apellido}</p>
          )}
        </div>
        <div className="mb-2">
          <label htmlFor="email" className="block text-gray-700">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={cliente.email}
            onChange={handleChangeCliente}
            className="w-full border border-gray-300 rounded px-3 py-2 mb-1"
            required
          />
          {fieldErrors.email && (
            <p className="text-red-500 text-sm">{fieldErrors.email}</p>
          )}
        </div>
        <div className="mb-1">
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
            className="w-full border border-gray-300 rounded px-3 py-2 mb-1"
            required
          />
          {fieldErrors.telefono && (
            <p className="text-red-500 text-sm">{fieldErrors.telefono}</p>
          )}
        </div>
      </form>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <button
        type="button"
        onClick={handlePagar}
        disabled={loading} 
        className="w-full sm:w-auto 
             bg-[#009ee3] 
             text-white 
             px-6 py-3 
             rounded 
             shadow-lg 
             hover:bg-[#007bbd] 
             transition 
             flex 
             items-center 
             justify-center
             cursor-pointer"
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <FaSpinner className="animate-spin mr-2" />
            <span>Generando enlace...</span>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <img src={logoMP} alt="Mercado Pago" className="h-8 w-8 mr-2" />
            <span>Pagar con Mercado Pago</span>
          </div>
        )}
      </button>
    </div>
  );
};

export default ConfirmacionPago;
