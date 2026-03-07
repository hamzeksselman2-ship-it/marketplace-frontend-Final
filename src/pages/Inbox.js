import React, { useState, useEffect } from 'react';

function Inbox() {
  const [messages, setMessages] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (user) {
      fetch(`https://marketplace-backend-2uyu.onrender.com/api/inbox/${user.email}`)
        .then(r => r.json()).then(data => setMessages(data));
    }
  }, [user]);

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px' }}>
      <h2>የእርስዎ መልዕክቶች (Inbox)</h2>
      {messages.length === 0 ? <p>ምንም መልዕክት የለም።</p> : 
        messages.map((m, i) => (
          <div key={i} style={{ borderBottom: '1px solid #eee', padding: '15px', background: m.receiver === user.email ? '#f9f9f9' : '#fff' }}>
            <p><strong>ከ፦</strong> {m.sender}</p>
            <p>{m.text}</p>
            <small style={{ color: '#888' }}>{new Date(m.createdAt).toLocaleString()}</small>
          </div>
        ))
      }
    </div>
  );
}
export default Inbox;
