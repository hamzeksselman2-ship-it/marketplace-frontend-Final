import React from 'react';
import { Link, useHistory } from 'react-router-dom';

function Navbar() {
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem('user')); // የተጠቃሚውን መረጃ ከብሮውዘሩ ያነባል

  const handleLogout = () => {
    localStorage.removeItem('user'); // የሎጊን መረጃውን ያጠፋል
    history.push('/login'); // ወደ ሎጊን ገጽ ይመልሳል
  };

  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      padding: '15px 50px', 
      backgroundColor: '#fff', 
      borderBottom: '1px solid #ddd',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      {/* የዌብሳይቱ ስም */}
      <Link to="/" style={{ fontSize: '24px', fontWeight: 'bold', color: '#28a745', textDecoration: 'none' }}>
        Ethio-Market
      </Link>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Link to="/" style={{ margin: '0 15px', textDecoration: 'none', color: '#333' }}>Browse</Link>
        <Link to="/about" style={{ margin: '0 15px', textDecoration: 'none', color: '#333' }}>About</Link>
        
        {/* ተጠቃሚው ሎጊን ካደረገ ብቻ የሚታዩ ምርጫዎች */}
        {user ? (
          <>
            <Link to="/add-product" style={{ 
              margin: '0 15px', 
              textDecoration: 'none', 
              color: '#28a745', 
              fontWeight: 'bold',
              border: '1px solid #28a745',
              padding: '5px 10px',
              borderRadius: '5px'
            }}>
              Sell Item
            </Link>
            <span style={{ margin: '0 15px', color: '#555', fontWeight: '500' }}>{user.email}</span>
            <button 
              onClick={handleLogout} 
              style={{ 
                padding: '8px 15px', 
                backgroundColor: '#dc3545', 
                color: '#fff', 
                border: 'none', 
                borderRadius: '5px', 
                cursor: 'pointer' 
              }}
            >
              Logout
            </button>
          </>
        ) : (
          /* ሎጊን ካላደረገ የሚታይ ቁልፍ */
          <Link to="/login" style={{ 
            padding: '8px 20px', 
            backgroundColor: '#28a745', 
            color: '#fff', 
            borderRadius: '5px', 
            textDecoration: 'none' 
          }}>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
import React from 'react';
import { Link, useHistory } from 'react-router-dom';

function Navbar() {
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login'; // በግድ ሪፍሬሽ እንዲያደርግ
  };

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 50px', backgroundColor: '#fff', borderBottom: '1px solid #ddd' }}>
      <Link to="/" style={{ fontSize: '24px', fontWeight: 'bold', color: '#28a745', textDecoration: 'none' }}>Ethio-Market</Link>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Link to="/" style={{ margin: '0 15px', textDecoration: 'none', color: '#333' }}>Browse</Link>
        {user ? (
          <>
            <Link to="/inbox" style={{ margin: '0 15px', textDecoration: 'none', color: '#333' }}>📥 Inbox</Link>
            <Link to="/add-product" style={{ margin: '0 15px', textDecoration: 'none', color: '#28a745', fontWeight: 'bold' }}>Sell Item</Link>
            <span style={{ margin: '0 15px' }}>{user.email}</span>
            <button onClick={handleLogout} style={{ padding: '8px 15px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Logout</button>
          </>
        ) : (
          <Link to="/login" style={{ padding: '8px 20px', backgroundColor: '#28a745', color: '#fff', borderRadius: '5px', textDecoration: 'none' }}>Login</Link>
        )}
      </div>
    </nav>
  );
}
export default Navbar;
