import React, { useState } from 'react';

function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "https://marketplace-backend-2uyu.onrender.com";

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("በመግባት ላይ...");
    try {
      const response = await fetch(`${BACKEND_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage("እንኳን ደህና መጡ! ወደ ዋናው ገጽ እየወሰድኩዎት ነው...");
        localStorage.setItem('user', JSON.stringify(data.user));
        setTimeout(() => window.location.href = '/', 2000);
      } else {
        setMessage("ስህተት: " + data.message);
      }
    } catch (err) {
      setMessage("ከባክኤንድ ጋር መገናኘት አልተቻለም።");
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px', maxWidth: '400px', margin: '0 auto' }}>
      <h1>Login / Sign Up</h1>
      <p>{message || "Welcome back! Please enter your details."}</p>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ padding: '10px' }} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ padding: '10px' }} required />
        <button type="submit" style={{ padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', cursor: 'pointer' }}>Login</button>
      </form>
    </div>
  );
}

export default AuthPage;
