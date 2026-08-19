// leaderboardRepository.js
// รับผิดชอบ: ติดต่อฐานข้อมูล MySQL (ผ่าน XAMPP) โดยตรง (SQL queries เท่านั้น)
// Controller / Service จะไม่รู้เลยว่าข้างในใช้ MySQL หรือฐานข้อมูลอะไร

const db = require("../database/database");

class LeaderboardRepository {
  /**
   * บันทึกคะแนนใหม่ลงฐานข้อมูล
   * @param {string} playerName
   * @param {number} score
   * @returns {Promise<object>} record ที่เพิ่งบันทึก
   */
  async insert(playerName, score) {
    const [result] = await db.query(
      `INSERT INTO leaderboard (player_name, score) VALUES (?, ?)`,
      [playerName, score]
    );
    return this.findById(result.insertId);
  }

  async findById(id) {
    const [rows] = await db.query(`SELECT * FROM leaderboard WHERE id = ?`, [id]);
    return rows[0] || null;
  }

  /**
   * ดึงคะแนนสูงสุด เรียงจากมากไปน้อย (อันดับ)
   * @param {number} limit
   */
  async findTopScores(limit = 10) {
    const [rows] = await db.query(
      `SELECT id, player_name, score, played_at
       FROM leaderboard
       ORDER BY score DESC, played_at ASC
       LIMIT ?`,
      [limit]
    );
    return rows;
  }

  /**
   * ดึงคะแนนล่าสุด เรียงจากเวลาที่เล่นล่าสุด
   * @param {number} limit
   */
  async findLatest(limit = 10) {
    const [rows] = await db.query(
      `SELECT id, player_name, score, played_at
       FROM leaderboard
       ORDER BY played_at DESC, id DESC
       LIMIT ?`,
      [limit]
    );
    return rows;
  }
}

module.exports = new LeaderboardRepository();
