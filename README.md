# 🎮 E-Waste Rush — จิ้มให้ถูก ทิ้งให้เป็น

เกมคัดแยกขยะอิเล็กทรอนิกส์: ขยะจะสุ่มตกลงมาจากด้านบนของจอ คลิก/แตะให้ทันภายใน 60 วินาที
- ♻️ ขยะอิเล็กทรอนิกส์ (โทรศัพท์ / แบตเตอรี่ / เมาส์ / คีย์บอร์ด / สายชาร์จ) = **+10 คะแนน**
- 🚫 ขยะทั่วไป (กล้วย / ขวด / กล่อง / กระป๋อง / กระดาษ) = **-5 คะแนน**

ผู้เล่นใส่ชื่อหรือไม่ใส่ก็ได้ — ถ้าไม่ใส่ชื่อ ระบบจะตั้งชื่อให้อัตโนมัติแบบ `Player 01`, `Player 02`, ... เรียงไปเรื่อย ๆ (นับต่อเนื่องในเครื่องนั้น ๆ) และชื่อที่ระบบตั้งให้ก็ติดอันดับ Leaderboard ได้ตามปกติ

เมื่อจบเกม คะแนนสุดท้ายจะถูกบันทึกลง Leaderboard อัตโนมัติ (ดูได้ทั้งแบบ "อันดับ" และ "ล่าสุด" พร้อมวันที่เล่น)

## 🛠️ Tech Stack

| ส่วน | เทคโนโลยี |
|---|---|
| Frontend | HTML, CSS, JavaScript, HTML5 Canvas, Web Audio API (เสียงเอฟเฟกต์) |
| Backend | Node.js, Express |
| Database | **MySQL ผ่าน XAMPP** (เชื่อมต่อด้วย `mysql2`) |
| Pattern | MVC + Service + Repository |

## 📂 โครงสร้างโปรเจกต์

```
e-waste-rush/
├── client/
│   ├── index.html       # Main Menu (ใส่ชื่อ/ไม่ใส่ก็ได้)
│   ├── game.html        # หน้าเล่นเกม (Canvas)
│   ├── gameover.html    # สรุปคะแนน
│   ├── leaderboard.html # อันดับ / ล่าสุด
│   ├── how-to-play.html # วิธีเล่น
│   ├── assets/
│   │   ├── images/      # รูปขยะแต่ละชิ้น (.png) — เปลี่ยนเป็นรูปของคุณเองได้ ดูหัวข้อด้านล่าง
│   │   └── audio/       # (ว่างไว้ให้) สำหรับใครอยากใช้ไฟล์เสียงจริงแทนเสียงสังเคราะห์
│   ├── css/
│   └── js/
│       ├── sfx.js           # เสียงเอฟเฟกต์ทุกหน้า (ปุ่มกด / คัดแยกถูก-ผิด)
│       ├── itemsConfig.js   # รายชื่อ+รูปขยะทั้งหมด ใช้ร่วมกันหน้า game และ how-to-play
│       ├── main.js, game.js, gameover.js, leaderboard.js, howto.js
│
├── server/
│   ├── app.js                    # จุดเริ่มต้น Express server (เช็คการเชื่อมต่อ MySQL ก่อน start)
│   ├── controllers/              # รับ request / ส่ง response
│   ├── services/                 # business logic + validation
│   ├── repositories/             # SQL queries (MySQL)
│   └── database/
│       ├── database.js           # ตั้งค่า connection pool ไปยัง MySQL (XAMPP)
│       └── schema.sql            # ไฟล์ import เข้า phpMyAdmin เพื่อสร้างฐานข้อมูล/ตาราง
│
├── package.json
└── README.md
```

## 🚀 วิธีติดตั้งและรัน (ใช้ XAMPP เก็บ Leaderboard)

### ขั้นที่ 1 — เตรียมฐานข้อมูลใน XAMPP
1. เปิด **XAMPP Control Panel** แล้วกด **Start** ที่ **MySQL** และ **Apache**
2. เปิดเบราว์เซอร์ไปที่ `http://localhost/phpmyadmin`
3. คลิกแท็บ **Import** (นำเข้า) ด้านบน
4. เลือกไฟล์ `server/database/schema.sql` จากโปรเจกต์นี้ แล้วกด **Go**
5. จะได้ฐานข้อมูลชื่อ **`e_waste_rush`** พร้อมตาราง **`leaderboard`** ทันที (มีคอลัมน์ `played_at` เก็บวันที่/เวลาที่บันทึกคะแนนไว้ให้แล้ว)

> ถ้า MySQL ใน XAMPP ของคุณตั้งรหัสผ่าน root ไว้ไม่ใช่ค่าว่าง หรือใช้พอร์ต/ฐานข้อมูลชื่ออื่น ให้แก้ค่าในไฟล์ `server/database/database.js` (หรือกำหนดผ่าน environment variable: `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`)

### ขั้นที่ 2 — รัน Node.js server
1. เปิดโฟลเดอร์นี้ใน VS Code แล้วเปิด Terminal (``Ctrl + ` ``)
2. ติดตั้ง dependencies:
   ```bash
   npm install
   ```
3. รัน server:
   ```bash
   npm start
   ```
   ถ้าเชื่อมต่อ MySQL ไม่ได้ (เช่นลืม Start MySQL ใน XAMPP) เทอร์มินัลจะบอก error ชัดเจนว่าต้องแก้อะไร
4. เปิดเบราว์เซอร์ไปที่:
   ```
   http://localhost:3000
   ```

## 🔌 API Endpoints

| Method | Endpoint | คำอธิบาย |
|---|---|---|
| POST | `/api/leaderboard` | บันทึกคะแนนใหม่ `{ player_name, score }` |
| GET | `/api/leaderboard/ranking?limit=10` | คะแนนสูงสุดเรียงลำดับ |
| GET | `/api/leaderboard/latest?limit=10` | คะแนนล่าสุดที่บันทึก |
| GET | `/api/health` | ตรวจสอบว่า server ทำงานอยู่ |

## 🎨 เปลี่ยนรูปภาพขยะเป็นของตัวเอง (.png / .jpg)

ตอนนี้ขยะแต่ละชิ้นวาดด้วย**รูปภาพจริง** (ไม่ใช่ emoji แล้ว) และ**ไม่มีวงกลมสีเขียว/แดงบอกใบ้**ว่าอันไหนถูกหรือผิดอีกต่อไป — ผู้เล่นต้องดูจากรูปภาพเองว่าเป็นขยะอิเล็กทรอนิกส์หรือขยะทั่วไป

รูปเริ่มต้นอยู่ที่ `client/assets/images/` (เป็นไอคอนตัวอย่างแบบเรียบง่ายที่สร้างไว้ให้ใช้งานได้ทันที) วิธีเปลี่ยนเป็นรูปของคุณเอง:
1. เตรียมไฟล์ `.png` หรือ `.jpg` (แนะนำพื้นหลังโปร่งใสสำหรับ `.png` ขนาดประมาณ 160×160px)
2. นำไปวางในโฟลเดอร์ `client/assets/images/`
3. เปิดไฟล์ `client/js/itemsConfig.js` แล้วแก้ path ในช่อง `image` ของแต่ละชิ้นให้ตรงกับชื่อไฟล์คุณ — แค่นี้พอ ไม่ต้องแก้โค้ดที่อื่นเลย ทั้งหน้าเกมและหน้า "วิธีเล่น" จะใช้รูปใหม่ทันที

ถ้าโหลดรูปไม่สำเร็จ (ไฟล์หาย/พิมพ์ path ผิด) ระบบจะ fallback ไปใช้ emoji ให้อัตโนมัติ เกมจะไม่พัง

## 🔊 เสียงเอฟเฟกต์

ทุกหน้า (เมนู / เล่นเกม / จบเกม / Leaderboard / วิธีเล่น) มีเสียงเอฟเฟกต์ตอนกดปุ่ม โดยแต่ละปุ่ม/แต่ละหน้าจะได้ยินเสียงคนละแบบกัน ไฟล์ที่คุมเสียงทั้งหมดคือ `client/js/sfx.js` ส่วนโค้ดที่ "เรียกเล่นเสียง" จะอยู่ในจุดที่จัดการการกดปุ่มของแต่ละหน้าโดยตรง (เช่น `main.js`, `game.js`, `gameover.js`, `leaderboard.js`, `howto.js`)

เสียงทั้งหมดสร้างด้วย **Web Audio API แบบสังเคราะห์เสียงในเบราว์เซอร์** (ไม่ใช่ไฟล์เสียงสำเร็จรูป) เพื่อให้โปรเจกต์รันได้ทันทีแบบออฟไลน์โดยไม่ต้องหาไฟล์เสียงมาใส่เอง ถ้าอยากเปลี่ยนไปใช้ไฟล์เสียงจริง (.mp3/.wav) ของคุณเอง:
1. วางไฟล์เสียงไว้ที่ `client/assets/audio/` (สร้างโฟลเดอร์ไว้ให้แล้ว)
2. แก้ไขใน `client/js/sfx.js` ตามคอมเมนต์ด้านบนไฟล์ (มีตัวอย่างโค้ดใช้ `new Audio(...)` ให้พร้อม)

## 🧩 แนวคิดของแต่ละ Layer (Backend)

- **Repository** (`leaderboardRepository.js`) — คุยกับ MySQL โดยตรงเท่านั้น (SQL queries ผ่าน `mysql2/promise`)
- **Service** (`leaderboardService.js`) — ตรวจสอบข้อมูล/กฎทางธุรกิจ ก่อนส่งต่อให้ repository
- **Controller** (`leaderboardController.js`) — รับ HTTP request/response เท่านั้น ไม่มี logic ธุรกิจ
- **Routes** (`leaderboardRoutes.js`) — ผูก URL เข้ากับ controller

โครงสร้างนี้ทำให้แก้ไข/ทดสอบแต่ละส่วนแยกจากกันได้ และเปลี่ยนฐานข้อมูลในอนาคตได้ง่ายโดยแก้แค่ repository เท่านั้น
#   e - w a s t e  
 #   e - w a s t e  
 "# e-waste" 
"# e-waste" 
