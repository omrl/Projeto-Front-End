import React, { useState, useEffect } from 'react';
import UserFormModal from '../components/UserFormModal';
import { userService } from '../services/api';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await userService.getAll();
        setUsers(data);
      } catch (error) {
        setError('Erro ao carregar usuários. Tente recarregar a página.');
        console.error('Users error:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadUsers();
  }, []);

  const handleCreateUser = async (userData) => {
    try {
      let result;
      
      if (editingUser) {
        result = await userService.update(editingUser.id, userData);
        const updatedUsers = users.map(u => u.id === editingUser.id ? result : u);
        setUsers(updatedUsers);
      } else {
        result = await userService.create(userData);
        setUsers([...users, result]);
      }
      
      setShowFormModal(false);
      setEditingUser(null);
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
      setError('Erro ao salvar usuário. Tente novamente.');
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setShowFormModal(true);
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      try {
        await userService.delete(id);
        setUsers(users.filter(user => user.id !== id));
      } catch (error) {
        console.error('Erro ao excluir usuário:', error);
        setError('Erro ao excluir usuário. Tente novamente.');
      }
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Carregando usuários...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message full-page-error">
        {error}
      </div>
    );
  }

  return (
    <div className="main-content">
      <div className="page-header">
        <h2 className="page-title">Usuários</h2>
        <button 
          className="btn btn-primary"
          onClick={() => {
            setEditingUser(null);
            setShowFormModal(true);
          }}
        >
          + Novo Usuário
        </button>
      </div>
      
      {users.length === 0 ? (
        <div className="empty-state">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
          <p>Nenhum usuário cadastrado</p>
        </div>
      ) : (
        <table className="projects-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Cargo</th>
              <th>Departamento</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.position}</td>
                <td>{user.department}</td>
                <td>
                  <button 
                    className="btn-icon edit"
                    onClick={() => handleEditUser(user)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                    </svg>
                  </button>
                  <button 
                    className="btn-icon delete"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      
      {showFormModal && (
        <UserFormModal 
          onClose={() => {
            setShowFormModal(false);
            setEditingUser(null);
          }}
          onSubmit={handleCreateUser}
          initialData={editingUser}
        />
      )}
    </div>
  );
}