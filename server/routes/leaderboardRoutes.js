// leaderboardRoutes.js
// รับผิดชอบ: ผูก URL endpoint เข้ากับ controller method

const express = require("express");
const router = express.Router();
const leaderboardController = require("../controllers/leaderboardController");

// บันทึกคะแนนใหม่
router.post("/", (req, res) => leaderboardController.create(req, res));

// อันดับคะแนนสูงสุด
router.get("/ranking", (req, res) => leaderboardController.getRanking(req, res));

// คะแนนล่าสุด
router.get("/latest", (req, res) => leaderboardController.getLatest(req, res));

module.exports = router;
