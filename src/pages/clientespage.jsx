import React, { useState } from "react";
import "../Styles/page.css";
import { LuSearch } from "react-icons/lu";
import { FiBell, FiUser } from "react-icons/fi";

function ClientesPage() {
  const [showUserPopover, setShowUserPopover] = useState(false);
  const [showNotifPopover, setShowNotifPopover] = useState(false);
  const [searchText, setSearchText] = useState("");

  const data = [
    {id: 4, nombre: "Juan", apellido: "Perez", correo: "Juanperez@gmail.com", telefono: "3124567896", direccion: "Calle 56A",ciudad: "Bogota", },
    {id: 5, nombre: "Ana", apellido: "Gomez", correo: "ana@gmail.com", telefono: "3001234567", direccion: "Carrera 8", ciudad: "Bogota",},
    {id: 5, nombre: "Ana", apellido: "Gomez", correo: "ana@gmail.com", telefono: "3001234567", direccion: "Carrera 8", ciudad: "Bogota",},
    {id: 5, nombre: "Ana", apellido: "Gomez", correo: "ana@gmail.com", telefono: "3001234567", direccion: "Carrera 8", ciudad: "Bogota",},
    {id: 5, nombre: "Ana", apellido: "Gomez", correo: "ana@gmail.com", telefono: "3001234567", direccion: "Carrera 8", ciudad: "Bogota",},
    {id: 5, nombre: "Ana", apellido: "Gomez", correo: "ana@gmail.com", telefono: "3001234567", direccion: "Carrera 8", ciudad: "Bogota",},
    {id: 5, nombre: "Ana", apellido: "Gomez", correo: "ana@gmail.com", telefono: "3001234567", direccion: "Carrera 8", ciudad: "Bogota",},
    // Puedes agregar más objetos si deseas
  ];

  const filteredData = data.filter((cliente) =>
    Object.values(cliente).some((value) =>
      value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  return (
    <div className="page-container">
      <div className="page-content">
        <div className="page-header">
          <h1>CLIENTES</h1>
          <div className="header-icons">
            <div
              className="icon-wrapper"
              onClick={() => {
                setShowNotifPopover(!showNotifPopover);
                setShowUserPopover(false);
              }}
            >
              <FiBell size={40} style={{ marginRight: "16px", cursor: "pointer" }} />
              {showNotifPopover && (
                <div className="popover">
                  <p><strong>Notificaciones</strong></p>
                  <ul>
                    <li>Nuevo cliente registrado</li>
                    <li>Cliente inactivo detectado</li>
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
              <FiUser size={40} style={{ cursor: "pointer" }} />
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
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button className="search-button">
            <LuSearch />
          </button>
        </div>

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
            </tr>
          </thead>
          <tbody>
            {filteredData.map((cliente, index) => (
              <tr key={index}>
                <td>{cliente.id}</td>
                <td>{cliente.nombre}</td>
                <td>{cliente.apellido}</td>
                <td>{cliente.correo}</td>
                <td>{cliente.telefono}</td>
                <td>{cliente.direccion}</td>
                <td>{cliente.ciudad}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ClientesPage;
