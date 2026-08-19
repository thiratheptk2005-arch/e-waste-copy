// leaderboard.js — ทำงานบนหน้า leaderboard.php
// รับผิดชอบ: ดึงข้อมูลจาก API (PHP บน XAMPP) และแสดงผลแบบ "อันดับ" หรือ "ล่าสุด"

(function () {
  const tabRanking = document.getElementById("tabRanking");
  const tabLatest = document.getElementById("tabLatest");
  const boardList = document.getElementById("boardList");
  const homeLink = document.getElementById("homeLink");

  const MEDALS = ["🥇", "🥈", "🥉"];
  const RANK_CLASSES = ["board-row--gold", "board-row--silver", "board-row--bronze"];

  let currentMode = "ranking";

  function formatDate(isoLike) {
    try {
      const d = new Date(isoLike.replace(" ", "T"));
      if (Number.isNaN(d.getTime())) return isoLike;
      return d.toLocaleDateString("th-TH", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch {
      return isoLike;
    }
  }

  function renderRows(rows, mode) {
    if (!rows || rows.length === 0) {
      boardList.innerHTML = `<li class="board-empty">ยังไม่มีข้อมูลคะแนน — เป็นคนแรกที่เล่นเลย!</li>`;
      return;
    }

    boardList.innerHTML = rows
      .map((row, idx) => {
        const rankLabel = mode === "ranking" && idx < 3 ? MEDALS[idx] : String(idx + 1);
        const rankClass = mode === "ranking" && idx < 3 ? RANK_CLASSES[idx] : "";
        return `
          <li class="board-row ${rankClass}">
            <span class="board-row__rank">${rankLabel}</span>
            <span class="board-row__info">
              <span class="board-row__name">${escapeHtml(row.player_name)}</span>
              <span class="board-row__date">${formatDate(row.played_at)}</span>
            </span>
            <span class="board-row__score">${row.score}</span>
          </li>
        `;
      })
      .join("");
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  async function loadBoard(mode) {
    currentMode = mode;
    boardList.innerHTML = `<li class="board-loading">กำลังโหลด...</li>`;

    tabRanking.classList.toggle("is-active", mode === "ranking");
    tabLatest.classList.toggle("is-active", mode === "latest");
    tabRanking.setAttribute("aria-selected", String(mode === "ranking"));
    tabLatest.setAttribute("aria-selected", String(mode === "latest"));

    // เรียกไฟล์ .php โดยตรง (ฝั่ง XAMPP/Apache รัน PHP ให้เอง ไม่ต้องมี Express route)
    // ใช้ relative path ../api/... เพราะ leaderboard.php อยู่ในโฟลเดอร์ client/ ส่วน api/ อยู่ระดับเดียวกับ client/
    const endpoint =
      mode === "ranking" ? "../api/leaderboard/ranking.php" : "../api/leaderboard/latest.php";

    try {
      const res = await fetch(`${endpoint}?limit=10`);
      const data = await res.json();
      if (data.success) {
        renderRows(data.data, mode);
      } else {
        boardList.innerHTML = `<li class="board-empty">โหลดข้อมูลไม่สำเร็จ</li>`;
      }
    } catch (err) {
      boardList.innerHTML = `<li class="board-empty">⚠️ ไม่สามารถเชื่อมต่อ server ได้</li>`;
    }
  }

  tabRanking.addEventListener("click", () => {
    SFX.leaderboard.tabSwitch();
    loadBoard("ranking");
  });
  tabLatest.addEventListener("click", () => {
    SFX.leaderboard.tabSwitch();
    loadBoard("latest");
  });

  if (homeLink) {
    homeLink.addEventListener("click", (e) => {
      e.preventDefault();
      SFX.playThenGo(SFX.leaderboard.navHome, homeLink.getAttribute("href"));
    });
  }

  loadBoard("ranking");
})();
