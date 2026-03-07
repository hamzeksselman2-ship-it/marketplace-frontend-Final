import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

function ProductDetails() {
  const { id } = useParams();
  const history = useHistory();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user')); // የገባውን ተጠቃሚ መለየት

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "https://marketplace-backend-2uyu.onrender.com";

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/products`)
      .then(res => res.json())
      .then(data => {
        const foundProduct = data.find(p => p._id === id);
        setProduct(foundProduct);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error:", err);
        setLoading(false);
      });
  }, [id, BACKEND_URL]);

  const handleDelete = async () => {
    if (window.confirm("እርግጠኛ ነዎት ይህ ምርት እንዲጠፋ ይፈልጋሉ?")) {
      try {
        const response = await fetch(`${BACKEND_URL}/api/products/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          alert("ምርቱ ተሰርዟል!");
          history.push('/'); // ወደ ዋናው ገጽ ይመልሰናል
        }
      } catch (err) {
        alert("ምርቱን ማጥፋት አልተቻለም");
      }
    }
  };

  if (loading) return <p style={{ textAlign: 'center', marginTop: '50px' }}>በመጫን ላይ...</p>;
  if (!product) return <p style={{ textAlign: 'center', marginTop: '50px' }}>ምርቱ አልተገኘም!</p>;

  return (
    <div style={{ maxWidth: '800px', margin: '50px auto', padding: '20px', display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
      <img src={product.imageUrl || 'https://via.placeholder.com/400'} alt={product.title} style={{ width: '400px', height: '400px', objectFit: 'cover', borderRadius: '10px' }} />
      <div style={{ flex: '1', minWidth: '300px' }}>
        <h1 style={{ color: '#28a745' }}>{product.title}</h1>
        <h2 style={{ color: '#ff5722' }}>{product.price} ETB</h2>
        <hr />
        <h3>መግለጫ</h3>
        <p>{product.description}</p>
        
        <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
          <button style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>አሁኑኑ ይግዙ</button>
          
          {/* ምርቱን የመዘገበው ሰው ከሆነ ብቻ "Delete" ቁልፍ ይታያል */}
          {user && user.id === product.seller && (
            <button onClick={handleDelete} style={{ padding: '10px 20px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>ምርቱን አጥፋ</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
