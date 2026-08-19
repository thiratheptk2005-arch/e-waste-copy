// main.js — ทำงานบนหน้า index.html (Main Menu)
// รับผิดชอบ: จัดการชื่อผู้เล่น (ใส่หรือไม่ใส่ก็ได้) แล้วพาไปหน้าเกม + เสียงตอนกดปุ่ม

(function () {
  const nameInput = document.getElementById("playerName");
  const nameError = document.getElementById("nameError");
  const startBtn = document.getElementById("startBtn");
  const howToLink = document.getElementById("howToLink");
  const leaderboardLink = document.getElementById("leaderboardLink");

  const GUEST_COUNTER_KEY = "ewr_guestCounter"; // เก็บถาวรใน localStorage เพื่อให้เลขรันต่อเนื่องทุกครั้งที่ไม่ใส่ชื่อ

  // ถ้าเคยกรอกชื่อไว้ก่อนหน้า (และไม่ใช่ชื่อที่ระบบตั้งให้อัตโนมัติ) ให้เติมกลับมาให้อัตโนมัติ
  const savedName = sessionStorage.getItem("ewr_playerName");
  const wasAutoName = sessionStorage.getItem("ewr_playerNameIsAuto") === "1";
  if (savedName && !wasAutoName) {
    nameInput.value = savedName;
  }

  function validateName(name) {
    // ชื่อผู้เล่นไม่บังคับ — ถ้าไม่ใส่ระบบจะตั้งชื่อ Player 0N ให้เอง
    if (name && name.length > 20) {
      return "ชื่อยาวเกินไป (ไม่เกิน 20 ตัวอักษร)";
    }
    return "";
  }

  /**
   * สร้างชื่อผู้เล่นอัตโนมัติแบบ "Player 01", "Player 02", ... เรียงไปเรื่อย ๆ
   * นับต่อเนื่องในเครื่องนี้ (localStorage) เพื่อให้แต่ละรอบที่ไม่ใส่ชื่อ ได้ชื่อไม่ซ้ำกัน และยังติดอันดับ Leaderboard ได้ปกติ
   */
  function generateGuestName() {
    let next = Number(localStorage.getItem(GUEST_COUNTER_KEY) || "0") + 1;
    localStorage.setItem(GUEST_COUNTER_KEY, String(next));
    return `Player ${String(next).padStart(2, "0")}`;
  }

  function handleStart() {
    const typedName = nameInput.value.trim();
    const errorMsg = validateName(typedName);

    if (errorMsg) {
      nameError.textContent = errorMsg;
      nameInput.focus();
      return;
    }

    nameError.textContent = "";

    if (typedName) {
      sessionStorage.setItem("ewr_playerName", typedName);
      sessionStorage.setItem("ewr_playerNameIsAuto", "0");
    } else {
      const autoName = generateGuestName();
      sessionStorage.setItem("ewr_playerName", autoName);
      sessionStorage.setItem("ewr_playerNameIsAuto", "1");
    }

    SFX.playThenGo(SFX.menu.start, "game.php");
  }

  startBtn.addEventListener("click", handleStart);
  nameInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleStart();
  });
  nameInput.addEventListener("input", () => {
    if (nameError.textContent) nameError.textContent = "";
  });

  // ปุ่มลิงก์ไปหน้าอื่น ๆ ก็มีเสียงเอฟเฟกต์ของตัวเอง (เสียงต่างจากปุ่มเริ่มเกม)
  if (howToLink) {
    howToLink.addEventListener("click", (e) => {
      e.preventDefault();
      SFX.playThenGo(SFX.menu.navHowTo, howToLink.getAttribute("href"));
    });
  }
  if (leaderboardLink) {
    leaderboardLink.addEventListener("click", (e) => {
      e.preventDefault();
      SFX.playThenGo(SFX.menu.navLeaderboard, leaderboardLink.getAttribute("href"));
    });
  }
})();
