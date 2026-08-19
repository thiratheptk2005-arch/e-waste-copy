// app.js
// จุดเริ่มต้นของ server: ตั้งค่า Express, middleware, static files, และ mount routes

const path = require("path");
const express = require("express");
const cors = require("cors");
const leaderboardRoutes = require("./routes/leaderboardRoutes");
const db = require("./database/database");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// เสิร์ฟไฟล์หน้าเว็บทั้งหมดจากโฟลเดอร์ client
app.use(express.static(path.join(__dirname, "..", "client")));

// API routes
app.use("/api/leaderboard", leaderboardRoutes);

// health check
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "E-Waste Rush server is running" });
});

// เช็คว่าเชื่อมต่อ MySQL (XAMPP) ได้จริงก่อน แล้วค่อยเริ่ม server เพื่อให้เห็น error ที่เข้าใจง่ายถ้ายังไม่ได้ตั้งค่า
db.getConnection()
  .then((conn) => {
    conn.release();
    app.listen(PORT, () => {
      console.log(`🎮 E-Waste Rush server running at http://localhost:${PORT}`);
      console.log(`   เชื่อมต่อฐานข้อมูล MySQL (XAMPP) สำเร็จ`);
    });
  })
  .catch((err) => {
    console.error("❌ เชื่อมต่อฐานข้อมูล MySQL ไม่สำเร็จ:", err.message);
    console.error(
      "   ตรวจสอบว่า: 1) เปิด XAMPP แล้วกด Start ที่ MySQL หรือยัง " +
        "2) import server/database/schema.sql ผ่าน http://localhost/phpmyadmin แล้วหรือยัง " +
        "3) ค่า DB_HOST/DB_USER/DB_PASSWORD/DB_NAME ถูกต้องหรือไม่ (ดูใน server/database/database.js)"
    );
    process.exit(1);
  });
