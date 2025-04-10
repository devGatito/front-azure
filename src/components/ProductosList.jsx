import React, { useState, useEffect } from 'react';
import { getProductos } from '../../services/productoService.js';

const ProductosList = () => {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await getProductos();
        setProductos(data);
      } catch (err) {
        setError('Error al obtener productos');
      }
    };

    fetchProductos();
  }, []);

  return (
    <div>
      <h2>Lista de Productos</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(producto => (
            <tr key={producto.idProducto}>
              <td>{producto.idProducto}</td>
              <td>{producto.nombre}</td>
              <td>{producto.descripcion}</td>
              <td>{producto.precio}</td>
              <td>{producto.stock}</td>
              <td>
                <button className="btn btn-warning" onClick={() => { /* handle edit */ }}>Editar</button>
                <button className="btn btn-danger" onClick={() => { /* handle delete */ }}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductosList;
