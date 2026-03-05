const db = require('../config/db');

/**
 * GET /api/questions/topics
 * 
 * Returns all available topic names from the "topic" table.
 */
exports.getAllTopics = async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM topic');
    res.status(200).json({
      data: rows
    });
  } catch (error) {
    console.error('Error fetching topics:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * POST /api/questions/topics
 * 
 * Body: { name }
 *
 * Adds a new topics to the "topic" table.
 * Ensures the topic name is unique.
 */
exports.addTopic = async (req, res) => {
  const { topicName } = req.body;

  try {
    const [result] = await db.execute('INSERT INTO topic (name) VALUES (?)', [topicName]);
    res.status(201).json({
      message: 'Topic added successfully',
      id: result.insertId,
      name: topicName
    });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ 
        error: 'Topic name already exists' 
      });
    }

    console.error('Error adding topic:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAllTopics,
  addTopic
};