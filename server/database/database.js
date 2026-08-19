// database.js
// รับผิดชอบ: สร้าง connection pool ไปยังฐานข้อมูล MySQL ที่รันอยู่ใน XAMPP
// ไฟล์นี้ถูก require แค่ที่เดียวจาก repository เพื่อให้มี pool เดียวใช้ทั้งแอป (Singleton)
//
// ก่อนรันเซิร์ฟเวอร์ ต้อง:
//   1. เปิด XAMPP Control Panel แล้วกด Start ที่ "MySQL" (และ "Apache" ถ้าจะใช้ phpMyAdmin ด้วย)
//   2. import ไฟล์ server/database/schema.sql ผ่าน http://localhost/phpmyadmin (แท็บ Import)
//      -> จะได้ฐานข้อมูล e_waste_rush และตาราง leaderboard พร้อมใช้งาน
//   3. ถ้าตั้งรหัสผ่าน root ของ MySQL ไว้ไม่ใช่ค่าว่าง หรือใช้ user/host/port อื่น
//      ให้แก้ค่าด้านล่าง หรือกำหนดผ่าน environment variable ก็ได้ (DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT)

const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || "root", // ค่า default ของ XAMPP MySQL
  password: process.env.DB_PASSWORD || "", // XAMPP ปกติไม่ตั้งรหัสผ่านให้ root
  database: process.env.DB_NAME || "e_waste_rush",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  dateStrings: true, // ให้ค่า DATETIME กลับมาเป็น string 'YYYY-MM-DD HH:MM:SS' ตรงกับที่ client เดิมคาดหวัง
});

module.exports = pool;
