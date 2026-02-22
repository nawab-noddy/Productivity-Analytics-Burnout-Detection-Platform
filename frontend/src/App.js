import React, { useState } from 'react';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import ProductivityLogger from './components/ProductivityLogger';
import Analytics from './components/Analytics';
import './App.css';

function App() {
  // 1. Check if the user has a token saved in their browser
  const hasToken = !!localStorage.getItem('token');
  
  const [isLoggedIn, setIsLoggedIn] = useState(hasToken);
  
  // FIX: Smart Routing
  // If they have a token, start directly on the 'dashboard'. 
  // If they don't have a token, start on 'home'.
  const [currentView, setCurrentView] = useState(hasToken ? 'dashboard' : 'home'); 
  
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setCurrentView('home'); // Send user back to home on logout
  };

  return (
    <div className="app-container" style={{ maxWidth: '900px' }}>
      
      {/* --- NAVIGATION BAR --- */}
      <nav className="navbar">
        <h2 className="nav-brand" onClick={() => setCurrentView('home')}>
          🚀 YouPi Productivity
        </h2>
        
        <div className="nav-buttons">
          {isLoggedIn ? (
            <>
              <button className="btn-outline" onClick={() => setCurrentView('dashboard')}>Dashboard</button>
              <button className="btn-danger" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <button className="btn-outline" onClick={() => setCurrentView('login')}>Login</button>
              <button onClick={() => setCurrentView('register')}>Register</button>
            </>
          )}
        </div>
      </nav>

      {/* --- PAGE ROUTING LOGIC --- */}
      {currentView === 'home' && <Home />}
      
      {currentView === 'login' && !isLoggedIn && (
        <Login onLogin={() => { setIsLoggedIn(true); setCurrentView('dashboard'); }} />
      )}
      
      {currentView === 'register' && !isLoggedIn && (
        <Register onSwitchToLogin={() => setCurrentView('login')} />
      )}

      {currentView === 'dashboard' && isLoggedIn && (
        <>
          <ProductivityLogger onLogSubmitted={() => setRefreshTrigger(prev => prev + 1)} />
          <Analytics refreshTrigger={refreshTrigger} />
        </>
      )}

    </div>
  );
}

export default App;