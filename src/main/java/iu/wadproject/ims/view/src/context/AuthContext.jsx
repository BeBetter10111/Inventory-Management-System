import { createContext, useState, useCallback, useEffect } from 'react';
import { authService } from '../services/authServices.js';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [authed, setAuthed] = useState(false);

  // Check if user is already logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = Cookies.get('authToken');
        if (token) {
          // Verify token is still valid by checking with backend
          // For now, we'll assume if token exists, user is authenticated
          setAuthed(true);
        }
      } catch (err) {
        console.error('Auth check failed:', err);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = useCallback(async (username, password, rememberMe) => {
    setLoading(true);
    setError('');

    try {
      const response = await authService.login(username, password, rememberMe);
      const userData = response.data;

      setUser(userData);
      setAuthed(true);
      return userData;

    } catch (err) {
      setError(err.message);
      throw err;

    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (username, password, fullName, email, phoneNumber, roleType) => {
    setLoading(true);
    setError('');

    try {
      const response = await authService.register(username, password, fullName, email, phoneNumber, roleType);
      const userData = response.data;

      return userData;
    } catch (err) {
      setError(err.message);
      throw err;

    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setUser(null);
      setAuthed(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        authed,
        setError,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
