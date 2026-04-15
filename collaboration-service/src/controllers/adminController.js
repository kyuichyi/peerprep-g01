const db = require('../config/db');
const { getRoom, getConnectedCount } = require('../websocket/roomManager');

const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://user-app:3001';
const SERVICE_SECRET = process.env.SERVICE_SECRET;

async function fetchUserNames(userIds) {
  const unique = [...new Set(userIds.filter(Boolean))];
  if (unique.length === 0) return new Map();

  try {
    const res = await fetch(
      `${USER_SERVICE_URL}/api/internal/users?ids=${encodeURIComponent(unique.join(','))}`,
      { headers: { 'X-Service-Secret': SERVICE_SECRET || '' } }
    );
    if (!res.ok) {
      console.error(`[adminController] fetchUserNames failed: ${res.status}`);
      return new Map();
    }
    const json = await res.json();
    return new Map((json.data || []).map((u) => [u.userId, u.userName]));
  } catch (err) {
    console.error('[adminController] fetchUserNames error:', err.message);
    return new Map();
  }
}

/**
 * GET /api/collab/rooms
 * Admin only. Lists all active sessions, enriched with live connected user count
 * and the userName for each participant (looked up from user-service).
 */
const listActiveRooms = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT * FROM "session" WHERE "status" = $1 ORDER BY "createdAt" DESC`,
      ['active']
    );

    const allUserIds = result.rows.flatMap((s) => [s.userOneId, s.userTwoId]);
    const nameMap = await fetchUserNames(allUserIds);

    const sessions = result.rows.map((session) => ({
      ...session,
      connectedUsers: getConnectedCount(session.roomId),
      userOneName: nameMap.get(session.userOneId) || null,
      userTwoName: nameMap.get(session.userTwoId) || null,
    }));

    return res.status(200).json({ success: true, data: sessions });
  } catch (err) {
    console.error('GET /api/collab/rooms error:', err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

/**
 * GET /api/collab/rooms/:roomId
 * Admin only. Returns a single session by roomId, enriched with live connected user count.
 */
const getRoomDetail = async (req, res) => {
  const { roomId } = req.params;

  try {
    const result = await db.query(
      `SELECT * FROM "session" WHERE "roomId" = $1`,
      [roomId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Room not found' });
    }

    const session = result.rows[0];
    const room = getRoom(roomId);
    const connectedUsers = room ? getConnectedCount(roomId) : 0;

    return res.status(200).json({
      success: true,
      data: { ...session, connectedUsers },
    });
  } catch (err) {
    console.error('GET /api/collab/rooms/:roomId error:', err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = { listActiveRooms, getRoomDetail };
