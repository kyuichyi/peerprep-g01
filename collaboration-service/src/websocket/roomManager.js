const rooms = new Map();
// rooms.set(roomId, { sessionId, roomId, questionId, question, users: new Map(), createdAt })

const createRoom = (roomId, data) => {
  rooms.set(roomId, {
    ...data,
    roomId,
    users: new Map(),
    createdAt: Date.now(),
  });
};

const getRoom = (roomId) => rooms.get(roomId);
const deleteRoom = (roomId) => rooms.delete(roomId);
const getAllRooms = () => rooms;

const addUser = (roomId, userId, socketId) => {
  const room = rooms.get(roomId);
  if (!room) return;
  room.users.set(userId, { socketId, status: 'connected', disconnectedAt: null });
};

const removeUser = (roomId, userId) => {
  const room = rooms.get(roomId);
  if (!room) return;
  room.users.delete(userId);
};

const setUserStatus = (roomId, userId, status) => {
  const room = rooms.get(roomId);
  if (!room) return;
  const user = room.users.get(userId);
  if (!user) return;
  user.status = status;
};

const getConnectedCount = (roomId) => {
  const room = rooms.get(roomId);
  if (!room) return 0;
  let count = 0;
  for (const u of room.users.values()) {
    if (u.status === 'connected') count++;
  }
  return count;
};

module.exports = { createRoom, getRoom, deleteRoom, getAllRooms, addUser, removeUser, setUserStatus, getConnectedCount };
