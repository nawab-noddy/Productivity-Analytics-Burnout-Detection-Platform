import React, { useState } from 'react';
import API from '../api/axiosConfig';

const ProductivityLogger = ({ onLogSubmitted }) => {
    const [log, setLog] = useState({
        date: new Date().toISOString().split('T')[0],
        workHours: '',
        sleepHours: '',
        stressLevel: 3,
        mood: 'Focused',
        plannedTasks: [],
        completedTasks: []
    });
    const [msg, setMsg] = useState('');

    const taskOptions = ["Coding", "Meetings", "Studying", "Writing", "Reading", "Exercising", "Admin Work"];

    const handleChange = (e) => setLog({ ...log, [e.target.name]: e.target.value });

    const handleCheckboxChange = (e, field) => {
        const { value, checked } = e.target;
        setLog((prev) => {
            let updatedList = [...prev[field]];
            if (checked) updatedList.push(value);
            else updatedList = updatedList.filter((item) => item !== value);
            return { ...prev, [field]: updatedList };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const finalPayload = { ...log, plannedTasks: log.plannedTasks.join(", "), completedTasks: log.completedTasks.join(", ") };
            await API.post('/logs', finalPayload);
            setMsg('✅ Data logged! Dashboard updated.');
            if(onLogSubmitted) onLogSubmitted();
            setTimeout(() => { document.getElementById('dashboard-section')?.scrollIntoView({ behavior: 'smooth' }); }, 300);
            setTimeout(() => setMsg(''), 4000); 
        } catch (err) {
            setMsg('❌ Error: ' + (err.response?.data?.error || 'Failed to save log'));
        }
    };

    return (
        <div className="card">
            <h2 style={{ marginTop: 0, marginBottom: '35px' }}>Log Today's Data</h2>
            
            <form onSubmit={handleSubmit}>
                {/* FIX: Increased gap from 15px to 30px for much better separation */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '10px' }}>
                    <div>
                        <label style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-muted)' }}>DATE</label>
                        <input type="date" name="date" value={log.date} onChange={handleChange} />
                    </div>
                    <div>
                        <label style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-muted)' }}>CURRENT MOOD</label>
                        <select name="mood" value={log.mood} onChange={handleChange}>
                            <option value="Focused">Focused</option>
                            <option value="Happy">Happy</option>
                            <option value="Neutral">Neutral</option>
                            <option value="Tired">Tired</option>
                            <option value="Stressed">Stressed</option>
                        </select>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '10px' }}>
                    <div>
                        <label style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-muted)' }}>WORK HOURS</label>
                        <input type="number" step="0.5" name="workHours" placeholder="e.g. 8" onChange={handleChange} required />
                    </div>
                    <div>
                        <label style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-muted)' }}>SLEEP HOURS</label>
                        <input type="number" step="0.5" name="sleepHours" placeholder="e.g. 7.5" onChange={handleChange} required />
                    </div>
                </div>
                
                <div style={{ marginBottom: '35px' }}>
                    <label style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                        STRESS LEVEL: <span style={{color: 'var(--text-main)'}}>{log.stressLevel}</span> / 5
                    </label>
                    <input type="range" name="stressLevel" min="1" max="5" value={log.stressLevel} onChange={handleChange} style={{ padding: 0, marginTop: '15px' }} />
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-muted)', display: 'block' }}>PLANNED TASKS</label>
                    <div className="chip-container">
                        {taskOptions.map(task => (
                            <label key={`plan-${task}`}>
                                <input type="checkbox" className="chip-checkbox" value={task} checked={log.plannedTasks.includes(task)} onChange={(e) => handleCheckboxChange(e, 'plannedTasks')} />
                                <span className="chip-label">{task}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-muted)', display: 'block' }}>ACTUALLY COMPLETED</label>
                    <div className="chip-container">
                        {taskOptions.map(task => (
                            <label key={`comp-${task}`}>
                                <input type="checkbox" className="chip-checkbox" value={task} checked={log.completedTasks.includes(task)} onChange={(e) => handleCheckboxChange(e, 'completedTasks')} />
                                <span className="chip-label">{task}</span>
                            </label>
                        ))}
                    </div>
                </div>
                
                <button type="submit" style={{ width: '100%', marginTop: '15px', padding: '15px' }}>Submit Daily Log</button>
            </form>
            {msg && <p style={{ textAlign: 'center', marginTop: '20px', fontWeight: 'bold', color: msg.includes('❌') ? '#ef4444' : '#10b981' }}>{msg}</p>}
        </div>
    );
};

export default ProductivityLogger;