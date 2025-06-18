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
import Layout from '../components/Layout';

const PrestamosPage = () => {
  const [prestamos, setPrestamos] = useState<Prestamo[]>([]);
  const [articulos, setArticulos] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [nuevoPrestamo, setNuevoPrestamo] = useState({
    articulo_id: 0,
    empleado_id: 0,
    creado_por: 1, // ID del admin
  });

  const fetchAll = async () => {
    const [prs, arts, emps] = await Promise.all([
      getPrestamos(),
      getArticulosDisponibles(),
      getEmpleados(),
    ]);
    setPrestamos(prs);
    setArticulos(arts);
    setEmpleados(emps);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNuevoPrestamo({
      ...nuevoPrestamo,
      [e.target.name]: parseInt(e.target.value),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await crearPrestamo(nuevoPrestamo);
    await fetchAll();
  };

  const handleDevolver = async (id: number) => {
    await devolverPrestamo(id);
    await fetchAll();
  };

  const handleEliminar = async (id: number) => {
    if (confirm('¿Seguro que deseas eliminar este préstamo?')) {
      await eliminarPrestamo(id);
      await fetchAll();
    }
  };

  return (
    <Layout>
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4">Gestión de Préstamos</h1>

        {/* Formulario para nuevo préstamo */}
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6">
          <h2 className="text-xl mb-3">Nuevo préstamo</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              name="articulo_id"
              onChange={handleChange}
              className="border p-2 rounded"
              required
            >
              <option value="">Selecciona un artículo</option>
              {articulos.map((art: any) => (
                <option key={art.id} value={art.id}>
                  {art.tipo} - {art.marca}
                </option>
              ))}
            </select>

            <select
              name="empleado_id"
              onChange={handleChange}
              className="border p-2 rounded"
              required
            >
              <option value="">Selecciona un empleado</option>
              {empleados.map((emp: any) => (
                <option key={emp.id} value={emp.id}>
                  {emp.nombre} {emp.apellido}
                </option>
              ))}
            </select>

            <button type="submit" className="btn btn-primary">
              Registrar Préstamo
            </button>
          </div>
        </form>

        {/* Tabla de préstamos */}
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="w-full text-left">
            <thead className="bg-rose-100 text-gray-800">
              <tr>
                <th className="p-2">Folio</th>
                <th className="p-2">Artículo</th>
                <th className="p-2">Empleado</th>
                <th className="p-2">Estado</th>
                <th className="p-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {prestamos.map((p) => (
                <tr key={p.id} className="border-b">
                  <td className="p-2">{p.folio}</td>
                  <td className="p-2">{p.articulo_id}</td>
                  <td className="p-2">{p.empleado_id}</td>
                  <td className="p-2">{p.estado_prestamo}</td>
                  <td className="p-2 space-x-2">
                    {p.estado_prestamo === 'activo' && (
                      <button onClick={() => handleDevolver(p.id!)} className="btn btn-primary">
                        Devolver
                      </button>
                    )}
                    <button onClick={() => handleEliminar(p.id!)} className="btn bg-gray-300">
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default PrestamosPage;
