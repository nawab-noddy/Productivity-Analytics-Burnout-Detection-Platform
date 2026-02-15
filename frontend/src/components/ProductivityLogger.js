import React, { useState } from 'react';
import API from '../api/axiosConfig';

const ProductivityLogger = () => {
    // 1. Local state for form data
    const [log, setLog] = useState({
        date: new Date().toISOString().split('T')[0], // Defaults to today
        workHours: '',
        sleepHours: '',
        stressLevel: 3,
        mood: '',
        plannedTasks: '',
        completedTasks: ''
    });
    const [msg, setMsg] = useState('');

    const handleChange = (e) => {
        setLog({ ...log, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // 2. Sending log to Java backend
            await API.post('/logs', log);
            setMsg('Log saved successfully!');
        } catch (err) {
            setMsg('Error: ' + (err.response?.data?.error || 'Failed to save log'));
        }
    };

    return (
        <div style={{ border: '1px solid #ccc', margin: '20px', padding: '20px' }}>
            <h3>Log Your Day</h3>
            <form onSubmit={handleSubmit}>
                <label>Date: </label>
                <input type="date" name="date" value={log.date} onChange={handleChange} /><br/>
                
                <input type="number" name="workHours" placeholder="Work Hours" onChange={handleChange} required /><br/>
                <input type="number" name="sleepHours" placeholder="Sleep Hours" onChange={handleChange} required /><br/>
                
                <label>Stress (1-5): </label>
                <input type="range" name="stressLevel" min="1" max="5" onChange={handleChange} /><br/>
                
                <input name="mood" placeholder="Mood" onChange={handleChange} /><br/>
                <textarea name="plannedTasks" placeholder="Planned Tasks" onChange={handleChange}></textarea><br/>
                <textarea name="completedTasks" placeholder="Completed Tasks" onChange={handleChange}></textarea><br/>
                
                <button type="submit">Submit Log</button>
            </form>
            <p>{msg}</p>
        </div>
    );
};

export default ProductivityLogger;