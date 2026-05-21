import { authService } from './authServices';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const productService = {
  getAll: async () => {
    const res = await authService.authFetch('/api/products');
    if (!res.ok) throw new Error('Failed to fetch products');
    const data = await res.json();
    return data.data || [];
  },

  getById: async (id) => {
    const res = await authService.authFetch(`/api/products/${id}`);
    if (!res.ok) throw new Error('Failed to fetch product');
    const data = await res.json();
    return data.data;
  },

  create: async (product) => {
    const res = await authService.authFetch('/api/products', {
      method: 'POST',
      body: JSON.stringify(product),
    });
    if (!res.ok) throw new Error('Failed to create product');
    const data = await res.json();
    return data.data;
  },

  update: async (id, product) => {
    const res = await authService.authFetch(`/api/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(product),
    });
    if (!res.ok) throw new Error('Failed to update product');
    const data = await res.json();
    return data.data;
  },

  delete: async (id) => {
    const res = await authService.authFetch(`/api/products/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete product');
    const data = await res.json();
    return data.data;
  },
};
