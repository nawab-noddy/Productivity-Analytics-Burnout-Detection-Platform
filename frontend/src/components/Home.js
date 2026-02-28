import React from 'react';

const Home = () => {
    return (
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto', marginBottom: '70px' }}>
                {/* FIX: Applied the new gradient typography classes */}
                <h1 className="hero-title-main">
                    Stop Burnout <br/>
                    <span className="text-gradient">Before It Starts.</span>
                </h1>
                <p className="hero-subtitle">
                    An AI-powered analytics platform that tracks your daily habits, detects productivity drift, and predicts your exact risk of burnout.
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
                <div className="card" style={{ marginBottom: 0 }}>
                    <div style={{ fontSize: '3rem', marginBottom: '15px' }}>📊</div>
                    <h3 style={{ margin: '0 0 10px 0', fontSize: '1.4rem' }}>Daily Logging</h3>
                    <p style={{ color: '#94a3b8', margin: 0, lineHeight: 1.6 }}>Track work hours, sleep, stress, and tasks effortlessly in seconds.</p>
                </div>
                <div className="card" style={{ marginBottom: 0 }}>
                    <div style={{ fontSize: '3rem', marginBottom: '15px' }}>📉</div>
                    <h3 style={{ margin: '0 0 10px 0', fontSize: '1.4rem' }}>Drift Detection</h3>
                    <p style={{ color: '#94a3b8', margin: 0, lineHeight: 1.6 }}>Java-based rule engine analyzes trends to warn you of slipping productivity.</p>
                </div>
                <div className="card" style={{ marginBottom: 0 }}>
                    <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🧠</div>
                    <h3 style={{ margin: '0 0 10px 0', fontSize: '1.4rem' }}>AI Predictions</h3>
                    <p style={{ color: '#94a3b8', margin: 0, lineHeight: 1.6 }}>Python Machine Learning models forecast your long-term probability of burnout.</p>
                </div>
            </div>
        </div>
    );
};

export default Home;