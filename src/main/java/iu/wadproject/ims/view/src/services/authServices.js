const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const TOKEN_KEY = 'app_token';
const USER_KEY  = 'app_user';

export const authService = {

  
  register: async ({ username, password, fullname, phoneNumber, email, role }) => {
    const res = await fetch(`${BASE_URL}/api/auth/register`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body:    JSON.stringify({ username, password, fullname, phoneNumber, email, role }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Đăng ký thất bại.');
    return data;
  },

  login: async (username, password) => {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body:    JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Sai tên đăng nhập hoặc mật khẩu.');

    const token = data.token ?? data.userId;
    const user  = {
      userId:      data.userId,
      username:    data.username,
      fullname:    data.fullname,
      phoneNumber: data.phoneNumber,
      email:       data.email,
      role:        data.role,    
      status:      data.status,
    };
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    return user;
  },

  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  getToken:        () => localStorage.getItem(TOKEN_KEY),
  getCurrentUser:  () => JSON.parse(localStorage.getItem(USER_KEY) || 'null'),
  isAuthenticated: () => !!localStorage.getItem(TOKEN_KEY),
  isAdmin:         () => JSON.parse(localStorage.getItem(USER_KEY) || 'null')?.role === 'Admin',

  // AUTH FETCH (tự động gắn Bearer token vào mọi request) 
  authFetch: async (url, options = {}) => {
    const token = localStorage.getItem(TOKEN_KEY);
    const res = await fetch(`${BASE_URL}${url}`, {
      ...options,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    });
    if (res.status === 401) {
      authService.logout();
      window.location.href = '/login';
    }
    return res;
  },
};