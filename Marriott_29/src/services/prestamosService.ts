import axios from 'axios';

export interface Prestamo {
  id?: number;
  folio?: string;
  articulo_id: number;
  empleado_id: number;
  fecha_prestamo?: string;
  fecha_devolucion?: string | null;
  estado_prestamo?: 'activo' | 'devuelto';
  creado_por: number;
}

const API_URL = '/api/prestamos';

export const getEmpleados = async () => {
  const res = await axios.get('/api/empleados');
  return res.data;
};

export const getArticulosDisponibles = async () => {
  const res = await axios.get('/api/articulos');
  return res.data.filter((a: any) => a.estado === 'disponible');
};

export const getPrestamos = async (): Promise<Prestamo[]> => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const crearPrestamo = async (data: Prestamo): Promise<Prestamo> => {
  const res = await axios.post(API_URL, data);
  return res.data;
};

export const devolverPrestamo = async (id: number): Promise<Prestamo> => {
  const res = await axios.put(`${API_URL}/devolver/${id}`);
  return res.data;
};

export const eliminarPrestamo = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
