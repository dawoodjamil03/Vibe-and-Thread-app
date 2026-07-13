import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useToast } from './ToastContext';

const CartContext = createContext();

export function CartProvider({ children }) {
  const { addToast } = useToast();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('vibe_thread_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('vibe_thread_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = useCallback((product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id && item.size === product.size);
      if (existing) {
        return prev.map((item) =>
          (item.id === product.id && item.size === product.size) ? { ...item, quantity: item.quantity + (product.quantity || 1) } : item
        );
      }
      return [...prev, { ...product, quantity: product.quantity || 1 }];
    });
    addToast(`${product.name} added to bag`, 'success');
  }, [addToast]);

  const removeFromCart = useCallback((productId, size = null) => {
    const itemToRemove = cartItems.find(item => item.id === productId && (size === null || item.size === size));
    if (itemToRemove) {
      addToast(`${itemToRemove.name} removed`, 'info');
    }
    setCartItems((prev) => prev.filter((item) => !(item.id === productId && (size === null || item.size === size))));
  }, [cartItems, addToast]);

  const updateQuantity = useCallback((productId, size, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((prev) => 
      prev.map((item) => 
        (item.id === productId && item.size === size) ? { ...item, quantity: newQuantity } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  return (
    <CartContext.Provider value={{ 
      cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartCount,
      isCartOpen, openCart, closeCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
