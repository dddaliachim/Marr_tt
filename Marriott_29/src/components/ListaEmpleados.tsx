import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Empleado {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  puesto: string;
  hotel: string;
}

const ListaEmpleados: React.FC = () => {
  const [empleados, setEmpleados] = useState<Empleado[]>([]);

  useEffect(() => {
    axios.get('/api/empleados')
      .then(res => setEmpleados(res.data))
      .catch(err => console.error('Error al cargar empleados:', err));
  }, []);

  return (
    <div className="empleados-lista">
      <h2>Lista de Empleados</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Puesto</th>
            <th>Hotel</th>
          </tr>
        </thead>
        <tbody>
          {empleados.map(e => (
            <tr key={e.id}>
              <td>{e.nombre} {e.apellido}</td>
              <td>{e.email}</td>
              <td>{e.telefono}</td>
              <td>{e.puesto}</td>
              <td>{e.hotel}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaEmpleados;
