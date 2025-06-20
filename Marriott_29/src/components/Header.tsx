// frontend/src/components/Header.tsx
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-[#F5E4E1] text-gray-800 p-4 shadow-md flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img src="/logo.png" alt="Logo" className="h-10 w-10 object-contain" />
        <h1 className="text-xl font-bold tracking-wide">Marriott_Prest</h1>
      </div>
      <nav className="flex gap-4 text-sm font-medium">
        //ESTA SERA NUESTRO "LINK" DE INCIO.
        <Link to="/" className="hover:text-pink-600">Inicio</Link>
        {/* //LLERARA A PAGINA DE PRESTAMOS */}
        <Link to="/prestamos" className="hover:text-pink-600">Prestamos</Link> 
         {/* //LLEVARA A PAGINA DE ARTICULOS */}
        <Link to="/articulos" className="hover:text-pink-600">Articulos</Link>
        {/* //LEVARA A PAGINA DE EMPLEADOS */}
                <Link to="/empleados" className="hover:text-pink-600">Empleados</Link> 
                {/* // AYUDA A SALIR DEL BLOQUE */}
        <Link to="/salir" className="hover:text-pink-600">Salir</Link> 
      </nav>
    </header>
  );
} 