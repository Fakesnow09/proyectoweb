 import React, { useEffect, useState } from "react";
import "../Styles/page.css";
import { LuSearch } from "react-icons/lu";
import { FiBell, FiUser } from "react-icons/fi";

function ProductosPage() {
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState({
    id: "",
    nombre: "",
    categoria: "",
    cantidad: "",
    fecha_vencimiento: "",
    marca: "",
    precio_unitario: "",
  });
  const [modoEdicion, setModoEdicion] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showUserPopover, setShowUserPopover] = useState(false);
  const [showNotifPopover, setShowNotifPopover] = useState(false);

  const URL = "http://localhost:8080/proyecto-logistica/productos";

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = () => {
    fetch(URL)
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((err) => console.error("Error al cargar productos:", err));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const limpiarFormulario = () => {
    setForm({
      id: "",
      nombre: "",
      categoria: "",
      cantidad: "",
      fecha_vencimiento: "",
      marca: "",
      precio_unitario: "",
    });
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
    formData.append("fecha_vencimiento", form.fecha_vencimiento);
    formData.append("marca", form.marca);
    formData.append("precio_unitario", form.precio_unitario);

    fetch(URL, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          alert(data.mensaje);
          limpiarFormulario();
          cargarProductos();
        }
      })
      .catch((err) => alert("Error al guardar: " + err));
  };

  const editar = (producto) => {
    setForm({
      id: producto.idProducto,
      nombre: producto.nombre,
      categoria: producto.categoria,
      cantidad: producto.cantidad,
      fecha_vencimiento: producto.fechaVencimiento,
      marca: producto.marca,
      precio_unitario: producto.precioUnitario,
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
        cargarProductos();
      })
      .catch((err) => alert("Error al eliminar: " + err));
  };

  const resultados = productos.filter((item) =>
    Object.values(item).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="page-container">
      <div className="page-content">
        <div className="page-header">
          <h1>PRODUCTOS</h1>
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
                    <li>Producto agotado</li>
                    <li>Revisión de stock</li>
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
          <input type="text" name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
          <input type="text" name="categoria" placeholder="Categoría" value={form.categoria} onChange={handleChange} required />
          <input type="number" name="cantidad" placeholder="Cantidad" value={form.cantidad} onChange={handleChange} required />
          <input type="date" name="fecha_vencimiento" value={form.fecha_vencimiento} onChange={handleChange} required />
          <input type="text" name="marca" placeholder="Marca" value={form.marca} onChange={handleChange} required />
          <input type="text" name="precio_unitario" placeholder="Precio" value={form.precio_unitario} onChange={handleChange} required />
          <button type="submit">{modoEdicion ? "Actualizar" : "Insertar"}</button>
          {modoEdicion && (
            <button type="button" onClick={limpiarFormulario}>Cancelar</button>
          )}
        </form>

        <table className="page-table">
          <thead>
            <tr>
              <th>Id_Producto</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Cantidad</th>
              <th>Fecha Vencimiento</th>
              <th>Marca</th>
              <th>Precio_unitario</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {resultados.map((item) => (
              <tr key={item.idProducto}>
                <td>{item.idProducto}</td>
                <td>{item.nombre}</td>
                <td>{item.categoria}</td>
                <td>{item.cantidad}</td>
                <td>{item.fechaVencimiento}</td>
                <td>{item.marca}</td>
                <td>{item.precioUnitario}</td>
                <td>
                  <button onClick={() => editar(item)} style={{ marginRight: "5px" }}>Editar</button>
                  <button onClick={() => eliminar(item.idProducto)} style={{ backgroundColor: "red", color: "white" }}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductosPage;