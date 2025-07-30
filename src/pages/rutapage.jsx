import React, { useEffect, useState } from "react";
import "../Styles/page.css";
import { LuSearch } from "react-icons/lu";
import { FiBell, FiUser } from "react-icons/fi";
import * as XLSX from "xlsx"; // ← AÑADIDO para exportar
import { saveAs } from 'file-saver';

function RutaPage() {
  const [rutas, setRutas] = useState([]);
  const [form, setForm] = useState({
    id: "",
    origen: "",
    destino: "",
    tiempoEstimado: "",
    tipoVehiculo: "",
    estado: "",
  });
  const [modoEdicion, setModoEdicion] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showUserPopover, setShowUserPopover] = useState(false);
  const [showNotifPopover, setShowNotifPopover] = useState(false);

  const URL = "http://localhost:8080/proyecto-logistica/ruta"; 

  useEffect(() => {
    cargarRutas();
  }, []);

  const cargarRutas = () => {
    fetch(URL)
      .then((res) => res.json())
      .then((data) => setRutas(data))
      .catch((err) => console.error("Error al cargar rutas:", err));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const limpiarFormulario = () => {
    setForm({
      id: "",
      origen: "",
      destino: "",
      tiempoEstimado: "",
      tipoVehiculo: "",
      estado: "",
    });
    setModoEdicion(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("accion", modoEdicion ? "actualizar" : "insertar");
    if (modoEdicion) formData.append("id", form.id);
    formData.append("origen", form.origen);
    formData.append("destino", form.destino);
    formData.append("tiempoEstimado", form.tiempoEstimado);
    formData.append("tipoVehiculo", form.tipoVehiculo);
    formData.append("estado", form.estado);

    fetch(URL, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.mensaje);
        limpiarFormulario();
        cargarRutas();
      })
      .catch((err) => alert("Error al guardar: " + err));
  };

  const editar = (ruta) => {
    setForm({
      id: ruta.idRuta,
      origen: ruta.origen,
      destino: ruta.destino,
      tiempoEstimado: ruta.tiempoEstimado,
      tipoVehiculo: ruta.tipoVehiculo,
      estado: ruta.estado,
    });
    setModoEdicion(true);
  };

  const eliminar = (id) => {
    const formData = new FormData();
    formData.append("accion", "eliminar");
    formData.append("id", id);

    fetch(URL, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.mensaje);
        cargarRutas();
      })
      .catch((err) => alert("Error al eliminar: " + err));
  };

 const exportarAExcel = () => {
  const datosExportar = rutas.map((item) => ({
    "Id_Ruta": item.idRuta,
    "Origen": item.origen,
    "Destino": item.destino,
    "Tipo_Vehiculo": item.Tipo_Vehiculo,
    "Tiempo_Estimado": item.tiempoEstimado,
    "Estado": item.estado,
  }));

  const worksheet = XLSX.utils.json_to_sheet(datosExportar);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Rutas");

  const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([wbout], { type: 'application/octet-stream' });
  saveAs(blob, `Reporte_Rutas_${new Date().toISOString().split("T")[0]}.xlsx`);
};

  const resultados = rutas.filter((r) =>
    Object.values(r).some((val) =>
      val?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="page-container">
      <div className="page-content">
        <div className="page-header">
          <h1>RUTAS</h1>
          <div className="header-icons">
            <div className="icon-wrapper" onClick={() => {
              setShowNotifPopover(!showNotifPopover);
              setShowUserPopover(false);
            }}>
              <FiBell size={40} />
              {showNotifPopover && (
                <div className="popover">
                  <strong>Notificaciones</strong>
                  <ul>
                    <li>Ruta pendiente</li>
                    <li>Ruta finalizada</li>
                  </ul>
                </div>
              )}
            </div>
            <div className="icon-wrapper" onClick={() => {
              setShowUserPopover(!showUserPopover);
              setShowNotifPopover(false);
            }}>
              <FiUser size={40} />
              {showUserPopover && (
                <div className="popover">
                  <strong>Usuario</strong>
                  <p>Juan Pérez</p>
                  <p>juan@email.com</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-button"><LuSearch /></button>
        </div>

        <form className="formulario-crud" onSubmit={handleSubmit}>
          <input type="text" name="origen" placeholder="Origen" value={form.origen} onChange={handleChange} required />
          <input type="text" name="destino" placeholder="Destino" value={form.destino} onChange={handleChange} required />
          <input type="text" name="tiempoEstimado" placeholder="Tiempo estimado" value={form.tiempoEstimado} onChange={handleChange} required />
          <input type="text" name="tipoVehiculo" placeholder="Vehículo" value={form.tipoVehiculo} onChange={handleChange} required />
          <input type="text" name="estado" placeholder="Estado" value={form.estado} onChange={handleChange} required />
          <button type="submit">{modoEdicion ? "Actualizar" : "Insertar"}</button>
          {modoEdicion && (
            <button type="button" onClick={limpiarFormulario}>Cancelar</button>
          )}
        </form>

        <div className="table-container">
        <div className="scroll-wrapper">
        <table className="page-table">
          <thead>
            <tr>
              <th>Id_Ruta</th>
              <th>Origen</th>
              <th>Destino</th>
              <th>Tiempo Estimado</th>
              <th>Vehículo</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {resultados.map((r) => (
              <tr key={r.idRuta}>
                <td>{r.idRuta}</td>
                <td>{r.origen}</td>
                <td>{r.destino}</td>
                <td>{r.tiempoEstimado}</td>
                <td>{r.tipoVehiculo}</td>
                <td>{r.estado}</td>
                <td>
                  <button onClick={() => editar(r)} style={{ marginRight: "5px" }}>Editar</button>
                  <button onClick={() => eliminar(r.idRuta)} style={{ backgroundColor: "red", color: "white" }}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        </div>

        {/* ✅ Botón Exportar debajo de la tabla */}
           <div className="formulario-crud" style={{ marginTop: '20px' }}>
              <button className="export-button" onClick={exportarAExcel}>
               Imprimir reporte
              </button>
            
           </div>

      </div>
    </div>
  );
}

export default RutaPage;
