import React, { useState, useEffect } from 'react';
import API from '../api/axiosConfig';

// NEW: Accept refreshTrigger as a prop
const Analytics = ({ refreshTrigger }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const response = await API.get('/analytics/weekly');
                setData(response.data);
            } catch (err) {
                console.error("Failed to fetch analytics", err);
            }
        };
        fetchAnalytics();
    }, [refreshTrigger]); // NEW: Every time refreshTrigger changes, run this again!

    if (!data) return <div className="card"><h3 style={{textAlign: 'center'}}>Loading Insights...</h3></div>;

    return (
        <div className="card">
            <h2 style={{ marginTop: 0, color: '#333' }}>Your Weekly Dashboard</h2>
            
            <div className="stats-grid">
                <div className="stat-box">
                    <div>Avg Work</div>
                    <div className="stat-value">{data.averageWorkHours}h</div>
                </div>
                <div className="stat-box">
                    <div>Avg Sleep</div>
                    <div className="stat-value">{data.averageSleepHours}h</div>
                </div>
                <div className="stat-box">
                    <div>Avg Stress</div>
                    <div className="stat-value">{data.averageStress} / 5</div>
                </div>
            </div>

            <div className="alert-box alert-warning">
                <h4 style={{ margin: '0 0 10px 0' }}>⚙️ Deterministic Logic (Java)</h4>
                <p style={{ margin: '5px 0' }}><strong>Burnout Risk:</strong> {data.burnoutRisk}</p>
                <p style={{ margin: '5px 0' }}><strong>Drift Detected:</strong> {data.productivityDropping ? "Yes 📉" : "No 📈"}</p>
                <p style={{ margin: '10px 0 0 0', fontSize: '0.9rem' }}><em>"{data.recommendation}"</em></p>
            </div>

            <div className="alert-box alert-info">
                <h4 style={{ margin: '0 0 10px 0' }}>🧠 AI Prediction (Python)</h4>
                <p style={{ margin: '5px 0' }}><strong>Status:</strong> {data.aiAnalysisStatus}</p>
                <p style={{ margin: '5px 0' }}>
                    <strong>Burnout Forecast:</strong> {data.aiBurnoutPrediction === 1 ? "⚠️ HIGH LIKELIHOOD" : "✅ HEALTHY"}
                </p>
                <p style={{ margin: '0' }}>
                    <strong>Confidence Level:</strong> {data.aiRiskProbability ? (data.aiRiskProbability * 100).toFixed(1) : 0}%
                </p>
            </div>
        </div>
    );
};

export default Analytics;