import React, { useState } from 'react';

function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Netlify ላይ የሞላሻቸውን ስሞች በሙሉ ይሞክራል
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || process.env.VITE_API_URL || "https://marketplace-backend-2uyu.onrender.com";

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("መግቢያ ሙከራ በ:", email);
    alert("ወደ " + BACKEND_URL + " ለመገናኘት እየሞከርኩ ነው!");
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px', maxWidth: '400px', margin: '0 auto' }}>
      <h1>Login / Sign Up</h1>
      <p>Welcome back! Please enter your details.</p>
      
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          required 
        />
        <button type="submit" style={{ padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Login
        </button>
      </form>
    </div>
  );
}

export default AuthPage;
