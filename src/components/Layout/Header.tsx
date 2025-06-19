import React, { useState } from 'react';
import { Search, ShoppingCart, Menu, X, Heart } from 'lucide-react';
import { useScrollEffect } from '../../hooks/useScrollEffect';
import { useCart } from '../../hooks/useCart';
import { useFavorites } from '../../hooks/useFavorites';

interface HeaderProps {
  onMenuClick: (section: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, searchTerm, onSearchChange }) => {
  const isScrolled = useScrollEffect();
  const { getTotalItems, setIsOpen } = useCart();
  const { getFavoritesCount, setIsOpen: setFavoritesOpen } = useFavorites();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { label: 'Inicio', id: 'hero' },
    { label: 'Camisas', id: 'products' },
    { label: 'Estilos', id: 'categories' },
    { label: 'Contacto', id: 'contact' }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-2' 
          : 'bg-transparent py-4 mt-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <div className={`transform transition-all duration-300 ${isScrolled ? 'scale-90' : 'scale-100'}`}>
            <div className="relative group">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent animate-pulse">
                EUMORFIA
              </h1>
              <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-red-400 to-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onMenuClick(item.id)}
                className="text-gray-700 hover:text-red-500 transition-colors duration-300 font-medium relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </div>

          {/* Search and Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative hidden sm:block">
              <input
                type="text"
                placeholder="Buscar camisas..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-64 px-4 py-2 pl-10 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all duration-300"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>

            {/* Favorites */}
            <button 
              onClick={() => setFavoritesOpen(true)}
              className="relative p-2 text-gray-600 hover:text-red-500 transition-colors duration-300"
            >
              <Heart className="w-5 h-5" />
              {getFavoritesCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                  {getFavoritesCount()}
                </span>
              )}
            </button>

            {/* Cart */}
            <button
              onClick={() => setIsOpen(true)}
              className="relative p-2 text-gray-600 hover:text-red-500 transition-colors duration-300"
            >
              <ShoppingCart className="w-5 h-5" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                  {getTotalItems()}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-red-500 transition-colors duration-300"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 bg-white/95 backdrop-blur-md rounded-lg shadow-lg animate-fade-in">
            <div className="flex flex-col space-y-4 px-4">
              {/* Mobile Search */}
              <div className="relative sm:hidden">
                <input
                  type="text"
                  placeholder="Buscar camisas..."
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full px-4 py-2 pl-10 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
              
              {/* Mobile Navigation */}
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onMenuClick(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-left text-gray-700 hover:text-red-500 transition-colors duration-300 font-medium py-2"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;