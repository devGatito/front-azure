// src/components/admin/ProductList.js
import React, { useEffect, useState } from 'react';
import { getProductos, deleteProducto } from '../../services/productos.service';

const ProductList = ({ onEdit }) => {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await getProductos();
        setProductos(data);
      } catch (err) {
        setError('Error al cargar productos');
      }
    };

    fetchProductos();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteProducto(id);
      setProductos(productos.filter(producto => producto.idProducto !== id));
    } catch (error) {
      setError('Error al eliminar el producto');
    }
  };

  return (
    <div>
      {error && <div className="alert alert-danger">{error}</div>}
      <h2>Lista de Productos</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Tipo</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.idProducto}>
              <td>{producto.nombre}</td>
              <td>{producto.descripcion}</td>
              <td>{producto.tipo}</td>
              <td>{producto.precio}</td>
              <td>{producto.stock}</td>
              <td>
                <button
                  className="btn btn-sm btn-primary mr-2"
                  onClick={() => onEdit(producto)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(producto.idProducto)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
