import { authService } from './authServices';

export const activityLogService = {
  getAll: async () => {
    const res = await authService.authFetch('/api/activity-logs');
    if (!res.ok) throw new Error('Failed to fetch activity logs');
    const data = await res.json();
    return data.data || [];
  },

  getByType: async (type) => {
    const res = await authService.authFetch(`/api/activity-logs/by-type?type=${type}`);
    if (!res.ok) throw new Error('Failed to fetch activity logs by type');
    const data = await res.json();
    return data.data || [];
  },

  create: async (activityLog) => {
    const res = await authService.authFetch('/api/activity-logs', {
      method: 'POST',
      body: JSON.stringify(activityLog),
    });
    if (!res.ok) throw new Error('Failed to create activity log');
    const data = await res.json();
    return data.data;
  },
};
