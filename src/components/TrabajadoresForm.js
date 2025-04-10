import React, { useState, useEffect } from 'react';
import { createTrabajador, updateTrabajador } from '../services/trabajadoresService';

const TrabajadoresForm = ({ trabajador, onFormSubmit }) => {
  const [nombre, setNombre] = useState('');
  const [puesto, setPuesto] = useState('');
  const [telefono, setTelefono] = useState('');
  const [error, setError] = useState('');

  // Si estamos editando un trabajador, cargamos los datos
  useEffect(() => {
    if (trabajador) {
      setNombre(trabajador.nombre);
      setPuesto(trabajador.puesto);
      setTelefono(trabajador.telefono);
    }
  }, [trabajador]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trabajadorData = { nombre, puesto, telefono };

    try {
      let result;
      if (trabajador) {
        // Si tenemos un trabajador, lo estamos actualizando
        result = await updateTrabajador(trabajador.idTrabajador, trabajadorData);
      } else {
        // Si no tenemos un trabajador, estamos creando uno nuevo
        result = await createTrabajador(trabajadorData);
      }

      // Llamar al callback pasado como prop (en este caso actualizar la lista)
      onFormSubmit(result);

      // Limpiar los campos después de enviar el formulario
      setNombre('');
      setPuesto('');
      setTelefono('');
    } catch (err) {
      setError('Error al guardar trabajador');
    }
  };

  return (
    <div className="trabajador-form">
      <h2>{trabajador ? 'Actualizar Trabajador' : 'Crear Trabajador'}</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Puesto:</label>
          <input
            type="text"
            value={puesto}
            onChange={(e) => setPuesto(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Teléfono:</label>
          <input
            type="text"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
          />
        </div>
        <button type="submit">{trabajador ? 'Actualizar' : 'Crear'}</button>
      </form>
    </div>
  );
};

export default TrabajadoresForm;
