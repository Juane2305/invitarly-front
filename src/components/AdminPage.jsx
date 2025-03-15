import React, { useState, useEffect } from "react";
import axios from "axios";
import LoginModal from "./LoginModal";
import adminAxios from '../adminAxios'


function AdminPage() {

  
  // ======================================
  // TOKEN / LOGIN
  // ======================================
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  // Si no hay token al iniciar, mostramos el modal
  const [showLoginModal, setShowLoginModal] = useState(!token);

  // ======================================
  // ESTADOS / ERRORES
  // ======================================
  const [error, setError] = useState(null);

  // ======================================
  // ESTADOS PARA "VENTAS"
  // ======================================
  const [ventas, setVentas] = useState([]);
  const [nuevoCliente, setNuevoCliente] = useState("");
  const [nuevoEstado, setNuevoEstado] = useState("EN_PROCESO");

  // ======================================
  // ESTADOS PARA "INVITACIONES"
  // ======================================
  const [invitaciones, setInvitaciones] = useState([]);
  const [nuevaInvitacion, setNuevaInvitacion] = useState({
    novios: "",
    fecha_evento: "",
    fecha_comienzo_calendario: "",
    fecha_fin_calendario: "",
    nombre_iglesia: "",
    nombre_salon: "",
    hora_ceremonia_religiosa: "",
    hora_civil: "",
    hora_evento: "",
    fecha_cuenta_regresiva: "",
    cbu: "",
    alias: "",
    banco: "",
    cancion: "",
    plantilla_elegida: "",
    urlPersonalizada: "",
    imagenes: "",
    estado: "",
    plan: "",
    nombre_completo: "",
    linkCeremonia: "",
    linkFiesta: "",
    linkCalendario: "",
    dressCode: "",
    ig_user: "",
    mensaje_personalizado: "",
    link_asistencia: "",
    fecha_tokyo: "",
  });

  // Para editar invitaciones
  const [editingInvitation, setEditingInvitation] = useState(null);

  // ======================================
  // CONFIGURACIÓN AXIOS (TOKEN)
  // ======================================
  const getAxiosConfig = () => {
    // Siempre enviamos el token si existe
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  // ======================================
  // HOOK: cargar datos SOLO si hay token
  // ======================================
  useEffect(() => {
    if (token) {
      cargarVentas();
      cargarInvitaciones();
    }
  }, [token]);

  // ======================================
  // CRUD VENTAS
  // ======================================
  const cargarVentas = async () => {
    try {
      const response = await adminAxios.get(
        "https://api.invitarly.com/api/ventas",
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
      await adminAxios.post(
        "https://api.invitarly.com/api/ventas",
        { clienteNombre: nuevoCliente, estado: nuevoEstado },
        getAxiosConfig()
      );
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
      await adminAxios.put(
        `https://api.invitarly.com/api/ventas/${ventaId}/estado`,
        { estado },
        getAxiosConfig()
      );
      cargarVentas();
    } catch (err) {
      console.error(err);
      setError("Error al actualizar estado");
    }
  };

  const eliminarVenta = async (ventaId) => {
    try {
      await adminAxios.delete(
        `https://api.invitarly.com/api/ventas/${ventaId}`,
        getAxiosConfig()
      );
      cargarVentas();
    } catch (err) {
      console.error(err);
      setError("Error al eliminar la venta");
    }
  };

  // ======================================
  // CRUD INVITACIONES
  // ======================================
  const cargarInvitaciones = async () => {
    try {
      const response = await adminAxios.get(
        "https://api.invitarly.com/api/invitaciones",
        getAxiosConfig()
      );
      setInvitaciones(response.data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Error al cargar invitaciones");
    }
  };

  const crearInvitacion = async () => {
    try {
      await adminAxios.post(
        "https://api.invitarly.com/api/invitaciones",
        nuevaInvitacion,
        getAxiosConfig()
      );
      cargarInvitaciones();
      // Limpiamos el formulario
      setNuevaInvitacion({
        novios: "",
        fecha_evento: "",
        fecha_comienzo_calendario: "",
        fecha_fin_calendario: "",
        nombre_iglesia: "",
        nombre_salon: "",
        hora_ceremonia_religiosa: "",
        hora_civil: "",
        hora_evento: "",
        fecha_cuenta_regresiva: "",
        cbu: "",
        alias: "",
        banco: "",
        cancion: "",
        plantilla_elegida: "",
        urlPersonalizada: "",
        imagenes: "",
        estado: "",
        plan: "",
        nombre_completo: "",
        linkCeremonia: "",
        linkFiesta: "",
        linkCalendario: "",
        dressCode: "",
        ig_user: "",
        mensaje_personalizado: "",
        link_asistencia: "",
        fecha_tokyo: "",
      });
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Error al crear la invitación");
    }
  };

  const eliminarInvitacion = async (invitacionId) => {
    try {
      await adminAxios.delete(
        `https://api.invitarly.com/api/invitaciones/${invitacionId}`,
        getAxiosConfig()
      );
      cargarInvitaciones();
    } catch (err) {
      console.error(err);
      setError("Error al eliminar la invitación");
    }
  };

  // Para editar
  const handleEditClick = (inv) => {
    setEditingInvitation({ ...inv });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingInvitation((prev) => ({ ...prev, [name]: value }));
  };

  const actualizarInvitacion = async () => {
    if (!editingInvitation) return;
    try {
      await adminAxios.put(
        `https://api.invitarly.com/api/invitaciones/${editingInvitation.id}`,
        editingInvitation,
        getAxiosConfig()
      );
      cargarInvitaciones();
      setEditingInvitation(null);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Error al actualizar la invitación");
    }
  };
  

  // ======================================
  // LOGIN: si no hay token, mostramos modal
  // ======================================
  if (!token || showLoginModal) {
    return (
      <LoginModal
        onLoginSuccess={(newToken) => {
          localStorage.setItem("token", newToken);
          setToken(newToken);
          setShowLoginModal(false);
        }}
      />
    );
  }

  // ======================================
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Panel de Administración</h1>
      {error && <div className="text-red-500 mb-2">{error}</div>}

      {/* ================================== */}
      {/* FORM CREAR NUEVA VENTA */}
      {/* ================================== */}
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

      {/* ================================== */}
      {/* TABLA DE VENTAS */}
      {/* ================================== */}
      <table className="min-w-full border mb-10">
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

      {/* ================================== */}
      {/* FORM CREAR NUEVA INVITACION */}
      {/* ================================== */}
      <div className="mb-6 border p-4 rounded">
        <h2 className="text-lg font-semibold mb-2">Crear nueva invitación</h2>

        {/* Un campo por cada propiedad que quieras setear */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>Novios:</label>
            <input
              className="border w-full"
              type="text"
              name="novios"
              value={nuevaInvitacion.novios}
              onChange={(e) =>
                setNuevaInvitacion((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <label>Fecha Evento:</label>
            <input
              className="border w-full"
              type="text"
              name="fecha_evento"
              value={nuevaInvitacion.fecha_evento}
              onChange={(e) =>
                setNuevaInvitacion((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            />
          </div>

          {/* Repite para cada campo, o podrías mapearlos si prefieres */}
          <div>
            <label>Fecha Comienzo Calendario:</label>
            <input
              className="border w-full"
              type="text"
              name="fecha_comienzo_calendario"
              value={nuevaInvitacion.fecha_comienzo_calendario}
              onChange={(e) =>
                setNuevaInvitacion((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <label>Fecha Fin Calendario:</label>
            <input
              className="border w-full"
              type="text"
              name="fecha_fin_calendario"
              value={nuevaInvitacion.fecha_fin_calendario}
              onChange={(e) =>
                setNuevaInvitacion((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            />
          </div>

          <div>
            <label>Nombre Iglesia:</label>
            <input
              className="border w-full"
              type="text"
              name="nombre_iglesia"
              value={nuevaInvitacion.nombre_iglesia}
              onChange={(e) =>
                setNuevaInvitacion((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <label>Nombre Salón:</label>
            <input
              className="border w-full"
              type="text"
              name="nombre_salon"
              value={nuevaInvitacion.nombre_salon}
              onChange={(e) =>
                setNuevaInvitacion((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <label>Hora Ceremonia Religiosa</label>
            <input
              className="border w-full"
              type="text"
              name="hora_ceremonia_religiosa"
              value={nuevaInvitacion.hora_ceremonia_religiosa}
              onChange={(e) =>
                setNuevaInvitacion((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <label>Hora Civil</label>
            <input
              className="border w-full"
              type="text"
              name="hora_civil"
              value={nuevaInvitacion.hora_civil}
              onChange={(e) =>
                setNuevaInvitacion((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <label>Hora Evento</label>
            <input
              className="border w-full"
              type="text"
              name="hora_evento"
              value={nuevaInvitacion.hora_evento}
              onChange={(e) =>
                setNuevaInvitacion((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <label>Fecha Cuenta Regresiva</label>
            <input
              className="border w-full"
              type="text"
              name="fecha_cuenta_regresiva"
              value={nuevaInvitacion.fecha_cuenta_regresiva}
              onChange={(e) =>
                setNuevaInvitacion((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <label>CBU</label>
            <input
              className="border w-full"
              type="text"
              name="cbu"
              value={nuevaInvitacion.cbu}
              onChange={(e) =>
                setNuevaInvitacion((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <label>Alias</label>
            <input
              className="border w-full"
              type="text"
              name="alias"
              value={nuevaInvitacion.alias}
              onChange={(e) =>
                setNuevaInvitacion((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <label>Banco</label>
            <input
              className="border w-full"
              type="text"
              name="banco"
              value={nuevaInvitacion.banco}
              onChange={(e) =>
                setNuevaInvitacion((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <label>Link Canción</label>
            <input
              className="border w-full"
              type="text"
              name="cancion"
              value={nuevaInvitacion.cancion}
              onChange={(e) =>
                setNuevaInvitacion((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <label>Plantilla Elegida</label>
            <input
              className="border w-full"
              type="text"
              name="plantilla_elegida"
              value={nuevaInvitacion.plantilla_elegida}
              onChange={(e) =>
                setNuevaInvitacion((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <label>Url Personalizada</label>
            <input
              className="border w-full"
              type="text"
              name="urlPersonalizada"
              value={nuevaInvitacion.urlPersonalizada}
              onChange={(e) =>
                setNuevaInvitacion((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <label>Imagenes</label>
            <input
              className="border w-full"
              type="text"
              name="imagenes"
              value={nuevaInvitacion.imagenes}
              onChange={(e) =>
                setNuevaInvitacion((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <label>Estado</label>
            <input
              className="border w-full"
              type="text"
              name="estado"
              value={nuevaInvitacion.estado}
              onChange={(e) =>
                setNuevaInvitacion((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <label>Plan</label>
            <input
              className="border w-full"
              type="text"
              name="plan"
              value={nuevaInvitacion.plan}
              onChange={(e) =>
                setNuevaInvitacion((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <label>Nombre Completo</label>
            <input
              className="border w-full"
              type="text"
              name="nombre_completo"
              value={nuevaInvitacion.nombre_completo}
              onChange={(e) =>
                setNuevaInvitacion((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <label>Link Google Maps Ceremonia</label>
            <input
              className="border w-full"
              type="text"
              name="linkCeremonia"
              value={nuevaInvitacion.linkCeremonia}
              onChange={(e) =>
                setNuevaInvitacion((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <label>Link Google Maps Fiesta</label>
            <input
              className="border w-full"
              type="text"
              name="linkFiesta"
              value={nuevaInvitacion.linkFiesta}
              onChange={(e) =>
                setNuevaInvitacion((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <label>Link Calendario</label>
            <input
              className="border w-full"
              type="text"
              name="linkCalendario"
              value={nuevaInvitacion.linkCalendario}
              onChange={(e) =>
                setNuevaInvitacion((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <label>Dress Code</label>
            <input
              className="border w-full"
              type="text"
              name="dressCode"
              value={nuevaInvitacion.dressCode}
              onChange={(e) =>
                setNuevaInvitacion((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <label>Usuario Instagram</label>
            <input
              className="border w-full"
              type="text"
              name="ig_user"
              value={nuevaInvitacion.ig_user}
              onChange={(e) =>
                setNuevaInvitacion((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <label>Mensaje Personalizado</label>
            <input
              className="border w-full"
              type="text"
              name="mensaje_personalizado"
              value={nuevaInvitacion.mensaje_personalizado}
              onChange={(e) =>
                setNuevaInvitacion((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <label>Link Asistencia</label>
            <input
              className="border w-full"
              type="text"
              name="link_asistencia"
              value={nuevaInvitacion.link_asistencia}
              onChange={(e) =>
                setNuevaInvitacion((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <label>Fecha Plantilla Tokyo</label>
            <input
              className="border w-full"
              type="text"
              name="fecha_tokyo"
              value={nuevaInvitacion.fecha_tokyo}
              onChange={(e) =>
                setNuevaInvitacion((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            />
          </div>
        </div>

        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={crearInvitacion}
        >
          Crear Invitación
        </button>
      </div>

      {/* ================================== */}
      {/* TABLA DE INVITACIONES */}
      {/* ================================== */}
      <table className="min-w-full border mb-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Novios</th>
            <th className="border p-2">Fecha Evento</th>
            <th className="border p-2">URL Personalizada</th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {invitaciones.map((inv) => (
            <tr key={inv.id}>
              <td className="border p-2">{inv.id}</td>
              <td className="border p-2">{inv.novios}</td>
              <td className="border p-2">{inv.fecha_evento}</td>
              <td className="border p-2">{inv.urlPersonalizada}</td>
              <td className="border p-2">
                <button
                  className="bg-yellow-500 text-white px-2 py-1 mr-2 rounded"
                  onClick={() => handleEditClick(inv)}
                >
                  Editar
                </button>
                <button
                  className="bg-red-700 text-white px-2 py-1 rounded"
                  onClick={() => eliminarInvitacion(inv.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ================================== */}
      {/* PANEL DE EDICIÓN DE INVITACIÓN */}
      {/* ================================== */}
      {editingInvitation && (
        <div className="border p-4 rounded mb-6">
          <h2 className="text-lg font-semibold mb-2">
            Editar Invitación (ID: {editingInvitation.id})
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>Novios:</label>
              <input
                className="border w-full"
                type="text"
                name="novios"
                value={editingInvitation.novios}
                onChange={handleEditChange}
              />
            </div>
            <div>
              <label>Fecha Evento:</label>
              <input
                className="border w-full"
                type="text"
                name="fecha_evento"
                value={editingInvitation.fecha_evento}
                onChange={handleEditChange}
              />
            </div>
            <div>
              <label>Fecha Comienzo Calendario:</label>
              <input
                className="border w-full"
                type="text"
                name="fecha_comienzo_calendario"
                value={editingInvitation.fecha_comienzo_calendario}
                onChange={handleEditChange}
              />
            </div>
            <div>
              <label>Fecha Fin Calendario:</label>
              <input
                className="border w-full"
                type="text"
                name="fecha_fin_calendario"
                value={editingInvitation.fecha_fin_calendario}
                onChange={handleEditChange}
              />
            </div>
            <div>
              <label>Nombre Iglesia:</label>
              <input
                className="border w-full"
                type="text"
                name="nombre_iglesia"
                value={editingInvitation.nombre_iglesia}
                onChange={handleEditChange}
              />
            </div>
            <div>
              <label>Nombre Salón:</label>
              <input
                className="border w-full"
                type="text"
                name="nombre_salon"
                value={editingInvitation.nombre_salon}
                onChange={handleEditChange}
              />
            </div>
            <div>
              <label>Hora Ceremonia Religiosa:</label>
              <input
                className="border w-full"
                type="text"
                name="hora_ceremonia_religiosa"
                value={editingInvitation.hora_ceremonia_religiosa}
                onChange={handleEditChange}
              />
            </div>
            <div>
              <label>Hora Civil:</label>
              <input
                className="border w-full"
                type="text"
                name="hora_civil"
                value={editingInvitation.hora_civil}
                onChange={handleEditChange}
              />
            </div>
            <div>
              <label>Hora Evento:</label>
              <input
                className="border w-full"
                type="text"
                name="hora_evento"
                value={editingInvitation.hora_evento}
                onChange={handleEditChange}
              />
            </div>
            <div>
              <label>Fecha Cuenta Regresiva:</label>
              <input
                className="border w-full"
                type="text"
                name="fecha_cuenta_regresiva"
                value={editingInvitation.fecha_cuenta_regresiva}
                onChange={handleEditChange}
              />
            </div>
            <div>
              <label>CBU:</label>
              <input
                className="border w-full"
                type="text"
                name="cbu"
                value={editingInvitation.cbu}
                onChange={handleEditChange}
              />
            </div>
            <div>
              <label>Alias:</label>
              <input
                className="border w-full"
                type="text"
                name="alias"
                value={editingInvitation.alias}
                onChange={handleEditChange}
              />
            </div>
            <div>
              <label>Banco:</label>
              <input
                className="border w-full"
                type="text"
                name="banco"
                value={editingInvitation.banco}
                onChange={handleEditChange}
              />
            </div>
            <div>
              <label>Link Canción:</label>
              <input
                className="border w-full"
                type="text"
                name="cancion"
                value={editingInvitation.cancion}
                onChange={handleEditChange}
              />
            </div>
            <div>
              <label>Plantilla Elegida:</label>
              <input
                className="border w-full"
                type="text"
                name="plantilla_elegida"
                value={editingInvitation.plantilla_elegida}
                onChange={handleEditChange}
              />
            </div>
            {/* Repite los demás campos de editingInvitation */}
            <div>
              <label>URL Personalizada:</label>
              <input
                className="border w-full"
                type="text"
                name="urlPersonalizada"
                value={editingInvitation.urlPersonalizada || ""}
                onChange={handleEditChange}
              />
            </div>
            <div>
              <label>Imágenes:</label>
              <textarea
                className="border w-full"
                name="imagenes"
                value={editingInvitation.imagenes}
                onChange={handleEditChange}
              />
            </div>
            <div>
              <label>Estado:</label>
              <input
                className="border w-full"
                type="text"
                name="estado"
                value={editingInvitation.estado || ""}
                onChange={handleEditChange}
              />
            </div>
            <div>
              <label>Plan:</label>
              <input
                className="border w-full"
                type="text"
                name="plan"
                value={editingInvitation.plan || ""}
                onChange={handleEditChange}
              />
            </div>
            <div>
              <label>Nombre Completo:</label>
              <input
                className="border w-full"
                type="text"
                name="nombre_completo"
                value={editingInvitation.nombre_completo || ""}
                onChange={handleEditChange}
              />
            </div>
            <div>
              <label>Link Google Maps Ceremonia:</label>
              <input
                className="border w-full"
                type="text"
                name="linkCeremonia"
                value={editingInvitation.linkCeremonia || ""}
                onChange={handleEditChange}
              />
            </div>
            <div>
              <label>Link Google Maps Fiesta:</label>
              <input
                className="border w-full"
                type="text"
                name="linkFiesta"
                value={editingInvitation.linkFiesta || ""}
                onChange={handleEditChange}
              />
            </div>
            <div>
              <label>Dress Code:</label>
              <input
                className="border w-full"
                type="text"
                name="dressCode"
                value={editingInvitation.dressCode || ""}
                onChange={handleEditChange}
              />
            </div>
            <div>
              <label>Usuario de Instagram:</label>
              <input
                className="border w-full"
                type="text"
                name="ig_user"
                value={editingInvitation.ig_user || ""}
                onChange={handleEditChange}
              />
            </div>
            <div>
              <label>Mensaje Personalizado:</label>
              <input
                className="border w-full"
                type="text"
                name="mensaje_personalizado"
                value={editingInvitation.mensaje_personalizado || ""}
                onChange={handleEditChange}
              />
            </div>
            <div>
              <label>Link Asistencia:</label>
              <input
                className="border w-full"
                type="text"
                name="link_asistencia"
                value={editingInvitation.link_asistencia || ""}
                onChange={handleEditChange}
              />
            </div>
            <div>
              <label>Fecha Plantilla Tokyo:</label>
              <input
                className="border w-full"
                type="text"
                name="fecha_tokyo"
                value={editingInvitation.fecha_tokyo || ""}
                onChange={handleEditChange}
              />
            </div>

          </div>
          <div className="mt-4">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded mr-2"
              onClick={actualizarInvitacion}
            >
              Guardar Cambios
            </button>
            <button
              className="bg-gray-300 px-4 py-2 rounded"
              onClick={() => setEditingInvitation(null)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPage;