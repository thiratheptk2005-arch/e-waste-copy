// leaderboardController.js
// รับผิดชอบ: รับ request / ส่ง response เท่านั้น
// ไม่มี business logic หรือ SQL อยู่ในนี้เลย - เรียกใช้ service ทั้งหมด

const leaderboardService = require("../services/leaderboardService");

class LeaderboardController {
  // POST /api/leaderboard
  async create(req, res) {
    try {
      const { player_name, score } = req.body;
      const record = await leaderboardService.saveScore(player_name, score);
      res.status(201).json({ success: true, data: record });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  // GET /api/leaderboard/ranking?limit=10
  async getRanking(req, res) {
    try {
      const { limit } = req.query;
      const data = await leaderboardService.getRanking(limit);
      res.json({ success: true, data });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  // GET /api/leaderboard/latest?limit=10
  async getLatest(req, res) {
    try {
      const { limit } = req.query;
      const data = await leaderboardService.getLatest(limit);
      res.json({ success: true, data });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
}

module.exports = new LeaderboardController();
