import React, { useState } from "react";
import "../Styles/page.css";
import { LuSearch } from "react-icons/lu";
import { FiBell, FiUser } from "react-icons/fi";

function ProductosPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showUserPopover, setShowUserPopover] = useState(false);
  const [showNotifPopover, setShowNotifPopover] = useState(false);

  const productosData = [
    { id: 6, nombre: "Limpido", categoria: "Aseo", cantidad: "500 Uni", precio: "$6.000" },
    { id: 7, nombre: "Jabón", categoria: "Aseo", cantidad: "300 Uni", precio: "$4.000" },
    { id: 8, nombre: "Arroz", categoria: "Alimentos", cantidad: "1000 Uni", precio: "$2.500" },
    { id: 8, nombre: "Arroz", categoria: "Alimentos", cantidad: "1000 Uni", precio: "$2.500" },
    { id: 8, nombre: "Arroz", categoria: "Alimentos", cantidad: "1000 Uni", precio: "$2.500" },
    { id: 8, nombre: "Arroz", categoria: "Alimentos", cantidad: "1000 Uni", precio: "$2.500" },
    { id: 8, nombre: "Arroz", categoria: "Alimentos", cantidad: "1000 Uni", precio: "$2.500" },
    { id: 8, nombre: "Arroz", categoria: "Alimentos", cantidad: "1000 Uni", precio: "$2.500" },
    { id: 8, nombre: "Arroz", categoria: "Alimentos", cantidad: "1000 Uni", precio: "$2.500" },
    // Agrega más registros si es necesario
  ];

  const filteredData = productosData.filter((item) =>
    Object.values(item).some((value) =>
      value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="page-container">
      <div className="page-content">
        <div className="page-header">
          <h1>PRODUCTOS</h1>
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
                  <strong>Notificaciones</strong>
                  <ul>
                    <li>Producto agotado</li>
                    <li>Revisión de stock</li>
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
          <button className="search-button">
            <LuSearch />
          </button>
        </div>

        <table className="page-table">
          <thead>
            <tr>
              <th>Id_Producto</th>
              <th>Nombre</th>
              <th>Categoria</th>
              <th>Cantidad</th>
              <th>Precio Unitario</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index}>
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

export default ProductosPage;

