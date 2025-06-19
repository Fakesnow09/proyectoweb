import React, { useState } from "react";
import "../Styles/page.css";
import { LuSearch } from "react-icons/lu";
import { FiBell, FiUser } from "react-icons/fi";

function PedidosPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showUserPopover, setShowUserPopover] = useState(false);
  const [showNotifPopover, setShowNotifPopover] = useState(false);

  const pedidos = [
    { id: 1, cliente: "Juan Pérez", producto: "Producto A", cantidad: 3, estado: "Enviado" },
    { id: 2, cliente: "María López", producto: "Producto B", cantidad: 5, estado: "Pendiente" },
    { id: 2, cliente: "María López", producto: "Producto B", cantidad: 5, estado: "Pendiente" },
    { id: 2, cliente: "María López", producto: "Producto B", cantidad: 5, estado: "Pendiente" },
    { id: 2, cliente: "María López", producto: "Producto B", cantidad: 5, estado: "Pendiente" },
    { id: 2, cliente: "María López", producto: "Producto B", cantidad: 5, estado: "Pendiente" },
    { id: 2, cliente: "María López", producto: "Producto B", cantidad: 5, estado: "Pendiente" },
    { id: 2, cliente: "María López", producto: "Producto B", cantidad: 5, estado: "Pendiente" },
  ];

  const resultados = pedidos.filter(item =>
    Object.values(item).some(val =>
      val.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="page-container">
      <div className="page-content">
        <div className="page-header">
          <h1>PEDIDOS</h1>
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
                    <li>Pedido urgente</li>
                    <li>Revisión de envío</li>
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
              <th>ID</th>
              <th>Cliente</th>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {resultados.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.cliente}</td>
                <td>{item.producto}</td>
                <td>{item.cantidad}</td>
                <td>{item.estado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PedidosPage;

