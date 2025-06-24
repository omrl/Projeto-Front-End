import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

// Import dos componentes
import Dashboard from './Dashboard';
import ProjectRegister from './ProjectRegister';
import Tasks from './Tasks';
import Login from './Login';
import Users from './Users';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProfileModal from '../components/ProfileModal';

// Import do style
import '../styles/main.css';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  // armazena o usuário logado ( se não ter será null )
  const [user, setUser] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  // Hook do react-router para redirecionamento
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('user'); // Busca o usuário salvo
    try {
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error('Erro ao fazer parse do usuário salvo:', error);
      localStorage.removeItem('user');
    }
    setIsLoading(false);
  }, []);

  // Salva o estado do usuário sempre que o user mudar
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      // Se não houver usuário (logout), remove
      localStorage.removeItem('user');
    }
  }, [user]); // executa sempre que o 'user' mudar

  const handleLogout = () => {
    setUser(null);                 
    setShowProfileModal(false);    
    navigate('/login');      
  };

  // mostra uma tela de carregamento ( só aparece se estiver lento )
  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Se o usuário estiver logado vai mostrar o Header */}
      {user && <Header user={user} onProfileClick={() => setShowProfileModal(true)} />}

      <main className="app-main">
        <Routes>
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login setUser={setUser} />}
          />

          <Route
            path="/"
            element={user ? <Dashboard /> : <Navigate to="/login" />}
          />

          <Route
            path="/projects/new"
            element={user ? <ProjectRegister /> : <Navigate to="/login" />}
          />

          <Route
            path="/tasks"
            element={user ? <Tasks /> : <Navigate to="/login" />}
          />

          <Route
            path="/users"
            element={user ? <Users /> : <Navigate to="/login" />}
          />

          {/* Rota inválida ( erro 404 ), manda para "/"( dashboard ) se estiver logado, se não "/login" */}
          <Route
            path="*"
            element={<Navigate to={user ? '/' : '/login'} />}
          />
        </Routes>
      </main>

      {user && <Footer />}

      {showProfileModal && (
        <ProfileModal
          user={user}                    // Passa o usuário logado para o modal ( perfil )
          onClose={() => setShowProfileModal(false)}
          onLogout={handleLogout}        // Faz logout se voce clicar no botão sair
        />
      )}
    </div>
  );
}
