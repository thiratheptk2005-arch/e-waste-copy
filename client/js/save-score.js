// save-score.js — ตัวอย่างฟังก์ชันบันทึกคะแนนไปยังฐานข้อมูล ใช้ในหน้า gameover.php
// วิธีใช้: เรียก saveScore(playerName, score) หลังเกมจบ (เช่น ใน gameover.js เดิม)

async function saveScore(playerName, score) {
  try {
    const res = await fetch("../api/leaderboard/create.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ player_name: playerName, score }),
    });
    const data = await res.json();
    return data; // { success: true, data: { id, player_name, score } }
  } catch (err) {
    return { success: false, message: "บันทึกคะแนนไม่สำเร็จ — ตรวจสอบการเชื่อมต่อ" };
  }
}

// ตัวอย่างการใช้งานในหน้า gameover.php:
// const playerName = sessionStorage.getItem("ewr_playerName");
// const score = sessionStorage.getItem("ewr_lastScore");
// saveScore(playerName, Number(score)).then((result) => {
//   if (result.success) {
//     document.getElementById("saveStatus").textContent = "บันทึกคะแนนเรียบร้อย ✅";
//   } else {
//     document.getElementById("saveStatus").textContent = "⚠️ " + result.message;
//   }
// });
