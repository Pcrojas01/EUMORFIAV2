import React from 'react';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 text-gray-600 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              EUMORFIA
            </h3>
            <p className="text-sm leading-relaxed">
              Redefiniendo lo que significa vestir diferente. Cada camisa cuenta una historia única de estilo y personalidad.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors duration-300">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors duration-300">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors duration-300">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-red-500 transition-colors duration-300">Inicio</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors duration-300">Camisas</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors duration-300">Estilos</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors duration-300">Sobre Nosotros</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors duration-300">Contacto</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800">Categorías</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-red-500 transition-colors duration-300">Urbano</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors duration-300">Underground</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors duration-300">Tribal</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors duration-300">Nuevos Estilos</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors duration-300">Ofertas</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800">Contacto</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-red-500" />
                <span>info@eumorfia.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-red-500" />
                <span>+57 300 123 4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-red-500" />
                <span>Bogotá, Colombia</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm">
          <p>&copy; 2024 EUMORFIA. Todos los derechos reservados.</p>
          <p className="mt-1 text-gray-400">Hecho con ❤️ para los que se atreven a ser diferentes</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;