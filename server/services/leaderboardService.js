// leaderboardService.js
// รับผิดชอบ: กฎทางธุรกิจ (business logic) เช่น ตรวจสอบข้อมูลก่อนบันทึก, จำกัดจำนวนผลลัพธ์
// ไม่ยุ่งกับ SQL โดยตรง - เรียกผ่าน repository เท่านั้น

const leaderboardRepository = require("../repositories/leaderboardRepository");

const MAX_NAME_LENGTH = 20;
const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 50;

class LeaderboardService {
  /**
   * บันทึกคะแนนใหม่ พร้อมตรวจสอบความถูกต้องของข้อมูล
   */
  async saveScore(playerName, score) {
    const cleanedName = this._sanitizeName(playerName);
    const cleanedScore = this._sanitizeScore(score);

    if (!cleanedName) {
      throw new Error("กรุณาระบุชื่อผู้เล่น");
    }
    if (cleanedScore === null) {
      throw new Error("คะแนนไม่ถูกต้อง");
    }

    return leaderboardRepository.insert(cleanedName, cleanedScore);
  }

  /**
   * อันดับคะแนนสูงสุด
   */
  async getRanking(limit = DEFAULT_LIMIT) {
    const safeLimit = this._sanitizeLimit(limit);
    return leaderboardRepository.findTopScores(safeLimit);
  }

  /**
   * คะแนนล่าสุด
   */
  async getLatest(limit = DEFAULT_LIMIT) {
    const safeLimit = this._sanitizeLimit(limit);
    return leaderboardRepository.findLatest(safeLimit);
  }

  _sanitizeName(name) {
    if (typeof name !== "string") return null;
    const trimmed = name.trim();
    if (trimmed.length === 0) return null;
    return trimmed.slice(0, MAX_NAME_LENGTH);
  }

  _sanitizeScore(score) {
    const num = Number(score);
    if (Number.isNaN(num) || !Number.isFinite(num)) return null;
    return Math.max(0, Math.round(num));
  }

  _sanitizeLimit(limit) {
    const num = Number(limit);
    if (Number.isNaN(num) || num <= 0) return DEFAULT_LIMIT;
    return Math.min(Math.round(num), MAX_LIMIT);
  }
}

module.exports = new LeaderboardService();
