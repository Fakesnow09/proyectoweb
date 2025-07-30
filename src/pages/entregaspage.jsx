import React, { useState, useEffect } from "react";
import "../Styles/page.css";
import { LuSearch } from "react-icons/lu";
import { FiBell, FiUser } from "react-icons/fi";
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

function EntregasPage() {
  const [entregas, setEntregas] = useState([]);
  const [form, setForm] = useState({
    id: "",
    idPedido: "",
    idTransporte: "",
    fechaSalida: "",
    fechaLlegada: "",
    estado: "",
  });
  const [modoEdicion, setModoEdicion] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showUserPopover, setShowUserPopover] = useState(false);
  const [showNotifPopover, setShowNotifPopover] = useState(false);

  const URL = "http://localhost:8080/proyecto-logistica/entregas";

  useEffect(() => {
    fetch(URL)
      .then((res) => res.json())
      .then((data) => setEntregas(data));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const limpiarFormulario = () => {
    setForm({
      id: "",
      idPedido: "",
      idTransporte: "",
      fechaSalida: "",
      fechaLlegada: "",
      estado: "",
    });
    setModoEdicion(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("accion", modoEdicion ? "actualizar" : "insertar");
    if (modoEdicion) formData.append("id", form.id);
    formData.append("idPedido", form.idPedido);
    formData.append("idTransporte", form.idTransporte);
    formData.append("fechaSalida", form.fechaSalida);
    formData.append("fechaLlegada", form.fechaLlegada);
    formData.append("estado", form.estado);

    fetch(URL, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.mensaje);
        limpiarFormulario();
        return fetch(URL);
      })
      .then((res) => res.json())
      .then((data) => setEntregas(data));
  };

  const editar = (entrega) => {
    setForm({
      id: entrega.idEntrega,
      idPedido: entrega.idPedido,
      idTransporte: entrega.idTransporte,
      fechaSalida: entrega.fechaSalida,
      fechaLlegada: entrega.fechaLlegada,
      estado: entrega.estado,
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
        return fetch(URL);
      })
      .then((res) => res.json())
      .then((data) => setEntregas(data));
  };

  const exportarAExcel = () => {
  const datos = filteredData.map( (item)=> ({
    "Id_Entrega": item.idEntrega,
    "Id_Pedido": item.idPedido,
    "Id_Transporte": item.idTransporte,
    "Fecha_Salida": item.fechaSalida,
    "Fecha_Llegada": item.fechaLlegada,
    Estado: item.estado,
  }));
  const ws = XLSX.utils.json_to_sheet(datos);
       const wb = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws, "Entregas");
     
       const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
       const blob = new Blob([wbout], { type: 'application/octet-stream' });
       saveAs(blob, `Reporte_Entregas_${new Date().toISOString().split('T')[0]}.xlsx`);
     };

  const filteredData = entregas.filter((item) =>
    Object.values(item).some((val) =>
      val?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="page-container">
      <div className="page-content">
        <div className="page-header">
          <h1>ENTREGAS</h1>
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
                    <li>Nueva entrega programada</li>
                    <li>Entrega completada</li>
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
          <input type="text" placeholder="Buscar..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          <button className="search-button"><LuSearch /></button>
        </div>

        <form className="formulario-crud" onSubmit={handleSubmit}>
          <input type="number" name="idPedido" value={form.idPedido} onChange={handleChange} placeholder="Id_Pedido" required />
          <input type="number" name="idTransporte" value={form.idTransporte} onChange={handleChange} placeholder="Id_Transporte" required />
          <input type="date" name="fechaSalida" value={form.fechaSalida} onChange={handleChange} required />
          <input type="date" name="fechaLlegada" value={form.fechaLlegada} onChange={handleChange} required />
          <input type="text" name="estado" value={form.estado} onChange={handleChange} placeholder="Estado" required />
          <button type="submit">{modoEdicion ? "Actualizar" : "Insertar"}</button>
          {modoEdicion && <button type="button" onClick={limpiarFormulario}>Cancelar</button>}
        </form>

        <div className="table-container">
        <div className="scroll-wrapper">
        <table className="page-table">
          <thead>
            <tr>
              <th>Id_Entrega</th>
              <th>Id_Pedido</th>
              <th>Id_Transporte</th>
              <th>Fecha_salida</th>
              <th>Fecha_llegada</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((entrega) => (
              <tr key={entrega.idEntrega}>
                <td>{entrega.idEntrega}</td>
                <td>{entrega.idPedido}</td>
                <td>{entrega.idTransporte}</td>
                <td>{entrega.fechaSalida}</td>
                <td>{entrega.fechaLlegada}</td>
                <td>{entrega.estado}</td>
                <td>
                  <button onClick={() => editar(entrega)} style={{ marginRight: "5px" }}>
                    Editar
                  </button>
                  <button onClick={() => eliminar(entrega.idEntrega)} style={{ backgroundColor: "red", color: "white" }}>
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

export default EntregasPage;
