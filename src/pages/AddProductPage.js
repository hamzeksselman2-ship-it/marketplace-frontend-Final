import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function AddProductPage() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [message, setMessage] = useState('');
  const history = useHistory();

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "https://marketplace-backend-2uyu.onrender.com";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (!user) {
      setMessage("እባክዎ መጀመሪያ ሎጊን ያድርጉ");
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/api/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, price, description, imageUrl, seller: user.id }),
      });

      if (response.ok) {
        setMessage("ምርቱ በተሳካ ሁኔታ ተመዝግቧል!");
        setTimeout(() => history.push('/'), 2000);
      } else {
        setMessage("ስህተት፡ ምርቱን መመዝገብ አልተቻለም");
      }
    } catch (err) {
      setMessage("ከባክኤንድ ጋር መገናኘት አልተቻለም");
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '50px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '10px' }}>
      <h2>አዲስ ምርት መመዝገቢያ</h2>
      <p>{message}</p>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input type="text" placeholder="የምርት ስም" value={title} onChange={(e) => setTitle(e.target.value)} style={{ padding: '10px' }} required />
        <input type="number" placeholder="ዋጋ" value={price} onChange={(e) => setPrice(e.target.value)} style={{ padding: '10px' }} required />
        <textarea placeholder="ስለ ምርቱ መግለጫ" value={description} onChange={(e) => setDescription(e.target.value)} style={{ padding: '10px' }} required />
        <input type="text" placeholder="የምርት ፎቶ ሊንክ (URL)" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} style={{ padding: '10px' }} required />
        <button type="submit" style={{ padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>ምርቱን መዝግብ</button>
      </form>
    </div>
  );
}

export default AddProductPage;
