import { useState, useEffect } from 'react';
import { CartItem, Product } from '../types';

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem('eumorfia-cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        setCart([]);
      }
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('eumorfia-cart', JSON.stringify(cart));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [cart]);

  const addToCart = (product: Product, selectedSize: string, selectedColor: string) => {
    const existingItem = cart.find(
      item => item.id === product.id && 
      item.selectedSize === selectedSize && 
      item.selectedColor === selectedColor
    );

    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id && 
        item.selectedSize === selectedSize && 
        item.selectedColor === selectedColor
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      const newItem: CartItem = { 
        ...product, 
        quantity: 1, 
        selectedSize, 
        selectedColor 
      };
      setCart([...cart, newItem]);
    }

    // Show success notification (optional)
    showNotification('Producto agregado al carrito');
  };

  const removeFromCart = (id: number, selectedSize: string, selectedColor: string) => {
    setCart(cart.filter(item => 
      !(item.id === id && item.selectedSize === selectedSize && item.selectedColor === selectedColor)
    ));
    showNotification('Producto eliminado del carrito');
  };

  const updateQuantity = (id: number, selectedSize: string, selectedColor: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id, selectedSize, selectedColor);
    } else {
      setCart(cart.map(item =>
        item.id === id && 
        item.selectedSize === selectedSize && 
        item.selectedColor === selectedColor
          ? { ...item, quantity }
          : item
      ));
    }
  };

  const clearCart = () => {
    setCart([]);
    showNotification('Carrito vaciado');
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getItemCount = (id: number, selectedSize: string, selectedColor: string) => {
    const item = cart.find(
      item => item.id === id && 
      item.selectedSize === selectedSize && 
      item.selectedColor === selectedColor
    );
    return item ? item.quantity : 0;
  };

  const showNotification = (message: string) => {
    // Simple notification - you could replace this with a toast library
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
  };

  return {
    cart,
    isOpen,
    setIsOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    getItemCount
  };
};