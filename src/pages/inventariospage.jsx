import React, { useEffect, useState } from "react";
import "../Styles/page.css";
import { LuSearch } from "react-icons/lu";
import { FiBell, FiUser } from "react-icons/fi";
import { saveAs } from 'file-saver';
import * as XLSX from "xlsx";


function InventariosPage() {
  const [inventarios, setInventarios] = useState([]);
  const [form, setForm] = useState({
    id: "",
    nombre: "",
    categoria: "",
    cantidad: "",
    fecha: "",
  });
  const [modoEdicion, setModoEdicion] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showUserPopover, setShowUserPopover] = useState(false);
  const [showNotifPopover, setShowNotifPopover] = useState(false);

  const URL = "http://localhost:8080/proyecto-logistica/inventarios";

  useEffect(() => {
    cargarInventarios();
  }, []);

  const cargarInventarios = () => {
    fetch(URL)
      .then((res) => res.json())
      .then((data) => setInventarios(data))
      .catch((err) => console.error("Error al cargar inventarios:", err));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const limpiarFormulario = () => {
    setForm({ id: "", nombre: "", categoria: "", cantidad: "", fecha: "" });
    setModoEdicion(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("accion", modoEdicion ? "actualizar" : "insertar");
    if (modoEdicion) formData.append("id", form.id);
    formData.append("nombre", form.nombre);
    formData.append("categoria", form.categoria);
    formData.append("cantidad", form.cantidad);
    formData.append("fecha", form.fecha);

    fetch(URL, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.mensaje);
        limpiarFormulario();
        cargarInventarios();
      })
      .catch((err) => alert("Error al guardar: " + err));
  };

  const editar = (item) => {
    setForm({
      id: item.idInventario,
      nombre: item.nombre,
      categoria: item.categoria,
      cantidad: item.cantidadStock,
      fecha: item.fechaIngreso,
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
        cargarInventarios();
      })
      .catch((err) => alert("Error al eliminar: " + err));
  };

  const exportarAExcel = () => {
  const datosExportar = resultados.map((item) => ({
    "Id_Inventario": item.idInventario,
    "Nombre": item.Nombre,
    "Categoría": item.Categoria,
    "Cantidad": item.CantidadStock,
    "Fecha_Ingreso": item.FechaIngreso,
  }));

  const ws = XLSX.utils.json_to_sheet(datosExportar);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Inventarios");

  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([wbout], { type: 'application/octet-stream' });
  saveAs(blob, `Reporte_Inventarios_${new Date().toISOString().split("T")[0]}.xlsx`);
};



  const resultados = inventarios.filter((item) =>
    Object.values(item).some((val) =>
      val.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="page-container">
      <div className="page-content">
        <div className="page-header">
          <h1>INVENTARIOS</h1>
          <div className="header-icons">
            <div
              className="icon-wrapper"
              onClick={() => {
                setShowNotifPopover(!showNotifPopover);
                setShowUserPopover(false);
              }}
            >
              <FiBell size={40} />
              {showNotifPopover && (
                <div className="popover">
                  <p><strong>Notificaciones</strong></p>
                  <ul>
                    <li>Stock bajo</li>
                    <li>Producto sin rotación</li>
                  </ul>
                </div>
              )}
            </div>
            <div
              className="icon-wrapper"
              onClick={() => {
                setShowUserPopover(!showUserPopover);
                setShowNotifPopover(false);
              }}
            >
              <FiUser size={40} />
              {showUserPopover && (
                <div className="popover">
                  <p><strong>Usuario</strong></p>
                  <p>Admin</p>
                  <p>admin@email.com</p>
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
          <input type="text" name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
          <input type="text" name="categoria" placeholder="Categoría" value={form.categoria} onChange={handleChange} required />
          <input type="number" name="cantidad" placeholder="Cantidad" value={form.cantidad} onChange={handleChange} required />
          <input type="date" name="fecha" placeholder="Fecha ingreso" value={form.fecha} onChange={handleChange} required />
          <button type="submit">{modoEdicion ? "Actualizar" : "Insertar"}</button>
          {modoEdicion && (
            <button type="button" onClick={limpiarFormulario}>
              Cancelar
            </button>
          )}
        </form>


        
        <div className="table-container">
        <div className="scroll-wrapper">
        <table className="page-table">
          <thead>
            <tr>
              <th>Id_Inventario</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Cantidad</th>
              <th>Fecha Ingreso</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {resultados.map((item) => (
              <tr key={item.idInventario}>
                <td>{item.idInventario}</td>
                <td>{item.nombre}</td>
                <td>{item.categoria}</td>
                <td>{item.cantidadStock}</td>
                <td>{item.fechaIngreso}</td>
                <td>
                  <button onClick={() => editar(item)} style={{ marginRight: "5px" }}>
                    Editar
                  </button>
                  <button
                    onClick={() => eliminar(item.idInventario)}
                    style={{ backgroundColor: "red", color: "white" }}
                  >
                    Eliminar
                  </button>
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

export default InventariosPage;
