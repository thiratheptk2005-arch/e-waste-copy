// gameover.js — ทำงานบนหน้า gameover.html
// รับผิดชอบ: แสดงคะแนนสรุป, บันทึกคะแนนลง Leaderboard ผ่าน API, และเสียงเอฟเฟกต์ของหน้านี้

(function () {
  const finalScoreEl = document.getElementById("finalScore");
  const finalPlayerEl = document.getElementById("finalPlayer");
  const finalMaxComboEl = document.getElementById("finalMaxCombo");
  const saveStatusEl = document.getElementById("saveStatus");
  const playAgainBtn = document.getElementById("playAgainBtn");
  const leaderboardLink = document.getElementById("leaderboardLink");
  const homeLink = document.getElementById("homeLink");

  const playerName = sessionStorage.getItem("ewr_playerName") || "ผู้เล่นนิรนาม";
  const score = Number(sessionStorage.getItem("ewr_lastScore") || 0);
  const maxCombo = Number(sessionStorage.getItem("ewr_maxCombo") || 0);

  finalScoreEl.textContent = String(score);
  finalPlayerEl.textContent = playerName;
  if (finalMaxComboEl) {
    finalMaxComboEl.textContent = `คอมโบสูงสุด: x${maxCombo}`;
  }
  SFX.gameover.reveal();

  async function saveScore() {
    try {
      const res = await fetch("../api/leaderboard/create.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ player_name: playerName, score }),
      });
      const data = await res.json();

      if (data.success) {
        saveStatusEl.textContent = "✅ บันทึกคะแนนเรียบร้อยแล้ว";
      } else {
        saveStatusEl.textContent = `⚠️ บันทึกไม่สำเร็จ: ${data.message || "unknown error"}`;
      }
    } catch (err) {
      saveStatusEl.textContent = "⚠️ ไม่สามารถเชื่อมต่อ server ได้ (คะแนนยังไม่ถูกบันทึก)";
    }
  }

  playAgainBtn.addEventListener("click", () => {
    SFX.playThenGo(SFX.gameover.playAgain, "game.php");
  });

  if (leaderboardLink) {
    leaderboardLink.addEventListener("click", (e) => {
      e.preventDefault();
      SFX.playThenGo(SFX.gameover.navLeaderboard, leaderboardLink.getAttribute("href"));
    });
  }
  if (homeLink) {
    homeLink.addEventListener("click", (e) => {
      e.preventDefault();
      SFX.playThenGo(SFX.gameover.navHome, homeLink.getAttribute("href"));
    });
  }

  saveScore();
})();