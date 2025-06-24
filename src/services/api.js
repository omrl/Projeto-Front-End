const API_URL = 'http://localhost:3001';

// Gerar IDs sequenciais
const generateId = (prefix, items) => {
  if (items.length === 0) {
    switch (prefix) {
      case 'R0': return 'R0100';
      case 'T': return 'T001';
      default: return '1'; // Para usuários
    }
  }

  // Encontra o maior ID existente
  const maxId = items.reduce((max, item) => {
    const idValue = parseInt(item.id.replace(/\D/g, ''));
    return idValue > max ? idValue : max;
  }, 0);

  const newId = maxId + 1;

  switch (prefix) {
    case 'R0':
      return `R0${newId}`;
    case 'T':
      return `T${newId.toString().padStart(3, '0')}`;
    default:
      return newId.toString(); // Para usuários
  }
};

// Requisições
const fetchData = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_URL}/${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    throw error;
  }
};

// Autenticação
export const authService = {
  login: async (username, password) => {
    try {
      const users = await fetchData(`users?username=${username}&password=${password}`);
      return users.length > 0 ? users[0] : null;
    } catch (error) {
      throw new Error('Falha na autenticação');
    }
  }
};

// Serviço de projetos
export const projectService = {
  getAll: async () => fetchData('projects'),
  create: async (project) => {
    const projects = await fetchData('projects');
    const newId = generateId('R0', projects);
    return fetchData('projects', {
      method: 'POST',
      body: JSON.stringify({ ...project, id: newId })
    });
  }
};

// Serviço de tarefas
export const taskService = {
  getAll: async () => fetchData('tasks'),
  create: async (task) => {
    const tasks = await fetchData('tasks');
    const newId = generateId('T', tasks);
    return fetchData('tasks', {
      method: 'POST',
      body: JSON.stringify({ ...task, id: newId })
    });
  }
};

// Serviço de usuários
export const userService = {
  getAll: async () => fetchData('users'),
  create: async (user) => {
    const users = await fetchData('users');
    const newId = generateId('', users);
    return fetchData('users', {
      method: 'POST',
      body: JSON.stringify({ ...user, id: newId })
    });
  },
  update: async (id, updates) => fetchData(`users/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(updates)
  }),
  delete: async (id) => fetchData(`users/${id}`, {
    method: 'DELETE'
  })
};