import React, { useState } from 'react';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import ProductivityLogger from './components/ProductivityLogger';
import Analytics from './components/Analytics';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [currentView, setCurrentView] = useState('home'); // 'home', 'login', 'register'
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setCurrentView('home');
  };

  return (
    <div className="app-container" style={{ maxWidth: '900px' }}>
      
      {/* --- NAVIGATION BAR --- */}
      <nav className="navbar">
        <h2 className="nav-brand" onClick={() => !isLoggedIn && setCurrentView('home')}>
          🚀 YouPi Productivity
        </h2>
        
        <div className="nav-buttons">
          {isLoggedIn ? (
            <button className="btn-danger" onClick={handleLogout}>Logout</button>
          ) : (
            <>
              <button className="btn-outline" onClick={() => setCurrentView('login')}>Login</button>
              <button onClick={() => setCurrentView('register')}>Register</button>
            </>
          )}
        </div>
      </nav>

      {/* --- PAGE ROUTING LOGIC --- */}
      {!isLoggedIn ? (
        <>
          {currentView === 'home' && <Home />}
          {currentView === 'login' && <Login onLogin={() => { setIsLoggedIn(true); setCurrentView('dashboard'); }} />}
          {currentView === 'register' && <Register onSwitchToLogin={() => setCurrentView('login')} />}
        </>
      ) : (
        <>
          {/* Dashboard View: Reordered as requested! */}
          <ProductivityLogger onLogSubmitted={() => setRefreshTrigger(prev => prev + 1)} />
          <Analytics refreshTrigger={refreshTrigger} />
        </>
      )}

    </div>
  );
}

export default App;