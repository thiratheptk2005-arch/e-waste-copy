-- schema.sql
-- ไฟล์นี้ใช้สำหรับ import เข้า phpMyAdmin ใน XAMPP เพื่อสร้างฐานข้อมูล/ตารางสำหรับเก็บ Leaderboard
--
-- วิธีใช้:
--   1. เปิด XAMPP Control Panel แล้วกด Start ที่ Apache และ MySQL
--   2. เปิดเบราว์เซอร์ไปที่ http://localhost/phpmyadmin
--   3. คลิกแท็บ "Import" (นำเข้า) ที่เมนูด้านบน
--   4. เลือกไฟล์นี้ (schema.sql) แล้วกด "Go" / "ไป"
--   5. จะได้ฐานข้อมูลชื่อ e_waste_rush พร้อมตาราง leaderboard ทันที (ไม่ต้องสร้างเองทีละขั้นตอน)
--
-- ถ้าอยากสร้างเองผ่านหน้าจอ phpMyAdmin แทนก็ทำตามโครงสร้างด้านล่างนี้ได้เช่นกัน

CREATE DATABASE IF NOT EXISTS e_waste_rush
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE e_waste_rush;

CREATE TABLE IF NOT EXISTS leaderboard (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  player_name VARCHAR(20) NOT NULL,
  score INT NOT NULL,
  played_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, -- วันที่/เวลาที่บันทึกคะแนน โชว์ในตาราง Leaderboard
  INDEX idx_score (score DESC),
  INDEX idx_played_at (played_at DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
