import React from 'react';
import { X, Heart, ShoppingCart } from 'lucide-react';
import { useFavorites } from '../../hooks/useFavorites';
import { useCart } from '../../hooks/useCart';

const FavoritesSidebar: React.FC = () => {
  const { favorites, isOpen, setIsOpen, removeFromFavorites, clearFavorites } = useFavorites();
  const { addToCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleAddToCart = (product: any) => {
    addToCart(product, product.sizes[0], product.colors[0]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>
      
      <div className="relative bg-white w-full max-w-md h-full shadow-2xl transform transition-transform duration-300 ease-in-out overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between z-10">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500" />
            Favoritos ({favorites.length})
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-4">
          {favorites.length === 0 ? (
            <div className="text-center py-8">
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">No tienes favoritos aún</p>
              <button
                onClick={() => setIsOpen(false)}
                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
              >
                Explorar Productos
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {favorites.map((product) => (
                  <div key={product.id} className="flex gap-4 p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-300">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 text-sm mb-1">{product.name}</h3>
                      <p className="text-xs text-gray-500 mb-2 line-clamp-2">
                        {product.description}
                      </p>
                      <p className="text-red-600 font-semibold text-sm mb-2">
                        {formatPrice(product.price)}
                      </p>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="flex-1 px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition-colors duration-300 flex items-center justify-center gap-1"
                        >
                          <ShoppingCart className="w-3 h-3" />
                          Agregar
                        </button>
                        <button
                          onClick={() => removeFromFavorites(product.id)}
                          className="px-3 py-1 text-red-500 border border-red-500 text-xs rounded hover:bg-red-50 transition-colors duration-300"
                        >
                          Quitar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Clear Favorites */}
              <button
                onClick={clearFavorites}
                className="w-full px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-300"
              >
                Limpiar Favoritos
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoritesSidebar;