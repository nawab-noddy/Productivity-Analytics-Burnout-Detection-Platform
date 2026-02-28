import React, { useState } from 'react';
import API from '../api/axiosConfig';

const Login = ({ onLogin }) => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [message, setMessage] = useState('');

    const handleChange = (e) => setCredentials({ ...credentials, [e.target.name]: e.target.value });

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await API.post('/auth/login', credentials);
            localStorage.setItem('token', response.data);
            if (onLogin) onLogin();
        } catch (error) {
            setMessage('Login Failed: ' + (error.response?.data?.error || 'Invalid credentials'));
        }
    };

    return (
        <div className="card" style={{ maxWidth: '400px', margin: '40px auto' }}>
            <h2 className="auth-title">Welcome Back</h2>
            <p className="auth-subtitle">Enter your credentials to continue</p>
            
            <form onSubmit={handleLogin}>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, marginLeft: '5px' }}>USERNAME</label>
                <input name="username" placeholder="e.g. demo_user" onChange={handleChange} required />
                
                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, marginLeft: '5px' }}>PASSWORD</label>
                <input name="password" type="password" placeholder="••••••••" onChange={handleChange} required />
                
                <button type="submit" style={{ width: '100%', marginTop: '10px' }}>Sign In</button>
            </form>
            
            {message && <p style={{ color: '#ef4444', textAlign: 'center', marginTop: '20px', fontWeight: 500 }}>{message}</p>}
        </div>
    );
};

export default Login;