// frontend/src/services/prestamosService,ts
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

// Base URL waaaaahhhhh....que sueño tengo tengo deossssmiooo!!! wawawa
const API_URL = '/api/prestamos';

export const getPrestamos = async (): Promise<Prestamo[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Error al obtener los préstamos');
  return response.json();
};

export const crearPrestamo = async (data: Prestamo): Promise<Prestamo> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Error al crear el préstamo');
  return response.json();
};

export const devolverPrestamo = async (id: number): Promise<Prestamo> => {
  const response = await fetch(`${API_URL}/devolver/${id}`, {
    method: 'PUT',
  });
  if (!response.ok) throw new Error('Error al devolver el préstamo');
  return response.json();
};

export const eliminarPrestamo = async (id: number): Promise<void> => {
  const response = await fetch(`/api/prestamos/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Error al eliminar el préstamo');
};
