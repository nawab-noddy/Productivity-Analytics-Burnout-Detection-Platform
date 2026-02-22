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
            setMsg('✅ Registration Successful! You can now log in.');
            setTimeout(() => onSwitchToLogin(), 2000); // Switch to login after 2 seconds
        } catch (error) {
            setMsg('❌ Error: ' + (error.response?.data?.error || 'Registration failed'));
        }
    };

    return (
        <div className="card" style={{ maxWidth: '400px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', color: '#2a5298' }}>Create an Account</h2>
            <form onSubmit={handleRegister}>
                <input name="username" placeholder="Choose a Username" onChange={handleChange} required />
                <input name="email" type="email" placeholder="Email Address" onChange={handleChange} required />
                <input name="password" type="password" placeholder="Create a Password" onChange={handleChange} required />
                <button type="submit">Register</button>
            </form>
            {msg && <p style={{ textAlign: 'center', marginTop: '15px', fontWeight: 'bold' }}>{msg}</p>}
        </div>
    );
};

export default Register;