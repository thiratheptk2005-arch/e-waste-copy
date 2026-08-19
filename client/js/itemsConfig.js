// itemsConfig.js
// รับผิดชอบ: รายการขยะทั้งหมด (รูปภาพ + ชื่อ + คะแนน) ใช้ร่วมกันทั้งหน้า game และหน้า how-to-play
//
// วิธีเปลี่ยนรูปภาพเป็นของตัวเอง:
//   1. เตรียมไฟล์ .png หรือ .jpg (แนะนำพื้นหลังโปร่งใสสำหรับ .png ขนาดประมาณ 160x160px)
//   2. นำไฟล์ไปวางไว้ในโฟลเดอร์ client/assets/images/
//   3. แก้ path ในช่อง "image" ด้านล่างให้ตรงกับชื่อไฟล์ของคุณ (ไม่ต้องแก้ที่อื่นเลย)
//   ถ้าโหลดรูปไม่สำเร็จ (ไฟล์หาย/พิมพ์ path ผิด) เกมจะ fallback ไปใช้ emoji ใน "icon" แทนอัตโนมัติ

const ITEMS_CONFIG = {
  // ขยะอิเล็กทรอนิกส์ — แต่ละชิ้นมีคะแนน (points), ช่วงความเร็วตก (speedMin/speedMax, px/วินาที)
  // และ "weight" (น้ำหนักการสุ่มออก) เป็นของตัวเอง — weight ยิ่งมาก ยิ่งมีโอกาสตกบ่อยกว่าชิ้นอื่นในกลุ่มเดียวกัน
  // (ค่าเริ่มต้นถ้าไม่ระบุ weight = 1 ทุกชิ้นจะมีโอกาสเท่ากันเหมือนเดิม)
  // นอกจากนี้ยังใส่ sizeMin/sizeMax (px) ต่อชิ้นได้ ถ้าอยากให้บางไอเทมตัวใหญ่/เล็กกว่าชิ้นอื่นเป็นพิเศษ
  // ถ้าไม่ระบุ sizeMin/sizeMax จะ fallback ไปใช้ค่ากลาง DEFAULT_ITEM_SIZE_MIN/MAX ใน game.js แทน
  // ชิ้นที่หายาก/มีค่ารีไซเคิลสูง (เช่น คีย์บอร์ด) ให้คะแนนเยอะกว่าแต่ออกน้อยกว่า, ชิ้นเล็ก ๆ ทั่วไปตกไวและออกบ่อยกว่า
  eWaste: [
    { id: "phone", icon: "📱", label: "โทรศัพท์", image: "assets/images/phone.png", points: 15, speedMin: 130, speedMax: 200, weight: 20 },
    { id: "battery", icon: "🔋", label: "แบตเตอรี่", image: "assets/images/battery.png", points: 6, speedMin: 150, speedMax: 260, weight: 40 },
    { id: "mouse", icon: "🖱️", label: "เมาส์", image: "assets/images/mouse.png", points: 10, speedMin: 120, speedMax: 200, weight: 20 },
    { id: "keyboard", icon: "⌨️", label: "คีย์บอร์ด", image: "assets/images/keyboard.png", points: 13, speedMin: 100, speedMax: 160, weight: 10 },
    { id: "charger", icon: "🔌", label: "สายชาร์จ", image: "assets/images/charger.png", points: 6, speedMin: 160, speedMax: 240, weight: 30 },
    { id: "laptop", icon: "💻", label: "โน๊ตบุ๊ค", image: "assets/images/laptop.png", points: 25, speedMin: 160, speedMax: 240, weight: 5 },
  ],

  // ขยะทั่วไป — points เป็นค่าติดลบ (โดนหักคะแนน), ชิ้นใหญ่/หนักตกช้ากว่าชิ้นเบา, weight ควบคุมความถี่ที่จะออกเช่นกัน
  general: [
    { id: "banana", icon: "🍌", label: "กล้วย", image: "assets/images/banana1.png", points: -3, speedMin: 140, speedMax: 220, weight: 30 },
    { id: "bottle", icon: "🥤", label: "ขวด", image: "assets/images/bottle.png", points: -5, speedMin: 130, speedMax: 210, weight: 40 },
    { id: "box", icon: "📦", label: "กล่อง", image: "assets/images/box.png", points: -15, speedMin: 90, speedMax: 150, weight: 10 },
    { id: "can", icon: "🥫", label: "กระป๋อง", image: "assets/images/can.png", points: -4, speedMin: 150, speedMax: 230, weight: 25 },
    { id: "paper", icon: "📄", label: "กระดาษ", image: "assets/images/paper.png", points: -5, speedMin: 160, speedMax: 250, weight: 40 },
    { id: "pizza", icon: "🍕", label: "พิซซ่า", image: "assets/images/pizza.png", points: -10, speedMin: 160, speedMax: 250, weight: 30 },
  ],

  // ไอเทมพิเศษ — ออกยาก (น้ำหนักรวมของกลุ่มนี้ถูกคุมแยกต่างหากด้วย SPECIAL_SPAWN_CHANCE ใน game.js)
  // แต่ละชิ้นมีขนาด (sizeMin/sizeMax) ไม่เท่ากันเองตามที่กำหนดไว้ด้านล่าง
  // "effect" บอก game.js ว่าไอเทมนี้ทำอะไรตอนถูกกด:
  //   "bonus"      -> ได้คะแนนตาม points (บวก) เหมือนขยะอิเล็กทรอนิกส์ทั่วไป แต่ได้เยอะกว่ามาก
  //   "penalty"    -> เสียคะแนนตาม points (ลบ) เหมือนขยะทั่วไป แต่เสียเยอะกว่ามาก
  //   "clearScore" -> ล้างคะแนนสะสมทั้งหมดกลับเป็น 0 ทันที (points ไม่ถูกใช้ตรง ๆ, game.js จัดการเคสนี้เป็นพิเศษ)
  // ยังไม่ได้ใส่ path รูปภาพจริงไว้ (image ชี้ไปยังไฟล์ที่ยังไม่มี) ระบบจะ fallback ไปใช้ emoji ใน "icon" แทน
  // โดยอัตโนมัติจนกว่าจะมีการเพิ่มไฟล์รูปจริงเข้ามาที่ client/assets/images/ (ไม่ต้องแก้โค้ดส่วนอื่นเพิ่ม)
  special: [
    { id: "star", icon: "⭐", label: "ดาว", image: "assets/images/star.png", points: 100, effect: "bonus", speedMin: 160, speedMax: 260, weight: 10, sizeMin: 56, sizeMax: 66 },
    { id: "dynamite", icon: "🧨", label: "ไดนาไมต์", image: "assets/images/dynamite.png", points: -100, effect: "penalty", speedMin: 170, speedMax: 270, weight: 10, sizeMin: 74, sizeMax: 88 },
    { id: "nuke", icon: "☢️", label: "ระเบิดนิวเคลียร์", image: "assets/images/nuke.png", points: 0, effect: "clearScore", speedMin: 140, speedMax: 220, weight: 2, sizeMin: 96, sizeMax: 112 },
  ],

  // ค่าเหล่านี้ยังคงเก็บไว้เป็น fallback เผื่อมีการเพิ่มไอเทมใหม่ที่ยังไม่ได้กำหนด points ของตัวเอง
  GOOD_POINTS: 10,
  BAD_POINTS: -5,
};

// preload cache กลาง ใช้ร่วมกันได้ทุกหน้าที่ include ไฟล์นี้
const ITEM_IMAGE_CACHE = new Map();

/**
 * โหลดรูปของ item (พร้อม cache) ถ้าโหลดไม่สำเร็จจะ resolve เป็น null
 * เพื่อให้ฝั่งที่เรียกใช้ fallback ไป fillText(icon) แทนได้
 */
function loadItemImage(item) {
  if (!item.image) return Promise.resolve(null);
  if (ITEM_IMAGE_CACHE.has(item.image)) {
    return Promise.resolve(ITEM_IMAGE_CACHE.get(item.image));
  }
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      ITEM_IMAGE_CACHE.set(item.image, img);
      resolve(img);
    };
    img.onerror = () => {
      ITEM_IMAGE_CACHE.set(item.image, null); // จำไว้ว่าโหลดไม่ได้ จะได้ไม่พยายามซ้ำ
      resolve(null);
    };
    img.src = item.image;
  });
}