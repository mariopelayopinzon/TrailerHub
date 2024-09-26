// Footer.js
import React from 'react';

function Footer() {
  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <div style={leftColumnStyle}>
          <h5>Contact Information</h5>
          <p><strong>Name:</strong> Mario Pelayo</p>
          <p><strong>Email:</strong> mariopelayopinzon@gmail.com</p>
          <p><strong>GitHub:</strong> <a href="https://github.com/mariopelayopinzon" target="_blank" rel="noopener noreferrer" style={linkStyle}>github.com/mariopelayopinzon</a></p>
        </div>
        <div style={rightColumnStyle}>
          <h5>TrailerHub</h5>
          <p>© {new Date().getFullYear()} TrailerHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

const footerStyle = {
  backgroundColor: '#1c1c1c', /* Fondo oscuro */
  color: 'white',
  padding: '20px 0',
  fontFamily: 'Arial, sans-serif',
  fontSize: '16px'
};

const containerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 20px'
};

const leftColumnStyle = {
  flex: 1,
};

const rightColumnStyle = {
  flex: 1,
  textAlign: 'right',
};

const linkStyle = {
  color: '#007bff',
  textDecoration: 'none',
};

export default Footer;
