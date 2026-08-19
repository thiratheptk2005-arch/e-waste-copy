<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Leaderboard | E-Waste Rush</title>
  <link rel="stylesheet" href="css/main.css" />
  <link rel="stylesheet" href="css/leaderboard.css" />
</head>
<body>
  <main class="app-shell">
    <section class="board">
      <div class="board-header">
        <p class="eyebrow">HALL OF FAME</p>
        <h2>🏆 Leaderboard</h2>
      </div>

      <div class="tabs" role="tablist">
        <button class="tab is-active" id="tabRanking" role="tab" aria-selected="true">🏅 อันดับ</button>
        <button class="tab" id="tabLatest" role="tab" aria-selected="false">🕒 ล่าสุด</button>
      </div>

      <ul class="board-list" id="boardList">
        <li class="board-loading">กำลังโหลด...</li>
      </ul>

      <div class="board-footer">
        <a href="index.php" id="homeLink" class="btn btn-outline">🏠 กลับหน้าหลัก</a>
      </div>
    </section>
  </main>

  <script src="js/sfx.js"></script>
  <script src="js/leaderboard.js"></script>
</body>
</html>
