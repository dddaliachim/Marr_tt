// src/services/empleadosService.ts
import axios from 'axios';

export interface Empleado {
  id: number;
  nombre: string;
  apellido: string;
  // Puedes agregar más campos si tienes (ej. correo, puesto, etc)
}

const API_URL = '/api/empleados';

// Obtener todos los empleados
export const getEmpleados = async (): Promise<Empleado[]> => {
  try {
    const res = await axios.get(API_URL);
    return res.data;
  } catch (error) {
    console.error('Error obteniendo empleados:', error);
    return [];
  }
};

// Crear nuevo empleado
export const crearEmpleado = async (empleado: Omit<Empleado, 'id'>): Promise<Empleado | null> => {
  try {
    const res = await axios.post(API_URL, empleado);
    return res.data;
  } catch (error) {
    console.error('Error creando empleado:', error);
    return null;
  }
};

// Editar empleado
export const editarEmpleado = async (id: number, empleado: Partial<Empleado>): Promise<Empleado | null> => {
  try {
    const res = await axios.put(`${API_URL}/${id}`, empleado);
    return res.data;
  } catch (error) {
    console.error('Error editando empleado:', error);
    return null;
  }
};

// Eliminar empleado
export const eliminarEmpleado = async (id: number): Promise<boolean> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return true;
  } catch (error) {
    console.error('Error eliminando empleado:', error);
    return false;
  }
};
