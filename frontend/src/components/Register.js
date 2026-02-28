import React, { useState } from 'react';
import API from '../api/axiosConfig';

const Register = ({ onSwitchToLogin }) => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [msg, setMsg] = useState('');

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await API.post('/auth/register', formData);
            setMsg('✅ Registration Successful! Switching to login...');
            setTimeout(() => onSwitchToLogin(), 2000);
        } catch (error) {
            setMsg('❌ Error: ' + (error.response?.data?.error || 'Registration failed'));
        }
    };

    return (
        <div className="card" style={{ maxWidth: '400px', margin: '40px auto' }}>
            <h2 className="auth-title">Create Account</h2>
            <p className="auth-subtitle">Join the YouPi ecosystem</p>
            
            <form onSubmit={handleRegister}>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>USERNAME</label>
                <input name="username" placeholder="Choose a username" onChange={handleChange} required />
                
                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>EMAIL</label>
                <input name="email" type="email" placeholder="name@example.com" onChange={handleChange} required />
                
                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>PASSWORD</label>
                <input name="password" type="password" placeholder="Create a strong password" onChange={handleChange} required />
                
                <button type="submit" style={{ width: '100%', marginTop: '10px' }}>Register</button>
            </form>
            {msg && <p style={{ textAlign: 'center', marginTop: '20px', fontWeight: 500, color: msg.includes('❌') ? '#ef4444' : '#10b981' }}>{msg}</p>}
        </div>
    );
};

export default Register;