import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';

export default function Login({ setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const user = await authService.login(username, password);
      
      if (user) {
        // Remover senha antes de salvar no estado
        const { password, ...safeUser } = user;
        setUser(safeUser);
        navigate('/');
      } else {
        setError('Credenciais inválidas. Por favor, tente novamente.');
      }
    } catch (error) {
      setError('Erro ao conectar com o servidor. Tente novamente mais tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2 className="login-title">EnterpriseControl</h2>
          <p className="login-subtitle">Gestão de Projetos e Tarefas</p>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="input-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-5.333 0-16 2.667-16 8v2h32v-2c0-5.333-10.667-8-16-8Z"/>
              </svg>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Usuário"
                required
                disabled={isLoading}
              />
            </div>
          </div>
          
          <div className="form-group">
            <div className="input-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              {/* Desenha a forma do ícone */}
                <path d="M18 8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h12Zm-6 3a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-7-7h14a2 2 0 0 1 2 2v2H3V4a2 2 0 0 1 2-2Z"/>
              </svg>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha"
                required
                disabled={isLoading}
              />
            </div>
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary login-btn"
            disabled={isLoading}
          >
            {isLoading ? 'Autenticando...' : 'Entrar'}
          </button>
        </form>
        
        <div className="login-footer">
          <p>Sistema de gestão empresarial</p>
          <p>v1.0.0</p>
        </div>
      </div>
    </div>
  );
}