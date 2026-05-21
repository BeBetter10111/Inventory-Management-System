import { authService } from './authServices';

export const categoryService = {
  getAll: async () => {
    const res = await authService.authFetch('/api/categories');
    if (!res.ok) throw new Error('Failed to fetch categories');
    const data = await res.json();
    return data.data || [];
  },

  getById: async (id) => {
    const res = await authService.authFetch(`/api/categories/${id}`);
    if (!res.ok) throw new Error('Failed to fetch category');
    const data = await res.json();
    return data.data;
  },

  create: async (category) => {
    const res = await authService.authFetch('/api/categories', {
      method: 'POST',
      body: JSON.stringify(category),
    });
    if (!res.ok) throw new Error('Failed to create category');
    const data = await res.json();
    return data.data;
  },

  update: async (id, category) => {
    const res = await authService.authFetch(`/api/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(category),
    });
    if (!res.ok) throw new Error('Failed to update category');
    const data = await res.json();
    return data.data;
  },

  delete: async (id) => {
    const res = await authService.authFetch(`/api/categories/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete category');
    const data = await res.json();
    return data.data;
  },
};
