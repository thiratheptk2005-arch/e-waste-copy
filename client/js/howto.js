// howto.js — ทำงานบนหน้า how-to-play.html
// รับผิดชอบ: แสดงรายการขยะ (จาก itemsConfig.js เดียวกับหน้า game.html) และเสียงตอนกดปุ่มย้อนกลับ

(function () {
  const goodGrid = document.getElementById("goodGrid");
  const badGrid = document.getElementById("badGrid");
  const specialGrid = document.getElementById("specialGrid");
  const backLink = document.getElementById("backLink");

  function renderTile(def, isGood) {
    const tile = document.createElement("div");
    tile.className = `waste-tile ${isGood ? "waste-tile--good" : "waste-tile--bad"}`;

    // คะแนนต่อไอเทม: ใช้ def.points ของแต่ละชิ้นก่อน (ค่าจริงที่ game.js ใช้ตอนคลิกโดน)
    // ถ้าไอเทมไหนยังไม่ได้กำหนด points ไว้ใน itemsConfig.js จะ fallback ไปใช้ค่ากลาง GOOD_POINTS/BAD_POINTS
    const points = typeof def.points === "number" ? def.points : isGood ? ITEMS_CONFIG.GOOD_POINTS : ITEMS_CONFIG.BAD_POINTS;

    // ใช้รูปภาพจริงถ้ามี ถ้าโหลดไม่สำเร็จจะ fallback กลับไปเป็น emoji อัตโนมัติ (ผ่าน onerror)
    tile.innerHTML = `
      <img class="waste-tile__icon" src="${def.image}" alt="${def.label}"
           onerror="this.replaceWith(Object.assign(document.createElement('span'), {className:'waste-tile__icon', textContent:'${def.icon}'}))" />
      <div class="waste-tile__meta">
        <span>${def.label}</span>
        <span class="waste-tile__points">${points > 0 ? "+" : ""}${points}</span>
      </div>
    `;
    return tile;
  }

  // ไอเทมพิเศษ (ดาว/ไดนาไมต์/นิวเคลียร์) มีผลไม่ใช่แค่บวก/ลบคะแนนธรรมดา (เช่น นิวเคลียร์ล้างคะแนนทั้งหมด)
  // เลยแสดงข้อความอธิบายผลแทนตัวเลข points ตรง ๆ สำหรับชิ้นที่ effect ไม่ใช่ bonus/penalty ปกติ
  function renderSpecialTile(def) {
    const tile = document.createElement("div");
    const isPositive = def.effect === "bonus";
    tile.className = `waste-tile waste-tile--special ${isPositive ? "waste-tile--good" : "waste-tile--bad"}`;

    let effectText;
    if (def.effect === "clearScore") {
      effectText = "ล้างคะแนนทั้งหมด!";
    } else {
      const points = typeof def.points === "number" ? def.points : 0;
      effectText = `${points > 0 ? "+" : ""}${points}`;
    }

    tile.innerHTML = `
      <img class="waste-tile__icon" src="${def.image}" alt="${def.label}"
           onerror="this.replaceWith(Object.assign(document.createElement('span'), {className:'waste-tile__icon', textContent:'${def.icon}'}))" />
      <div class="waste-tile__meta">
        <span>${def.label}</span>
        <span class="waste-tile__points">${effectText}</span>
      </div>
    `;
    return tile;
  }

  ITEMS_CONFIG.eWaste.forEach((def) => goodGrid.appendChild(renderTile(def, true)));
  ITEMS_CONFIG.general.forEach((def) => badGrid.appendChild(renderTile(def, false)));
  if (specialGrid && Array.isArray(ITEMS_CONFIG.special)) {
    ITEMS_CONFIG.special.forEach((def) => specialGrid.appendChild(renderSpecialTile(def)));
  }

  if (backLink) {
    backLink.addEventListener("click", (e) => {
      e.preventDefault();
      SFX.playThenGo(SFX.howto.back, backLink.getAttribute("href"));
    });
  }
})();