import React, { useState } from 'react';

function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "https://marketplace-backend-2uyu.onrender.com";

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage("በመመዝገብ ላይ...");
    try {
      const response = await fetch(`${BACKEND_URL}/api/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage("በተሳካ ሁኔታ ተመዝግበዋል! አሁን ሎጊን ማድረግ ይችላሉ።");
        setTimeout(() => window.location.href = '/login', 2000);
      } else {
        setMessage("ስህተት: " + data.message);
      }
    } catch (err) {
      setMessage("ከባክኤንድ ጋር መገናኘት አልተቻለም።");
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px', maxWidth: '400px', margin: '0 auto' }}>
      <h1>Sign Up</h1>
      <p>{message || "Create your account to start trading."}</p>
      <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ padding: '10px' }} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ padding: '10px' }} required />
        <button type="submit" style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>Register</button>
      </form>
    </div>
  );
}

export default SignupPage;
