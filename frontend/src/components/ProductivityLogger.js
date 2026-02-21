import React, { useState } from 'react';
import API from '../api/axiosConfig';

const ProductivityLogger = () => {
    const [log, setLog] = useState({
        date: new Date().toISOString().split('T')[0],
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
            await API.post('/logs', log);
            setMsg('✅ Log saved successfully! Refresh page to update analytics.');
            setTimeout(() => setMsg(''), 4000); // Hide message after 4s
        } catch (err) {
            setMsg('❌ Error: ' + (err.response?.data?.error || 'Failed to save log'));
        }
    };

    return (
        <div className="card">
            <h3 style={{ marginTop: 0, borderBottom: '2px solid #eee', paddingBottom: '10px' }}>Log Today's Data</h3>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ width: '100%' }}>
                    <label style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Date</label>
                    <input type="date" name="date" value={log.date} onChange={handleChange} />
                </div>
                
                <div style={{ width: '48%' }}>
                    <input type="number" step="0.5" name="workHours" placeholder="Work Hours (e.g. 8.5)" onChange={handleChange} required />
                </div>
                <div style={{ width: '48%' }}>
                    <input type="number" step="0.5" name="sleepHours" placeholder="Sleep Hours (e.g. 7)" onChange={handleChange} required />
                </div>
                
                <div style={{ width: '100%', marginBottom: '15px' }}>
                    <label style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Stress Level: {log.stressLevel}</label>
                    <input type="range" name="stressLevel" min="1" max="5" value={log.stressLevel} onChange={handleChange} style={{ padding: 0 }} />
                </div>
                
                <div style={{ width: '100%' }}>
                    <input name="mood" placeholder="Current Mood (e.g. Focused, Tired)" onChange={handleChange} />
                    <textarea name="plannedTasks" placeholder="What did you plan to do today?" onChange={handleChange} rows="2"></textarea>
                    <textarea name="completedTasks" placeholder="What did you actually complete?" onChange={handleChange} rows="2"></textarea>
                </div>
                
                <button type="submit">Submit Log</button>
            </form>
            {msg && <p style={{ textAlign: 'center', marginTop: '15px', fontWeight: 'bold' }}>{msg}</p>}
        </div>
    );
};

export default ProductivityLogger;