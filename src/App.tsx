import React, { useState, useMemo } from 'react';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import HeroSection from './components/Hero/HeroSection';
import CategorySection from './components/Categories/CategorySection';
import ProductCard from './components/Products/ProductCard';
import ProductFilters from './components/Products/ProductFilters';
import ProductModal from './components/Products/ProductModal';
import ShoppingCart from './components/Cart/ShoppingCart';
import FavoritesSidebar from './components/Favorites/FavoritesSidebar';
import { products } from './data/products';
import { Product, FilterState } from './types';
import { useScrollAnimation } from './hooks/useScrollEffect';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    category: '',
    priceRange: [0, 200000],
    sortBy: 'default'
  });

  useScrollAnimation();

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !filters.category || product.category === filters.category;
      const matchesPrice = product.price <= filters.priceRange[1];
      
      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sort products
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'newest':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        // Default order
        break;
    }

    return filtered;
  }, [searchTerm, filters]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCategoryClick = (category: string) => {
    setFilters(prev => ({ ...prev, category }));
    scrollToSection('products');
  };

  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleExploreClick = () => {
    scrollToSection('products');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header 
        onMenuClick={scrollToSection}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      
      <main>
        <HeroSection onExploreClick={handleExploreClick} />
        <CategorySection onCategoryClick={handleCategoryClick} />
        
        {/* Products Section */}
        <section id="products" className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 scroll-animate opacity-0 translate-y-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Nuestra Colección
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Descubre más de 50 diseños únicos que fusionan arte, cultura y estilo
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Filters Sidebar */}
              <div className="lg:w-1/4">
                <ProductFilters
                  filters={filters}
                  onFiltersChange={setFilters}
                  isOpen={isFiltersOpen}
                  onToggle={() => setIsFiltersOpen(!isFiltersOpen)}
                />
              </div>

              {/* Products Grid */}
              <div className="lg:w-3/4">
                <div className="flex justify-between items-center mb-6">
                  <p className="text-gray-600">
                    Mostrando {filteredAndSortedProducts.length} productos
                  </p>
                </div>

                {filteredAndSortedProducts.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg mb-4">
                      No se encontraron productos que coincidan con tus criterios
                    </p>
                    <button
                      onClick={() => {
                        setFilters({ category: '', priceRange: [0, 200000], sortBy: 'default' });
                        setSearchTerm('');
                      }}
                      className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
                    >
                      Limpiar Filtros
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredAndSortedProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onQuickView={handleQuickView}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 bg-red-50">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto scroll-animate opacity-0 translate-y-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                ¿Listo para Redefinir tu Estilo?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Únete a miles de personas que ya han encontrado su identidad a través de nuestras camisas únicas
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => scrollToSection('products')}
                  className="px-8 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors duration-300"
                >
                  Ver Colección
                </button>
                <button className="px-8 py-3 border-2 border-red-500 text-red-600 font-semibold rounded-lg hover:bg-red-500 hover:text-white transition-colors duration-300">
                  Contactar
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProduct(null);
        }}
      />
      
      <ShoppingCart />
      <FavoritesSidebar />
    </div>
  );
}

export default App;