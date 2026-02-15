import React, { useState } from 'react';
import API from '../api/axiosConfig';

const Login = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Send POST request to your Java AuthController
            const response = await API.post('/auth/login', credentials);
            
            // Save the token returned by Java
            localStorage.setItem('token', response.data);
            setMessage('Login Successful! Token saved.');
        } catch (error) {
            setMessage('Login Failed: ' + (error.response?.data?.error || 'Server Error'));
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Login to YouPi Productivity</h2>
            <form onSubmit={handleLogin}>
                <input name="username" placeholder="Username" onChange={handleChange} /><br/>
                <input name="password" type="password" placeholder="Password" onChange={handleChange} /><br/>
                <button type="submit">Login</button>
            </form>
            <p>{message}</p>
        </div>
    );
};

export default Login;