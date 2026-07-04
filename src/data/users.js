// Static mock user directory. In production this would come from
// GET /users (contact list) and GET /me (currentUser) once the API exists.

export const currentUser = {
  id: 'u0',
  name: 'You',
  status: 'Available',
  avatarColor: '#1F6F6B',
  initials: 'YO',
  avatarUrl: 'https://randomuser.me/api/portraits/men/91.jpg',
  email: 'you@nimbus.app',
  phone: '+91 98765 43210',
};

export const users = [
  {
    id: 'u1',
    name: 'Ananya Kapoor',
    status: 'At the gym 🏋️',
    online: true,
    avatarColor: '#E0523F',
    initials: 'AK',
    avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: 'u2',
    name: 'Ravi Menon',
    status: 'In a meeting',
    online: false,
    lastSeen: '10:42 AM',
    avatarColor: '#3D5AFE',
    initials: 'RM',
    avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: 'u3',
    name: 'Sofia Torres',
    status: 'Available',
    online: true,
    avatarColor: '#FF7A59',
    initials: 'ST',
    avatarUrl: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
  {
    id: 'u4',
    name: 'Daniel Osei',
    status: 'Building something cool',
    online: false,
    lastSeen: 'Yesterday',
    avatarColor: '#7B61FF',
    initials: 'DO',
    avatarUrl: 'https://randomuser.me/api/portraits/men/76.jpg',
  },
  {
    id: 'u5',
    name: 'Meera Iyer',
    status: 'Available',
    online: true,
    avatarColor: '#34A876',
    initials: 'MI',
    avatarUrl: 'https://randomuser.me/api/portraits/women/21.jpg',
  },
  {
    id: 'u6',
    name: 'James Whitfield',
    status: 'Do not disturb',
    online: false,
    lastSeen: '2 days ago',
    avatarColor: '#C2185B',
    initials: 'JW',
    avatarUrl: 'https://randomuser.me/api/portraits/men/85.jpg',
  },
];

// Lookup helper used throughout the screens/components instead of importing
// `users` directly, so the data-fetching layer can be swapped later without
// touching call sites.
export function findUser(id) {
  if (id === currentUser.id) return currentUser;
  return users.find((u) => u.id === id);
}
