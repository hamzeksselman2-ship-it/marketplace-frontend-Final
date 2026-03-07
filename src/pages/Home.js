import React, { useState, useEffect } from 'react';

function Home() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // የፍለጋ ቃሉን መያዣ
  const [loading, setLoading] = useState(true);

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "https://marketplace-backend-2uyu.onrender.com";

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/products`)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, [BACKEND_URL]);

  // በፍለጋ ቃሉ መሰረት ምርቶችን የመለየት ስራ (Filtering)
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1 style={{ color: '#28a745' }}>Welcome to Ethio-Market</h1>
      <p>Find the best products from local sellers.</p>

      {/* የፍለጋ ሳጥን (Search Bar) */}
      <div style={{ margin: '30px auto', maxWidth: '500px' }}>
        <input
          type="text"
          placeholder="ምርት ይፈልጉ... (ለምሳሌ፦ ስልክ)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 20px',
            fontSize: '16px',
            borderRadius: '25px',
            border: '2px solid #28a745',
            outline: 'none'
          }}
        />
      </div>

      {loading ? (
        <p>በመጫን ላይ...</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px', marginTop: '20px' }}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <div key={product._id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                <img 
                  src={product.imageUrl || 'https://via.placeholder.com/150'} 
                  alt={product.title} 
                  style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '5px' }} 
                />
                <h3 style={{ margin: '10px 0' }}>{product.title}</h3>
                <p style={{ color: '#ff5722', fontWeight: 'bold' }}>{product.price} ETB</p>
                <button style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer' }}>
                  ዝርዝር እይ
                </button>
              </div>
            ))
          ) : (
            <p style={{ gridColumn: '1/-1', color: '#888' }}>ምንም የተገኘ ምርት የለም።</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
