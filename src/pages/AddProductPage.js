import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function AddProductPage() {
  const [f, setF] = useState({ title: '', price: '', desc: '', phone: '', img: null });
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const uploadImg = async () => {
    const data = new FormData();
    data.append("file", f.img); data.append("upload_preset", "ml_default");
    const res = await fetch("https://api.cloudinary.com/v1_1/dqvx8mpxi/image/upload", { method: "POST", body: data });
    const file = await res.json(); return file.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const url = await uploadImg();
    await fetch("https://marketplace-backend-2uyu.onrender.com/api/products", {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: f.title, price: f.price, description: f.desc, imageUrl: url, phone: f.phone, seller: user.id }),
    });
    setLoading(false); history.push('/');
  };

  return (
    <div style={{ maxWidth: '400px', margin: '40px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '10px' }}>
      <h2>አዲስ ምርት ይጫኑ</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input type="text" placeholder="የምርት ስም" onChange={e => setF({...f, title: e.target.value})} required />
        <input type="number" placeholder="ዋጋ" onChange={e => setF({...f, price: e.target.value})} required />
        <textarea placeholder="መግለጫ" onChange={e => setF({...f, desc: e.target.value})} required />
        <input type="tel" placeholder="ስልክ ቁጥር" onChange={e => setF({...f, phone: e.target.value})} required />
        <input type="file" onChange={e => setF({...f, img: e.target.files[0]})} required />
        <button type="submit" disabled={loading} style={{ background: '#28a745', color: 'white', padding: '10px' }}>
          {loading ? "በመጫን ላይ..." : "ምርቱን መዝግብ"}
        </button>
      </form>
    </div>
  );
}
export default AddProductPage;
