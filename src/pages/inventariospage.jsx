import React, { useState } from "react";
import "../Styles/page.css";
import { LuSearch } from "react-icons/lu";
import { FiBell, FiUser } from "react-icons/fi";

function Inventariospage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showUserPopover, setShowUserPopover] = useState(false);
  const [showNotifPopover, setShowNotifPopover] = useState(false);

  const inventario = [
    { id: 1, nombre: "Producto A", categoria: "Aseo", cantidad: "500", precio: "$6.000" },
    { id: 2, nombre: "Producto B", categoria: "Alimentos", cantidad: "200", precio: "$3.500" },
    { id: 6, pedido: 8, transporte: 10, salida: "05 Feb, 2024", llegada: "08 Feb, 2024" },
    { id: 6, pedido: 8, transporte: 10, salida: "05 Feb, 2024", llegada: "08 Feb, 2024" },
    { id: 6, pedido: 8, transporte: 10, salida: "05 Feb, 2024", llegada: "08 Feb, 2024" },
    { id: 6, pedido: 8, transporte: 10, salida: "05 Feb, 2024", llegada: "08 Feb, 2024" },
    { id: 6, pedido: 8, transporte: 10, salida: "05 Feb, 2024", llegada: "08 Feb, 2024" },
    { id: 6, pedido: 8, transporte: 10, salida: "05 Feb, 2024", llegada: "08 Feb, 2024" },
  ];

  const resultados = inventario.filter(item =>
    Object.values(item).some(val =>
      val.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="page-container">
      <div className="page-content">
        <div className="page-header">
          <h1>INVENTARIOS</h1>
          <div className="header-icons">
            <div className="icon-wrapper" onClick={() => {
              setShowNotifPopover(!showNotifPopover);
              setShowUserPopover(false);
            }}>
              <FiBell size={40} style={{ marginRight: "16px", cursor: "pointer" }} />
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
            <div className="icon-wrapper" onClick={() => {
              setShowUserPopover(!showUserPopover);
              setShowNotifPopover(false);
            }}>
              <FiUser size={40} style={{ cursor: "pointer" }} />
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
          <button className="search-button">
            <LuSearch />
          </button>
        </div>

        <table className="page-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Cantidad</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            {resultados.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.nombre}</td>
                <td>{item.categoria}</td>
                <td>{item.cantidad}</td>
                <td>{item.precio}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Inventariospage;
