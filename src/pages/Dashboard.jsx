import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { projectService } from '../services/api';

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await projectService.getAll();
        setProjects(data);
      } catch (error) {
        setError('Erro ao carregar projetos. Tente recarregar a página.');
        console.error('Dashboard error:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadProjects();
  }, []);

  // Exibir spinner ( negocio do carregando ) durante carregamento
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Carregando projetos...</p>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="main-content">
      <div className="page-header">
        <h2 className="page-title">Projetos</h2>
        <Link to="/projects/new" className="btn btn-primary">
          + Novo Projeto
        </Link>
      </div>
      
      {projects.length === 0 ? (
        <div className="empty-state">
          {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
          </svg> */}
          <p>Nenhum projeto cadastrado</p>
        </div>
      ) : (
        <table className="projects-table">
          <thead>
            <tr>
              <th>Código</th>
              <th>Nome</th>
              <th>Início</th>
              <th>Equipe</th>
              <th>Tarefa</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td>{project.id}</td>
                <td>{project.name}</td>
                <td>{project.start}</td>
                <td>{project.team}</td>
                <td>{project.task}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}