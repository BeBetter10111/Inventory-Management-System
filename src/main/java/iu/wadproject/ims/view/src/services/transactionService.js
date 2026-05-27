import { authService } from './authServices';

export const transactionService = {
  getAll: async () => {
    const res = await authService.authFetch('/api/transactions');
    if (!res.ok) throw new Error('Failed to fetch transactions');
    const data = await res.json();
    return data.data || [];
  },

  getById: async (id) => {
    const res = await authService.authFetch(`/api/transactions/${id}`);
    if (!res.ok) throw new Error('Failed to fetch transaction');
    const data = await res.json();
    return data.data;
  },

  getCurrentUserTransactions: async () => {
    const res = await authService.authFetch('/api/transactions/current-user');
    if (!res.ok) throw new Error('Failed to fetch current user transactions');
    const data = await res.json();
    return data.data || [];
  },

  create: async (transaction) => {
    const res = await authService.authFetch('/api/transactions', {
      method: 'POST',
      body: JSON.stringify(transaction),
    });
    if (!res.ok) throw new Error('Failed to create transaction');
    const data = await res.json();
    return data.data;
  },

  update: async (id, transaction) => {
    const res = await authService.authFetch(`/api/transactions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(transaction),
    });
    if (!res.ok) throw new Error('Failed to update transaction');
    const data = await res.json();
    return data.data;
  },

  delete: async (id) => {
    const res = await authService.authFetch(`/api/transactions/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete transaction');
    const data = await res.json();
    return data.data;
  },

  import: async (importData) => {
    const res = await authService.authFetch('/api/transactions/import', {
      method: 'POST',
      body: JSON.stringify(importData),
    });
    if (!res.ok) throw new Error('Failed to import transaction');
    const data = await res.json();
    return data.data;
  },

  export: async (exportData) => {
    const res = await authService.authFetch('/api/transactions/export', {
      method: 'POST',
      body: JSON.stringify(exportData),
    });
    if (!res.ok) throw new Error('Failed to export transaction');
    const data = await res.json();
    return data.data;
  },
};
