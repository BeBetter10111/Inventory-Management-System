import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';

export default function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        rememberMe: false
    });
    
    const auth = useAuth();

    const { state } = useLocation();
    
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('Login attempt:', formData);

        try {
            const user = await auth.login(formData.username, formData.password, formData.rememberMe);
            
            if (user.status === "Pending") {
                navigate('/approval');
            } else {
                if (user.roleType === 'Staff') {
                    navigate('/staff');
                } else {
                    navigate('/admin');
                }
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const forgotPassword = (e) => {
        e.preventDefault();
        navigate('/forgot-password');
    };
    
    return (
        <div className="container auth-container">
            <div className="auth-box">
                <h1>Inventory Management System</h1>
        
                <form onSubmit={handleSubmit} className="auth-form">
                    <h2>Login to your account</h2>
                    <p className="form-description">Enter your username or email below to login to your account</p>
        
                    <div className="form-group">
                        <label htmlFor="username">Username or Email</label>
                        <input type="text" id="username" name="username" value={formData.username}
                                onChange={handleChange} placeholder="Enter your username or email" required />
                    </div>
        
                    <div className="form-group">
                        <div className="form-group-header">
                            <label htmlFor="password">Password</label>
                            <a href="#" onClick={forgotPassword} className="forgot-password">Forgot your password?</a>
                        </div>

                        <input type="password" id="password" name="password" value={formData.password}
                                onChange={handleChange} placeholder="Enter your password" required />
                    </div>
        
                    <div className="form-group checkbox">
                        <input type="checkbox" id="rememberMe" name="rememberMe" checked={formData.rememberMe}
                                onChange={handleChange} />
                        <label htmlFor="rememberMe">Remember Me</label>
                    </div>
        
                    <button type="submit" className="btn-primary">Login</button>
        
                    <p className="auth-link">
                        Don't have an account? <a onClick={() => navigate('/signup')}>Sign up</a>
                    </p>
                </form>
            </div>
        </div>
    )
}
