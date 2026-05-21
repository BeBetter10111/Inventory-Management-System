import { authService } from './authServices';

export const userService = {
  getAll: async () => {
    const res = await authService.authFetch('/api/users');
    if (!res.ok) throw new Error('Failed to fetch users');
    const data = await res.json();
    return data.data || [];
  },

  getById: async (id) => {
    const res = await authService.authFetch(`/api/users/${id}`);
    if (!res.ok) throw new Error('Failed to fetch user');
    const data = await res.json();
    return data.data;
  },

  create: async (user) => {
    const res = await authService.authFetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(user),
    });
    if (!res.ok) throw new Error('Failed to create user');
    const data = await res.json();
    return data.data;
  },

  update: async (id, user) => {
    const res = await authService.authFetch(`/api/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(user),
    });
    if (!res.ok) throw new Error('Failed to update user');
    const data = await res.json();
    return data.data;
  },

  delete: async (id) => {
    const res = await authService.authFetch(`/api/users/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete user');
    const data = await res.json();
    return data.data;
  },

  approve: async (id) => {
    const res = await authService.authFetch(`/api/users/approve/${id}`, {
      method: 'PUT',
    });
    if (!res.ok) throw new Error('Failed to approve user');
    const data = await res.json();
    return data.data;
  },

  disable: async (id) => {
    const res = await authService.authFetch(`/api/users/disable/${id}`, {
      method: 'PUT',
    });
    if (!res.ok) throw new Error('Failed to disable user');
    const data = await res.json();
    return data.data;
  },

  enable: async (id) => {
    const res = await authService.authFetch(`/api/users/enable/${id}`, {
      method: 'PUT',
    });
    if (!res.ok) throw new Error('Failed to enable user');
    const data = await res.json();
    return data.data;
  },
};
