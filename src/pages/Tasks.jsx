import React, { useState, useEffect } from 'react';
import TaskFormModal from '../components/TaskFormModal';
import { taskService } from '../services/api';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [showFormModal, setShowFormModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await taskService.getAll();
        setTasks(data);
      } catch (error) {
        setError('Erro ao carregar tarefas. Tente recarregar a página.');
        console.error('Tasks error:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadTasks();
  }, []);

  const handleCreateTask = async (task) => {
    try {
      await taskService.create(task);
      const updatedTasks = await taskService.getAll();
      setTasks(updatedTasks);
      setShowFormModal(false);
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Carregando tarefas...</p>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="main-content">
      <div className="page-header">
        <h2 className="page-title">Tarefas</h2>
        <button 
          className="btn btn-primary"
          onClick={() => setShowFormModal(true)}
        >
          + Nova Tarefa
        </button>
      </div>
      
      {tasks.length === 0 ? (
        <div className="empty-state">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
          </svg>
          <p>Nenhuma tarefa cadastrada</p>
        </div>
      ) : (
        <table className="projects-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Projeto</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.title}</td>
                <td>{task.project}</td>
                <td>
                  {/* Mostrar status da tarefa */}
                  <span className={`status-badge ${task.status.replace(/\s/g, '')}`}>
                    {task.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      
      {showFormModal && (
        <TaskFormModal 
          onClose={() => setShowFormModal(false)}
          onSubmit={handleCreateTask}
        />
      )}
    </div>
  );
}