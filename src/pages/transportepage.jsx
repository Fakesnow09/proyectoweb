import React, { useEffect, useState } from "react";
import "../Styles/page.css";
import { LuSearch } from "react-icons/lu";
import { FiBell, FiUser } from "react-icons/fi";
import * as XLSX from "xlsx"; 
import { saveAs } from 'file-saver';

function TransportePage() {
  const [transportes, setTransportes] = useState([]);
  const [form, setForm] = useState({
    id: "",
    vehiculo: "",
    ruta: "",
    estado: "",
    salida: "",
    llegada: "",
  });
  const [modoEdicion, setModoEdicion] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showUserPopover, setShowUserPopover] = useState(false);
  const [showNotifPopover, setShowNotifPopover] = useState(false);

  const URL = "http://localhost:8080/proyecto-logistica/transporte";

  useEffect(() => {
    cargarTransportes();
  }, []);

  const cargarTransportes = () => {
    fetch(URL)
      .then((res) => res.json())
      .then((data) => setTransportes(data))
      .catch((err) => console.error("Error al cargar transportes:", err));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const limpiarFormulario = () => {
    setForm({
      id: "",
      vehiculo: "",
      ruta: "",
      estado: "",
      salida: "",
      llegada: "",
    });
    setModoEdicion(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("accion", modoEdicion ? "actualizar" : "insertar");
    if (modoEdicion) formData.append("id", form.id);
    formData.append("vehiculo", form.vehiculo);
    formData.append("ruta", form.ruta);
    formData.append("estado", form.estado);
    formData.append("salida", form.salida);
    formData.append("llegada", form.llegada);

    fetch(URL, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.mensaje);
        limpiarFormulario();
        cargarTransportes();
      })
      .catch((err) => alert("Error al guardar: " + err));
  };

  const editar = (t) => {
    setForm({
      id: t.idTransporte,
      vehiculo: t.vehiculo,
      ruta: t.idRuta,
      estado: t.estado,
      salida: t.fechaSalida,
      llegada: t.fechaLlegada,
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
        cargarTransportes();
      })
      .catch((err) => alert("Error al eliminar: " + err));
  };

  const exportarAExcel = () => {
    const datosExportar = transportes.map((item) => ({
      "Id_Transporte": item.idTransporte,
      "Vehiculo": item.Vehiculo,
      "Id_Ruta": item.idRuta,
      "Estado": item.Estado,
      "Fecha_Salida": item.fechaSalida,
      "Fecha_Llegada": item.fechaLlegada,
    }));
  
    const worksheet = XLSX.utils.json_to_sheet(datosExportar);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transporte");
  
    const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    saveAs(blob, `Reporte_Transporte_${new Date().toISOString().split("T")[0]}.xlsx`);
  };

  const resultados = transportes.filter((t) =>
    Object.values(t).some((val) =>
      val?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="page-container">
      <div className="page-content">
        <div className="page-header">
          <h1>TRANSPORTE</h1>
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
                    <li>Transporte pendiente</li>
                    <li>Actualización de ruta</li>
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
          <input type="text" name="vehiculo" placeholder="Vehículo" value={form.vehiculo} onChange={handleChange} required />
          <input type="number" name="ruta" placeholder="Id Ruta" value={form.ruta} onChange={handleChange} required />
          <input type="text" name="estado" placeholder="Estado" value={form.estado} onChange={handleChange} required />
          <input type="date" name="salida" value={form.salida} onChange={handleChange} required />
          <input type="date" name="llegada" value={form.llegada} onChange={handleChange} required />
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
              <th>Id_Transporte</th>
              <th>Vehículo</th>
              <th>Id_Ruta</th>
              <th>Estado</th>
              <th>Fecha_salida</th>
              <th>Fecha_llegada</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {resultados.map((t) => (
              <tr key={t.idTransporte}>
                <td>{t.idTransporte}</td>
                <td>{t.vehiculo}</td>
                <td>{t.idRuta}</td>
                <td>{t.estado}</td>
                <td>{t.fechaSalida}</td>
                <td>{t.fechaLlegada}</td>
                <td>
                  <button onClick={() => editar(t)} style={{ marginRight: "5px" }}>Editar</button>
                  <button onClick={() => eliminar(t.idTransporte)} style={{ backgroundColor: "red", color: "white" }}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        </div>

           <div className="formulario-crud" style={{ marginTop: '20px' }}>
              <button className="export-button" onClick={exportarAExcel}>
               Imprimir reporte
              </button>
          
           </div>

      </div>
    </div>
  );
}

export default TransportePage;
