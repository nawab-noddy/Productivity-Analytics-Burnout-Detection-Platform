import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import API from '../api/axiosConfig';

const DriftChart = ({ refreshTrigger }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const fetchLogsForChart = async () => {
            try {
                // Fetching the raw logs using the endpoint in your DailyLogController
                const response = await API.get('/logs');
                
                // Sort the data by date (oldest to newest) so the chart flows left-to-right
                const sortedData = response.data.sort((a, b) => new Date(a.date) - new Date(b.date));
                
                // Keep only the last 7 days for a clean weekly view
                const last7Days = sortedData.slice(-7);
                
                setChartData(last7Days);
            } catch (error) {
                console.error("Failed to fetch chart data", error);
            }
        };

        fetchLogsForChart();
    }, [refreshTrigger]); // Re-fetch when a new log is submitted

    if (chartData.length === 0) {
        return <p style={{ textAlign: 'center' }}>Not enough data to display the chart. Start logging!</p>;
    }

    return (
        <div style={{ marginTop: '20px', padding: '15px', background: '#fff', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            <h4 style={{ textAlign: 'center', margin: '0 0 20px 0', color: '#2a5298' }}>📈 Weekly Productivity & Sleep Trend</h4>
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                        <XAxis dataKey="date" tick={{fontSize: 12}} />
                        <YAxis />
                        <Tooltip 
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }} 
                        />
                        <Legend verticalAlign="top" height={36}/>
                        {/* The Work Line (Blue) */}
                        <Line type="monotone" dataKey="workHours" name="Work Hours" stroke="#2a5298" strokeWidth={3} activeDot={{ r: 8 }} />
                        {/* The Sleep Line (Green) */}
                        <Line type="monotone" dataKey="sleepHours" name="Sleep Hours" stroke="#28a745" strokeWidth={3} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default DriftChart;