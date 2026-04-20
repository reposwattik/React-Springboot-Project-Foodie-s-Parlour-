// src/services/productService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8090/api/orders';

// Centralized service for all backend calls
const productService = {
  
  // Get all orders from database
  getAllOrders: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/all`);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      return [];
    }
  },

  // Add new custom order
  addOrder: async (orderData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/add`, orderData);
      return response.data;
    } catch (error) {
      console.error("Failed to add order:", error);
      throw error;
    }
  },

  // Delete order by ID
  deleteOrder: async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/delete/${id}`);
      return true;
    } catch (error) {
      console.error(`Failed to delete order ${id}:`, error);
      throw error;
    }
  },

  // Optional: Clear all orders (if needed in future)
  clearAllOrders: async () => {
    try {
      const orders = await productService.getAllOrders();
      for (const order of orders) {
        if (order.id) {
          await productService.deleteOrder(order.id);
        }
      }
      return true;
    } catch (error) {
      console.error("Failed to clear orders:", error);
      return false;
    }
  }
};

export default productService;