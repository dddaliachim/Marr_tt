import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Articulo {
  id: number;
  marca: string;
  numero_serie: string;
  estado: string;
  hotel: string;
  tipo_nombre: string;
}

const ListaArticulos: React.FC = () => {
  const [articulos, setArticulos] = useState<Articulo[]>([]);

  useEffect(() => {
    axios.get('/api/articulos')
      .then(res => setArticulos(res.data))
      .catch(err => console.error('Error al cargar artículos:', err));
  }, []);

  return (
    <div className="articulos-lista">
      <h2>Lista de Artículos</h2>
      <table>
        <thead>
          <tr>
            <th>Marca</th>
            <th>Serie</th>
            <th>Estado</th>
            <th>Hotel</th>
            <th>Tipo</th>
          </tr>
        </thead>
        <tbody>
          {articulos.map(a => (
            <tr key={a.id}>
              <td>{a.marca}</td>
              <td>{a.numero_serie}</td>
              <td>{a.estado}</td>
              <td>{a.hotel}</td>
              <td>{a.tipo_nombre}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaArticulos;
