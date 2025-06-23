 import React, { useState, useEffect } from "react";
import "../Styles/page.css";
import { LuSearch } from "react-icons/lu";
import { FiBell, FiUser } from "react-icons/fi";

function ClientesPage() {
  const [clientes, setClientes] = useState([]);
  const [form, setForm] = useState({ id: "", nombre: "", apellido: "", correo: "", telefono: "", direccion: "", ciudad: "" });
  const [modoEdicion, setModoEdicion] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [showUserPopover, setShowUserPopover] = useState(false);
  const [showNotifPopover, setShowNotifPopover] = useState(false);

  const URL = "http://localhost:8080/proyecto-logistica/clientes";

  useEffect(() => {
    fetch(URL)
      .then(res => res.json())
      .then(data => setClientes(data));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const limpiarFormulario = () => {
    setForm({ id: "", nombre: "", apellido: "", correo: "", telefono: "", direccion: "", ciudad: "" });
    setModoEdicion(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("accion", modoEdicion ? "actualizar" : "insertar");
    if (modoEdicion) formData.append("id", form.id);
    formData.append("nombre", form.nombre);
    formData.append("apellido", form.apellido);
    formData.append("correo", form.correo);
    formData.append("telefono", form.telefono);
    formData.append("direccion", form.direccion);
    formData.append("ciudad", form.ciudad);

    fetch(URL, {
      method: "POST",
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        alert(data.mensaje);
        limpiarFormulario();
        return fetch(URL);
      })
      .then(res => res.json())
      .then(data => setClientes(data));
  };

  const editar = (cliente) => {
    setForm({
      id: cliente.idCliente,
      nombre: cliente.nombre,
      apellido: cliente.apellido,
      correo: cliente.correo,
      telefono: cliente.telefono,
      direccion: cliente.direccion,
      ciudad: cliente.ciudad
    });
    setModoEdicion(true);
  };

  const eliminar = (id) => {
    const formData = new FormData();
    formData.append("accion", "eliminar");
    formData.append("id", id);

    fetch(URL, {
      method: "POST",
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        alert(data.mensaje);
        return fetch(URL);
      })
      .then(res => res.json())
      .then(data => setClientes(data));
  };

  const filteredData = clientes.filter(cliente =>
    Object.values(cliente).some(val =>
      val.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  return (
    <div className="page-container">
      <div className="page-content">
        <div className="page-header">
          <h1>CLIENTES</h1>
          <div className="header-icons">
            <div className="icon-wrapper" onClick={() => { setShowNotifPopover(!showNotifPopover); setShowUserPopover(false); }}>
              <FiBell size={40} />
              {showNotifPopover && (
                <div className="popover">
                  <p><strong>Notificaciones</strong></p>
                  <ul>
                    <li>Nuevo cliente registrado</li>
                    <li>Cliente inactivo</li>
                  </ul>
                </div>
              )}
            </div>
            <div className="icon-wrapper" onClick={() => { setShowUserPopover(!showUserPopover); setShowNotifPopover(false); }}>
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
          <input type="text" placeholder="Buscar..." value={searchText} onChange={(e) => setSearchText(e.target.value)} />
          <button className="search-button"><LuSearch /></button>
        </div>

        <form className="formulario-crud" onSubmit={handleSubmit}>
          <input type="text" name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" required />
          <input type="text" name="apellido" value={form.apellido} onChange={handleChange} placeholder="Apellido" required />
          <input type="email" name="correo" value={form.correo} onChange={handleChange} placeholder="Correo" required />
          <input type="text" name="telefono" value={form.telefono} onChange={handleChange} placeholder="Teléfono" required />
          <input type="text" name="direccion" value={form.direccion} onChange={handleChange} placeholder="Dirección" required />
          <input type="text" name="ciudad" value={form.ciudad} onChange={handleChange} placeholder="Ciudad" required />
          <button type="submit">{modoEdicion ? "Actualizar" : "Insertar"}</button>
          {modoEdicion && <button type="button" onClick={limpiarFormulario}>Cancelar</button>}
        </form>

        <table className="page-table">
          <thead>
            <tr>
              <th>Id_Cliente</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Correo</th>
              <th>Teléfono</th>
              <th>Dirección</th>
              <th>Ciudad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((cliente) => (
              <tr key={cliente.idCliente}>
                <td>{cliente.idCliente}</td>
                <td>{cliente.nombre}</td>
                <td>{cliente.apellido}</td>
                <td>{cliente.correo}</td>
                <td>{cliente.telefono}</td>
                <td>{cliente.direccion}</td>
                <td>{cliente.ciudad}</td>
                <td>
                  <button onClick={() => editar(cliente)} style={{ marginRight: "5px" }}>Editar</button>
                  <button onClick={() => eliminar(cliente.idCliente)} style={{ backgroundColor: "red", color: "white" }}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ClientesPage;