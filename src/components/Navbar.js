import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 50px', backgroundColor: '#fff', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
      <Link to="/" style={{ fontSize: '24px', fontWeight: 'bold', color: '#2ecc71', textDecoration: 'none' }}>Ethio-Market</Link>
      <div>
        <Link to="/" style={{ margin: '0 15px', textDecoration: 'none', color: '#333' }}>Browse</Link>
        <Link to="/about" style={{ margin: '0 15px', textDecoration: 'none', color: '#333' }}>About</Link>
        <Link to="/login" style={{ backgroundColor: '#2ecc71', color: '#fff', padding: '8px 15px', borderRadius: '5px', textDecoration: 'none' }}>Login</Link>
      </div>
    </nav>
  );
}
export default Navbar;
