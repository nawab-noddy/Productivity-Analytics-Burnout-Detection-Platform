import Login from './components/Login';
import ProductivityLogger from './components/ProductivityLogger';
import Analytics from './components/Analytics';
import { useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  return (
    <div className="App" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h1>🧠 Productivity Drift System</h1>
      {!isLoggedIn ? (
        <Login onLogin={() => setIsLoggedIn(true)} />
      ) : (
        <>
          <button onClick={() => { localStorage.removeItem('token'); setIsLoggedIn(false); }}>Logout</button>
          <ProductivityLogger />
          <Analytics />
        </>
      )}
    </div>
  );
}

export default App;