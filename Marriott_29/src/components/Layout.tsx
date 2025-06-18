// frontend/src/components/Layout.tsx
 import { ReactNode } from 'react'; //buscar mas opciones 
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-[#FDF8F5] text-gray-800">
      <Header />
      <main className="p-4 max-w-7xl mx-auto">{children}</main>
    </div>
  );
} 