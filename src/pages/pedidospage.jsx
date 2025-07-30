import React, { useEffect, useState } from "react";
import "../Styles/page.css";
import { LuSearch } from "react-icons/lu";
import { FiBell, FiUser } from "react-icons/fi";
import * as XLSX from "xlsx";
import { saveAs } from 'file-saver';

function PedidosPage() {
  const [pedidos, setPedidos] = useState([]);
  const [form, setForm] = useState({
    id: "",
    id_cliente: "",
    id_producto: "",
    cantidad: "",
    estado: "",
  });
  const [modoEdicion, setModoEdicion] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showUserPopover, setShowUserPopover] = useState(false);
  const [showNotifPopover, setShowNotifPopover] = useState(false);

  const URL = "http://localhost:8080/proyecto-logistica/pedidos";

  useEffect(() => {
    cargarPedidos();
  }, []);

  const cargarPedidos = () => {
    fetch(URL)
      .then((res) => res.json())
      .then((data) => setPedidos(data))
      .catch((err) => console.error("Error al cargar pedidos:", err));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const limpiarFormulario = () => {
    setForm({
      id: "",
      id_cliente: "",
      id_producto: "",
      cantidad: "",
      estado: "",
    });
    setModoEdicion(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("accion", modoEdicion ? "actualizar" : "insertar");
    if (modoEdicion) formData.append("id", form.id);
    formData.append("id_cliente", form.id_cliente);
    formData.append("id_producto", form.id_producto);
    formData.append("cantidad", form.cantidad);
    formData.append("estado", form.estado);

    fetch(URL, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.mensaje);
        limpiarFormulario();
        cargarPedidos();
      })
      .catch((err) => alert("Error al guardar: " + err));
  };

  const editar = (pedido) => {
    setForm({
      id: pedido.idPedido,
      id_cliente: pedido.idCliente,
      id_producto: pedido.idProducto,
      cantidad: pedido.cantidad,
      estado: pedido.estado,
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
        cargarPedidos();
      })
      .catch((err) => alert("Error al eliminar: " + err));
  };

  const exportarAExcel = () => {
  const datosExportar = pedidos.map((item) => ({
    "Id_Pedido": item.idPedido,
    "Cliente": item.idCliente,
    "Producto": item.idProducto,
    "Cantidad": item.cantidad,
    "Estado": item.estado,
    "Fecha_Pedido": item.fechaPedido,
  }));

  const worksheet = XLSX.utils.json_to_sheet(datosExportar);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Pedidos");

  const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([wbout], { type: 'application/octet-stream' });
  saveAs(blob, `Reporte_Pedidos_${new Date().toISOString().split("T")[0]}.xlsx`);
};



  const resultados = pedidos.filter((item) =>
    Object.values(item).some((val) =>
      val?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="page-container">
      <div className="page-content">
        <div className="page-header">
          <h1>PEDIDOS</h1>
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
                    <li>Pedido urgente</li>
                    <li>Revisión de envío</li>
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
          <button className="search-button">
            <LuSearch />
          </button>
        </div>

        <form className="formulario-crud" onSubmit={handleSubmit}>
          <input type="number" name="id_cliente" placeholder="Id_Cliente" value={form.id_cliente} onChange={handleChange} required />
          <input type="number" name="id_producto" placeholder="Id_Producto" value={form.id_producto} onChange={handleChange} required />
          <input type="number" name="cantidad" placeholder="Cantidad" value={form.cantidad} onChange={handleChange} required />
          <input type="text" name="estado" placeholder="Estado" value={form.estado} onChange={handleChange} required />
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
              <th>Id_Pedido</th>
              <th>Id_Cliente</th>
              <th>Id_Producto</th>
              <th>Cantidad</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {resultados.map((item) => (
              <tr key={item.idPedido}>
                <td>{item.idPedido}</td>
                <td>{item.idCliente}</td>
                <td>{item.idProducto}</td>
                <td>{item.cantidad}</td>
                <td>{item.estado}</td>
                <td>
                  <button onClick={() => editar(item)} style={{ marginRight: "5px" }}>
                    Editar
                  </button>
                  <button
                    onClick={() => eliminar(item.idPedido)}
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

        {/* ✅ Botón Exportar */}
           <div className="formulario-crud" style={{ marginTop: '20px' }}>
              <button className="export-button" onClick={exportarAExcel}>
               Imprimir reporte
              </button>
             
           </div>
      </div>
    </div>
  );
}

export default PedidosPage;

