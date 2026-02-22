import React, { useState } from 'react';
import API from '../api/axiosConfig';

const ProductivityLogger = ({ onLogSubmitted }) => {
    const [log, setLog] = useState({
        date: new Date().toISOString().split('T')[0],
        workHours: '',
        sleepHours: '',
        stressLevel: 3,
        mood: 'Focused',
        plannedTasks: [],   // Changed to an empty array
        completedTasks: []  // Changed to an empty array
    });
    const [msg, setMsg] = useState('');

    const taskOptions = ["Coding", "Meetings", "Studying", "Writing", "Reading", "Exercising", "Admin Work"];

    const handleChange = (e) => {
        setLog({ ...log, [e.target.name]: e.target.value });
    };

    // NEW: Custom handler for the checkboxes
    const handleCheckboxChange = (e, field) => {
        const { value, checked } = e.target;
        setLog((prevLog) => {
            let updatedList = [...prevLog[field]];
            if (checked) {
                updatedList.push(value); // Add task if checked
            } else {
                updatedList = updatedList.filter((item) => item !== value); // Remove if unchecked
            }
            return { ...prevLog, [field]: updatedList };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const finalPayload = {
                ...log,
                plannedTasks: log.plannedTasks.join(", "),
                completedTasks: log.completedTasks.join(", ")
            };

            await API.post('/logs', finalPayload);
            setMsg('✅ Log saved! Dashboard updated automatically.');
            
            if(onLogSubmitted) onLogSubmitted();

            // NEW: Auto-Scroll to the Dashboard!
            setTimeout(() => {
                document.getElementById('dashboard-section')?.scrollIntoView({ behavior: 'smooth' });
            }, 300); // Slight delay to allow React to render the updated data first

            setTimeout(() => setMsg(''), 4000); 
        } catch (err) {
            setMsg('❌ Error: ' + (err.response?.data?.error || 'Failed to save log'));
        }
    };

    return (
        <div className="card">
            <h3 style={{ marginTop: 0, borderBottom: '2px solid #eee', paddingBottom: '10px' }}>Log Today's Data</h3>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ width: '100%' }}>
                    <label style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Date (Change this if you already logged today!)</label>
                    <input type="date" name="date" value={log.date} onChange={handleChange} />
                </div>
                
                <div style={{ width: '48%' }}>
                    <input type="number" step="0.5" name="workHours" placeholder="Work Hours (e.g. 8)" onChange={handleChange} required />
                </div>
                <div style={{ width: '48%' }}>
                    <input type="number" step="0.5" name="sleepHours" placeholder="Sleep Hours (e.g. 7)" onChange={handleChange} required />
                </div>
                
                <div style={{ width: '100%', marginBottom: '15px' }}>
                    <label style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Stress Level: {log.stressLevel}</label>
                    <input type="range" name="stressLevel" min="1" max="5" value={log.stressLevel} onChange={handleChange} style={{ padding: 0 }} />
                </div>
                
                <div style={{ width: '100%', marginBottom: '15px' }}>
                    <label style={{ fontWeight: 'bold', fontSize: '0.9rem', display: 'block' }}>Current Mood</label>
                    <select name="mood" value={log.mood} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}>
                        <option value="Focused">Focused</option>
                        <option value="Happy">Happy</option>
                        <option value="Neutral">Neutral</option>
                        <option value="Tired">Tired</option>
                        <option value="Stressed">Stressed</option>
                        <option value="Anxious">Anxious</option>
                    </select>
                </div>

                {/* NEW: Checkbox Grid for Planned Tasks */}
                <div style={{ width: '100%', marginBottom: '10px' }}>
                    <label style={{ fontWeight: 'bold', fontSize: '0.9rem', display: 'block', marginBottom: '8px' }}>Planned Tasks (Select Multiple)</label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                        {taskOptions.map(task => (
                            <label key={`plan-${task}`} style={{ fontSize: '0.9rem', cursor: 'pointer' }}>
                                <input 
                                    type="checkbox" 
                                    value={task} 
                                    checked={log.plannedTasks.includes(task)} 
                                    onChange={(e) => handleCheckboxChange(e, 'plannedTasks')} 
                                    style={{ width: 'auto', marginRight: '5px' }}
                                />
                                {task}
                            </label>
                        ))}
                    </div>
                </div>

                {/* NEW: Checkbox Grid for Completed Tasks */}
                <div style={{ width: '100%', marginBottom: '15px' }}>
                    <label style={{ fontWeight: 'bold', fontSize: '0.9rem', display: 'block', marginBottom: '8px' }}>Actually Completed</label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                        {taskOptions.map(task => (
                            <label key={`comp-${task}`} style={{ fontSize: '0.9rem', cursor: 'pointer' }}>
                                <input 
                                    type="checkbox" 
                                    value={task} 
                                    checked={log.completedTasks.includes(task)} 
                                    onChange={(e) => handleCheckboxChange(e, 'completedTasks')} 
                                    style={{ width: 'auto', marginRight: '5px' }}
                                />
                                {task}
                            </label>
                        ))}
                    </div>
                </div>
                
                <button type="submit" style={{ marginTop: '10px' }}>Submit Log</button>
            </form>
            {msg && <p style={{ textAlign: 'center', marginTop: '15px', fontWeight: 'bold', color: msg.includes('❌') ? '#dc3545' : '#28a745' }}>{msg}</p>}
        </div>
    );
};

export default ProductivityLogger;