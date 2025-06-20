import axios from 'axios';

export const getArticulosDisponibles = async () => {
  const res = await axios.get('/api/articulos?estado=disponible');
  return res.data;
};
