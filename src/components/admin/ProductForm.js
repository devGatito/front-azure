// src/components/admin/ProductForm.js
import React, { useState, useEffect } from 'react';
import { createProducto, updateProducto } from '../../services/productos.service';

const ProductForm = ({ selectedProduct, onFormSubmit }) => {
  const [producto, setProducto] = useState({
    nombre: '',
    descripcion: '',
    tipo: '',
    precio: 0,
    stock: 0,
  });

  useEffect(() => {
    if (selectedProduct) {
      setProducto({
        nombre: selectedProduct.nombre,
        descripcion: selectedProduct.descripcion,
        tipo: selectedProduct.tipo,
        precio: selectedProduct.precio,
        stock: selectedProduct.stock,
      });
    }
  }, [selectedProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedProduct) {
      await updateProducto(selectedProduct.idProducto, producto);
    } else {
      await createProducto(producto);
    }
    onFormSubmit();
  };

  return (
    <div>
      <h2>{selectedProduct ? 'Editar Producto' : 'Crear Producto'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre</label>
          <input
            type="text"
            name="nombre"
            value={producto.nombre}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Descripción</label>
          <input
            type="text"
            name="descripcion"
            value={producto.descripcion}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Tipo</label>
          <input
            type="text"
            name="tipo"
            value={producto.tipo}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Precio</label>
          <input
            type="number"
            name="precio"
            value={producto.precio}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Stock</label>
          <input
            type="number"
            name="stock"
            value={producto.stock}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {selectedProduct ? 'Actualizar Producto' : 'Crear Producto'}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
