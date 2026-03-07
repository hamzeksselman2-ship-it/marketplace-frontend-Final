import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "https://marketplace-backend-2uyu.onrender.com";

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/products`) // ለጊዜው ሁሉንም አምጥተን በ ID እንለየዋለን
      .then(res => res.json())
      .then(data => {
        const foundProduct = data.find(p => p._id === id);
        setProduct(foundProduct);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching product:", err);
        setLoading(false);
      });
  }, [id, BACKEND_URL]);

  if (loading) return <p style={{ textAlign: 'center', marginTop: '50px' }}>በመጫን ላይ...</p>;
  if (!product) return <p style={{ textAlign: 'center', marginTop: '50px' }}>ምርቱ አልተገኘም!</p>;

  return (
    <div style={{ maxWidth: '800px', margin: '50px auto', padding: '20px', display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
      <img 
        src={product.imageUrl || 'https://via.placeholder.com/400'} 
        alt={product.title} 
        style={{ width: '400px', height: '400px', objectFit: 'cover', borderRadius: '10px' }} 
      />
      <div style={{ flex: '1', minWidth: '300px' }}>
        <h1 style={{ color: '#28a745' }}>{product.title}</h1>
        <h2 style={{ color: '#ff5722' }}>{product.price} ETB</h2>
        <hr />
        <h3>ስለ ምርቱ መግለጫ</h3>
        <p style={{ lineHeight: '1.6', color: '#555' }}>{product.description}</p>
        <button style={{ padding: '12px 30px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
          አሁኑኑ ይግዙ
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;
