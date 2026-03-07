import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ProductDetails() {
  const { id } = useParams();
  const [p, setP] = useState(null);
  const [chat, setChat] = useState("");
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetch(`https://marketplace-backend-2uyu.onrender.com/api/products`).then(r => r.json()).then(data => setP(data.find(x => x._id === id)));
  }, [id]);

  const sendMsg = async () => {
    await fetch("https://marketplace-backend-2uyu.onrender.com/api/messages", {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId: id, sender: user.email, receiver: p.seller, text: chat }),
    });
    alert("መልዕክት ተልኳል!"); setChat("");
  };

  if (!p) return <p>በመጫን ላይ...</p>;

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px', display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
      <img src={p.imageUrl} alt={p.title} style={{ width: '350px', borderRadius: '10px' }} />
      <div style={{ flex: '1' }}>
        <h1 style={{ color: '#28a745' }}>{p.title}</h1>
        <h2 style={{ color: '#ff5722' }}>{p.price} ETB</h2>
        <p>{p.description}</p>
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <a href={`tel:${p.phone}`} style={{ background: '#007bff', color: 'white', padding: '10px 20px', textDecoration: 'none', borderRadius: '5px' }}>📞 ደውል</a>
        </div>
        <div style={{ marginTop: '30px', padding: '15px', border: '1px solid #eee', borderRadius: '10px' }}>
          <h3>ለሻጩ መልዕክት ይጻፉ</h3>
          <textarea value={chat} onChange={e => setChat(e.target.value)} style={{ width: '100%', height: '80px', marginBottom: '10px' }} placeholder="ጥያቄ ካለዎት እዚህ ይጻፉ..." />
          <button onClick={sendMsg} style={{ background: '#28a745', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>መልዕክት ላክ</button>
        </div>
      </div>
    </div>
  );
}
export default ProductDetails;
