import Login from './components/Login';
import ProductivityLogger from './components/ProductivityLogger';
import Analytics from './components/Analytics';
import { useState } from 'react';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  
  // NEW: This is our trigger. When it changes, Analytics will reload.
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <div className="app-container">
      {isLoggedIn && (
        <button className="btn-danger" onClick={handleLogout}>Logout</button>
      )}
      <h1 className="header">🧠 Productivity Drift</h1>
      
      {!isLoggedIn ? (
        <Login onLogin={() => setIsLoggedIn(true)} />
      ) : (
        <>
          {/* We pass the trigger to Analytics so it knows when to listen */}
          <Analytics refreshTrigger={refreshTrigger} />
          
          {/* We pass a function to Logger so it can pull the trigger when done */}
          <ProductivityLogger onLogSubmitted={() => setRefreshTrigger(prev => prev + 1)} />
        </>
      )}
    </div>
  );
}

export default App;