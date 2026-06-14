export const initialUsers = [
  { id: 'USR-001', name: 'Admin', email: 'admin@petcare.com', password: 'admin123', role: 'admin' },
  { id: 'USR-002', name: 'Dr. Sarah Wijaya', email: 'sarah@petcare.com', password: 'sarah123', role: 'vet' }
];

export function loadUsers() {
  try {
    const raw = localStorage.getItem('users');
    return raw ? JSON.parse(raw) : initialUsers.slice();
  } catch (e) {
    return initialUsers.slice();
  }
}

export function saveUsers(users) {
  try {
    localStorage.setItem('users', JSON.stringify(users));
  } catch (e) {
    // ignore
  }
}

export function addUser(user) {
  const users = loadUsers();
  users.unshift(user);
  saveUsers(users);
}
