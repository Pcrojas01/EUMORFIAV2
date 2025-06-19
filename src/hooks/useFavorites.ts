import { useState, useEffect } from 'react';
import { Product } from '../types';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('eumorfia-favorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error('Error loading favorites from localStorage:', error);
        setFavorites([]);
      }
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('eumorfia-favorites', JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites to localStorage:', error);
    }
  }, [favorites]);

  const addToFavorites = (product: Product) => {
    const isAlreadyFavorite = favorites.some(fav => fav.id === product.id);
    
    if (!isAlreadyFavorite) {
      setFavorites([...favorites, product]);
      showNotification(`${product.name} agregado a favoritos`);
    }
  };

  const removeFromFavorites = (productId: number) => {
    const product = favorites.find(fav => fav.id === productId);
    setFavorites(favorites.filter(fav => fav.id !== productId));
    if (product) {
      showNotification(`${product.name} eliminado de favoritos`);
    }
  };

  const toggleFavorite = (product: Product) => {
    const isAlreadyFavorite = favorites.some(fav => fav.id === product.id);
    
    if (isAlreadyFavorite) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  const isFavorite = (productId: number) => {
    return favorites.some(fav => fav.id === productId);
  };

  const getFavoritesCount = () => {
    return favorites.length;
  };

  const clearFavorites = () => {
    setFavorites([]);
    showNotification('Favoritos eliminados');
  };

  const showNotification = (message: string) => {
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
  };

  return {
    favorites,
    isOpen,
    setIsOpen,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    getFavoritesCount,
    clearFavorites
  };
};