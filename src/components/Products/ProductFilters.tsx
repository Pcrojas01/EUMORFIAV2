import React from 'react';
import { Filter, X } from 'lucide-react';
import { FilterState } from '../../types';

interface ProductFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  onFiltersChange,
  isOpen,
  onToggle
}) => {
  const categories = [
    { value: '', label: 'Todos los Estilos' },
    { value: 'urbano', label: 'Urbano' },
    { value: 'underground', label: 'Underground' },
    { value: 'tribal', label: 'Tribal' }
  ];

  const sortOptions = [
    { value: 'default', label: 'Orden por defecto' },
    { value: 'price-low', label: 'Precio: Menor a Mayor' },
    { value: 'price-high', label: 'Precio: Mayor a Menor' },
    { value: 'name', label: 'Nombre A-Z' },
    { value: 'newest', label: 'Más Nuevos' }
  ];

  const handleCategoryChange = (category: string) => {
    onFiltersChange({ ...filters, category });
  };

  const handleSortChange = (sortBy: string) => {
    onFiltersChange({ ...filters, sortBy });
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    onFiltersChange({ ...filters, priceRange: [min, max] });
  };

  const resetFilters = () => {
    onFiltersChange({
      category: '',
      priceRange: [0, 200000],
      sortBy: 'default'
    });
  };

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="md:hidden flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Filtros</h3>
        <button
          onClick={onToggle}
          className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
        >
          <Filter className="w-4 h-4" />
          Filtrar
        </button>
      </div>

      {/* Filter Panel */}
      <div className={`
        ${isOpen ? 'block' : 'hidden'} md:block
        fixed md:relative top-0 left-0 right-0 md:top-auto md:left-auto md:right-auto
        z-50 md:z-auto bg-white md:bg-transparent
        p-4 md:p-0 shadow-lg md:shadow-none
        max-h-screen overflow-y-auto md:max-h-none md:overflow-y-visible
      `}>
        {/* Mobile Header */}
        <div className="md:hidden flex justify-between items-center mb-4 pb-4 border-b">
          <h3 className="text-lg font-semibold">Filtros</h3>
          <button onClick={onToggle} className="p-2 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Category Filter */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Estilo</h4>
            <div className="space-y-2">
              {categories.map((category) => (
                <label key={category.value} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    value={category.value}
                    checked={filters.category === category.value}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="w-4 h-4 text-red-500 focus:ring-red-400"
                  />
                  <span className="text-gray-700 hover:text-red-600 transition-colors duration-300">
                    {category.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Rango de Precio</h4>
            <div className="space-y-3">
              <div>
                <input
                  type="range"
                  min="50000"
                  max="200000"
                  step="5000"
                  value={filters.priceRange[1]}
                  onChange={(e) => handlePriceRangeChange(filters.priceRange[0], parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-1">
                  <span>$50.000</span>
                  <span className="font-semibold text-red-600">
                    ${filters.priceRange[1].toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Sort Options */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Ordenar por</h4>
            <select
              value={filters.sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Reset Filters */}
          <button
            onClick={resetFilters}
            className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-300"
          >
            Limpiar Filtros
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={onToggle}
        ></div>
      )}
    </>
  );
};

export default ProductFilters;