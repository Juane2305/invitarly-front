import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaSpinner } from "react-icons/fa";
import logoMP from "../assets/logoMP.svg";

// Función auxiliar para validar emails
const isValidEmail = (email) => {
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

  // Determinamos el tipo de evento
  // gold, silver, basico => "boda"
  // xv => "xv"
  // bautismo => "bautismo"
  let tipoEvento = nombrePlan;
  if (["gold", "silver", "basico"].includes(nombrePlan)) {
    tipoEvento = "boda";
  }

  // Funcionalidades según el plan
  // (Si no vas a usar "cumple", puedes quitarlo de aquí)
  const funcionalidades = {
    gold: ["dressCode", "musica", "galeriaFotos", "instagramWall"],
    silver: ["dressCode", "musica", "galeriaFotos"],
    basico: [],
    xv: ["dressCode", "musica", "galeriaFotos", "instagramWall"],
    bautismo: ["musica", "galeriaFotos"],
  };

  const funcionalidadesPlan = funcionalidades[nombrePlan] || [];

  // Estados para datos del comprador
  const [cliente, setCliente] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
  });

  // Estados para los datos de la invitación
  // (Quitamos todo lo de "cumple")
  const [datosPlantilla, setDatosPlantilla] = useState({
    // Boda
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

    // XV
    nombreQuinceanera: "",
    tematicaXV: "",

    // Bautismo
    nombreBebe: "",
    nombrePadres: "",
    padrinos: "",
    linkCeremoniaBautismo: "", 
    linkFestejoBautismo: "",  
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Errores específicos de cada campo
  const [fieldErrors, setFieldErrors] = useState({});

  // Manejo de cambios en datos del comprador
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

  // Manejo de cambios en datos de la invitación
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

  // Validaciones
  const validateFields = () => {
    const errors = {};

    // =========== BODA ===========
    if (tipoEvento === "boda") {
      if (!datosPlantilla.novios.trim()) {
        errors.novios = "Debes ingresar los nombres de los novios.";
      }
      if (!datosPlantilla.fechaHora) {
        errors.fechaHora = "Debes seleccionar la fecha y hora de la boda.";
      }
      if (!datosPlantilla.linkEvento) {
        errors.linkEvento = "El link del evento es obligatorio.";
      }
      if (funcionalidadesPlan.includes("dressCode") && !datosPlantilla.dressCode) {
        errors.dressCode = "El Dress Code es obligatorio.";
      }
      if (nombrePlan === "gold" && !datosPlantilla.datosBancarios.trim()) {
        errors.datosBancarios =
          "En el plan Gold, te sugerimos indicar datos bancarios para tus invitados.";
      }
      if (funcionalidadesPlan.includes("musica") && !datosPlantilla.cancion) {
        errors.cancion = "La canción es obligatoria para este plan.";
      }
      // Validar URLs si se llenan
      if (datosPlantilla.linkEvento.trim() && !isValidURL(datosPlantilla.linkEvento)) {
        errors.linkEvento = "El link del evento no es una URL válida.";
      }
      if (datosPlantilla.linkCeremonia.trim() && !isValidURL(datosPlantilla.linkCeremonia)) {
        errors.linkCeremonia = "El link de la ceremonia no es una URL válida.";
      }
    }

    // =========== XV ===========
    if (tipoEvento === "xv") {
      if (!datosPlantilla.nombreQuinceanera.trim()) {
        errors.nombreQuinceanera = "Ingresa el nombre de la quinceañera.";
      }
      if (!datosPlantilla.fechaHora) {
        errors.fechaHora = "Selecciona la fecha y hora del evento.";
      }
      if (!datosPlantilla.linkEvento) {
        errors.linkEvento = "El link del evento es obligatorio.";
      }
      // Si el plan xv incluye dressCode, podrías validarlo también
      if (funcionalidadesPlan.includes("dressCode") && !datosPlantilla.dressCode) {
        errors.dressCode = "El Dress Code es obligatorio.";
      }
      // Si querés datos bancarios en XV
      if (!datosPlantilla.datosBancarios.trim()) {
        errors.datosBancarios = "Indica datos bancarios si deseas recibir regalos de ese modo.";
      }
      // Canción si "musica" está
      if (funcionalidadesPlan.includes("musica") && !datosPlantilla.cancion) {
        errors.cancion = "La canción es obligatoria para este plan.";
      }
      // Validar linkEvento si se llenó y no es URL
      if (datosPlantilla.linkEvento.trim() && !isValidURL(datosPlantilla.linkEvento)) {
        errors.linkEvento = "El link del evento no es una URL válida.";
      }
    }

    // =========== BAUTISMO ===========
    if (tipoEvento === "bautismo") {
      if (!datosPlantilla.nombreBebe.trim()) {
        errors.nombreBebe = "Ingresa el nombre del bebé.";
      }
      if (!datosPlantilla.nombrePadres.trim()) {
        errors.nombrePadres = "Ingresa el nombre de los padres.";
      }
      if (!datosPlantilla.fechaHora) {
        errors.fechaHora = "Selecciona la fecha y hora del bautismo.";
      }
      if (!datosPlantilla.padrinos.trim()) {
        errors.padrinos = "Ingresa el nombre de los padrinos.";
      }
      // linkCeremoniaBautismo es obligatorio?
      if (!datosPlantilla.linkCeremoniaBautismo.trim()) {
        errors.linkCeremoniaBautismo = "Ingresa el link de la ceremonia.";
      } else if (!isValidURL(datosPlantilla.linkCeremoniaBautismo)) {
        errors.linkCeremoniaBautismo = "El link de la ceremonia no es una URL válida.";
      }
      // linkFestejoBautismo es opcional, si se llena validamos
      if (datosPlantilla.linkFestejoBautismo.trim() && !isValidURL(datosPlantilla.linkFestejoBautismo)) {
        errors.linkFestejoBautismo = "El link de festejo no es una URL válida.";
      }
      // Canción opcional => no validamos a menos que quieras
      // Galería de fotos si "galeriaFotos" está
    }

    // =========== DATOS DEL COMPRADOR ===========
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
  

  const handlePagar = async () => {
    setLoading(true);
    setError(null);

    const isValid = validateFields();
    if (!isValid) {
      setLoading(false);
      return;
    }
    const localString = datosPlantilla.fechaHora
    ? datosPlantilla.fechaHora.toLocaleString("es-AR", {
        timeZone: "America/Argentina/Buenos_Aires",
      })
    : "";

    // Armamos el payload
    const payload = {
      nombre: cliente.nombre,
      apellido: cliente.apellido,
      email: cliente.email,
      telefono: cliente.telefono,
      descripcion: `Invitación Digital Plan: ${nombrePlan}, Plantilla: ${nombrePlantilla}`,

      // Boda
      novios: datosPlantilla.novios,
      fechaHora: localString,
      datosBancarios: datosPlantilla.datosBancarios,
      dressCode: datosPlantilla.dressCode,
      mensaje: datosPlantilla.mensaje,
      cancion: datosPlantilla.cancion,
      instagramWall: datosPlantilla.instagramWall,
      linkEvento: datosPlantilla.linkEvento,
      linkCeremonia: datosPlantilla.linkCeremonia,
      comentariosAdicionales: datosPlantilla.comentariosAdicionales,

      // XV
      nombreQuinceanera: datosPlantilla.nombreQuinceanera,
      tematicaXV: datosPlantilla.tematicaXV,

      // Bautismo
      nombreBebe: datosPlantilla.nombreBebe,
      nombrePadres: datosPlantilla.nombrePadres,
      padrinos: datosPlantilla.padrinos,
      linkCeremoniaBautismo: datosPlantilla.linkCeremoniaBautismo,
      linkFestejoBautismo: datosPlantilla.linkFestejoBautismo,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/pagos/crear-preferencia?plan=${nombrePlan}&plantilla=${nombrePlantilla}`,
        payload,
        { headers: { "Content-Type": "application/json" } }
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
        className="z-40 fixed top-4 left-5 md:left-10 border-2 border-gray-950 bg-black text-white px-2 py-2 rounded-md hover:text-white hover:bg-gray-700 transition"
      >
        Volver
      </button>

      <h2 className="text-2xl font-bold my-6 text-center sm:text-left">
        ¡Gracias por elegir Invitarly!
      </h2>

      {/* FORM DATOS PLANTILLA */}
      <form className="w-full max-w-lg mb-6 flex flex-col">
        <h2 className="text-lg font-semibold mb-4 text-center sm:text-left">
          Personaliza tu invitación
        </h2>

        {/* ========== BODA ========== */}
        {tipoEvento === "boda" && (
          <>
            {/* Novios */}
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

            {/* Fecha y hora */}
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

            {/* Link evento */}
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

            {/* Link ceremonia */}
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
          </>
        )}

        {/* Dress Code si el plan lo incluye (boda o xv) */}
        {funcionalidadesPlan.includes("dressCode") && (
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
        )}

        {/* ========== XV ========== */}
        {tipoEvento === "xv" && (
          <>
            <div className="mb-2">
              <label className="block text-gray-700">
                Nombre de la quinceañera:
              </label>
              <input
                type="text"
                name="nombreQuinceanera"
                value={datosPlantilla.nombreQuinceanera}
                onChange={handleChangePlantilla}
                className="w-full border border-gray-300 rounded px-3 py-2 mb-1"
              />
              {fieldErrors.nombreQuinceanera && (
                <p className="text-red-500 text-sm">{fieldErrors.nombreQuinceanera}</p>
              )}
            </div>

            <div className="mb-2">
              <label className="block text-gray-700">
                Fecha y hora del evento:
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
              />
              {fieldErrors.fechaHora && (
                <p className="text-red-500 text-sm">{fieldErrors.fechaHora}</p>
              )}
            </div>

            <div className="mb-2">
              <label className="block text-gray-700">
                Link de Google Maps del evento:
              </label>
              <input
                type="text"
                name="linkEvento"
                value={datosPlantilla.linkEvento}
                onChange={handleChangePlantilla}
                className="w-full border border-gray-300 rounded px-3 py-2 mb-1"
              />
              {fieldErrors.linkEvento && (
                <p className="text-red-500 text-sm">{fieldErrors.linkEvento}</p>
              )}
            </div>

            <div className="mb-2">
              <label className="block text-gray-700">
                Temática de la fiesta (opcional):
              </label>
              <input
                type="text"
                name="tematicaXV"
                value={datosPlantilla.tematicaXV}
                onChange={handleChangePlantilla}
                className="w-full border border-gray-300 rounded px-3 py-2 mb-1"
              />
            </div>

            {/* Datos bancarios también en XV */}
            <div className="mb-2">
              <label htmlFor="datosBancarios" className="block text-gray-700">
                Datos bancarios (opcional):
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
          </>
        )}

        {/* ========== BAUTISMO ========== */}
        {tipoEvento === "bautismo" && (
          <>
            <div className="mb-2">
              <label className="block text-gray-700">
                Nombre del bebé:
              </label>
              <input
                type="text"
                name="nombreBebe"
                value={datosPlantilla.nombreBebe}
                onChange={handleChangePlantilla}
                className="w-full border border-gray-300 rounded px-3 py-2 mb-1"
              />
              {fieldErrors.nombreBebe && (
                <p className="text-red-500 text-sm">{fieldErrors.nombreBebe}</p>
              )}
            </div>

            <div className="mb-2">
              <label className="block text-gray-700">
                Nombre de los padres:
              </label>
              <input
                type="text"
                name="nombrePadres"
                value={datosPlantilla.nombrePadres}
                onChange={handleChangePlantilla}
                className="w-full border border-gray-300 rounded px-3 py-2 mb-1"
              />
              {fieldErrors.nombrePadres && (
                <p className="text-red-500 text-sm">{fieldErrors.nombrePadres}</p>
              )}
            </div>

            <div className="mb-2">
              <label className="block text-gray-700">
                Fecha y hora del bautismo:
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
              />
              {fieldErrors.fechaHora && (
                <p className="text-red-500 text-sm">{fieldErrors.fechaHora}</p>
              )}
            </div>

            <div className="mb-2">
              <label className="block text-gray-700">
                Nombres de padrinos:
              </label>
              <input
                type="text"
                name="padrinos"
                value={datosPlantilla.padrinos}
                onChange={handleChangePlantilla}
                className="w-full border border-gray-300 rounded px-3 py-2 mb-1"
              />
              {fieldErrors.padrinos && (
                <p className="text-red-500 text-sm">{fieldErrors.padrinos}</p>
              )}
            </div>

            {/* Link de la ceremonia del bautismo */}
            <div className="mb-2">
              <label className="block text-gray-700">
                Link de Google Maps de la ceremonia:
              </label>
              <input
                type="text"
                name="linkCeremoniaBautismo"
                value={datosPlantilla.linkCeremoniaBautismo}
                onChange={handleChangePlantilla}
                className="w-full border border-gray-300 rounded px-3 py-2 mb-1"
              />
              {fieldErrors.linkCeremoniaBautismo && (
                <p className="text-red-500 text-sm">{fieldErrors.linkCeremoniaBautismo}</p>
              )}
            </div>

            {/* Link del festejo (opcional) */}
            <div className="mb-2">
              <label className="block text-gray-700">
                Link de Google Maps del festejo (opcional):
              </label>
              <input
                type="text"
                name="linkFestejoBautismo"
                value={datosPlantilla.linkFestejoBautismo}
                onChange={handleChangePlantilla}
                className="w-full border border-gray-300 rounded px-3 py-2 mb-1"
              />
              {fieldErrors.linkFestejoBautismo && (
                <p className="text-red-500 text-sm">{fieldErrors.linkFestejoBautismo}</p>
              )}
            </div>
          </>
        )}

        {/* Mensaje personalizado (común a todos) */}
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

        {/* Canción e Instagram (si el plan lo incluye) */}
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

        {/* Comentarios adicionales (común a todos) */}
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

        {/* Galería de fotos si el plan lo incluye */}
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

      {/* FORM DATOS COMPRADOR */}
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