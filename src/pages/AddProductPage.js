import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function AddProductPage() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null); // ፋይሉን ለመያዝ
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "https://marketplace-backend-2uyu.onrender.com";

  // ፎቶውን ወደ Cloudinary ለመጫን
  const uploadImage = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "ml_default"); // ይህንን በኋላ እናስተካክላለን
    data.append("cloud_name", "dqvx8mpxi"); // ነጻ ክላውድ ስም

    const res = await fetch("https://api.cloudinary.com/v1_1/dqvx8mpxi/image/upload", {
      method: "post",
      body: data
    });
    const file = await res.json();
    return file.secure_url; // የተጫነውን ፎቶ ሊንክ ይመልሳል
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user'));

    try {
      const imageUrl = await uploadImage(); // መጀመሪያ ፎቶውን እንጭናለን
      const response = await fetch(`${BACKEND_URL}/api/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, price, description, imageUrl, seller: user.id }),
      });

      if (response.ok) {
        alert("ምርቱ በፎቶው አማካኝነት ተመዝግቧል!");
        history.push('/');
      }
    } catch (err) {
      alert("ስህተት አጋጥሟል");
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: '500px', margin: '50px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '10px' }}>
      <h2>ምርት በፎቶ ይጫኑ</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input type="text" placeholder="የምርት ስም" onChange={(e) => setTitle(e.target.value)} required style={{ padding: '10px' }} />
        <input type="number" placeholder="ዋጋ" onChange={(e) => setPrice(e.target.value)} required style={{ padding: '10px' }} />
        <textarea placeholder="መግለጫ" onChange={(e) => setDescription(e.target.value)} required style={{ padding: '10px' }} />
        
        {/* የፎቶ መምረጫ ሳጥን */}
        <label>የምርት ፎቶ ይምረጡ፦</label>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} required />
        
        <button type="submit" disabled={loading} style={{ padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', cursor: 'pointer' }}>
          {loading ? "በመጫን ላይ..." : "ምርቱን መዝግብ"}
        </button>
      </form>
    </div>
  );
}

export default AddProductPage;
