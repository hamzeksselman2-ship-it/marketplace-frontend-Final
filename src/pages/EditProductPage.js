import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

function EditProductPage() {
  const { id } = useParams();
  const [f, setF] = useState({ title: '', price: '', description: '', phone: '' });
  const history = useHistory();

  useEffect(() => {
    fetch(`https://marketplace-backend-2uyu.onrender.com/api/products`)
      .then(r => r.json()).then(data => {
        const p = data.find(x => x._id === id);
        if (p) setF(p);
      });
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    await fetch(`https://marketplace-backend-2uyu.onrender.com/api/products/${id}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(f),
    });
    alert("ተስተካክሏል!"); history.push(`/product/${id}`);
  };

  return (
    <div style={{ maxWidth: '400px', margin: '40px auto', padding: '20px', border: '1px solid #ddd' }}>
      <h2>ምርት ያስተካክሉ</h2>
      <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input type="text" value={f.title} onChange={e => setF({...f, title: e.target.value})} />
        <input type="number" value={f.price} onChange={e => setF({...f, price: e.target.value})} />
        <textarea value={f.description} onChange={e => setF({...f, description: e.target.value})} />
        <button type="submit" style={{ background: '#28a745', color: 'white', padding: '10px' }}>ለውጦችን መዝግብ</button>
      </form>
    </div>
  );
}
export default EditProductPage;
