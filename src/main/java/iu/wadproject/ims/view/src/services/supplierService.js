import { authService } from './authServices';

export const supplierService = {
  getAll: async () => {
    const res = await authService.authFetch('/api/suppliers');
    if (!res.ok) throw new Error('Failed to fetch suppliers');
    const data = await res.json();
    return data.data || [];
  },

  getById: async (id) => {
    const res = await authService.authFetch(`/api/suppliers/${id}`);
    if (!res.ok) throw new Error('Failed to fetch supplier');
    const data = await res.json();
    return data.data;
  },

  create: async (supplier) => {
    const res = await authService.authFetch('/api/suppliers', {
      method: 'POST',
      body: JSON.stringify(supplier),
    });
    if (!res.ok) throw new Error('Failed to create supplier');
    const data = await res.json();
    return data.data;
  },

  update: async (id, supplier) => {
    const res = await authService.authFetch(`/api/suppliers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(supplier),
    });
    if (!res.ok) throw new Error('Failed to update supplier');
    const data = await res.json();
    return data.data;
  },

  delete: async (id) => {
    const res = await authService.authFetch(`/api/suppliers/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete supplier');
    const data = await res.json();
    return data.data;
  },
};
