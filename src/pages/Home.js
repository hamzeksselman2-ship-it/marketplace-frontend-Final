import React, { useState, useEffect } from 'react';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "https://marketplace-backend-2uyu.onrender.com";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/products`);
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        console.error("ምርቶችን ማምጣት አልተቻለም:", err);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [BACKEND_URL]);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1 style={{ color: '#28a745' }}>Welcome to Ethio-Market</h1>
      <p>Find the best products from local sellers.</p>

      {loading ? (
        <p>ምርቶች በመጫን ላይ ናቸው...</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px', marginTop: '30px' }}>
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product._id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                <img src={product.imageUrl || 'https://via.placeholder.com/150'} alt={product.title} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                <h3>{product.title}</h3>
                <p style={{ fontWeight: 'bold', color: '#e44d26' }}>{product.price} ETB</p>
                <button style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}>
                  ዝርዝር እዪ
                </button>
              </div>
            ))
          ) : (
            <p>እስካሁን ምንም ምርት አልተመዘገበም።</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
