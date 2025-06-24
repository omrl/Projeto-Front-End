import React, { useState } from 'react';

export default function ProfileModal({ user, onClose, onLogout }) {
  // Usar os dados do usuário logado como valores iniciais
  const [userData, setUserData] = useState({
    name: user.name || '',
    email: user.email || '',
    phone: user.phone || '',
    department: user.department || '',
    position: user.position || ''
  });

  // Alteração de campo pelo user
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // Enviar para a API
  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal profile-modal">
        <div className="modal-header">
          <h2>Perfil do Usuário</h2>
          <button className="close-btn" onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>
        
        <div className="profile-header">
          <div className="avatar-large">
            <span>{user.name?.charAt(0) || 'U'}</span>
          </div>
          <h3 className="profile-name">{user.name}</h3>
          <p className="profile-position">{user.position}</p>
        </div>
        
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Nome Completo</label>
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Cargo</label>
              <input
                type="text"
                name="position"
                value={userData.position}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Telefone</label>
              <input
                type="text"
                name="phone"
                value={userData.phone}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label">Departamento</label>
            <input
              type="text"
              name="department"
              value={userData.department}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-actions">
            <button type="button" className="btn btn-logout" onClick={onLogout}>
              Sair
            </button>
            <div>
              <button type="button" className="btn btn-cancel" onClick={onClose}>
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary">
                Salvar Alterações
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}