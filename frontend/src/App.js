import Login from './components/Login';
import ProductivityLogger from './components/ProductivityLogger';
import Analytics from './components/Analytics';
import { useState } from 'react';
import './App.css'; // MUST IMPORT THE CSS

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

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
          <Analytics />
          <ProductivityLogger />
        </>
      )}
    </div>
  );
}

export default App;