import { authService } from './authServices';

export const buyerService = {
  getAll: async () => {
    const res = await authService.authFetch('/api/buyers');
    if (!res.ok) throw new Error('Failed to fetch buyers');
    const data = await res.json();
    return data.data || [];
  },

  getById: async (id) => {
    const res = await authService.authFetch(`/api/buyers/${id}`);
    if (!res.ok) throw new Error('Failed to fetch buyer');
    const data = await res.json();
    return data.data;
  },

  create: async (buyer) => {
    const res = await authService.authFetch('/api/buyers', {
      method: 'POST',
      body: JSON.stringify(buyer),
    });
    if (!res.ok) throw new Error('Failed to create buyer');
    const data = await res.json();
    return data.data;
  },

  update: async (id, buyer) => {
    const res = await authService.authFetch(`/api/buyers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(buyer),
    });
    if (!res.ok) throw new Error('Failed to update buyer');
    const data = await res.json();
    return data.data;
  },

  delete: async (id) => {
    const res = await authService.authFetch(`/api/buyers/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete buyer');
    const data = await res.json();
    return data.data;
  },
};
