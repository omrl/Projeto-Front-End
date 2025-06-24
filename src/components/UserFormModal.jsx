import React, { useState, useEffect } from 'react';

export default function UserFormModal({ onClose, onSubmit, initialData }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    position: '',
    department: '',
    phone: '',
    username: '',
    password: ''
  });
  
  const [errors, setErrors] = useState({});

  // Preencher formulário se estiver editando
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        email: initialData.email || '',
        position: initialData.position || '',
        department: initialData.department || '',
        phone: initialData.phone || '',
        username: initialData.username || '',
        password: '' // Não preencher senha por segurança
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Limpar erro do campo ao modificar
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório';
    if (!formData.email.trim()) newErrors.email = 'Email é obrigatório';
    if (!formData.position.trim()) newErrors.position = 'Cargo é obrigatório';
    if (!formData.department.trim()) newErrors.department = 'Departamento é obrigatório';
    if (!formData.username.trim()) newErrors.username = 'Usuário é obrigatório';
    
    // Validar senha se for novo usuário
    if (!initialData && !formData.password.trim()) {
      newErrors.password = 'Senha é obrigatória';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>{initialData ? 'Editar Usuário' : 'Novo Usuário'}</h2>
          <button className="close-btn" onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Nome Completo *</label>
              <input
                type="text"
                name="name"
                className="form-input"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <span className="form-error">{errors.name}</span>}
            </div>
            
            <div className="form-group">
              <label className="form-label">Cargo *</label>
              <input
                type="text"
                name="position"
                className="form-input"
                value={formData.position}
                onChange={handleChange}
              />
              {errors.position && <span className="form-error">{errors.position}</span>}
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Email *</label>
              <input
                type="email"
                name="email"
                className="form-input"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <span className="form-error">{errors.email}</span>}
            </div>
            
            <div className="form-group">
              <label className="form-label">Telefone</label>
              <input
                type="text"
                name="phone"
                className="form-input"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(00) 00000-0000"
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Departamento *</label>
              <input
                type="text"
                name="department"
                className="form-input"
                value={formData.department}
                onChange={handleChange}
              />
              {errors.department && <span className="form-error">{errors.department}</span>}
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Nome de Usuário *</label>
              <input
                type="text"
                name="username"
                className="form-input"
                value={formData.username}
                onChange={handleChange}
              />
              {errors.username && <span className="form-error">{errors.username}</span>}
            </div>
            
            <div className="form-group">
              <label className="form-label">Senha {!initialData && '*'}</label>
              <input
                type="password"
                name="password"
                className="form-input"
                value={formData.password}
                onChange={handleChange}
                placeholder={initialData ? "Deixe em branco para manter" : ""}
              />
              {errors.password && <span className="form-error">{errors.password}</span>}
            </div>
          </div>
          
          <div className="form-actions">
            <button type="button" className="btn btn-cancel" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              {initialData ? 'Atualizar Usuário' : 'Criar Usuário'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}