import React, { useState } from 'react';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import ProductivityLogger from './components/ProductivityLogger';
import Analytics from './components/Analytics';
import './App.css';

function App() {
  const hasToken = !!localStorage.getItem('token');
  const [isLoggedIn, setIsLoggedIn] = useState(hasToken);
  const [currentView, setCurrentView] = useState(hasToken ? 'dashboard' : 'home'); 
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setCurrentView('home');
  };

  return (
    <div className="app-container"> {/* FIX: Removed inline max-width to allow CSS to handle it */}
      
      {/* --- NAVIGATION BAR --- */}
      <nav className="navbar">
        <h2 className="nav-brand" onClick={() => setCurrentView('home')}>
          🌊 FlowState AI {/* FIX: Changed to a modern, aesthetic project name */}
        </h2>
        
        {/* FIX: CSS now spaces these buttons out beautifully */}
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
      {currentView === 'login' && !isLoggedIn && <Login onLogin={() => { setIsLoggedIn(true); setCurrentView('dashboard'); }} />}
      {currentView === 'register' && !isLoggedIn && <Register onSwitchToLogin={() => setCurrentView('login')} />}

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