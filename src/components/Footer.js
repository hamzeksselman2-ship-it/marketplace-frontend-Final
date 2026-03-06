import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer style={{ marginTop: '50px', padding: '30px', backgroundColor: '#f4f4f4', textAlign: 'center' }}>
      <p>&copy; 2026 Ethio-Marketplace. All rights reserved.</p>
      <div style={{ marginTop: '10px' }}>
        <Link to="/about" style={{ margin: '0 10px', color: '#666' }}>About Us</Link>
        <Link to="/terms" style={{ margin: '0 10px', color: '#666' }}>Terms of Use</Link>
      </div>
    </footer>
  );
}
export default Footer;
