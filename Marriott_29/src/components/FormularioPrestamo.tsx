import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Articulo {
  id: number;
  numero_serie: string;
  marca: string;
  hotel: string;
}

interface Empleado {
  id: number;
  nombre: string;
  apellido: string;
}

const FormularioPrestamo: React.FC = () => {
  const [articulos, setArticulos] = useState<Articulo[]>([]);
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [form, setForm] = useState({
    articulo_id: 0,
    empleado_id: 0,
    fecha_devolucion: '',
  });

  const userId = parseInt(localStorage.getItem('userId') || '0');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resArticulos = await axios.get('/api/articulos');
        const disponibles = resArticulos.data.filter((a: any) => a.estado === 'disponible');
        setArticulos(disponibles);

        const resEmpleados = await axios.get('/api/empleados');
        setEmpleados(resEmpleados.data);
      } catch (err) {
        console.error('Error al obtener datos:', err);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const prestamoData = {
        ...form,
        creado_por: userId
      };

      await axios.post('/api/prestamos', prestamoData);
      alert('Prestamo registrado correctamente');

      setForm({ articulo_id: 0, empleado_id: 0, fecha_devolucion: '' });

      // Aquí después podrás abrir el PDF o redirigir
    } catch (error) {
      console.error('Error al registrar el prestamo:', error);
      alert('Error al registrar el préstamo');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow space-y-4">
      <h2 className="text-2xl font-semibold text-center">Registrar Préstamo</h2>

      <select name="articulo_id" value={form.articulo_id} onChange={handleChange} className="w-full p-2 border rounded" required>
        <option value="">Seleccione un artículo</option>
        {articulos.map(art => (
          <option key={art.id} value={art.id}>
            {art.numero_serie} - {art.marca} ({art.hotel})
          </option>
        ))}
      </select>

      <select name="empleado_id" value={form.empleado_id} onChange={handleChange} className="w-full p-2 border rounded" required>
        <option value="">Seleccione un empleado</option>
        {empleados.map(emp => (
          <option key={emp.id} value={emp.id}>
            {emp.nombre} {emp.apellido}
          </option>
        ))}
      </select>

      <label className="block">
        Fecha de devolución (opcional):
        <input
          type="date"
          name="fecha_devolucion"
          value={form.fecha_devolucion}
          onChange={handleChange}
          className="w-full p-2 border rounded mt-1"
        />
      </label>

      <button
        type="submit"
        className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700 transition"
      >
        Registrar Prestamo
      </button>
    </form>
  );
};

export default FormularioPrestamo;
