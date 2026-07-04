// Static mock chat data. In production this collection would come from
// GET /chats and GET /chats/:id/messages once the Node API exists.

export const chats = [
  {
    id: 'c1',
    type: 'direct',
    userId: 'u1',
    unread: 2,
    pinned: true,
    messages: [
      { id: 'm1', from: 'u1', text: 'Hey! Did you see the design review notes?', time: '9:12 AM', status: 'read' },
      { id: 'm2', from: 'me', text: "Not yet, sending me the link?", time: '9:14 AM', status: 'read' },
      { id: 'm3', from: 'u1', text: 'On it, one sec', time: '9:14 AM', status: 'read' },
      { id: 'm4', from: 'u1', kind: 'file', fileName: 'design-review-v3.pdf', fileSize: '2.4 MB', time: '9:15 AM', status: 'read' },
      { id: 'm5', from: 'me', text: 'Got it, thank you 🙏', time: '9:20 AM', status: 'delivered' },
      { id: 'm6', from: 'u1', text: "Let's sync at 3?", time: '9:31 AM', status: 'sent' },
    ],
  },
  {
    id: 'c2',
    type: 'group',
    groupId: 'g1',
    unread: 5,
    pinned: false,
    messages: [
      { id: 'm1', from: 'u2', text: 'Standup notes are in the doc', time: 'Yesterday', status: 'read' },
      { id: 'm2', from: 'u3', text: "I'll pick up the payments ticket", time: 'Yesterday', status: 'read' },
      { id: 'm3', from: 'me', text: 'Sounds good, assigning it now', time: 'Yesterday', status: 'read' },
      { id: 'm4', from: 'u5', kind: 'image', time: '8:02 AM', status: 'read' },
      { id: 'm5', from: 'u5', text: 'Progress so far on the onboarding flow', time: '8:02 AM', status: 'read' },
      { id: 'm6', from: 'u2', text: 'Looks great!', time: '8:10 AM', status: 'delivered' },
    ],
  },
  {
    id: 'c3',
    type: 'direct',
    userId: 'u3',
    unread: 0,
    pinned: false,
    messages: [
      { id: 'm1', from: 'me', text: 'Lunch today?', time: 'Mon', status: 'read' },
      { id: 'm2', from: 'u3', text: "Can't, back to back calls 😩", time: 'Mon', status: 'read' },
      { id: 'm3', from: 'u3', text: 'Tomorrow though!', time: 'Mon', status: 'read' },
    ],
  },
  {
    id: 'c4',
    type: 'direct',
    userId: 'u4',
    unread: 0,
    pinned: false,
    messages: [
      { id: 'm1', from: 'u4', text: 'Pushed the release branch', time: '2 days ago', status: 'read' },
      { id: 'm2', from: 'me', text: 'Reviewing now', time: '2 days ago', status: 'read' },
    ],
  },
  {
    id: 'c5',
    type: 'group',
    groupId: 'g2',
    unread: 0,
    pinned: false,
    messages: [
      { id: 'm1', from: 'u6', text: 'Welcome to the launch squad 🚀', time: 'Last week', status: 'read' },
      { id: 'm2', from: 'me', text: 'Excited to be here!', time: 'Last week', status: 'read' },
    ],
  },
  {
    id: 'c6',
    type: 'direct',
    userId: 'u5',
    unread: 0,
    pinned: false,
    messages: [
      { id: 'm1', from: 'u5', text: 'Thanks for the feedback on the mocks', time: '3 days ago', status: 'read' },
    ],
  },
  {
    id: 'c7',
    type: 'group',
    groupId: 'g3',
    unread: 3,
    pinned: false,
    messages: [
      { id: 'm1', from: 'u3', text: 'New component library is live', time: '11:02 AM', status: 'read' },
      { id: 'm2', from: 'u1', text: 'Finally! The old buttons were rough', time: '11:05 AM', status: 'read' },
      { id: 'm3', from: 'u6', kind: 'image', time: '11:20 AM', status: 'read' },
      { id: 'm4', from: 'u6', text: 'Updated the color tokens too', time: '11:20 AM', status: 'delivered' },
    ],
  },
  {
    id: 'c8',
    type: 'group',
    groupId: 'g4',
    unread: 0,
    pinned: false,
    messages: [
      { id: 'm1', from: 'u4', text: 'Flights are booked ✈️', time: 'Sat', status: 'read' },
      { id: 'm2', from: 'u2', text: 'Nice, sending the itinerary doc', time: 'Sat', status: 'read' },
      { id: 'm3', from: 'me', text: "Can't wait for this trip", time: 'Sat', status: 'read' },
    ],
  },
];

export const groups = [
  {
    id: 'g1',
    name: 'Product Team',
    avatarColor: '#3D5AFE',
    initials: 'PT',
    memberIds: ['u2', 'u3', 'u5', 'me'],
    description: 'Daily standups, sprint planning, and product decisions.',
    createdBy: 'u2',
  },
  {
    id: 'g2',
    name: 'Launch Squad',
    avatarColor: '#7B61FF',
    initials: 'LS',
    memberIds: ['u6', 'u4', 'u1', 'me'],
    description: 'Coordinating the Q3 launch across teams.',
    createdBy: 'u6',
  },
  {
    id: 'g3',
    name: 'Design Guild',
    avatarColor: '#FF7A59',
    initials: 'DG',
    memberIds: ['u1', 'u3', 'u6', 'me'],
    description: 'Sharing design system updates and feedback.',
    createdBy: 'u3',
  },
  {
    id: 'g4',
    name: 'Weekend Trip',
    avatarColor: '#34A876',
    initials: 'WT',
    memberIds: ['u2', 'u4', 'u5', 'me'],
    description: 'Planning the getaway — flights, stays, and itinerary.',
    createdBy: 'u4',
  },
];

// Lookup helpers so screens don't reach into the arrays directly — keeps the
// call sites stable if this becomes an async API-backed store later.
export function findGroup(id) {
  return groups.find((g) => g.id === id);
}

export function findChat(id) {
  return chats.find((c) => c.id === id);
}
