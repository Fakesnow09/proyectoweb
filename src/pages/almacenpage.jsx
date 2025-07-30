 import React, { useState, useEffect } from "react";
import "../Styles/page.css";
import { LuSearch } from "react-icons/lu";
import { FiBell, FiUser } from "react-icons/fi";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';


function AlmacenPage() {
  const [almacenData, setAlmacenData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [form, setForm] = useState({ id: "", nombre: "", telefono: "", direccion: "", ciudad: "" });
  const [modoEdicion, setModoEdicion] = useState(false);
  const [showUserPopover, setShowUserPopover] = useState(false);
  const [showNotifPopover, setShowNotifPopover] = useState(false);

  const URL = "http://localhost:8080/proyecto-logistica/almacen";

  useEffect(() => {
    fetch(URL)
      .then(res => res.json())
      .then(data => setAlmacenData(data))
      .catch(err => console.error("Error al consultar:", err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const limpiarFormulario = () => {
    setForm({ id: "", nombre: "", telefono: "", direccion: "", ciudad: "" });
    setModoEdicion(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("accion", modoEdicion ? "actualizar" : "insertar");
    if (modoEdicion) formData.append("id", form.id);
    formData.append("nombre", form.nombre);
    formData.append("telefono", form.telefono);
    formData.append("direccion", form.direccion);
    formData.append("ciudad", form.ciudad);

    fetch(URL, {
      method: "POST",
      body: formData,
    })
      .then(res => res.json())
      .then(data => {
        alert(data.mensaje);
        limpiarFormulario();
        return fetch(URL);
      })
      .then(res => res.json())
      .then(data => setAlmacenData(data));
  };

  const editar = (almacen) => {
    setForm({
      id: almacen.idAlmacen,
      nombre: almacen.nombre,
      telefono: almacen.telefono,
      direccion: almacen.direccion,
      ciudad: almacen.ciudad
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
      .then(res => res.json())
      .then(data => {
        alert(data.mensaje);
        return fetch(URL);
      })
      .then(res => res.json())
      .then(data => setAlmacenData(data));
  };

 const filteredData = almacenData.filter((a) =>
  searchTerm === "" 
    ? true 
    : a.idAlmacen.toString().includes(searchTerm) ||
      a.nombre.toLowerCase().includes(searchTerm.toLowerCase())
);



  // 👉 Exportar a Excel
  const exportarAExcel = () => {
  const datos = filteredData.map(a => ({
    "ID Almacén": a.idAlmacen,
    "Nombre": a.nombre,
    "Teléfono": a.telefono,
    "Dirección": a.direccion,
    "Ciudad": a.ciudad
  }));
  
  const ws = XLSX.utils.json_to_sheet(datos);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Almacenes");

  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([wbout], { type: 'application/octet-stream' });
  saveAs(blob, `Reporte_Almacen_${new Date().toISOString().split('T')[0]}.xlsx`);
};

  return (
    <div className="page-container">
      <div className="page-content">
        <div className="page-header">
          <h1>ALMACÉN</h1>
          <div className="header-icons">
            <div className="icon-wrapper" onClick={() => {
              setShowNotifPopover(!showNotifPopover);
              setShowUserPopover(false);
            }}>
              <FiBell size={40} />
              {showNotifPopover && (
                <div className="popover">
                  <p><strong>Notificaciones</strong></p>
                  <ul>
                    <li>Alerta de stock bajo</li>
                    <li>Nuevo ingreso registrado</li>
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
                  <p><strong>Usuario</strong></p>
                  <p>Juan Pérez</p>
                  <p>juan@gmail.com</p>
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
          <input type="text" name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" required />
          <input type="text" name="telefono" value={form.telefono} onChange={handleChange} placeholder="Teléfono" required />
          <input type="text" name="direccion" value={form.direccion} onChange={handleChange} placeholder="Dirección" required />
          <input type="text" name="ciudad" value={form.ciudad} onChange={handleChange} placeholder="Ciudad" required />
          <button type="submit">{modoEdicion ? "Actualizar" : "Insertar"}</button>
          {modoEdicion && <button type="button" onClick={limpiarFormulario}>Cancelar</button>}
        </form>
        
        <div className="table-container">
        <div className="scroll-wrapper">
        <table className="page-table">
          <thead>
            <tr>
              <th>Id_Almacen</th>
              <th>Nombre</th>
              <th>Teléfono</th>
              <th>Dirección</th>
              <th>Ciudad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((almacen) => (
              <tr key={almacen.idAlmacen}>
                <td>{almacen.idAlmacen}</td>
                <td>{almacen.nombre}</td>
                <td>{almacen.telefono}</td>
                <td>{almacen.direccion}</td>
                <td>{almacen.ciudad}</td>
                <td>
                  <button onClick={() => editar(almacen)} style={{ marginRight: "5px" }}>Editar</button>
                  <button onClick={() => eliminar(almacen.idAlmacen)} style={{ backgroundColor: "red", color: "white" }}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        </div>
        
        {/* Botón para imprimir reporte */}
           <div className="formulario-crud" style={{ marginTop: '20px' }}>
              <button className="export-button" onClick={exportarAExcel}>
               Imprimir reporte
              </button>
            
           </div>
      </div>
    </div>
  );
}

export default AlmacenPage;
