// src/pages/Prestamos.tsx
import { useEffect, useState } from 'react';
import {
  getPrestamos,
  crearPrestamo,
  devolverPrestamo,
  eliminarPrestamo,
  Prestamo,
} from '../services/prestamosService';
import { getArticulosDisponibles } from '../services/articulosService';
import { getEmpleados } from '../services/empleadosService';

export default function PrestamosPage() {
  const [prestamos, setPrestamos] = useState<Prestamo[]>([]);
  const [articulos, setArticulos] = useState<any[]>([]);
  const [empleados, setEmpleados] = useState<any[]>([]);
  const userId = parseInt(localStorage.getItem('userId') || '0');

  const [nuevoPrestamo, setNuevoPrestamo] = useState({
    articulo_id: 0,
    empleado_id: 0,
    creado_por: userId,
  });

  // Carga inicial de datos
  useEffect(() => {
    cargarPrestamos();
    cargarArticulos();
    cargarEmpleados();
  }, []);

  const cargarPrestamos = async () => {
    const data = await getPrestamos();
    setPrestamos(data);
  };

  const cargarArticulos = async () => {
    const data = await getArticulosDisponibles();
    setArticulos(data);
  };

  const cargarEmpleados = async () => {
    const data = await getEmpleados();
    setEmpleados(data);
  };

  // Funciones utilitarias para mostrar nombres en lugar de IDs
  const getArticuloInfo = (id: number) => {
    const art = articulos.find((a) => a.id === id);
    return art ? `${art.marca} (${art.numero_serie})` : 'Artículo no encontrado';
  };

  const getEmpleadoNombre = (id: number) => {
    const emp = empleados.find((e) => e.id === id);
    return emp ? `${emp.nombre} ${emp.apellido}` : 'Empleado no encontrado';
  };

  // Manejo cambios input formulario
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNuevoPrestamo((prev) => ({
      ...prev,
      [name]: Number(value),
      creado_por: userId, // aseguramos que se actualice el creador siempre
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (nuevoPrestamo.articulo_id === 0 || nuevoPrestamo.empleado_id === 0) {
      alert('Por favor selecciona artículo y empleado');
      return;
    }

    try {
      await crearPrestamo({ ...nuevoPrestamo, creado_por: userId });
      alert('Préstamo creado con éxito');
      setNuevoPrestamo({ articulo_id: 0, empleado_id: 0, creado_por: userId });
      cargarPrestamos();
      cargarArticulos();
    } catch (error) {
      console.error('Error al crear préstamo:', error);
      alert('Error al crear préstamo');
    }
  };

  const handleDevolver = async (id: number) => {
    if (!window.confirm('¿Seguro que quieres devolver este préstamo?')) return;
    try {
      await devolverPrestamo(id);
      cargarPrestamos();
      cargarArticulos();
    } catch (error) {
      console.error(error);
      alert('Error al devolver préstamo');
    }
  };

  const handleEliminar = async (id: number) => {
    if (!window.confirm('¿Seguro que quieres eliminar este préstamo?')) return;
    try {
      await eliminarPrestamo(id);
      cargarPrestamos();
      cargarArticulos();
    } catch (error) {
      console.error(error);
      alert('Error al eliminar préstamo');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Préstamos</h1>

      <form onSubmit={handleSubmit} className="mb-6 flex gap-4 items-end">
        <div>
          <label htmlFor="articulo_id" className="block mb-1 font-medium">
            Selecciona Artículo
          </label>
          <select
            id="articulo_id"
            name="articulo_id"
            value={nuevoPrestamo.articulo_id}
            onChange={handleChange}
            className="border rounded px-3 py-2"
          >
            <option value={0}>-- Elige un artículo --</option>
            {articulos.map((art) => (
              <option key={art.id} value={art.id}>
                {art.marca} ({art.numero_serie})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="empleado_id" className="block mb-1 font-medium">
            Selecciona Empleado
          </label>
          <select
            id="empleado_id"
            name="empleado_id"
            value={nuevoPrestamo.empleado_id}
            onChange={handleChange}
            className="border rounded px-3 py-2"
          >
            <option value={0}>-- Elige un empleado --</option>
            {empleados.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.nombre} {emp.apellido}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
        >
          Crear Préstamo
        </button>
      </form>

      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Artículo</th>
            <th className="border border-gray-300 p-2">Empleado</th>
            <th className="border border-gray-300 p-2">Estado</th>
            <th className="border border-gray-300 p-2">Fecha Préstamo</th>
            <th className="border border-gray-300 p-2">Fecha Devolución</th>
            <th className="border border-gray-300 p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {prestamos.map((p) => (
            <tr key={p.id}>
              <td className="border border-gray-300 p-2">{getArticuloInfo(p.articulo_id)}</td>
              <td className="border border-gray-300 p-2">{getEmpleadoNombre(p.empleado_id)}</td>
              <td className="border border-gray-300 p-2 capitalize">
                {p.estado_prestamo === 'devuelto' ? 'Devuelto' : 'Activo'}
              </td>
              <td className="border border-gray-300 p-2">
                {new Date(p.fecha_prestamo).toLocaleDateString()}
              </td>
              <td className="border border-gray-300 p-2">
                {p.fecha_devolucion ? new Date(p.fecha_devolucion).toLocaleDateString() : '-'}
              </td>
              <td className="border border-gray-300 p-2 space-x-2">
                {p.estado_prestamo !== 'devuelto' && (
                  <button
                    onClick={() => handleDevolver(p.id!)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Devolver
                  </button>
                )}
                <button
                  onClick={() => handleEliminar(p.id!)}
                  className="bg-red-400 text-white px-3 py-1 rounded hover:bg-red-500"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
          {prestamos.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center p-4 text-gray-500">
                No hay préstamos registrados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
