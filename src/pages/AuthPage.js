import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const history = useHistory();

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "https://marketplace-backend-2uyu.onrender.com";

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("በመግባት ላይ... እባክዎ ይጠብቁ");
    try {
      const response = await fetch(`${BACKEND_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMessage("እንኳን ደህና መጡ! ወደ ዋናው ገጽ እየወሰድኩዎት ነው...");
        // የተጠቃሚውን መረጃ በብሮውዘሩ ላይ ሴቭ እናደርጋለን
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // ከ 2 ሰከንድ በኋላ ወደ Home ገጽ ይወስደናል
        setTimeout(() => {
          history.push('/');
        }, 2000);
      } else {
        setMessage("ስህተት: " + data.message);
      }
    } catch (err) {
      setMessage("ከባክኤንድ ጋር መገናኘት አልተቻለም። ሰርቨሩ መብራቱን ያረጋግጡ።");
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px', maxWidth: '400px', margin: '0 auto' }}>
      <h1 style={{ color: '#28a745' }}>Login</h1>
      <p style={{ marginBottom: '20px', color: '#666' }}>{message || "Welcome back! Please enter your details."}</p>
      
      <form onSubmit={handleLogin} style={{
