import React, { useState, useEffect } from 'react';
import API from '../api/axiosConfig';

const Analytics = () => {
    const [data, setData] = useState(null);

    const fetchAnalytics = async () => {
        try {
            const response = await API.get('/analytics/weekly');
            setData(response.data);
        } catch (err) {
            console.error("Failed to fetch analytics", err);
        }
    };

    useEffect(() => {
        fetchAnalytics();
    }, []);

    if (!data) return <p>Loading insights...</p>;

    return (
        <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px' }}>
            <h3>Your Performance Insights</h3>
            <ul>
                <li>Average Work: {data.averageWorkHours}h</li>
                <li>Average Sleep: {data.averageSleepHours}h</li>
                <li>Stress Level: {data.averageStress}/5</li>
            </ul>

            <div style={{ padding: '10px', border: '1px solid orange' }}>
                <h4>Rule-Based Warning (Java)</h4>
                <p>Burnout Risk: <strong>{data.burnoutRisk}</strong></p>
                <p>{data.recommendation}</p>
            </div>

            <div style={{ padding: '10px', border: '1px solid blue', marginTop: '10px' }}>
                <h4>AI Prediction (Python)</h4>
                <p>Status: {data.aiAnalysisStatus}</p>
                <p>Burnout Detected: {data.aiBurnoutPrediction === 1 ? "YES" : "NO"}</p>
                <p>Risk Probability: {(data.aiRiskProbability * 100).toFixed(2)}%</p>
            </div>
        </div>
    );
};

export default Analytics;