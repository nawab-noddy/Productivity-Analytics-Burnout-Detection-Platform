import React, { useState } from 'react';
import API from '../api/axiosConfig';

const Login = ({ onLogin }) => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await API.post('/auth/login', credentials);
            localStorage.setItem('token', response.data);
            if (onLogin) onLogin();
        } catch (error) {
            setMessage('Login Failed: ' + (error.response?.data?.error || 'Server Error'));
        }
    };

    return (
        <div className="card" style={{ maxWidth: '400px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', color: '#2a5298' }}>Welcome Back</h2>
            <p style={{ textAlign: 'center', color: '#666', marginBottom: '20px' }}>Sign in to continue</p>
            
            <form onSubmit={handleLogin}>
                <input name="username" placeholder="Username" onChange={handleChange} required />
                <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
                <button type="submit">Login</button>
            </form>
            
            {message && <p style={{ color: 'red', textAlign: 'center', marginTop: '15px' }}>{message}</p>}
        </div>
    );
};

export default Login;