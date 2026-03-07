import React from 'react';
import { Link, useHistory } from 'react-router-dom';

function Navbar() {
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem('user')); // የተጠቃሚውን መረጃ መፈተሻ

  const handleLogout = () => {
    localStorage.removeItem('user'); // መረጃውን ማጥፊያ
    history.push('/login');
  };

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 50px', backgroundColor: '#fff', borderBottom: '1px solid #ddd' }}>
      <Link to="/" style={{ fontSize: '24px', fontWeight: 'bold', color: '#28a745', textDecoration: 'none' }}>Ethio-Market</Link>
      <div>
        <Link to="/" style={{ margin: '0 15px', textDecoration: 'none', color: '#333' }}>Browse</Link>
        <Link to="/about" style={{ margin: '0 15px', textDecoration: 'none', color: '#333' }}>About</Link>
        
        {user ? (
          <>
            <span style={{ margin: '0 15px', fontWeight: 'bold' }}>{user.email}</span>
            <button onClick={handleLogout} style={{ padding: '5px 15px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Logout</button>
          </>
        ) : (
          <Link to="/login" style={{ padding: '8px 20px', backgroundColor: '#28a745', color: '#fff', borderRadius: '5px', textDecoration: 'none' }}>Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
