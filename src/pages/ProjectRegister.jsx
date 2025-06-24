import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { projectService } from '../services/api';

export default function ProjectRegister() {
  const [name, setName] = useState('');
  const [team, setTeam] = useState('');
  const [task, setTask] = useState('');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Carregar projetos para gerar ID
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await projectService.getAll();
        setProjects(data);
      } catch (error) {
        console.error('Erro ao carregar projetos:', error);
      }
    };
    
    loadProjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await projectService.create({
        name,
        team,
        task,
        start: new Date().toLocaleDateString('pt-BR')
      }, projects);
      
      navigate('/');
    } catch (error) {
      setError('Erro ao criar projeto. Tente novamente.');
      console.error('ProjectRegister error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-content">
      <div className="form-container">
        <h2 className="page-title">Cadastrar Novo Projeto</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Nome do Projeto</label>
            <input
              type="text"
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Equipe</label>
            <input
              type="text"
              className="form-input"
              value={team}
              onChange={(e) => setTeam(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Tarefa Inicial</label>
            <input
              type="text"
              className="form-input"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          
          <div className="form-actions">
            <button 
              type="button" 
              className="btn btn-cancel"
              onClick={() => navigate('/')}
              disabled={loading}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}