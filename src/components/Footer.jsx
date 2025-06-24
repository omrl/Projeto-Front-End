import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>© {currentYear} EnterpriseControl - Todos os direitos reservados</p>
      </div>
    </footer>
  );
}