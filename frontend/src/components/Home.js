import React from 'react';

const Home = () => {
    return (
        <div>
            <div className="hero-text">
                <h1 style={{ fontSize: '3rem', margin: '0 0 10px 0' }}>Stop Burnout Before It Starts.</h1>
                <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>
                    An AI-powered analytics platform that tracks your daily habits, detects productivity drift, and predicts burnout risk.
                </p>
            </div>

            <div className="features-grid">
                <div className="feature-card">
                    <div className="feature-icon">📊</div>
                    <h3>Daily Logging</h3>
                    <p>Easily track your work hours, sleep, stress levels, and completed tasks in seconds.</p>
                </div>
                <div className="feature-card">
                    <div className="feature-icon">📉</div>
                    <h3>Drift Detection</h3>
                    <p>Our Java-based rule engine analyzes your weekly trends to warn you if your productivity is slipping.</p>
                </div>
                <div className="feature-card">
                    <div className="feature-icon">🧠</div>
                    <h3>AI Predictions</h3>
                    <p>A Python Machine Learning model analyzes your data to forecast your exact probability of burnout.</p>
                </div>
            </div>
        </div>
    );
};

export default Home;