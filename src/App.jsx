import { useState, useEffect } from "react";
import axios from "axios";

const API = "http://172.31.41.97:3000/api/productos";

function App() {
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    const res = await axios.get(API);
    setProductos(res.data);
  };

  const agregarProducto = async (e) => {
    e.preventDefault();
    await axios.post(API, { nombre, precio: parseFloat(precio), stock: parseInt(stock) });
    setNombre("");
    setPrecio("");
    setStock("");
    cargarProductos();
  };

  const eliminarProducto = async (id) => {
    await axios.delete(`${API}/${id}`);
    cargarProductos();
  };

  return (
    <div style={{ maxWidth: "800px", margin: "40px auto", fontFamily: "Arial" }}>
      <h1>🛒 Gestión de Productos</h1>

      <form onSubmit={agregarProducto} style={{ marginBottom: "20px" }}>
        <input placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} required style={{ marginRight: "8px", padding: "6px" }} />
        <input placeholder="Precio" type="number" value={precio} onChange={e => setPrecio(e.target.value)} required style={{ marginRight: "8px", padding: "6px" }} />
        <input placeholder="Stock" type="number" value={stock} onChange={e => setStock(e.target.value)} required style={{ marginRight: "8px", padding: "6px" }} />
        <button type="submit" style={{ padding: "6px 12px", background: "#4CAF50", color: "white", border: "none", cursor: "pointer" }}>Agregar</button>
      </form>

      <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead style={{ background: "#f2f2f2" }}>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nombre}</td>
              <td>${p.precio.toLocaleString()}</td>
              <td>{p.stock}</td>
              <td>
                <button onClick={() => eliminarProducto(p.id)} style={{ background: "#f44336", color: "white", border: "none", padding: "4px 8px", cursor: "pointer" }}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;