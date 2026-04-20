import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import discountCodes from '../config/discountCodes.js';
import productService from '../services/productService.js';   // ← Added

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  // Load from backend
  useEffect(() => {
    productService.getAllOrders()
      .then(data => setCartItems(data || []))
      .catch(() => console.log("Backend not reachable"));
  }, []);

  const addToCart = async (newItem) => {
    // Smart auto-naming (your existing logic)
    let finalItem = { ...newItem };
    if (!finalItem.itemName || finalItem.itemName.trim() === '') {
      finalItem.itemName = getNextName(finalItem.category || 'item');
    }

    try {
      const savedItem = await productService.addOrder(finalItem);
      setCartItems(prev => [...prev, savedItem]);
      console.log("✅ Added with real ID:", savedItem.id);
    } catch (err) {
      console.error("Add failed", err);
      setCartItems(prev => [...prev, finalItem]);
    }
  };

  // Smart auto-naming logic (kept as-is)
  const getNextName = (category) => {
    const prefix = category.charAt(0).toUpperCase() + category.slice(1);
    const existing = cartItems.filter(item =>
      item.itemName && item.itemName.startsWith(prefix + " #")
    );
    const numbers = existing.map(item => {
      const match = item.itemName.match(/#(\d+)/);
      return match ? parseInt(match[1]) : 0;
    });
    const maxNum = numbers.length > 0 ? Math.max(...numbers) : 0;
    return `${prefix} #${maxNum + 1}`;
  };

  const removeFromCart = async (id) => {
    if (!id) return;

    setCartItems(prev => prev.filter(item => item.id !== id));

    try {
      await productService.deleteOrder(id);
      console.log(`✅ Deleted from database: ${id}`);
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prev =>
      prev.map(item => item.id === id ? { ...item, quantity: newQuantity } : item)
    );
  };

  // Improved clearAll using service
  const clearAll = async () => {
    setCartItems([]);
    try {
      const success = await productService.clearAllOrders();
      if (success) {
        console.log("✅ All orders cleared from database");
      }
    } catch (err) {
      console.error("Failed to clear database", err);
    }
  };

  const clearCart = () => setCartItems([]); // Keep old one for internal use

  const applyPromoCode = (code) => {
    const upperCode = code.toUpperCase().trim();
    if (discountCodes[upperCode]) {
      setPromoCode(upperCode);
      setDiscount(discountCodes[upperCode]);
      return true;
    }
    return false;
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal - discountAmount;

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearAll,
      clearCart,
      subtotal,
      discount,
      discountAmount,
      total,
      promoCode,
      applyPromoCode
    }}>
      {children}
    </CartContext.Provider>
  );
};