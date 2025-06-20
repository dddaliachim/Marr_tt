// src/pages/Empleados.tsx
import { useEffect, useState } from 'react';
import {
  getEmpleados,
  crearEmpleado,
  editarEmpleado,
  eliminarEmpleado,
  Empleado,
} from '../services/empleadosService';

export default function EmpleadosPage() {
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [nuevoEmpleado, setNuevoEmpleado] = useState({ nombre: '', apellido: '' });
  const [editandoEmpleado, setEditandoEmpleado] = useState<Empleado | null>(null);

  useEffect(() => {
    cargarEmpleados();
  }, []);

  const cargarEmpleados = async () => {
    const data = await getEmpleados();
    setEmpleados(data);
  };

  const handleChangeNuevo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNuevoEmpleado({ ...nuevoEmpleado, [e.target.name]: e.target.value });
  };

  const handleSubmitNuevo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoEmpleado.nombre.trim() || !nuevoEmpleado.apellido.trim()) {
      alert('Por favor completa todos los campos');
      return;
    }

    const creado = await crearEmpleado(nuevoEmpleado);
    if (creado) {
      alert('Empleado creado');
      setNuevoEmpleado({ nombre: '', apellido: '' });
      cargarEmpleados();
    } else {
      alert('Error al crear empleado');
    }
  };

  const handleEditarClick = (empleado: Empleado) => {
    setEditandoEmpleado(empleado);
  };

  const handleChangeEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editandoEmpleado) return;
    setEditandoEmpleado({ ...editandoEmpleado, [e.target.name]: e.target.value });
  };

  const handleSubmitEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editandoEmpleado) return;
    if (!editandoEmpleado.nombre.trim() || !editandoEmpleado.apellido.trim()) {
      alert('Completa todos los campos');
      return;
    }
    const editado = await editarEmpleado(editandoEmpleado.id, {
      nombre: editandoEmpleado.nombre,
      apellido: editandoEmpleado.apellido,
    });
    if (editado) {
      alert('Empleado actualizado');
      setEditandoEmpleado(null);
      cargarEmpleados();
    } else {
      alert('Error al actualizar empleado');
    }
  };

  const handleCancelarEdit = () => {
    setEditandoEmpleado(null);
  };

  const handleEliminar = async (id: number) => {
    if (!window.confirm('¿Seguro que quieres eliminar este empleado?')) return;
    const eliminado = await eliminarEmpleado(id);
    if (eliminado) {
      alert('Empleado eliminado');
      cargarEmpleados();
    } else {
      alert('Error al eliminar empleado');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Empleados</h1>

      {/* Formulario Crear Nuevo Empleado */}
      {!editandoEmpleado && (
        <form onSubmit={handleSubmitNuevo} className="mb-6 space-y-3 max-w-md">
          <div>
            <label className="block mb-1 font-medium">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={nuevoEmpleado.nombre}
              onChange={handleChangeNuevo}
              className="border rounded px-3 py-2 w-full"
              placeholder="Nombre"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Apellido</label>
            <input
              type="text"
              name="apellido"
              value={nuevoEmpleado.apellido}
              onChange={handleChangeNuevo}
              className="border rounded px-3 py-2 w-full"
              placeholder="Apellido"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
          >
            Crear Empleado
          </button>
        </form>
      )}

      {/* Formulario Editar Empleado */}
      {editandoEmpleado && (
        <form onSubmit={handleSubmitEdit} className="mb-6 space-y-3 max-w-md">
          <div>
            <label className="block mb-1 font-medium">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={editandoEmpleado.nombre}
              onChange={handleChangeEdit}
              className="border rounded px-3 py-2 w-full"
              placeholder="Nombre"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Apellido</label>
            <input
              type="text"
              name="apellido"
              value={editandoEmpleado.apellido}
              onChange={handleChangeEdit}
              className="border rounded px-3 py-2 w-full"
              placeholder="Apellido"
            />
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
            >
              Guardar Cambios
            </button>
            <button
              type="button"
              onClick={handleCancelarEdit}
              className="bg-gray-400 text-white px-5 py-2 rounded hover:bg-gray-500"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      {/* Tabla de Empleados */}
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Nombre</th>
            <th className="border border-gray-300 p-2">Apellido</th>
            <th className="border border-gray-300 p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleados.map((emp) => (
            <tr key={emp.id}>
              <td className="border border-gray-300 p-2">{emp.nombre}</td>
              <td className="border border-gray-300 p-2">{emp.apellido}</td>
              <td className="border border-gray-300 p-2 space-x-2">
                <button
                  onClick={() => handleEditarClick(emp)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleEliminar(emp.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
          {empleados.length === 0 && (
            <tr>
              <td colSpan={3} className="text-center p-4 text-gray-500">
                No hay empleados registrados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
