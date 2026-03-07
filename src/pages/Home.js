import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function Home() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const history = useHistory();

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

  // በፍለጋ ቃሉ መሰረት ምርቶችን የመለየት ስራ
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
            outline: 'none',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
          }}
        />
      </div>

      {loading ? (
        <p>በመጫን ላይ... እባክዎ ይጠብቁ</p>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
          gap: '25px', 
          marginTop: '30px',
          padding: '0 20px'
        }}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <div key={product._id} style={{ 
                border: '1px solid #ddd', 
                padding: '15px', 
                borderRadius: '12px', 
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                backgroundColor: '#fff',
                transition: 'transform 0.2s'
              }}>
                <img 
                  src={product.imageUrl || 'https://via.placeholder.com/200'} 
                  alt={product.title} 
                  style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px' }} 
                />
                <h3 style={{ margin: '15px 0 5px', color: '#333' }}>{product.title}</h3>
                <p style={{ color: '#ff5722', fontSize: '18px', fontWeight: 'bold', margin: '5px 0 15px' }}>
                  {product.price} ETB
                </p>
                
                {/* ወደ ዝርዝር ገጽ የሚወስደው አዲሱ ቁልፍ */}
                <button 
                  onClick={() => history.push(`/product/${product._id}`)}
                  style={{ 
                    backgroundColor: '#28a745', 
                    color: 'white', 
                    border: 'none', 
                    padding: '10px 20px', 
                    borderRadius: '5px', 
                    cursor: 'pointer',
                    width: '100%',
                    fontWeight: 'bold'
                  }}
                >
                  ዝርዝር እይ
                </button>
              </div>
            ))
          ) : (
            <div style={{ gridColumn: '1/-1', padding: '50px' }}>
              <p style={{ color: '#888', fontSize: '18px' }}>ምንም የተገኘ ምርት የለም።</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
