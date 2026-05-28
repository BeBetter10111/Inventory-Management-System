import { createContext, useState, useCallback, useEffect } from 'react';
import { authService } from '../services/authServices.js';
import Cookies from 'js-cookie';
import { userService } from '../services/userService.js';

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
                setLoading(true);

                const currentUser = await authService.getCurrentUser();

                if (currentUser) {
                    setUser(currentUser);
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
            const userData = await authService.login(username, password, rememberMe);
            
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
            return await authService.register(username, password, fullName, email, phoneNumber, roleType);
            
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
