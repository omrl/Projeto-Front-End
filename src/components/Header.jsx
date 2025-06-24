import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header({ user, onProfileClick }) {
  // ver pargina em que esta
  const location = useLocation();
  
  // Usado para saber qual item do menu está ativo
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <span>EnterpriseControl</span>
        </Link>
        
        {user && (
          <div className="header-nav">
            <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
              Projetos
            </Link>
            <Link to="/tasks" className={`nav-link ${isActive('/tasks') ? 'active' : ''}`}>
              Tarefas
            </Link>
            <Link to="/users" className={`nav-link ${isActive('/users') ? 'active' : ''}`}>
              Usuários
            </Link>
            
            <div className="profile-icon" onClick={onProfileClick}>
              <div className="avatar">U</div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}