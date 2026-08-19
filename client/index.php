<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>E-Waste Rush | จิ้มให้ถูก ทิ้งให้เป็น</title>
  <link rel="stylesheet" href="css/main.css" />
  <link rel="stylesheet" href="css/menu.css" />
</head>
<body>
  <main class="app-shell">
    <section class="menu">
      <div class="menu-hero">
        <p class="eyebrow">RECYCLE • SORT • SCORE</p>
        <div class="menu-hero__icons" aria-hidden="true">📱🔋🖱️</div>
        <h1 class="menu-title">
          จิ้มให้ถูก ทิ้งให้เป็น
          <span>E-WASTE RUSH</span>
        </h1>
        <p class="menu-subtitle">
          คัดแยกขยะอิเล็กทรอนิกส์ให้ทันเวลา ก่อนที่นาฬิกาจะหมด
        </p>
      </div>

      <div class="trace-divider" aria-hidden="true"></div>

      <div class="pcb-card">
        <div class="name-field">
          <label for="playerName">ชื่อผู้เล่น <span class="name-field__optional">(ไม่ใส่ก็ได้)</span></label>
          <input
            type="text"
            id="playerName"
            maxlength="20"
            placeholder="ไม่ใส่ก็เริ่มเล่นได้ (จะได้ชื่อ Player 01, 02, ... ให้อัตโนมัติ)"
            autocomplete="off"
          />
          <small id="nameError"></small>
        </div>

        <div class="menu-actions">
          <a href="game.php" id="startBtn" class="btn btn-block">▶ เริ่มเกม</a>
          <a href="how-to-play.php" id="howToLink" class="btn btn-outline btn-block">📖 วิธีเล่น</a>
          <a href="leaderboard.php" id="leaderboardLink" class="btn btn-copper btn-block">🏆 Leaderboard</a>
        </div>
      </div>

      <div class="legend">
        <div class="legend__item">
          <span class="legend__dot legend__dot--good"></span> ขยะอิเล็กทรอนิกส์ = +10
        </div>
        <div class="legend__item">
          <span class="legend__dot legend__dot--bad"></span> ขยะทั่วไป = -5
        </div>
      </div>
    </section>
  </main>

  <script src="js/sfx.js"></script>
  <script src="js/main.js"></script>
</body>
</html>
